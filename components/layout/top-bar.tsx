'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/pipeline': 'Pipeline',
  '/settings': 'Configurações',
  '/onboarding': 'Configuração inicial',
}

function usePageTitle(): string {
  const pathname = usePathname()
  const match = Object.entries(PAGE_TITLES).find(([key]) =>
    pathname === key || pathname.startsWith(key + '/')
  )
  return match?.[1] ?? 'PipeFlow'
}

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const title = usePageTitle()

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center gap-3 px-4 flex-shrink-0 sticky top-0 z-30">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden w-8 h-8 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold text-slate-100 truncate">{title}</h1>
      </div>
    </header>
  )
}
