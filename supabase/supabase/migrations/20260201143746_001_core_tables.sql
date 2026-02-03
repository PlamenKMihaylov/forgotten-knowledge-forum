create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username varchar(32) unique not null,
  first_name varchar(32) not null
    check (char_length(first_name) between 4 and 32),
  last_name varchar(32) not null
    check (char_length(last_name) between 4 and 32),
  email varchar unique not null,
  role varchar(10) not null default 'user'
    check (role in ('user', 'admin')),
  is_blocked boolean not null default false,
  reputation integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.users(id) on delete cascade,
  title varchar(64) not null
    check (char_length(title) between 16 and 64),
  content text not null
    check (char_length(content) between 32 and 8192),
  is_verified boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  content text not null check (char_length(content) >= 16),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_posts_author on public.posts(author_id);
create index idx_posts_created_at on public.posts(created_at desc);

create index idx_comments_post on public.comments(post_id);
create index idx_comments_author on public.comments(author_id);

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;