"use client"

import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  onNavigate?: (href: string) => void
}

export function BreadcrumbNav({ items, onNavigate }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-2 px-6 py-3 bg-card border-b border-border">
      <button
        onClick={() => onNavigate?.("dashboard")}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => item.href && onNavigate?.(item.href)}
            className={`text-xs transition-colors ${
              item.current ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
            disabled={!item.href}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  )
}
