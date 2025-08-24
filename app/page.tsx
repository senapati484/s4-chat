"use client";

import { useState, useEffect } from "react";
import { LoginPage } from "@/components/login-page";
import { ChatPlayground } from "@/components/chat-playground";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("s4-chat-user");
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (provider: "google" | "apple") => {
    // Mock authentication - in real app this would integrate with actual OAuth
    const mockUser = {
      id: Date.now().toString(),
      name: `User via ${provider}`,
      email: `user@${provider}.com`,
      provider,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("s4-chat-user", JSON.stringify(mockUser));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("s4-chat-user");
    localStorage.removeItem("s4-chat-conversations");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ChatPlayground onLogout={handleLogout} />
      )}
    </main>
  );
}
