create extension if not exists http with schema extensions;
create extension if not exists pg_tle;
select pgtle.uninstall_extension_if_exists('supabase-dbdev');
drop extension if exists "supabase-dbdev";

select
    pgtle.install_extension(
        'supabase-dbdev',
        resp.contents ->> 'version',
        'PostgreSQL package manager',
        resp.contents ->> 'sql'
    )
from http(
    (
        'GET',
        'https://api.database.dev/rest/v1/'
        || 'package_versions?select=sql,version'
        || '&package_name=eq.supabase-dbdev'
        || '&order=version.desc'
        || '&limit=1',
        array[
            ('apiKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s')::http_header
        ],
        null,
        null
    )
) x,
lateral (
    select
        ((row_to_json(x) -> 'content') #>> '{}')::json -> 0
) resp(contents);
create extension "supabase-dbdev";
select dbdev.install('supabase-dbdev');
drop extension if exists "supabase-dbdev";
create extension "supabase-dbdev";

select dbdev.install('basejump-supabase_test_helpers');
create extension "basejump-supabase_test_helpers";

create or replace function tests.create_db_user (user_id uuid)
  returns void
  as $$
begin
  insert into public.users (id, onboarded)
    values (user_id, true);
end;
$$
language PLPGSQL;

create or replace function tests.get_organization_id (org_name text)
  returns bigint
  security definer
  set search_path = PUBLIC
  as $$
declare
  organization_id bigint;
begin
  select
    id into organization_id
  from
    organizations
  where
    name = org_name
  limit 1;
  return organization_id;
end;
$$
language PLPGSQL;

-- we have to run some tests to get this to pass as the first test file.
begin;

select
  no_plan ();

select
  function_returns ('tests', 'get_supabase_uid', array['text'], 'uuid');

select
  *
from
  finish ();

rollback;