'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
})

type FormData = z.infer<typeof schema>

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function OnboardingPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const name = watch('name', '')
  const slug = toSlug(name)

  async function onSubmit(_data: FormData) {
    await new Promise((r) => setTimeout(r, 800))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
            <span className="text-xl font-bold text-foreground">PipeFlow</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Vamos configurar seu workspace
          </h1>
          <p className="text-muted-foreground text-sm">
            Dê um nome para o seu espaço de trabalho. Pode ser o nome da sua empresa
            ou equipe.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <div className="w-8 h-0.5 bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="w-8 h-0.5 bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
        </div>

        {/* Form card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome do workspace</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Acme Vendas"
                  className="pl-9"
                  aria-invalid={!!errors.name}
                  {...register('name')}
                />
              </div>

              {/* Slug preview */}
              {slug && (
                <p className="text-xs text-muted-foreground">
                  URL:{' '}
                  <span className="font-mono text-foreground">
                    pipeflow.app/<span className="text-blue-400">{slug}</span>
                  </span>
                </p>
              )}

              {errors.name && (
                <p className="text-destructive text-xs">{errors.name.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Criando workspace...
                </>
              ) : (
                'Criar workspace e começar'
              )}
            </Button>
          </form>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Você poderá convidar membros da equipe depois.
        </p>
      </div>
    </div>
  )
}
