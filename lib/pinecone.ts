import { Pinecone, RecordMetadata } from '@pinecone-database/pinecone';
import { downloadFromSupabase } from './supabase-server';
import { Document } from '@langchain/core/documents';
import {Document as doc, RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter'
import fs from 'fs';
import { getEmbeddings } from './embeddings';
import md5 from 'md5'
import { Vector } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/db_data';
import { convertToAscii } from './utils';


const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) throw new Error('PINECONE_API_KEY environment variable is required');

const pc = new Pinecone({ apiKey });
// const index = pc.index('shaurya');
const pineconeIndex = pc.index({ name: 'shaurya' })

type PDFPage = {
    pageContent: string
    metadata:{
        loc: {pageNumber: number}
    }
}

export const loadS3IntoPinecone = async (file_key: string) => {

    // 1. Obtain the PDF -> download and read from pdf

    console.log('downloading pdf into file system');

    const file_name = await downloadFromSupabase(file_key);
    if (!file_name) throw new Error('could not download from supabase');

    const fileBuffer = fs.readFileSync(file_name);
    const uint8Array = new Uint8Array(fileBuffer);

    // unpdf works natively in Node.js — no canvas/DOM polyfills needed
    const { extractText } = await import('unpdf');
    const { text } = await extractText(uint8Array, { mergePages: false });

    const pages: Document[] = (text as string[]).map((pageContent: string, i: number) =>
        new Document({
            pageContent: pageContent.trim(),
            metadata: {
                source: file_name,
                page: i + 1,
                loc: { pageNumber: i + 1 }
            }
        })
    ) as PDFPage[];

    // 2. split and segment the pdf

    const documents = await Promise.all(pages.map(page=>prepareDocument(page as unknown as PDFPage)))

    // 3. vectorise and embed individual documents

    const vectors = await Promise.all(documents.flat().map((doc)=>embedDocument(doc)))

    // 4. Upload to pinecone

    console.log("inserting vectors into pinecone")
    const namespace = pineconeIndex.namespace(convertToAscii(file_key));

    await namespace.upsert({
    records: vectors.map(v => ({
        id: v.id,
        values: v.values,
        metadata: v.metadata as RecordMetadata
    }))
    
});


};

async function embedDocument(doc:Document){
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        } as Vector
    } catch (error) {
        console.log('error embedding document', error)
        throw error
    }
}

const truncateStringByBytes = (str:string, bytes:number)=>{
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFPage){
    let {pageContent, metadata} = page
    pageContent = pageContent.replace(/\n/g, '')
    //split the doc
    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new doc({
            pageContent,
            metadata:{
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ])
    return docs
}