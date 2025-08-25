// GET /api/get-chat/[userId]
// Get a user's chat data

import { database } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const { userId } = params;

    const snapshot = await get(ref(database, `chats/${userId}`));
    const data = snapshot.exists() ? snapshot.val() : null;

    return NextResponse.json(data);
}
