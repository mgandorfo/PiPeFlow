'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { forgotPassword } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar link de recuperação'}
    </Button>
  )
}

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await forgotPassword(formData)
    if (result?.error) setError(result.error)
    if (result?.success) setSuccess(true)
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="text-green-600 font-medium mb-2">E-mail enviado!</div>
          <p className="text-sm text-slate-500">
            Verifique sua caixa de entrada e clique no link de recuperação.
          </p>
          <Link href="/login" className="mt-4 block text-blue-600 hover:underline text-sm">
            Voltar ao login
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>Enviaremos um link para redefinir sua senha</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-950/50 text-red-400 text-sm p-3 rounded-lg border border-red-900">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <SubmitButton />
          <Link href="/login" className="text-sm text-center text-blue-600 hover:underline">
            Voltar ao login
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
