# PipeFlow CRM — Development Plan

## Overview

8 milestones incrementais. Cada milestone é um incremento funcional testável antes de avançar.

---

## M1 — Foundation

**Goal:** Projeto rodando com autenticação funcional e banco configurado.

### Tasks
- [x] Scaffold Next.js 14 com TypeScript strict (`create-next-app`)
- [x] Instalar e configurar: Tailwind CSS, shadcn/ui, ESLint, Prettier
- [x] Criar projeto no Supabase e configurar variáveis de ambiente
- [x] Schema SQL: `workspaces`, `workspace_members`, `profiles`
- [x] Configurar RLS básico por workspace
- [x] Supabase client: `lib/supabase/server.ts` e `lib/supabase/browser.ts`
- [x] Páginas de Auth: login, signup, forgot password (`app/(auth)/`)
- [x] Middleware de proteção de rotas autenticadas
- [x] App shell: sidebar + layout autenticado (`app/(app)/layout.tsx`)
- [x] Onboarding: criar primeiro workspace após signup

### Aula 2.1 — Design System & App Shell
- [x] Dark mode como padrão (`class="dark"` no root, CSS variables alinhadas com o design system)
- [x] Font Inter configurada via `next/font`
- [x] Tokens de stage do Kanban definidos em `globals.css`
- [x] `WorkspaceSwitcher` com dados fake e dropdown de seleção (`components/layout/workspace-switcher.tsx`)
- [x] Sidebar redesenhada: logo, workspace switcher, nav com estado ativo, perfil do usuário
- [x] `TopBar` com título de página dinâmico e botão hamburger (`components/layout/top-bar.tsx`)
- [x] `AppShell` client wrapper: gerencia Sheet mobile + layout `h-screen` (`components/layout/app-shell.tsx`)
- [x] Sidebar vira menu hamburger no mobile via `Sheet` (fecha automaticamente ao navegar)
- [x] `PageHeader` reutilizável: título + descrição + slot de ação (`components/layout/page-header.tsx`)
- [x] `Toaster` (sonner) global no app layout
- [x] Novos componentes shadcn instalados: `sheet`, `badge`, `skeleton`, `sonner`, `tooltip`, `scroll-area`
- [x] Páginas placeholder com Skeleton layouts (`/dashboard`, `/leads`, `/pipeline`, `/settings`)
- [x] Cores de erro nas páginas auth corrigidas para dark mode

### Aula 2.2 — Auth & Onboarding UI
- [x] Layout split-screen nas páginas de auth: painel marketing escuro (headline + 3 bullets com ícones) + formulário à direita; mobile-only logo
- [x] Login com `react-hook-form` + Zod: validação inline, ícones `Mail`/`Lock`, mostrar/esconder senha, link "Esqueceu a senha?" inline, loading spinner
- [x] Signup com validação inline, ícone `User`, mostrar/esconder senha, indicador de força de senha em tempo real (4 níveis: fraca → forte)
- [x] Onboarding movido para `/onboarding` (fora do AppShell), slug preview dinâmico com normalização de acentos
- [x] Navegação fake (800ms delay): login → `/dashboard`, signup → `/onboarding` → `/dashboard`
- [x] Guards de rota (middleware + app layout) desabilitados para modo fake, marcados com `TODO M1-real`

**Entregável:** Login → criação de workspace → sidebar vazia funcionando.

---

## M2 — Leads

**Goal:** CRUD completo de leads com timeline de atividades.

### Tasks
- [ ] Schema SQL: `leads`, `activities`
- [ ] RLS: membros acessam apenas leads do workspace
- [ ] Listagem de leads com busca (nome, e-mail, empresa) e filtros (status, responsável)
- [ ] Formulário de criação/edição de lead (shadcn/ui Sheet ou Dialog)
- [ ] Página de detalhe do lead: perfil + timeline de atividades
- [ ] CRUD de atividades na timeline (ligação, e-mail, reunião, nota)
- [ ] Atribuição de responsável (membro do workspace)
- [ ] Estados vazios e feedback de loading

**Entregável:** Criar lead → ver detalhe → registrar atividade na timeline.

### Aula 2.3 — Gestão de Leads UI
- [x] 12 leads brasileiros fake em `lib/data/leads.ts` (nome, e-mail, empresa, telefone, status, notas, atividades)
- [x] Tipos `Lead`, `LeadStatus`, `Activity` exportados de `lib/data/leads.ts`
- [x] `LeadStatusBadge` com 5 estados coloridos: Novo (slate), Contatado (blue), Qualificado (violet), Proposta (amber), Perdido (red)
- [x] Listagem `/leads` com busca por nome/empresa/e-mail e filtro multi-select por status, estado vazio, contagem de resultados
- [x] Sheet de criação/edição com validação Zod + react-hook-form, loading no submit, erro inline por campo
- [x] Exclusão de lead via botão destrutivo no Sheet de edição
- [x] Página de detalhe `/leads/[id]`: avatar, badge de status, info de contato, notas, botão Editar
- [x] Timeline de atividades com ícones por tipo (ligação, e-mail, reunião, nota), form inline para registrar nova atividade
- [x] Navegação fake: CRUD opera em estado local (React), sem Supabase — marcado para `M2-real`
- [x] `select` e `textarea` shadcn instalados

