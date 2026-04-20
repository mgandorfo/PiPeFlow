export type UserRole = 'admin' | 'member'

export type PlanType = 'free' | 'pro'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface WorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  role: UserRole
  created_at: string
}

export interface Lead {
  id: string
  workspace_id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  status: 'active' | 'inactive' | 'converted' | 'lost'
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  workspace_id: string
  lead_id: string
  title: string
  value: number
  stage: 'novo_lead' | 'contato_realizado' | 'proposta_enviada' | 'negociacao' | 'fechado_ganho' | 'fechado_perdido'
  assigned_to: string | null
  deadline: string | null
  position: number
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  workspace_id: string
  lead_id: string
  user_id: string
  type: 'call' | 'email' | 'meeting' | 'note'
  title: string
  description: string | null
  created_at: string
}

export interface Subscription {
  id: string
  workspace_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: PlanType
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  created_at: string
  updated_at: string
}
