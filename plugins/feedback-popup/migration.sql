create extension if not exists vector with schema extensions;

create type feedback_type as ENUM ('question', 'bug', 'feedback');

create table feedback_submissions (
    id serial primary key,
    user_id uuid references public.users(id) on delete set null,
    type feedback_type not null,
    attachment_url text,
    text text not null,
    embedding vector (384),
    device_info jsonb,
    metadata jsonb,
    screen_name text,
    email text,
    created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, PUBLIC)
  values ('feedback_submissions_attachments', 'feedback_submissions_attachments', false);

alter table feedback_submissions enable row level security;

create or replace function match_feedback_submissions (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    feedback_submissions.id,
    feedback_submissions.text,
    1 - (feedback_submissions.embedding <=> query_embedding) as similarity
  from feedback_submissions
  where 1 - (feedback_submissions.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
