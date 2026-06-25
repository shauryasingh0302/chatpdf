import React from 'react'

type Props = {pdf_url: string}

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="h-full w-full rounded-xl border border-gray-200 bg-white"
    ></iframe>
  )
}

export default PDFViewer