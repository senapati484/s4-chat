"use client"

import { useState, useCallback } from "react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bot, Power, PowerOff } from "lucide-react"
import { cn } from "@/lib/utils"
import AdvancedChatbot from "@/components/advanced-chatbot"

interface Conversation {
  id: string
  title: string
  createdAt: string
  messages: Array<{
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: string
    chatbotId?: string
  }>
}

interface ChatbotStates {
  chatbot1: boolean
  chatbot2: boolean
  chatbot3: boolean
  chatbot4: boolean
}

interface QuadChatInterfaceProps {
  conversation: Conversation | undefined
  chatbotStates: ChatbotStates
  onUpdateConversation: (id: string, updates: Partial<Conversation>) => void
  onToggleChatbot: (chatbotId: keyof ChatbotStates) => void
}

const chatbotConfigs = [
  { id: "chatbot1", name: "S4 Chat Alpha", color: "bg-blue-500", description: "Creative Assistant" },
  { id: "chatbot2", name: "S4 Chat Beta", color: "bg-green-500", description: "Technical Expert" },
  { id: "chatbot3", name: "S4 Chat Gamma", color: "bg-purple-500", description: "Research Specialist" },
  { id: "chatbot4", name: "S4 Chat Delta", color: "bg-orange-500", description: "General Helper" },
]

export function QuadChatInterface({
  conversation,
  chatbotStates,
  onUpdateConversation,
  onToggleChatbot,
}: QuadChatInterfaceProps) {
  const [activeChats, setActiveChats] = useState<Set<string>>(new Set())

  const handleChatActivity = useCallback((chatbotId: string, isActive: boolean) => {
    setActiveChats((prev) => {
      const newSet = new Set(prev)
      if (isActive) {
        newSet.add(chatbotId)
      } else {
        newSet.delete(chatbotId)
      }
      return newSet
    })
  }, [])

  const enabledChatbots = Object.entries(chatbotStates).filter(([_, enabled]) => enabled)
  const gridCols =
    enabledChatbots.length === 1
      ? "grid-cols-1"
      : enabledChatbots.length === 2
        ? "grid-cols-2"
        : enabledChatbots.length === 3
          ? "grid-cols-3"
          : "grid-cols-2"

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Control Header */}
      <div className="border-b border-border bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">Multi-Chat Interface</h2>
            <Badge variant="secondary" className="gap-1">
              <Bot className="h-3 w-3" />
              {enabledChatbots.length} Active
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {chatbotConfigs.map((config) => (
              <div key={config.id} className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", config.color)} />
                <span className="text-sm font-medium">{config.name.split(" ")[2]}</span>
                <Switch
                  checked={chatbotStates[config.id as keyof ChatbotStates]}
                  onCheckedChange={() => onToggleChatbot(config.id as keyof ChatbotStates)}
                  className="scale-75"
                />
                {chatbotStates[config.id as keyof ChatbotStates] ? (
                  <Power className="h-3 w-3 text-green-500" />
                ) : (
                  <PowerOff className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Grid */}
      <div className="flex-1 p-4">
        {enabledChatbots.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Chatbots Active</h3>
              <p className="text-muted-foreground">Enable at least one chatbot to start chatting</p>
            </div>
          </div>
        ) : (
          <div className={cn("grid h-full gap-4", gridCols, enabledChatbots.length === 4 && "grid-rows-2")}>
            {enabledChatbots.map(([chatbotId, enabled]) => {
              const config = chatbotConfigs.find((c) => c.id === chatbotId)!
              const isActive = activeChats.has(chatbotId)

              return (
                <div
                  key={chatbotId}
                  className={cn(
                    "relative rounded-xl border bg-card shadow-sm transition-all duration-300",
                    isActive && "ring-2 ring-primary/20 shadow-lg",
                  )}
                >
                  {/* Chatbot Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-4 py-2 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", config.color)} />
                      <span className="font-medium text-sm">{config.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {config.description}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="h-full pt-12">
                    <AdvancedChatbot />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
