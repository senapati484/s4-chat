"use client"

import { useState } from "react"
import { MessageSquare, Plus, Trash2, ChevronLeft, ChevronRight, Sparkles, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

interface InnovativeSidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function InnovativeSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: InnovativeSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  return (
    <div
      className={cn(
        "relative h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar shadow-md hover:bg-sidebar-accent"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">S4 Chat</h2>
                <p className="text-xs text-sidebar-foreground/60">Multi-AI Assistant</p>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={onNewConversation}
            className={cn("w-full justify-start gap-2 bg-primary hover:bg-primary/90", isCollapsed && "px-2")}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && "New Chat"}
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.length === 0 ? (
            <div className={cn("flex flex-col items-center justify-center py-8 text-center", isCollapsed && "px-2")}>
              <MessageSquare className="h-8 w-8 text-sidebar-foreground/40 mb-2" />
              {!isCollapsed && <p className="text-sm text-sidebar-foreground/60">No conversations yet</p>}
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "group relative rounded-lg border transition-all duration-200",
                    activeConversationId === conversation.id
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:border-sidebar-border hover:bg-sidebar-accent/50",
                  )}
                >
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className={cn("w-full p-3 text-left transition-colors", isCollapsed && "px-2")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-card">
                        <MessageSquare className="h-4 w-4 text-card-foreground" />
                      </div>
                      {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium text-sm text-sidebar-foreground">{conversation.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-sidebar-foreground/40" />
                            <span className="text-xs text-sidebar-foreground/60">
                              {formatDate(conversation.createdAt)}
                            </span>
                            <Users className="h-3 w-3 text-sidebar-foreground/40" />
                            <span className="text-xs text-sidebar-foreground/60">{conversation.messages.length}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>

                  {!isCollapsed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteConversation(conversation.id)
                      }}
                      className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {!isCollapsed && (
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center justify-between text-xs text-sidebar-foreground/60">
              <span>{conversations.length} conversations</span>
              <span>4 AI models</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
