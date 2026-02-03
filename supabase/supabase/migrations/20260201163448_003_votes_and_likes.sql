create table public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  target_type varchar(10) not null
    check (target_type in ('post', 'comment')),
  target_id uuid not null,
  value smallint not null
    check (value in (1, -1)),
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

create index idx_votes_target
on public.votes (target_type, target_id);

create index idx_votes_user
on public.votes (user_id);

alter table public.votes enable row level security;

