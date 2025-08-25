"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChatInput } from "@/components/chat-input";
import { Sparkles, Zap, ThumbsUp, ThumbsDown, Share } from "lucide-react";
import { RiPerplexityLine, RiGeminiLine, RiClaudeLine } from "react-icons/ri";
import { AiOutlineOpenAI } from "react-icons/ai";
import { GiSpermWhale } from "react-icons/gi";
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
  deepSeek: boolean;
  perplexity: boolean;
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
    icon: AiOutlineOpenAI,
  },
  gemini: {
    name: "Gemini 2.5 Pro",
    icon: RiGeminiLine,
  },
  grok: {
    name: "Grok",
    icon: Zap,
  },
  claude: {
    name: "Claude Sonnet 4",
    icon: RiClaudeLine,
  },
  deepSeek: {
    name: "DeepSeek",
    icon: GiSpermWhale,
  },
  perplexity: {
    name: "Perplexity Pro",
    icon: RiPerplexityLine,
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

    setTimeout(() => {
      const activeChatbots = Object.entries(chatbotStates).filter(
        ([_, isActive]) => isActive
      );

      const aiMessages = activeChatbots.map(([chatbotId, _]) => ({
        id: `${Date.now()}-${chatbotId}`,
        content: `This is a simulated response from ${
          chatbotConfig[chatbotId as keyof typeof chatbotConfig].name
        }.`,
        role: "assistant" as const,
        timestamp: new Date().toISOString(),
        chatbotId,
      }));

      const allMessages = [...updatedMessages, ...aiMessages];
      onUpdateConversation(conversation.id, { messages: allMessages });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Welcome Section */}
      {(!conversation || conversation.messages.length === 0) && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-6",
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            )}
          >
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to S4 Chat</h1>
          <p
            className={cn(
              "text-lg mb-8 max-w-2xl",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Chat with multiple AI models simultaneously. Ask a question and get
            responses from all active models.
          </p>
        </div>
      )}

      {/* Main Chat Area */}
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
                      "flex flex-col border-r flex-shrink-0",
                      isActive ? "w-[500px]" : "w-16",
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    )}
                  >
                    {/* Chatbot Header */}
                    <div
                      className={cn(
                        "p-4 border-b flex items-center justify-between",
                        isDarkMode
                          ? "bg-gray-900/40 border-gray-800"
                          : "bg-white/70 border-gray-200"
                      )}
                    >
                      {isActive ? (
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              isDarkMode ? "bg-gray-800" : "bg-gray-200"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{config.name}</span>
                        </div>
                      ) : (
                        <div
                          className="flex flex-col items-center h-full gap-2 w-full"
                          onClick={() =>
                            onToggleChatbot(chatbotId as keyof ChatbotStates)
                          }
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              isDarkMode ? "bg-gray-800" : "bg-gray-200"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      {isActive && (
                        <Switch
                          checked={isActive}
                          onCheckedChange={() =>
                            onToggleChatbot(chatbotId as keyof ChatbotStates)
                          }
                        />
                      )}
                    </div>

                    {/* Messages */}
                    {isActive && (
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatbotMessages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex",
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                                message.role === "user"
                                  ? isDarkMode
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-500 text-white"
                                  : isDarkMode
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-100 text-black"
                              )}
                            >
                              {message.content}
                              {/* {message.role === "assistant" && isActive && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t text-xs opacity-70">
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
                              )} */}
                            </div>
                          </div>
                        ))}

                        {isLoading && (
                          <div className="flex justify-start">
                            <div
                              className={cn(
                                "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                                isDarkMode
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-100 text-black"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                <span>Thinking...</span>
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

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
      />
      <div ref={chatEndRef} />
    </div>
  );
}
