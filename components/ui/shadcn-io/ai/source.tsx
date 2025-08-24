"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ExternalLink, FileText } from "lucide-react"

const Sources = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Collapsible>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </Collapsible>
  ),
)
Sources.displayName = "Sources"

const SourcesTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    count?: number
  }
>(({ className, count, ...props }, ref) => (
  <CollapsibleTrigger asChild>
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      className={cn("h-8 px-2 text-muted-foreground hover:text-foreground", className)}
      {...props}
    >
      <FileText className="h-4 w-4 mr-2" />
      <span>Sources {count && `(${count})`}</span>
      <ChevronDown className="h-4 w-4 ml-2" />
    </Button>
  </CollapsibleTrigger>
))
SourcesTrigger.displayName = "SourcesTrigger"

const SourcesContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CollapsibleContent>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </CollapsibleContent>
  ),
)
SourcesContent.displayName = "SourcesContent"

const Source = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title?: string
  }
>(({ className, title, href, ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "flex items-center gap-2 rounded-md border bg-card p-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
      className,
    )}
    {...props}
  >
    <FileText className="h-4 w-4 text-muted-foreground" />
    <span className="flex-1 truncate">{title}</span>
    <ExternalLink className="h-3 w-3 text-muted-foreground" />
  </a>
))
Source.displayName = "Source"

export { Sources, SourcesTrigger, SourcesContent, Source }
