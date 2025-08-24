"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Square } from "lucide-react"

const PromptInput = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => <form ref={ref} className={cn("space-y-2", className)} {...props} />,
)
PromptInput.displayName = "PromptInput"

const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<typeof Textarea>>(
  ({ className, ...props }, ref) => (
    <Textarea ref={ref} className={cn("min-h-[60px] resize-none", className)} {...props} />
  ),
)
PromptInputTextarea.displayName = "PromptInputTextarea"

const PromptInputToolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between", className)} {...props} />
  ),
)
PromptInputToolbar.displayName = "PromptInputToolbar"

const PromptInputTools = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />,
)
PromptInputTools.displayName = "PromptInputTools"

const PromptInputButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="ghost" size="sm" className={cn("h-8 px-2", className)} {...props} />
  ),
)
PromptInputButton.displayName = "PromptInputButton"

const PromptInputSubmit = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    status?: "ready" | "streaming"
  }
>(({ className, status = "ready", ...props }, ref) => (
  <Button ref={ref} type="submit" size="sm" className={cn("h-8 px-3", className)} {...props}>
    {status === "streaming" ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
  </Button>
))
PromptInputSubmit.displayName = "PromptInputSubmit"

const PromptInputModelSelect = Select
const PromptInputModelSelectTrigger = SelectTrigger
const PromptInputModelSelectContent = SelectContent
const PromptInputModelSelectItem = SelectItem
const PromptInputModelSelectValue = SelectValue

export {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue,
}
