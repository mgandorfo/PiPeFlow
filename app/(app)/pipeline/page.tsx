import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'

const STAGES = [
  { label: 'Novo Lead', color: 'bg-slate-500' },
  { label: 'Contato Realizado', color: 'bg-blue-400' },
  { label: 'Proposta Enviada', color: 'bg-violet-400' },
  { label: 'Negociação', color: 'bg-amber-400' },
  { label: 'Fechado Ganho', color: 'bg-green-500' },
  { label: 'Fechado Perdido', color: 'bg-red-500' },
]

export default function PipelinePage() {
  return (
    <div className="p-6">
      <PageHeader title="Pipeline" description="Visualize e gerencie seus deals por etapa">
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo deal
        </Button>
      </PageHeader>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(({ label, color }) => (
          <div
            key={label}
            className="flex-shrink-0 w-64 bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-700">
              <span className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
              <span className="text-xs font-semibold text-slate-300 truncate">{label}</span>
              <span className="ml-auto text-xs text-slate-500">0</span>
            </div>
            <div className="p-2 space-y-2 min-h-32">
              {label === 'Novo Lead' &&
                Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-md bg-slate-700" />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
