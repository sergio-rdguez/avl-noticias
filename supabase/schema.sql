-- AVL Noticias — esquema Supabase (plan free)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run

-- Artículos
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text not null,
  kicker text not null default '',
  author text not null default 'AVL Noticias',
  author_initials text not null default 'AV',
  published_at timestamptz not null default now(),
  updated_label text not null default '',
  read_minutes int not null default 4 check (read_minutes > 0),
  image_url text,
  image_placeholder text not null default 'FOTO 16:9',
  featured boolean not null default false,
  published boolean not null default true,
  body jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists articles_published_at_idx on public.articles (published_at desc);
create index if not exists articles_featured_idx on public.articles (featured) where featured = true;

-- Tablón del mercado (portada)
create table if not exists public.market_ticker (
  id uuid primary key default gen_random_uuid(),
  tag text not null,
  headline text not null,
  time_label text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists market_ticker_sort_idx on public.market_ticker (sort_order asc);

-- RLS: lectura pública
alter table public.articles enable row level security;
alter table public.market_ticker enable row level security;

drop policy if exists "Lectura pública artículos publicados" on public.articles;
create policy "Lectura pública artículos publicados"
  on public.articles for select
  using (published = true);

drop policy if exists "Lectura pública tablón activo" on public.market_ticker;
create policy "Lectura pública tablón activo"
  on public.market_ticker for select
  using (active = true);

-- Storage (opcional): crear bucket "images" público desde el panel
-- Dashboard → Storage → New bucket → name: images → Public bucket
