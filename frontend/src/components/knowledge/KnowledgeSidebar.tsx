import { Database, FileText, ScrollText } from "lucide-react"
import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

type KnowledgeSidebarItem = {
  title: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 py-1 text-xs font-medium tracking-wide text-sidebar-foreground/60">
      {children}
    </div>
  )
}

function ItemLink({ item }: { item: KnowledgeSidebarItem }) {
  const location = useLocation()
  const isActive =
    location.pathname === item.url ||
    (item.url !== "/" && location.pathname.startsWith(item.url))

  const Icon = item.icon

  return (
    <NavLink
      to={item.url}
      className={cn(
        "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{item.title}</span>
    </NavLink>
  )
}

export function KnowledgeSidebar() {
  const knowledgeItems: KnowledgeSidebarItem[] = [
    {
      title: "Sources",
      url: "/knowledge/sources",
      icon: FileText,
    },
  ]

  const storageItems: KnowledgeSidebarItem[] = [
    {
      title: "Data Tables",
      url: "/knowledge/data-tables",
      icon: Database,
    },
    {
      title: "Agent Prompts",
      url: "/knowledge/agent-prompts",
      icon: ScrollText,
    },
  ]

  return (
    <aside
      aria-label="Knowledge sidebar"
      className={cn(
        "hidden h-svh w-60 shrink-0 flex-col border-r border-sidebar-border md:flex",
        "bg-sidebar/70 text-sidebar-foreground",
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-2">
        <section className="space-y-1">
          <SectionLabel>KNOWLEDGE</SectionLabel>
          <div className="space-y-1">
            {knowledgeItems.map((item) => (
              <ItemLink key={item.url} item={item} />
            ))}
          </div>
        </section>

        <section className="space-y-1">
          <SectionLabel>STORAGE</SectionLabel>
          <div className="space-y-1">
            {storageItems.map((item) => (
              <ItemLink key={item.url} item={item} />
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}

