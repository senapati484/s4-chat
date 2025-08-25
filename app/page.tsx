"use client";

import { useAuth } from "@clerk/nextjs";
import { ChatPlayground } from "@/components/chat-playground";
import { redirect } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <main className="bg-black">
      <ChatPlayground />
    </main>
  );
}
