import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">PipeFlow</h1>
          <p className="text-slate-500 mt-1 text-sm">CRM para times de vendas</p>
        </div>
        {children}
      </div>
    </div>
  )
}
