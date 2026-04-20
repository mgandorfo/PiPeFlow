import type { ReactNode } from 'react'
import { TrendingUp, Users, BarChart3 } from 'lucide-react'

const features = [
  { icon: TrendingUp, text: 'Pipeline Kanban visual com drag-and-drop' },
  { icon: Users, text: 'Colaboração em equipe com controle de papéis' },
  { icon: BarChart3, text: 'Dashboard com métricas e funil de vendas' },
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Marketing panel — hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 border-r border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">PF</span>
          </div>
          <span className="text-xl font-bold text-white">PipeFlow</span>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Seu pipeline de vendas,{' '}
              <span className="text-blue-400">organizado e visual.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              Gerencie leads, acompanhe negociações e feche mais negócios — sem a
              complexidade dos CRMs tradicionais.
            </p>
          </div>

          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-slate-600 text-xs">
          © 2024 PipeFlow. Todos os direitos reservados.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Logo — visible only on mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
            <span className="text-xl font-bold text-foreground">PipeFlow</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
