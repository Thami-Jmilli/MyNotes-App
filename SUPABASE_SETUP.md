create table notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  content text,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table notes enable row level security;

create policy "Users can view own notes"
on notes for select
using (auth.uid() = user_id);

create policy "Users can insert own notes"
on notes for insert
with check (auth.uid() = user_id);

create policy "Users can delete own notes"
on notes for delete
using (auth.uid() = user_id);
