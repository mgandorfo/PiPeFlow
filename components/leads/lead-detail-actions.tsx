'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { LeadSheet } from './lead-sheet'
import type { Lead } from '@/lib/data/leads'

export function LeadDetailActions({ lead: initialLead }: { lead: Lead }) {
  const router = useRouter()
  const [lead, setLead] = useState(initialLead)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSave(data: Omit<Lead, 'id' | 'createdAt' | 'activities' | 'owner'>) {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setLead((prev) => ({ ...prev, ...data }))
    setSaving(false)
    setSheetOpen(false)
    toast.success('Lead atualizado!')
    router.refresh()
  }

  function handleDelete() {
    setSheetOpen(false)
    toast.success('Lead excluído.')
    router.push('/leads')
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white shrink-0"
        onClick={() => setSheetOpen(true)}
      >
        <Pencil className="w-3.5 h-3.5" />
        Editar
      </Button>

      <LeadSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        lead={lead}
        onSave={handleSave}
        onDelete={handleDelete}
        saving={saving}
      />
    </>
  )
}
