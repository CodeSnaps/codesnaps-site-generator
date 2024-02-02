create table sites (
    id uuid primary key default gen_random_uuid(),
    organization_id bigint references public.organizations on delete cascade not null,
    page_description text not null,
    color_scheme text not null,
    structure json not null,
    site_schema text not null,
    project_name text not null,
    created_at timestamptz default now() not null
);

alter table sites enable row level security;

create policy "Can read sites if user is a member of the organization"
   on sites
   for select
   to authenticated
   using (
     current_user_is_member_of_organization(organization_id)
);

create policy "Can write sites if user is a member of the organization"
   on sites
   for insert
   to authenticated
   with check (
     current_user_is_member_of_organization(organization_id)
);

create policy "Can update sites if user is a member of the organization"
   on sites
   for update
   to authenticated
   using (
     current_user_is_member_of_organization(organization_id)
   )
   with check (
      current_user_is_member_of_organization(organization_id)
);

create policy "Can delete sites if user is a member of the organization"
   on sites
   for delete
   to authenticated
   using (
     current_user_is_member_of_organization(organization_id)
);