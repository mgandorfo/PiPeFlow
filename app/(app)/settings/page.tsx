import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsPage() {
  return (
    <div className="p-6">
      <PageHeader title="Configurações" description="Gerencie seu workspace e assinatura" />

      <div className="max-w-2xl space-y-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-200">
              Informações do Workspace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-9 w-full bg-slate-700" />
            <Skeleton className="h-9 w-full bg-slate-700" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-200">Membros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full bg-slate-700" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3.5 w-32 bg-slate-700" />
                  <Skeleton className="h-3 w-24 bg-slate-700/60" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full bg-slate-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-200">Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full bg-slate-700" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
