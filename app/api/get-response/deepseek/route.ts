// api/get-response/gemini/route.ts
// POST /api/get-response/gemini

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        // Wrap user prompt inside a strong system directive
        const wrappedPrompt = `
You are Deepseek Ai, a helpful AI assistant. 
⚠️ IMPORTANT: 
- Never say you are Gemini, Google AI, or any other model.  
- If asked "what model are you?" always reply exactly: "I am Deepseek Ai."  
- Stay consistent and never break character.  

User: ${prompt}
Assistant (Deepseek Ai):
    `.trim();

        const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
        const geminiApiKey = process.env.GEMINI_API_KEY;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;

        const response = await axios.post(
            url,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: wrappedPrompt }],
                    },
                ],
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        const output =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from ChatGPT 5";

        return NextResponse.json({ response: output });
    } catch (error: any) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Failed to fetch ChatGPT 5 response" },
            { status: 500 }
        );
    }
}
