import { Badge } from '@/components/ui/badge'
import type { LeadStatus } from '@/lib/data/leads'

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30' },
  contatado: { label: 'Contatado', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30' },
  qualificado: { label: 'Qualificado', className: 'bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30' },
  proposta: { label: 'Proposta', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30' },
  perdido: { label: 'Perdido', className: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30' },
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const { label, className } = STATUS_CONFIG[status]
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

export { STATUS_CONFIG }
