import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/server'
import { AppShell } from '@/components/layout/app-shell'
import { Toaster } from '@/components/ui/sonner'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <>
      <AppShell
        userEmail={user.email ?? ''}
        userName={user.user_metadata?.full_name ?? null}
      >
        {children}
      </AppShell>
      <Toaster richColors position="top-right" />
    </>
  )
}
