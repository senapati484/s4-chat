"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
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

interface CleanSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function CleanSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: CleanSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-80"
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-semibold text-sidebar-foreground font-[family-name:var(--font-space-grotesk)]">
              Conversations
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent/10"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Button
          onClick={onNewConversation}
          className={cn(
            "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground font-[family-name:var(--font-dm-sans)]",
            isCollapsed ? "w-8 h-8 p-0" : "w-full"
          )}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative rounded-lg p-3 cursor-pointer transition-colors hover:bg-sidebar-accent/10",
                activeConversationId === conversation.id &&
                  "bg-sidebar-accent/20"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-0.5 text-sidebar-foreground/60 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate font-[family-name:var(--font-dm-sans)]">
                      {conversation.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-sidebar-foreground/40" />
                      <span className="text-xs text-sidebar-foreground/60 font-[family-name:var(--font-dm-sans)]">
                        {formatDate(conversation.createdAt)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}

          {conversations.length === 0 && !isCollapsed && (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 text-sidebar-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-sidebar-foreground/60 font-[family-name:var(--font-dm-sans)]">
                No conversations yet
              </p>
              <p className="text-xs text-sidebar-foreground/40 mt-1 font-[family-name:var(--font-dm-sans)]">
                Start a new chat to begin
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
