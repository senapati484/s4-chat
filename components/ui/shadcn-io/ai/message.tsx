"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    from: "user" | "assistant"
  }
>(({ className, from, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-3", from === "user" ? "flex-row-reverse" : "flex-row", className)} {...props}>
    {children}
  </div>
))
Message.displayName = "Message"

const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg px-3 py-2 max-w-[80%] bg-muted text-foreground", className)} {...props} />
  ),
)
MessageContent.displayName = "MessageContent"

const MessageAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar> & {
    src?: string
    name?: string
  }
>(({ className, src, name, ...props }, ref) => (
  <Avatar ref={ref} className={cn("h-8 w-8", className)} {...props}>
    <AvatarImage src={src || "/placeholder.svg"} alt={name} />
    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
  </Avatar>
))
MessageAvatar.displayName = "MessageAvatar"

export { Message, MessageContent, MessageAvatar }
