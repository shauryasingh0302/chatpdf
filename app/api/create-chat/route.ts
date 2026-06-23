// /api/create-chat

import { NextResponse } from "next/server"
import { loadS3IntoPinecone } from "./../../../lib/pinecone"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { getSupabaseUrl } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
export async function POST(req: Request){

    const {userId} = await auth()

    if(!userId){
        return NextResponse.json({error: "Unauthorized"}, {status:401})
    }

    try {

        const body = await req.json()
        const {file_key, file_name} = body
        console.log(file_key, file_name)
        await loadS3IntoPinecone(file_key)
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getSupabaseUrl(file_key),
            userId
        }).returning(
            {
                insertedId: chats.id
            }
        )

        return NextResponse.json({chat_id: chat_id[0].insertedId})

    } catch (error) {

        console.error(error)
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        )

    }
}