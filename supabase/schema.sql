-- Lubri Express Auto Center
-- Execute este arquivo uma única vez no SQL Editor do Supabase.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Administrador',
  role text not null check (role in ('owner', 'admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key default 'main',
  trade_name text not null,
  legal_name text,
  cnpj text,
  phone_display text not null,
  phone_href text not null,
  whatsapp_display text not null,
  whatsapp_href text not null,
  email text,
  address text not null,
  city text not null,
  hours_text text not null,
  maps_url text not null,
  instagram text not null,
  facebook text not null,
  maintenance_notice text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;

revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;

revoke insert, update, delete on public.site_settings from anon;
revoke delete on public.site_settings from authenticated;
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "settings_public_read" on public.site_settings;
drop policy if exists "settings_admin_insert" on public.site_settings;
drop policy if exists "settings_admin_update" on public.site_settings;

create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "settings_public_read"
on public.site_settings for select
to anon, authenticated
using (true);

create policy "settings_admin_insert"
on public.site_settings for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('owner', 'admin', 'editor')
  )
);

create policy "settings_admin_update"
on public.site_settings for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('owner', 'admin', 'editor')
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('owner', 'admin', 'editor')
  )
);

insert into public.site_settings (
  id, trade_name, phone_display, phone_href, whatsapp_display, whatsapp_href,
  address, city, hours_text, maps_url, instagram, facebook
) values (
  'main',
  'Lubri Express Auto Center',
  '+55 (15) 99196-4535',
  '5515991964535',
  '+55 (15) 99196-4535',
  '5515991964535',
  'Rua Quintino Bocaiuva, 318 - Centro, Itapetininga - SP',
  'Itapetininga - SP',
  'Seg a Sex: 08:00 às 18:00 | Sábado: 08:00 às 13:00 | Domingo: fechado',
  'https://maps.app.goo.gl/LcuwnvZdwe3rb6ts5',
  'https://www.instagram.com/lubriexpress2/',
  'https://www.facebook.com/LubriExpress2/'
) on conflict (id) do nothing;

-- Depois de criar o usuário em Authentication > Users, vincule-o como proprietário:
-- insert into public.profiles (id, full_name, role)
-- values ('UUID_DO_USUARIO', 'Gean Maikon', 'owner');
