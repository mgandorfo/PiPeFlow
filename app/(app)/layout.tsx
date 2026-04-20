import type { ReactNode } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { Toaster } from '@/components/ui/sonner'

// TODO M1-real: restaurar guard Supabase quando auth estiver configurado
export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppShell userEmail="demo@pipeflow.app" userName="Demo User">
        {children}
      </AppShell>
      <Toaster richColors position="top-right" />
    </>
  )
}
