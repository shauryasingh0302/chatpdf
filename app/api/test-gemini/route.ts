// app/api/test-gemini/route.ts
import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    )
    const data = await res.json()
    // filter only embedding models
    const embeddingModels = data.models?.filter((m: any) => 
        m.name.includes('embed')
    )
    return NextResponse.json({ embeddingModels })
}