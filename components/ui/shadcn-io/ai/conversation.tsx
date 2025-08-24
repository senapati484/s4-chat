"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const Conversation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col h-full overflow-hidden", className)} {...props} />
  ),
)
Conversation.displayName = "Conversation"

const ConversationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
  ),
)
ConversationContent.displayName = "ConversationContent"

const ConversationScrollButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      className={cn("absolute bottom-20 right-4 rounded-full shadow-lg", className)}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  ),
)
ConversationScrollButton.displayName = "ConversationScrollButton"

export { Conversation, ConversationContent, ConversationScrollButton }
