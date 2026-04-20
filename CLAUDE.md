# PipeFlow CRM — Project Briefing

## What Is This

PipeFlow CRM is a SaaS web platform for sales pipeline management. Target: SMBs, freelancers, and sales teams who need a visual Kanban pipeline, lead management, activity tracking, and multi-workspace collaboration — at a fraction of HubSpot/Pipedrive costs.

Full requirements: [docs/PRD.md](docs/PRD.md)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 — App Router |
| UI | React 18 + Tailwind CSS + shadcn/ui |
| Language | TypeScript 5 (strict mode) |
| Database + Auth | Supabase (PostgreSQL + RLS + Auth) |
| Payments | Stripe (Checkout + Webhooks + Customer Portal) |
| Email | Resend |
| Drag-and-drop | @dnd-kit |
| Charts | Recharts |
| Deploy | Vercel (frontend) + Supabase (backend) |

---

## Folder Structure

```
c:\PiPeFlow\
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login, signup, forgot password
│   ├── (app)/                  # Authenticated app shell
│   │   ├── dashboard/          # Metrics dashboard
│   │   ├── leads/              # Lead list + detail pages
│   │   ├── pipeline/           # Kanban board
│   │   ├── settings/           # Workspace + billing settings
│   │   └── layout.tsx          # App shell with sidebar
│   ├── (marketing)/            # Public landing page
│   └── api/                    # API routes + Stripe webhooks
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── leads/                  # Lead-specific components
│   ├── pipeline/               # Kanban board components
│   └── dashboard/              # Chart and metric card components
├── lib/
│   ├── supabase/               # Supabase client (server + browser)
│   ├── stripe/                 # Stripe client + helpers
│   └── resend/                 # Email templates + sender
├── hooks/                      # Custom React hooks
├── types/                      # Shared TypeScript interfaces
└── docs/
    └── PRD.md                  # Product requirements document
```

---

## Code Conventions

- **Server Components by default** — add `"use client"` only when needed (interactivity, hooks, browser APIs)
- **TypeScript strict** — no `any`, explicit return types on all exported functions
- **Supabase calls in Server Components or Route Handlers** — never expose service role key to client
- **shadcn/ui for all UI primitives** — do not build custom buttons, inputs, dialogs from scratch
- **@dnd-kit for all drag-and-drop** — DndContext + SortableContext pattern
- **Recharts for all charts** — wrap in `"use client"` component
- **Zod for all form + API input validation**

---

## Design System

- **Primary color:** Blue (`#2563EB` — Tailwind `blue-600`)
- **Neutral:** Slate (`slate-50` background, `slate-800` text)
- **Accent / success:** Green (`green-600`) for "Fechado Ganho"
- **Danger:** Red (`red-600`) for "Fechado Perdido"
- **Border radius:** `rounded-lg` (8px) as default
- **Typography:** Inter (via `next/font`)
- **Component style:** Clean, low-density, sidebar navigation — inspired by Pipedrive

### Kanban Stage Colors
| Stage | Color |
|---|---|
| Novo Lead | `slate-400` |
| Contato Realizado | `blue-400` |
| Proposta Enviada | `violet-400` |
| Negociação | `amber-400` |
| Fechado Ganho | `green-500` |
| Fechado Perdido | `red-500` |

---

## Database (Supabase + RLS)

All tables include a `workspace_id` foreign key. Row Level Security policies enforce that users only access rows belonging to workspaces they are members of.

Core tables: `workspaces`, `workspace_members`, `leads`, `deals`, `activities`, `subscriptions`

Role model: `admin` (full access) | `member` (leads + deals only)

---

## Plans & Limits

| Plan | Price | Collaborators | Leads |
|---|---|---|---|
| Free | R$0 | 2 | 50 |
| Pro | R$49/mês | Unlimited | Unlimited |

Stripe webhooks → Supabase Edge Function → update `subscriptions` table → enforce limits via RLS + middleware.

---

## Development Milestones

1. **M1 — Foundation:** Next.js scaffold, Supabase schema + RLS, Auth (login/signup/logout)
2. **M2 — Leads:** Lead CRUD, list with search/filter, detail page with activity timeline
3. **M3 — Pipeline:** Kanban board with drag-and-drop, deal CRUD, stage persistence
4. **M4 — Dashboard:** Metrics cards, funnel chart (Recharts), deals with upcoming deadlines
5. **M5 — Multi-workspace:** Workspace creation, email invites (Resend), role enforcement, workspace switcher
6. **M6 — Monetization:** Stripe Checkout, webhook handler, plan enforcement, Customer Portal
7. **M7 — Landing Page:** Public marketing page with hero, features, pricing, CTA
8. **M8 — Polish:** Onboarding flow, empty states, notifications, mobile responsiveness
