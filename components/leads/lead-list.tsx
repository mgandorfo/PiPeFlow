'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, SlidersHorizontal, UserCircle2, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LeadStatusBadge } from './lead-status-badge'
import { LeadSheet } from './lead-sheet'
import { FAKE_LEADS, type Lead, type LeadStatus } from '@/lib/data/leads'

const ALL_STATUSES: LeadStatus[] = ['novo', 'contatado', 'qualificado', 'proposta', 'perdido']

export function LeadList() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(FAKE_LEADS)
  const [search, setSearch] = useState('')
  const [activeStatuses, setActiveStatuses] = useState<LeadStatus[]>([...ALL_STATUSES])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return leads.filter((lead) => {
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
      const matchesStatus = activeStatuses.includes(lead.status)
      return matchesSearch && matchesStatus
    })
  }, [leads, search, activeStatuses])

  const toggleStatus = useCallback((status: LeadStatus) => {
    setActiveStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }, [])

  function openNew() {
    setEditingLead(null)
    setSheetOpen(true)
  }

  function openEdit(lead: Lead, e: React.MouseEvent) {
    e.stopPropagation()
    setEditingLead(lead)
    setSheetOpen(true)
  }

  async function handleSave(data: Omit<Lead, 'id' | 'createdAt' | 'activities' | 'owner'>) {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))

    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) => (l.id === editingLead.id ? { ...l, ...data } : l))
      )
      toast.success('Lead atualizado com sucesso!')
    } else {
      const newLead: Lead = {
        ...data,
        id: String(Date.now()),
        owner: 'Demo User',
        createdAt: new Date().toISOString().split('T')[0],
        activities: [],
      }
      setLeads((prev) => [newLead, ...prev])
      toast.success('Lead criado com sucesso!')
    }

    setSaving(false)
    setSheetOpen(false)
  }

  function handleDelete(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id))
    setSheetOpen(false)
    toast.success('Lead excluído.')
  }

  const allSelected = activeStatuses.length === ALL_STATUSES.length
  const filterLabel = allSelected
    ? 'Todos os status'
    : activeStatuses.length === 0
      ? 'Nenhum status'
      : `${activeStatuses.length} status`

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, empresa ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {filterLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200" align="end">
            <DropdownMenuLabel className="text-slate-400">Filtrar por status</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            {ALL_STATUSES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s}
                checked={activeStatuses.includes(s)}
                onCheckedChange={() => toggleStatus(s)}
                className="focus:bg-slate-700 capitalize"
              >
                <LeadStatusBadge status={s} />
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuCheckboxItem
              checked={allSelected}
              onCheckedChange={() =>
                setActiveStatuses(allSelected ? [] : [...ALL_STATUSES])
              }
              className="focus:bg-slate-700 text-slate-400 text-xs"
            >
              {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 shrink-0" onClick={openNew}>
          <Plus className="w-4 h-4" />
          Novo lead
        </Button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <UserCircle2 className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-slate-300 font-medium">Nenhum lead encontrado</p>
            <p className="text-slate-500 text-sm mt-1">
              {search
                ? 'Tente ajustar sua busca ou filtros.'
                : 'Clique em "Novo lead" para adicionar o primeiro.'}
            </p>
            {search && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setSearch('')}
              >
                Limpar busca
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700/50">
              {filtered.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-700/30 cursor-pointer group transition-colors"
                  onClick={() => router.push(`/leads/${lead.id}`)}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-300 font-semibold text-sm shrink-0">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name + company */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{lead.name}</p>
                    <p className="text-xs text-slate-400 truncate">{lead.company}</p>
                  </div>

                  {/* Email — hidden on small screens */}
                  <p className="hidden md:block text-xs text-slate-400 truncate max-w-[180px]">
                    {lead.email}
                  </p>

                  {/* Status badge */}
                  <LeadStatusBadge status={lead.status} />

                  {/* Edit button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-slate-600"
                    onClick={(e) => openEdit(lead, e)}
                    title="Editar lead"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Count */}
      {filtered.length > 0 && (
        <p className="text-xs text-slate-500 mt-3">
          {filtered.length} {filtered.length === 1 ? 'lead' : 'leads'} encontrado{filtered.length === 1 ? '' : 's'}
        </p>
      )}

      <LeadSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        lead={editingLead}
        onSave={handleSave}
        onDelete={handleDelete}
        saving={saving}
      />
    </>
  )
}
