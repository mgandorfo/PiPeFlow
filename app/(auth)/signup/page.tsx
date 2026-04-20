'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  full_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(72, 'Senha muito longa'),
})

type FormData = z.infer<typeof schema>

function getPasswordStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: '' }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Fraca' }
  if (score === 2) return { score: 2, label: 'Média' }
  if (score === 3) return { score: 3, label: 'Boa' }
  return { score: 4, label: 'Forte' }
}

const strengthColors = ['', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-green-500']
const strengthTextColors = ['', 'text-red-400', 'text-amber-400', 'text-blue-400', 'text-green-400']

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const password = watch('password', '')
  const strength = getPasswordStrength(password)

  async function onSubmit(_data: FormData) {
    setServerError(null)
    await new Promise((r) => setTimeout(r, 800))
    router.push('/onboarding')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Criar conta</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Comece grátis — sem cartão de crédito
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {serverError && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/30">
            {serverError}
          </div>
        )}

        {/* Nome */}
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Nome completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="full_name"
              type="text"
              placeholder="João Silva"
              className="pl-9"
              aria-invalid={!!errors.full_name}
              {...register('full_name')}
            />
          </div>
          {errors.full_name && (
            <p className="text-destructive text-xs">{errors.full_name.message}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="voce@empresa.com"
              className="pl-9"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              className="pl-9 pr-10"
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Indicador de força */}
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      strength.score >= level
                        ? strengthColors[strength.score]
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${strengthTextColors[strength.score]}`}>
                Força da senha: {strength.label}
              </p>
            </div>
          )}

          {errors.password && (
            <p className="text-destructive text-xs">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            'Criar conta grátis'
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ao criar conta você concorda com os{' '}
          <span className="underline cursor-pointer hover:text-foreground transition-colors">
            Termos de Uso
          </span>
          .
        </p>
      </form>

      <p className="text-sm text-center text-muted-foreground">
        Já tem conta?{' '}
        <Link href="/login" className="text-blue-500 hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </div>
  )
}
