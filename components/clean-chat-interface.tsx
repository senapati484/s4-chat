"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ChatInput } from "@/components/chat-input";
import {
  Send,
  Mic,
  Wand2,
  Image,
  Paperclip,
  Sparkles,
  Zap,
  Brain,
  Gem,
  ThumbsUp,
  ThumbsDown,
  Share,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface CleanChatInterfaceProps {
  conversation: Conversation | undefined;
  chatbotStates: ChatbotStates;
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void;
  onToggleChatbot: (chatbotId: keyof ChatbotStates) => void;
  isDarkMode: boolean;
}

const chatbotConfig = {
  chatgpt: {
    name: "ChatGPT 5",
    icon: Sparkles,
    color: "text-white",
    bgColor: "bg-black",
    borderColor: "border-gray-300",
  },
  grok: {
    name: "Grok",
    icon: Zap,
    color: "text-white",
    bgColor: "bg-black",
    borderColor: "border-gray-300",
  },
  claude: {
    name: "Claude Sonnet 4",
    icon: Brain,
    color: "text-white",
    bgColor: "bg-black",
    borderColor: "border-gray-300",
  },
  gemini: {
    name: "Gemini 2.5 Pro",
    icon: Gem,
    color: "text-white",
    bgColor: "bg-black",
    borderColor: "border-gray-300",
  },
};

export function CleanChatInterface({
  conversation,
  chatbotStates,
  onUpdateConversation,
  onToggleChatbot,
  isDarkMode,
}: CleanChatInterfaceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue.trim() || !conversation) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user" as const,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...conversation.messages, userMessage];
    onUpdateConversation(conversation.id, {
      messages: updatedMessages,
      title: inputValue.slice(0, 50) + (inputValue.length > 50 ? "..." : ""),
    });

    setIsLoading(true);

    // Simulate AI responses
    setTimeout(() => {
      const activeChatbots = Object.entries(chatbotStates).filter(
        ([_, isActive]) => isActive
      );

      const aiMessages = activeChatbots.map(([chatbotId, _]) => ({
        id: `${Date.now()}-${chatbotId}`,
        content: `This is a simulated response from ${
          chatbotConfig[chatbotId as keyof typeof chatbotConfig].name
        }. In a real application, this would be the actual AI response.`,
        role: "assistant" as const,
        timestamp: new Date().toISOString(),
        chatbotId,
      }));

      const allMessages = [...updatedMessages, ...aiMessages];
      onUpdateConversation(conversation.id, { messages: allMessages });
      setIsLoading(false);
    }, 2000);
  };

  const activeChatbots = Object.entries(chatbotStates).filter(
    ([_, isActive]) => isActive
  );

  return (
    <div
      className={cn(
        "flex flex-col h-screen",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Welcome Section */}
      {(!conversation || conversation.messages.length === 0) && (
        <div
          className={cn(
            "flex-1 flex flex-col items-center justify-center p-8 text-center",
            isDarkMode ? "bg-black" : "bg-white"
          )}
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-200",
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            )}
          >
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to S4 Chat</h1>
          <p
            className={cn(
              "text-lg mb-8 max-w-2xl transition-all duration-200",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Chat with multiple AI models simultaneously. Ask a question and get
            responses from all active models side by side.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(chatbotConfig).map(([chatbotId, config]) => {
              const Icon = config.icon;
              return (
                <div
                  key={chatbotId}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg transition-all duration-200",
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{config.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Chat Area - Horizontally Scrollable */}
      {conversation && conversation.messages.length > 0 && (
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-x-auto scrollbar-hide">
            <div className="flex h-full min-w-max">
              {Object.entries(chatbotConfig).map(([chatbotId, config]) => {
                const Icon = config.icon;
                const isActive =
                  chatbotStates[chatbotId as keyof ChatbotStates];
                const chatbotMessages = conversation.messages.filter(
                  (msg) =>
                    msg.role === "user" ||
                    (msg.role === "assistant" && msg.chatbotId === chatbotId)
                );

                return (
                  <div
                    key={chatbotId}
                    className={cn(
                      "flex flex-col border-r transition-all duration-300 flex-shrink-0",
                      isActive ? "w-[500px]" : "w-16",
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    )}
                  >
                    {/* Chatbot Header */}
                    <div
                      className={cn(
                        "p-4 border-b flex items-center justify-between flex-shrink-0",
                        isDarkMode
                          ? "bg-gray-900 border-gray-800"
                          : "bg-gray-50 border-gray-200"
                      )}
                    >
                      {isActive ? (
                        <>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "p-2 rounded-lg transition-all duration-200",
                                isDarkMode ? "bg-gray-800" : "bg-gray-200"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{config.name}</span>
                            {/* <Badge
                              className={cn(
                                "ml-2 transition-all duration-200",
                                isDarkMode
                                  ? "bg-green-600 text-white"
                                  : "bg-green-100 text-green-800"
                              )}
                            >
                              Active
                            </Badge> */}
                          </div>
                          <Switch
                            checked={isActive}
                            onCheckedChange={() =>
                              onToggleChatbot(chatbotId as keyof ChatbotStates)
                            }
                          />
                        </>
                      ) : (
                        <div
                          className="flex flex-col items-center h-full bg-gray-900 gap-2 w-full"
                          onClick={() =>
                            onToggleChatbot(chatbotId as keyof ChatbotStates)
                          }
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-all duration-200",
                              isDarkMode ? "bg-gray-800" : "bg-gray-200"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          {/* <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onToggleChatbot(chatbotId as keyof ChatbotStates)
                            }
                            className={cn(
                              "h-6 w-6 p-0 transition-all duration-200",
                              isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-black hover:bg-gray-200"
                            )}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button> */}
                        </div>
                      )}
                    </div>

                    {/* Messages - Only show when active */}
                    {isActive && (
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatbotMessages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex transition-all duration-200",
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[85%] rounded-lg p-3 transition-all duration-200",
                                message.role === "user"
                                  ? isDarkMode
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-500 text-white"
                                  : isDarkMode
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-100 text-black"
                              )}
                            >
                              <p className="text-sm leading-relaxed">
                                {message.content}
                              </p>
                              {message.role === "assistant" && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-600">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                  >
                                    <Share className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div
                              className={cn(
                                "max-w-[85%] rounded-lg p-3 transition-all duration-200",
                                isDarkMode
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-100 text-black"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                <span className="text-sm">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Chat Input Component */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
      />
      <div ref={chatEndRef} />
    </div>
  );
}
