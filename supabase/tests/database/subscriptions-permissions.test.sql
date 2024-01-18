begin;

create extension "basejump-supabase_test_helpers" version '0.0.6';

select
  no_plan();

select
  tests.create_supabase_user('user');

select
  tests.create_supabase_user('user-2');

grant USAGE on schema tests to service_role;

set local role service_role;

select
  create_new_organization('Organization', tests.get_supabase_uid('user'));

select
  create_new_organization('Organization 2', tests.get_supabase_uid('user-2'));

insert into subscriptions(
  id,
  price_id,
  status,
  cancel_at_period_end,
  currency,
  interval,
  interval_count,
  created_at,
  period_starts_at,
  period_ends_at,
  trial_starts_at,
  trial_ends_at)
values (
  'sub_123',
  'price_123',
  'active',
  false,
  'usd',
  'month',
  1,
  now(),
  now(),
  now() + interval '1 month',
  now(),
  now() + interval '1 month');

insert into organizations_subscriptions(
  organization_id,
  subscription_id,
  customer_id)
values (
  makerkit.get_organization_id(
    'Organization'),
  'sub_123',
  'cus_123');

select
  tests.authenticate_as('user');

select
  isnt_empty($$
    select
      makerkit.get_active_subscription(makerkit.get_organization_id('Organization'));

$$,
'can get active subscription for organization');

select
  isnt_empty($$
    select
      1 from organizations_subscriptions
      where
        subscription_id = 'sub_123';

$$,
'can get active subscription for organization');

select
  tests.authenticate_as('user-2');

select
  is_empty($$
    select
      makerkit.get_active_subscription(makerkit.get_organization_id('Organization'));

$$,
'cannot get subscription for another organization');

select
  is_empty($$
    select
      1 from organizations_subscriptions
      where
        subscription_id = 'sub_123';

$$,
'cannot get subscription for another organization');

select
  tests.authenticate_as('user');

-- Test that a user can only create a subscription for their own organization
select
  throws_ok($$ insert into subscriptions(
      id, price_id, status, cancel_at_period_end, currency, interval,
	interval_count, created_at, period_starts_at, period_ends_at)
    values (
      'sub_123', 'price_123', 'active', false,
	'usd', 'month', 1, now(), now(), now() + interval
	'1 month');

$$,
'new row violates row-level security policy for table "subscriptions"');

select
  throws_ok($$ insert into organizations_subscriptions(
      organization_id, subscription_id, customer_id)
    values (
      makerkit.get_organization_id(
        'Organization 2'), 'sub_123', 'cus_123') $$, 'new row violates row-level security policy for table "organizations_subscriptions"');

set local role postgres;

create table tasks(
  id bigint generated always as identity primary key,
  name text not null,
  organization_id bigint not null references public.organizations,
  created_at timestamptz not null default now()
);

alter table tasks enable row level security;

select
  tests.rls_enabled('tasks');

create policy "Can insert tasks with an active subscription" on tasks
  for insert to authenticated
    with check (
exists (
      select
        1
      from
        makerkit.get_active_subscription(organization_id)));

create policy "Can read tasks if they belong to the organization" on tasks
  for select to authenticated
    using (current_user_is_member_of_organization(organization_id));

select
  tests.authenticate_as('user');

select
  lives_ok($$ insert into tasks(
      name, organization_id)
    values (
      'Task 1', makerkit.get_organization_id(
        'Organization'));

$$,
'can insert tasks with an active subscription');

select
  throws_ok($$ insert into tasks(
      name, organization_id)
    values (
      'Task 2', makerkit.get_organization_id(
        'Organization 2')) $$, 'new row violates row-level security policy for table "tasks"');

select
  tests.authenticate_as('user-2');

select
  throws_ok($$ insert into tasks(
      name, organization_id)
    values (
      'Task 2', makerkit.get_organization_id(
        'Organization 2'));

$$,
'new row violates row-level security policy for table "tasks"');

select
  throws_ok($$ insert into tasks(
      name, organization_id)
    values (
      'Task 2', makerkit.get_organization_id(
        'Organization'));

$$,
'new row violates row-level security policy for table "tasks"');

select
  *
from
  finish();

rollback;
