import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu pipeline de vendas"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Total de Leads', 'Deals Abertos', 'Valor do Pipeline', 'Taxa de Conversão'].map(
          (label) => (
            <Card key={label} className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-slate-400">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-24 bg-slate-700" />
                <Skeleton className="h-3 w-16 mt-1.5 bg-slate-700/60" />
              </CardContent>
            </Card>
          )
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-200">Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full bg-slate-700" />
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-200">Prazos Próximos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-slate-700" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
