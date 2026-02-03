create table public.post_media(
    id uuid primary key default gen_random_uuid(),
    post_id uuid not null references public.posts(id) on delete cascade,

    storage_provider text not null default 's3',
    bucket text not null,
    object_key text not null,
    public_url text not null,

    mime_type text not null,
    size_bytes bigint not null,
    position integer not null default 0,
    created_at timestamptz not null default 0 check (position >= 0)
);

create index idx_post_media_post on public.post_media(post_id);
create unique index idx_post_media_unique_object
on public.post_media(object_key);


create table public.user_media (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,

  storage_provider text not null default 's3',
  bucket text not null,
  object_key text not null,
  public_url text not null,

  mime_type text not null,
  size_bytes bigint not null,

  created_at timestamptz not null default now(),

  unique (user_id)
);

alter table public.post_media enable row level security;
alter table public.user_media enable row level security;
