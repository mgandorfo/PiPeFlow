import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'

export default function LeadsPage() {
  return (
    <div className="p-6">
      <PageHeader title="Leads" description="Gerencie seus contatos e oportunidades">
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo lead
        </Button>
      </PageHeader>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700/50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3.5">
                <Skeleton className="w-9 h-9 rounded-full bg-slate-700 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-36 bg-slate-700" />
                  <Skeleton className="h-3 w-24 bg-slate-700/60" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
