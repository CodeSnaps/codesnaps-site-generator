create table "public"."components" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "description" text,
    "is_published" boolean not null default false,
    "is_free" boolean not null default false,
    "type" text,
    "category" text,
    "preview_url" text,
    "image_src" text,
    "image_alt" text,
    "is_interactive" boolean not null default false,
    "layout_properties" text[],
    "elements" text[],
    "code_tailwindcss_react" text default ''::text,
    "code_tailwindcss_nextjs" text default ''::text,
    "code_animation_react" text default ''::text,
    "code_animation_nextjs" text default ''::text
);


alter table "public"."components" enable row level security;

create table "public"."saved_components" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "type" text,
    "is_free" boolean not null default false,
    "category" text,
    "preview_url" text,
    "image_src" text,
    "image_alt" text,
    "component_id" uuid,
    "organization_id" uuid
);


alter table "public"."saved_components" enable row level security;

CREATE UNIQUE INDEX components_name_key ON public.components USING btree (name);

CREATE UNIQUE INDEX components_pkey ON public.components USING btree (id);

CREATE UNIQUE INDEX saved_components_name_key ON public.saved_components USING btree (name);

CREATE UNIQUE INDEX saved_components_pkey ON public.saved_components USING btree (id);

alter table "public"."components" add constraint "components_pkey" PRIMARY KEY using index "components_pkey";

alter table "public"."saved_components" add constraint "saved_components_pkey" PRIMARY KEY using index "saved_components_pkey";

alter table "public"."components" add constraint "components_name_key" UNIQUE using index "components_name_key";

alter table "public"."saved_components" add constraint "saved_components_component_id_fkey" FOREIGN KEY (component_id) REFERENCES components(id) not valid;

alter table "public"."saved_components" validate constraint "saved_components_component_id_fkey";

alter table "public"."saved_components" add constraint "saved_components_name_key" UNIQUE using index "saved_components_name_key";

alter table "public"."saved_components" add constraint "saved_components_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(uuid) not valid;

alter table "public"."saved_components" validate constraint "saved_components_organization_id_fkey";

create policy "Anon users can select published components"
on "public"."components"
as permissive
for select
to anon
using ((is_published = true));


create policy "Auth users can see all components"
on "public"."components"
as permissive
for select
to authenticated
using (true);


create policy "Enable delete for only authenticated users only"
on "public"."components"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable insert for only authenticated users only"
on "public"."components"
as permissive
for insert
to authenticated
with check (true);


create policy "Auth users can select the components"
on "public"."saved_components"
as permissive
for select
to authenticated
using (true);


create policy "Enable delete for auth users"
on "public"."saved_components"
as permissive
for delete
to authenticated
using (true);


create policy "Enable insert for authenticated users only"
on "public"."saved_components"
as permissive
for insert
to authenticated
with check (true);