---

## M3 — Pipeline Kanban

**Goal:** Board Kanban com drag-and-drop e deals vinculados a leads.

### Tasks
- [ ] Schema SQL: `deals` (título, valor, lead_id, stage, responsável, prazo)
- [ ] RLS para deals
- [ ] Instalar e configurar `@dnd-kit`
- [ ] Componente `KanbanBoard` com colunas por stage
- [ ] Componente `DealCard` com título, valor (R$), lead, responsável, prazo
- [ ] Drag-and-drop entre colunas com persistência no Supabase
- [ ] Formulário de criação/edição de deal
- [ ] Vinculação deal ↔ lead na página de detalhe do lead

**Entregável:** Board Kanban funcional com drag-and-drop persistido.

---

## M4 — Dashboard

**Goal:** Visão gerencial com métricas e gráfico de funil.

### Tasks
- [ ] Cards de métricas: total de leads, deals abertos, valor do pipeline, taxa de conversão
- [ ] Gráfico de funil por stage (Recharts — `"use client"`)
- [ ] Lista de deals com prazo nos próximos 7 dias do usuário logado
- [ ] Queries otimizadas (agregações no Supabase, não no client)

**Entregável:** Dashboard com dados reais do workspace.

---

## M5 — Multi-workspace & Colaboração

**Goal:** Múltiplos workspaces com convites por e-mail e controle de papéis.

### Tasks
- [ ] Criar múltiplos workspaces por usuário
- [ ] Workspace switcher na sidebar (dropdown)
- [ ] Schema SQL: tabela `invites` (token, e-mail, workspace_id, role, expires_at)
- [ ] Fluxo de convite: Admin envia → Resend dispara e-mail → link com token
- [ ] Página de aceite de convite (`/invite/[token]`)
- [ ] Papéis: `admin` (tudo) | `member` (leads + deals, sem settings)
- [ ] Guards de permissão nos Server Components e API Routes
- [ ] Página de settings do workspace: membros, papéis, remover membro

**Entregável:** Convidar colaborador por e-mail → aceitar convite → acessar workspace.

---

## M6 — Monetização (Stripe)

**Goal:** Planos Free e Pro com checkout e enforcement de limites.

### Tasks
- [ ] Criar produtos e preços no Stripe Dashboard (R$49/mês)
- [ ] Schema SQL: `subscriptions` (workspace_id, stripe_customer_id, status, plan)
- [ ] Integrar Stripe SDK: `lib/stripe/client.ts`
- [ ] Botão "Fazer Upgrade" → Stripe Checkout Session
- [ ] Webhook handler: `app/api/stripe/webhook/route.ts`
  - `checkout.session.completed` → ativar Pro
  - `customer.subscription.deleted` → reverter para Free
- [ ] Supabase Edge Function para processar webhook de forma segura
- [ ] Middleware de enforcement: bloquear ao atingir limites do Free (2 membros / 50 leads)
- [ ] Customer Portal do Stripe para cancelamento/gerenciamento
- [ ] Banner de upgrade quando próximo ao limite

**Entregável:** Upgrade Free → Pro via Stripe Checkout → limites aplicados.

---

## M7 — Landing Page

**Goal:** Página pública de apresentação e conversão.

### Tasks
- [ ] Rota `app/(marketing)/page.tsx`
- [ ] Seção Hero: headline, sub, CTA "Comece grátis"
- [ ] Seção Funcionalidades: 4–6 features com ícones
- [ ] Seção Pipeline: screenshot/mockup do Kanban
- [ ] Seção Planos: tabela Free vs Pro com preço
- [ ] Seção CTA final: "Crie sua conta grátis"
- [ ] Header com logo + link "Entrar"
- [ ] Footer simples
- [ ] SEO: metadata, og:image

**Entregável:** Landing page pública acessível sem login.

---

## M8 — Polish & Launch Readiness

**Goal:** Produto polido e pronto para usuários reais.

### Tasks
- [ ] Fluxo de onboarding guiado (primeira vez no workspace)
- [ ] Estados vazios com CTAs em todas as listas
- [ ] Notificações toast (shadcn/ui `Toaster`) em todas as ações
- [ ] Responsividade mobile (sidebar colapsável, cards adaptados)
- [ ] Loading skeletons nas listagens e dashboard
- [ ] Tratamento de erros globais (error boundaries, 404, 500)
- [ ] Variáveis de ambiente documentadas (`.env.example`)
- [ ] Deploy: Vercel + Supabase produção
- [ ] Testes end-to-end nos fluxos críticos (auth, pipeline, checkout)

**Entregável:** Produto em produção, pronto para os primeiros usuários.

---

## Dependencies

```
next@14        react@18        typescript@5
tailwindcss    @shadcn/ui
@supabase/supabase-js  @supabase/ssr
@dnd-kit/core  @dnd-kit/sortable
recharts
stripe         @stripe/stripe-js
resend
zod            react-hook-form  @hookform/resolvers
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```
