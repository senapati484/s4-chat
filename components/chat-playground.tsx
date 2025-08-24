"use client";

import { useState, useEffect } from "react";
import { CleanSidebar } from "@/components/clean-sidebar";
import { CleanChatInterface } from "@/components/clean-chat-interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  LogOut,
  Settings,
  User,
  Sparkles,
  Zap,
  Brain,
  Gem,
  Plus,
  Moon,
  Sun,
  MessageSquare,
  Folder,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatPlaygroundProps {
  onLogout: () => void;
}

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
}

const chatbotConfig = {
  chatgpt: {
    name: "ChatGPT 5",
    icon: Sparkles,
    color: "text-white",
    bgColor: "bg-black",
  },
  grok: {
    name: "Grok",
    icon: Zap,
    color: "text-white",
    bgColor: "bg-black",
  },
  claude: {
    name: "Claude Sonnet 4",
    icon: Brain,
    color: "text-white",
    bgColor: "bg-black",
  },
  gemini: {
    name: "Gemini 2.5 Pro",
    icon: Gem,
    color: "text-white",
    bgColor: "bg-black",
  },
};

export function ChatPlayground({ onLogout }: ChatPlaygroundProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [chatbotStates, setChatbotStates] = useState<ChatbotStates>({
    chatgpt: true,
    grok: true,
    claude: false,
    gemini: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
  const activeChatbots = Object.entries(chatbotStates).filter(
    ([_, isActive]) => isActive
  );

  useEffect(() => {
    // Load conversations from localStorage
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
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Left Icon Sidebar - Fixed */}
      <div
        className={cn(
          "flex flex-col h-screen items-start px-3 py-4 space-y-4 transition-all duration-300 z-40 border-r flex-shrink-0",
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-gray-100 border-gray-200",
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
              "rounded-lg flex items-center justify-center transition-all duration-300",
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
            "transition-all duration-300",
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800",
            sidebarCollapsed ? "w-10 h-10 p-0 rounded-full" : "w-full h-10"
          )}
        >
          <Plus className="w-5 h-5" />
          {!sidebarCollapsed && <span className="ml-2">New Chat</span>}
        </Button>

        {/* Chat Sections - Only show when expanded */}
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
                        ? "bg-gray-800"
                        : "bg-gray-200"
                      : isDarkMode
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-200"
                  )}
                  onClick={() => setActiveConversationId(conversation.id)}
                >
                  {/* Left: Chat Icon + Title */}
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">
                      {conversation.title}
                    </span>
                  </div>

                  {/* Right: Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening chat
                      deleteConversation(conversation.id);
                    }}
                    className={cn(
                      "p-1 rounded-md transition-colors duration-200",
                      isDarkMode
                        ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                        : "text-gray-600 hover:text-red-600 hover:bg-gray-300"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
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
          {/* Plan Info Card - Only show when expanded */}
          {!sidebarCollapsed && (
            <div
              className={cn(
                "p-3 rounded-lg transition-all duration-200",
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              )}
            >
              <div
                className={cn(
                  "text-sm font-semibold mb-1",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                Free Plan
              </div>
              <div
                className={cn(
                  "text-xs mb-2",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}
              >
                2 / 3 messages used
              </div>
              <div
                className={cn(
                  "w-full rounded-full h-1 mb-3",
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                )}
              >
                <div
                  className={cn(
                    "h-1 rounded-full",
                    isDarkMode ? "bg-white" : "bg-black"
                  )}
                  style={{ width: "67%" }}
                ></div>
              </div>
              <Button
                className={cn(
                  "w-full text-sm flex items-center justify-center gap-2",
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                )}
              >
                <Zap className="w-4 h-4" />
                Upgrade
              </Button>
            </div>
          )}

          {/* Bottom Icons - Always visible */}
          <div
            className={cn(
              "flex items-center justify-between",
              sidebarCollapsed ? "flex-col space-y-4" : "space-x-4"
            )}
          >
            {/* Lightning Bolt Icon - Only visible when collapsed */}
            {sidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "transition-all duration-300 w-10 h-10 p-0 rounded-lg border border-none",
                  isDarkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-black hover:bg-gray-200"
                )}
              >
                <Zap className="w-4 h-4" />
              </Button>
            )}

            {/* User / Settings */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "transition-all duration-300",
                sidebarCollapsed
                  ? "w-10 h-10 p-0"
                  : "px-3 h-8 flex items-center gap-2",
                isDarkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-black hover:bg-gray-200"
              )}
            >
              <User className="w-4 h-4" />
              {!sidebarCollapsed && <span>Settings</span>}
            </Button>

            {/* Collapse/Expand */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn(
                "transition-all duration-300",
                sidebarCollapsed
                  ? "w-10 h-10 p-0 border border-gray-600"
                  : "h-8 w-8 p-0",
                isDarkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-black hover:bg-gray-200"
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Interface */}
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
