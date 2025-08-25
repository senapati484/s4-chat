// POST /api/post-chat
// Create a new chat for a user

import { database } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

async function writeUserData(userId: string, name: string) {
    set(ref(database, 'chats/' + userId), {
        userid: userId,
        name,
        createdAt: new Date().toISOString(),
        chats: [
            {
                id: Date.now().toString(),
                title: "ChatGPT",
                createdAt: new Date().toISOString(),
                messages: [],
            },
            {
                id: Date.now().toString(),
                title: "DeepSeek",
                createdAt: new Date().toISOString(),
                messages: [],
            },
            {
                id: Date.now().toString(),
                title: "Gemini",
                createdAt: new Date().toISOString(),
                messages: [],
            },
            {
                id: Date.now().toString(),
                title: "Claude",
                createdAt: new Date().toISOString(),
                messages: [],
            },
            {
                id: Date.now().toString(),
                title: "Grok",
                createdAt: new Date().toISOString(),
                messages: [],
            }
        ]
    });
}

export async function POST(request: Request) {
    const { userId, name } = await request.json() as { userId: string; name: string };
    await writeUserData(userId, name);
    return NextResponse.json({ message: "User data written successfully" });
}
