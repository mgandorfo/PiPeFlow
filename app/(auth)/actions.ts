'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
})

// TODO M1-real: substituir por Supabase signInWithPassword
export async function login(formData: FormData): Promise<{ error?: string }> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: 'Dados inválidos.' }

  redirect('/dashboard')
}

// TODO M1-real: substituir por Supabase signUp + redirect para onboarding
export async function signup(formData: FormData): Promise<{ error?: string }> {
  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
  })
  if (!parsed.success) return { error: 'Dados inválidos. Verifique os campos.' }

  redirect('/onboarding')
}

// TODO M1-real: substituir por Supabase signOut
export async function logout(): Promise<void> {
  redirect('/login')
}

export async function forgotPassword(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string
  if (!email || !z.string().email().safeParse(email).success) {
    return { error: 'E-mail inválido.' }
  }
  return { success: true }
}
