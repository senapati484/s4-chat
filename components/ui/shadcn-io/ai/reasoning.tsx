"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Brain } from "lucide-react"

interface ReasoningProps {
  isStreaming?: boolean
  defaultOpen?: boolean
  children: React.ReactNode
}

const Reasoning = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ReasoningProps>(
  ({ className, isStreaming, defaultOpen = false, children, ...props }, ref) => (
    <Collapsible defaultOpen={defaultOpen}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </Collapsible>
  ),
)
Reasoning.displayName = "Reasoning"

const ReasoningTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => (
    <CollapsibleTrigger asChild>
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn("h-8 px-2 text-muted-foreground hover:text-foreground", className)}
        {...props}
      >
        <Brain className="h-4 w-4 mr-2" />
        <span>Reasoning</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>
    </CollapsibleTrigger>
  ),
)
ReasoningTrigger.displayName = "ReasoningTrigger"

const ReasoningContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn("rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground", className)}
        {...props}
      />
    </CollapsibleContent>
  ),
)
ReasoningContent.displayName = "ReasoningContent"

export { Reasoning, ReasoningTrigger, ReasoningContent }
