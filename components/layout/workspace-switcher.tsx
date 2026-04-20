'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Plan = 'Pro' | 'Free'

interface Workspace {
  id: string
  name: string
  plan: Plan
}

const FAKE_WORKSPACES: Workspace[] = [
  { id: '1', name: 'Acme Corp', plan: 'Pro' },
  { id: '2', name: 'Startup XYZ', plan: 'Free' },
  { id: '3', name: 'Freelance', plan: 'Free' },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function WorkspaceSwitcher() {
  const [current, setCurrent] = useState<Workspace>(FAKE_WORKSPACES[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-2 h-auto py-2 hover:bg-slate-800 focus-visible:ring-0"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {getInitials(current.name)}
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-semibold text-slate-100 truncate leading-tight">
                {current.name}
              </p>
              <p className="text-xs text-slate-500 leading-tight">Plano {current.plan}</p>
            </div>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start" sideOffset={4}>
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal py-1.5">
          Seus workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FAKE_WORKSPACES.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            className="gap-2.5 cursor-pointer"
            onSelect={() => setCurrent(ws)}
          >
            <div className="w-6 h-6 rounded bg-blue-600/80 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {getInitials(ws.name)}
            </div>
            <span className="flex-1 truncate text-sm">{ws.name}</span>
            <div className="flex items-center gap-1.5">
              {ws.plan === 'Pro' && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-4 bg-blue-950 text-blue-400 border-blue-800"
                >
                  Pro
                </Badge>
              )}
              {ws.id === current.id && (
                <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 cursor-pointer text-muted-foreground hover:text-foreground">
          <div className="w-6 h-6 rounded border border-dashed border-slate-600 flex items-center justify-center flex-shrink-0">
            <Plus className="w-3 h-3" />
          </div>
          <span className="text-sm">Novo workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
