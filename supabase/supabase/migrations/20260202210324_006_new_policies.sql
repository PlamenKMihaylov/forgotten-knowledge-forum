create policy "Votes are publicly readable"
on public.votes
for select
using (true);

create policy "Users can vote if not blocked"
on public.votes
for insert
with check (
  auth.uid() = user_id
  and not exists (
    select 1 from public.users
    where id = auth.uid()
    and is_blocked = true
  )
);

create policy "Users can update own votes"
on public.votes
for update
using (auth.uid() = user_id);

create policy "Users can delete own votes"
on public.votes
for delete
using (auth.uid() = user_id);

create policy "Tags are publicaly readable"
on public.tags
for select
using (true);

create policy "Authenticated users can create tags"
on public.tags
for insert
with check (auth.uid() is not null);

create policy "Post tags are publicaly readable"
on public.post_tags
for select
using (true);

create policy "Users can tag own posts or admin"
on public.post_tags
for insert
with check (
    exists (
        select 1 from public.posts p
        where p.id = post_id
        and (
            p.author_id = auth.uid()
            or exists (
                select 1
                from public.users u
                where u.id = auth.uid()
                and
                u.role = 'admin'
            )
        )
    )
);

create policy "Users can untag own posts or admin"
on public.post_tags
for delete
using (
    exists (
        select 1 from public.posts p
        where p.id = post_id
        and (
            p.author_id = auth.uid()
            or exists (
                select 1
                from public.users u
                where u.id = auth.uid()
                and
                u.role = 'admin'
            )
        )
    )
);

create policy "Post media is public"
on public.post_media
for select
using (true);

create policy "User media is public"
on public.user_media
for select
using (true);

create policy "Users can attach media to own posts or admin"
on public.post_media
for insert
with check (
  exists (
    select 1
    from public.posts p
    where p.id = post_id
      and (
        p.author_id = auth.uid()
        or exists (
          select 1 from public.users u
          where u.id = auth.uid() and u.role = 'admin'
        )
      )
  )
);

create policy "Users can upload own profile photo"
on public.user_media
for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can delete own post media or admin"
on public.post_media
for delete
using (
  exists (
    select 1
    from public.posts p
    where p.id = post_id
      and (
        p.author_id = auth.uid()
        or exists (
          select 1 from public.users u
          where u.id = auth.uid() and u.role = 'admin'
        )
      )
  )
);
