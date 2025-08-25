// api/get-response/gemini/route.ts
// POST /api/get-response/gemini

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json(); // get input from body
        const geminiModel = process.env.GEMINI_MODEL || "gemini-pro";
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;

        const response = await axios.post(
            url,
            {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const output =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from Gemini";

        return NextResponse.json({ response: output });
    } catch (error: any) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Failed to fetch Gemini response" },
            { status: 500 }
        );
    }
}
