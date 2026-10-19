-- Migration: 0001_init.sql
-- Studio: Kala Atelier
-- Schema: Architectural Portfolio, Lead Enquiries, and Studio CMS

-- 1. ENUM TYPES
create type project_type   as enum ('rumah', 'renovasi', 'komersial', 'interior');
create type project_status as enum ('selesai', 'dibangun', 'rancangan');
create type enquiry_status as enum ('baru', 'dihubungi', 'cocok', 'tidak_cocok', 'arsip');

-- 2. ADMIN ALLOWLIST
create table admins (
  email text primary key
);

-- 3. PROYEK ARSITEKTUR
create table projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  year             int  not null,
  city             text not null,
  type             project_type   not null,
  status           project_status not null default 'selesai',
  summary_id       text not null,
  summary_en       text,
  body_id          text,
  body_en          text,
  land_area_m2     numeric,
  floor_area_m2    numeric,
  main_materials   text[] default '{}',
  climate_notes_id text,
  climate_notes_en text,
  credits          jsonb default '{}',
  is_featured      boolean not null default false,
  is_published     boolean not null default false,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_projects_published_sort on projects (is_published, sort_order, year desc);

-- 4. DOKUMENTASI GAMBAR PROYEK
create table project_images (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references projects(id) on delete cascade,
  path        text not null,
  alt_id      text not null,
  alt_en      text,
  width       int  not null,
  height      int  not null,
  blur_data   text,
  dominant    text,
  is_cover    boolean not null default false,
  sort_order  int not null default 0
);

create index idx_project_images_project_order on project_images (project_id, sort_order);
create unique index one_cover_per_project on project_images (project_id) where is_cover;

-- 5. TAHAP PEMBANGUNAN KONSTRUKSI
create table project_stages (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references projects(id) on delete cascade,
  label_id    text not null,
  label_en    text,
  progress    int  not null check (progress between 0 and 100),
  image_id    uuid references project_images(id) on delete set null,
  stage_date  date,
  sort_order  int not null default 0
);

create index idx_project_stages_order on project_stages (project_id, sort_order);

-- 6. KUTIPAN & TESTIMONI KLIEN
create table testimonials (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid references projects(id) on delete set null,
  quote_id     text not null,
  quote_en     text,
  author       text not null,
  author_note  text,
  is_published boolean not null default true,
  sort_order   int not null default 0
);

-- 7. TIM & ARSITEK STUDIO
create table team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role_id    text not null,
  role_en    text,
  photo_path text,
  bio_id     text,
  bio_en     text,
  sort_order int not null default 0
);

-- 8. KONSULTASI & LEAD ENQUIRIES
create table enquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  project_types text[] not null,
  location      text not null,
  timeline      text,
  budget        text,
  has_builder   text,
  builder_note  text,
  brief         text,
  source        text,
  ref_project   text,
  status        enquiry_status not null default 'baru',
  ip_hash       text,
  created_at    timestamptz not null default now()
);

-- 9. PENGATURAN SITUS STUDIO (Single row)
create table site_settings (
  id              int primary key default 1 check (id = 1),
  email           text,
  phone           text,
  whatsapp        text,
  address         text,
  opening_hours   jsonb,
  enquiry_note_id text,
  enquiry_note_en text,
  instagram       text
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
alter table projects        enable row level security;
alter table project_images  enable row level security;
alter table project_stages  enable row level security;
alter table testimonials    enable row level security;
alter table team_members    enable row level security;
alter table site_settings   enable row level security;
alter table enquiries       enable row level security;
alter table admins          enable row level security;

-- Public read policies (Hanya membaca data terbitan publik)
create policy "public read projects" on projects
  for select using (is_published);

create policy "public read images" on project_images
  for select using (exists (select 1 from projects p where p.id = project_id and p.is_published));

create policy "public read stages" on project_stages
  for select using (exists (select 1 from projects p where p.id = project_id and p.is_published));

create policy "public read testimonials" on testimonials
  for select using (is_published);

create policy "public read team" on team_members
  for select using (true);

create policy "public read settings" on site_settings
  for select using (true);

-- Admin authorization function
create or replace function is_admin() returns boolean language sql stable security definer as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;

-- Admin access policies
create policy "admin all projects"     on projects       for all using (is_admin()) with check (is_admin());
create policy "admin all images"       on project_images for all using (is_admin()) with check (is_admin());
create policy "admin all stages"       on project_stages for all using (is_admin()) with check (is_admin());
create policy "admin all testimonials" on testimonials   for all using (is_admin()) with check (is_admin());
create policy "admin all team"         on team_members   for all using (is_admin()) with check (is_admin());
create policy "admin all settings"     on site_settings  for all using (is_admin()) with check (is_admin());
create policy "admin all enquiries"    on enquiries      for all using (is_admin()) with check (is_admin());
create policy "admin read admins"      on admins         for select using (is_admin());

