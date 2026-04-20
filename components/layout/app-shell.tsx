'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar, SidebarContent } from './sidebar'
import { TopBar } from './top-bar'

interface AppShellProps {
  children: ReactNode
  userEmail: string
  userName: string | null
}

export function AppShell({ children, userEmail, userName }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar — desktop */}
      <Sidebar userEmail={userEmail} userName={userName} />

      {/* Sidebar — mobile (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="p-0 w-60 border-slate-800 bg-slate-900"
          aria-label="Menu de navegação"
        >
          <SidebarContent userEmail={userEmail} userName={userName} />
        </SheetContent>
      </Sheet>

      {/* Content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  )
}
