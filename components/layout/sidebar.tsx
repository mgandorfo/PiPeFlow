'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Kanban, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WorkspaceSwitcher } from './workspace-switcher'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/settings', label: 'Configurações', icon: Settings },
]

interface SidebarProps {
  userEmail: string
  userName: string | null
}

export function SidebarContent({ userEmail, userName }: SidebarProps) {
  const pathname = usePathname()

  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : userEmail[0].toUpperCase()

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-slate-800 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs tracking-tight">PF</span>
        </div>
        <span className="font-bold text-slate-100 text-base tracking-tight">PipeFlow</span>
      </div>

      {/* Workspace switcher */}
      <div className="px-2 py-2.5 border-b border-slate-800 flex-shrink-0">
        <WorkspaceSwitcher />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-0.5">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 pt-2 pb-1.5">
            Menu
          </p>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4 flex-shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                  )}
                />
                {label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User profile */}
      <div className="p-2 border-t border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="text-xs bg-blue-950 text-blue-300 font-semibold border border-blue-800">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate leading-tight">
              {userName ?? 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 truncate leading-tight">{userEmail}</p>
          </div>
        </div>
        <Separator className="my-1.5 bg-slate-800" />
        <form action={logout}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2.5 text-slate-500 hover:text-red-400 hover:bg-red-950/30 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair da conta
          </Button>
        </form>
      </div>
    </div>
  )
}

export function Sidebar({ userEmail, userName }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-60 flex-shrink-0 flex-col h-screen sticky top-0">
      <SidebarContent userEmail={userEmail} userName={userName} />
    </aside>
  )
}
