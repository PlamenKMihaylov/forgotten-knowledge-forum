create table IF NOT EXISTS public.tags(
    id uuid primary key default gen_random_uuid(),
    name varchar(32) not null unique,
        check(name = lower(name)),
    created_at timestamptz not null default now()
);

create table public.post_tags(
    post_id uuid not null references public.posts(id) on delete cascade,
    tag_id uuid not null references public.tags(id) on delete cascade,
    primary key (post_id, tag_id)
);

create index idx_tags_name on public.tags(name);
create index idx_post_tags_post on public.post_tags(post_id);
create index idx_post_tags_tag on public.post_tags(tag_id);

alter table public.tags enable row level security;
alter table public.post_tags enable row level security;

