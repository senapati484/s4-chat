"use client";

import { useState, useEffect } from "react";
import { CleanChatInterface } from "@/components/clean-chat-interface";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile } from "./profile";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: Array<{
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    chatbotId?: string;
  }>;
}

interface ChatbotStates {
  chatgpt: boolean;
  grok: boolean;
  claude: boolean;
  gemini: boolean;
  deepSeek: boolean;
  perplexity: boolean;
}

export function ChatPlayground() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [chatbotStates, setChatbotStates] = useState<ChatbotStates>({
    chatgpt: true, // Open by default
    gemini: true, // Open by default
    grok: true, // Open by default
    claude: false, // Collapsed by default
    deepSeek: false, // Collapsed by default
    perplexity: false, // Collapsed by default
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const saveConversations = (newConversations: Conversation[]) => {
    setConversations(newConversations);
    localStorage.setItem(
      "s4-chat-conversations",
      JSON.stringify(newConversations)
    );
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Multi-Chat Session",
      createdAt: new Date().toISOString(),
      messages: [],
    };
    const updated = [newConversation, ...conversations];
    saveConversations(updated);
    setActiveConversationId(newConversation.id);
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter((conv) => conv.id !== id);
    saveConversations(updated);
    if (activeConversationId === id) {
      setActiveConversationId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    const updated = conversations.map((conv) =>
      conv.id === id ? { ...conv, ...updates } : conv
    );
    saveConversations(updated);
  };

  const toggleChatbot = (chatbotId: keyof ChatbotStates) => {
    setChatbotStates((prev) => ({ ...prev, [chatbotId]: !prev[chatbotId] }));
  };

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  useEffect(() => {
    const saved = localStorage.getItem("s4-chat-conversations");
    if (saved) {
      const parsedConversations = JSON.parse(saved);
      setConversations(parsedConversations);
      if (parsedConversations.length > 0) {
        setActiveConversationId(parsedConversations[0].id);
      }
    }
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden transition-colors duration-200",
        isDarkMode ? "text-white bg-gray-900/40" : "text-black bg-white/70"
      )}
    >
      {/* Left Sidebar */}
      <div
        className={cn(
          "flex flex-col h-screen items-start px-3 py-4 space-y-4 transition-all duration-300 z-40 border-r flex-shrink-0",
          isDarkMode
            ? "text-white bg-gray-900/40 border-gray-800"
            : "text-black bg-white/70 border-gray-200",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo + App Name */}
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            sidebarCollapsed ? "justify-center" : ""
          )}
        >
          <div
            className={cn(
              "rounded-lg flex items-center justify-center transition-all duration-300 shadow-md",
              isDarkMode
                ? "bg-gradient-to-r from-green-400 to-blue-400"
                : "bg-gradient-to-r from-green-500 to-blue-500",
              sidebarCollapsed ? "w-10 h-10" : "w-12 h-12"
            )}
          >
            <Sparkles
              className={cn(
                "transition-all duration-300 text-white",
                sidebarCollapsed ? "w-5 h-5" : "w-6 h-6"
              )}
            />
          </div>
          {!sidebarCollapsed && (
            <h1 className="text-lg font-bold whitespace-nowrap">S4 Chat</h1>
          )}
        </div>

        {/* New Chat Button */}
        <Button
          onClick={createNewConversation}
          className={cn(
            "transition-all duration-300 rounded-lg",
            isDarkMode ? "text-white bg-gray-900/40" : "text-black bg-white/70",
            sidebarCollapsed ? "w-10 h-10 p-0" : "w-full h-10"
          )}
        >
          <Plus className="w-5 h-5" />
          {!sidebarCollapsed && <span className="ml-2">New Chat</span>}
        </Button>

        {/* Chat List */}
        {!sidebarCollapsed && (
          <div className="flex-1 w-full">
            <div className="space-y-2">
              {conversations.slice(0, 5).map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-2 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200",
                    activeConversationId === conversation.id
                      ? isDarkMode
                        ? "bg-gray-800/70"
                        : "bg-gray-200/90"
                      : isDarkMode
                      ? "hover:bg-gray-800/70"
                      : "hover:bg-gray-200/90"
                  )}
                  onClick={() => setActiveConversationId(conversation.id)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">
                      {conversation.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className={cn(
                      "p-1 rounded-md transition-colors duration-200",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div
          className={cn("w-full space-y-4", sidebarCollapsed ? "mt-auto" : "")}
        >
          {!sidebarCollapsed && (
            <div
              className={cn(
                "p-3 rounded-lg transition-all duration-200",
                isDarkMode
                  ? "text-white bg-gray-900/40"
                  : "text-black bg-white/70"
              )}
            >
              <div className="text-sm font-semibold mb-1">Free Plan</div>
              <div className="text-xs mb-2">2 / 3 messages used</div>
              <div className="w-full rounded-full h-1 mb-3 bg-gray-600">
                <div
                  className="h-1 rounded-full bg-white"
                  style={{ width: "67%" }}
                ></div>
              </div>
              <Button
                className={cn(
                  "w-full text-sm flex items-center justify-center gap-2 rounded-lg",
                  isDarkMode
                    ? "text-white bg-gray-900/40"
                    : "text-black bg-white/70"
                )}
              >
                <Zap className="w-4 h-4" />
                Upgrade
              </Button>
            </div>
          )}

          {/* Profile + Collapse */}
          <div
            className={cn(
              "flex items-center justify-between",
              sidebarCollapsed ? "flex-col space-y-4" : "space-x-4"
            )}
          >
            <Profile
              sidebarCollapsed={sidebarCollapsed}
              isDarkMode={isDarkMode}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "transition-all duration-300 rounded-lg",
                isDarkMode
                  ? "text-white bg-gray-900/40"
                  : "text-black bg-white/70"
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CleanChatInterface
          conversation={activeConversation}
          chatbotStates={chatbotStates}
          onUpdateConversation={updateConversation}
          onToggleChatbot={toggleChatbot}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
