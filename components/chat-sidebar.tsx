"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare, Trash2 } from "lucide-react"
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

interface ChatSidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: ChatSidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <Button onClick={onNewConversation} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-sidebar-accent transition-colors",
                activeConversationId === conversation.id && "bg-sidebar-accent",
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <MessageSquare className="w-4 h-4 text-sidebar-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{conversation.title}</p>
                <p className="text-xs text-sidebar-foreground/60">
                  {new Date(conversation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteConversation(conversation.id)
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}

          {conversations.length === 0 && (
            <div className="text-center py-8 text-sidebar-foreground/60">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs">Start a new chat to begin</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
