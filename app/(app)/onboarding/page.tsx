'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
})

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Criando...' : 'Criar workspace'}
    </Button>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    const parsed = schema.safeParse({ name })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Dados inválidos.')
      setPending(false)
      return
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const { data: workspace, error: wsError } = await supabase
      .from('workspaces')
      .insert({ name, slug, owner_id: user.id })
      .select()
      .single()

    if (wsError) {
      setError('Erro ao criar workspace. Tente novamente.')
      setPending(false)
      return
    }

    const { error: memberError } = await supabase
      .from('workspace_members')
      .insert({ workspace_id: workspace.id, user_id: user.id, role: 'admin' })

    if (memberError) {
      setError('Erro ao configurar workspace. Tente novamente.')
      setPending(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">PipeFlow</h1>
          <p className="text-slate-500 mt-1 text-sm">Vamos configurar seu workspace</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Criar seu workspace</CardTitle>
            <CardDescription>
              Dê um nome para o seu espaço de trabalho. Pode ser o nome da sua empresa ou equipe.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Nome do workspace</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Acme Vendas"
                  required
                  minLength={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton pending={pending} />
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
