import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/sidebar'
import type { ReactNode } from 'react'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: memberRow } = await supabase
    .from('workspace_members')
    .select('workspace_id, workspaces(id, name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  const workspaces = memberRow?.workspaces
  const workspaceName =
    workspaces && !Array.isArray(workspaces) && 'name' in workspaces
      ? (workspaces as { name: string }).name
      : 'Meu Workspace'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userEmail={user.email ?? ''}
        userName={user.user_metadata?.full_name ?? null}
        workspaceName={workspaceName}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
