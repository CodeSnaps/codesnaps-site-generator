create schema if not exists makerkit;

-- anon, authenticated, and service_role should have access to tests schema
GRANT USAGE ON SCHEMA makerkit TO anon, authenticated, service_role;
-- Don't allow public to execute any functions in the tests schema
ALTER DEFAULT PRIVILEGES IN SCHEMA makerkit REVOKE EXECUTE ON FUNCTIONS FROM public;
-- Grant execute to anon, authenticated, and service_role for testing purposes
ALTER DEFAULT PRIVILEGES IN SCHEMA makerkit GRANT EXECUTE ON FUNCTIONS TO anon, authenticated, service_role;

create or replace function makerkit.create_db_user (user_id uuid)
  returns void
  as $$
begin
  insert into public.users (id, onboarded)
    values (user_id, true);
end;
$$
language PLPGSQL;

create or replace function makerkit.get_organization_id (org_name text)
  returns bigint
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

create or replace function makerkit.get_membership_id (org_id bigint, uid uuid)
  returns bigint
  as $$
declare
  membership_id bigint;
begin
  select
    id into membership_id
  from
    memberships
  where
    user_id = uid and
    organization_id = org_id
  limit 1;
  return membership_id;
end;
$$
language PLPGSQL;

begin;

select no_plan();

select lives_ok ($$
  select
    makerkit.get_organization_id ('Supabase');
$$, 'can get organization id');

select
  *
from
  finish ();

rollback;