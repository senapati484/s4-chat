"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react" // Import MessageSquare

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
  chatbotId?: string
}

interface Conversation {
  id: string
  title: string
  createdAt: string
  messages: Message[]
}

interface MultiChatInterfaceProps {
  conversation: Conversation | undefined
  chatbotStates: {
    chatbot1: boolean
    chatbot2: boolean
    chatbot3: boolean
    chatbot4: boolean
  }
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void
}

export function MultiChatInterface({ conversation, chatbotStates, onUpdateConversation }: MultiChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim() || !conversation || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date().toISOString(),
    }

    // Update conversation title if it's the first message
    const updates: Partial<Conversation> = {
      messages: [...conversation.messages, userMessage],
    }

    if (conversation.messages.length === 0) {
      updates.title = input.trim().slice(0, 50) + (input.trim().length > 50 ? "..." : "")
    }

    onUpdateConversation(conversation.id, updates)
    setInput("")
    setIsLoading(true)

    // Simulate AI responses for enabled chatbots
    const enabledChatbots = Object.entries(chatbotStates)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key)

    // Add responses from enabled chatbots with slight delays
    for (let i = 0; i < enabledChatbots.length; i++) {
      const chatbotId = enabledChatbots[i]

      setTimeout(
        () => {
          const aiMessage: Message = {
            id: `${Date.now()}-${chatbotId}`,
            content: `This is a response from ${chatbotId.replace("chatbot", "S4 Chat Bot ")} to: "${input.trim()}". This is a mock response for demonstration purposes.`,
            role: "assistant",
            timestamp: new Date().toISOString(),
            chatbotId,
          }

          onUpdateConversation(conversation.id, {
            messages: [...(conversation.messages || []), userMessage, aiMessage],
          })

          if (i === enabledChatbots.length - 1) {
            setIsLoading(false)
          }
        },
        (i + 1) * 1000,
      )
    }

    if (enabledChatbots.length === 0) {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getChatbotMessages = (chatbotId: string) => {
    return conversation?.messages.filter((msg) => msg.role === "user" || msg.chatbotId === chatbotId) || []
  }

  const enabledChatbots = Object.entries(chatbotStates)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key)

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No conversation selected</p>
          <p className="text-sm">Create a new chat to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {enabledChatbots.map((chatbotId) => (
          <Card key={chatbotId} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="w-4 h-4" />
                S4 Chat {chatbotId.replace("chatbot", "")}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-3 pb-4">
                  {getChatbotMessages(chatbotId).map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}

        {enabledChatbots.length === 0 && (
          <div className="col-span-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No chatbots enabled</p>
              <p className="text-sm">Enable at least one chatbot to start chatting</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading || enabledChatbots.length === 0}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || enabledChatbots.length === 0}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
