-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Workspaces
create table public.workspaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  owner_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Workspace Members
create table public.workspace_members (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text check (role in ('admin', 'member')) default 'member' not null,
  created_at timestamptz default now() not null,
  unique(workspace_id, user_id)
);

-- Leads
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  company text,
  status text check (status in ('active', 'inactive', 'converted', 'lost')) default 'active' not null,
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Deals
create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  lead_id uuid references public.leads(id) on delete cascade not null,
  title text not null,
  value numeric(12, 2) default 0 not null,
  stage text check (stage in ('novo_lead','contato_realizado','proposta_enviada','negociacao','fechado_ganho','fechado_perdido')) default 'novo_lead' not null,
  assigned_to uuid references auth.users(id) on delete set null,
  deadline date,
  position integer default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Activities
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  lead_id uuid references public.leads(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text check (type in ('call', 'email', 'meeting', 'note')) not null,
  title text not null,
  description text,
  created_at timestamptz default now() not null
);

-- Subscriptions
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text check (plan in ('free', 'pro')) default 'free' not null,
  status text check (status in ('active', 'canceled', 'past_due', 'trialing')) default 'active' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ========================
-- ROW LEVEL SECURITY
-- ========================

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.activities enable row level security;
alter table public.subscriptions enable row level security;

-- Profiles: users can only read/update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Workspace members helper function
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id and user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_admin(ws_id uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id and user_id = auth.uid() and role = 'admin'
  );
$$;

-- Workspaces RLS
create policy "Members can view their workspaces" on public.workspaces
  for select using (public.is_workspace_member(id));
create policy "Admins can update their workspaces" on public.workspaces
  for update using (public.is_workspace_admin(id));
create policy "Authenticated users can create workspaces" on public.workspaces
  for insert with check (auth.uid() = owner_id);

-- Workspace members RLS
create policy "Members can view workspace members" on public.workspace_members
  for select using (public.is_workspace_member(workspace_id));
create policy "Admins can manage workspace members" on public.workspace_members
  for all using (public.is_workspace_admin(workspace_id));
create policy "Users can insert themselves as member" on public.workspace_members
  for insert with check (auth.uid() = user_id);

-- Leads RLS
create policy "Members can view leads" on public.leads
  for select using (public.is_workspace_member(workspace_id));
create policy "Members can create leads" on public.leads
  for insert with check (public.is_workspace_member(workspace_id));
create policy "Members can update leads" on public.leads
  for update using (public.is_workspace_member(workspace_id));
create policy "Admins can delete leads" on public.leads
  for delete using (public.is_workspace_admin(workspace_id));

-- Deals RLS
create policy "Members can view deals" on public.deals
  for select using (public.is_workspace_member(workspace_id));
create policy "Members can create deals" on public.deals
  for insert with check (public.is_workspace_member(workspace_id));
create policy "Members can update deals" on public.deals
  for update using (public.is_workspace_member(workspace_id));
create policy "Admins can delete deals" on public.deals
  for delete using (public.is_workspace_admin(workspace_id));

-- Activities RLS
create policy "Members can view activities" on public.activities
  for select using (public.is_workspace_member(workspace_id));
create policy "Members can create activities" on public.activities
  for insert with check (public.is_workspace_member(workspace_id));
create policy "Members can delete own activities" on public.activities
  for delete using (auth.uid() = user_id);

-- Subscriptions RLS
create policy "Members can view subscription" on public.subscriptions
  for select using (public.is_workspace_member(workspace_id));
create policy "Admins can manage subscription" on public.subscriptions
  for all using (public.is_workspace_admin(workspace_id));

-- ========================
-- TRIGGERS
-- ========================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-create free subscription when workspace is created
create or replace function public.handle_new_workspace()
returns trigger language plpgsql security definer as $$
begin
  insert into public.subscriptions (workspace_id, plan, status)
  values (new.id, 'free', 'active');
  return new;
end;
$$;

create trigger on_workspace_created
  after insert on public.workspaces
  for each row execute function public.handle_new_workspace();
