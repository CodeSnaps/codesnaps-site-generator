alter table "public"."saved_components" drop constraint "saved_components_name_key";

drop index if exists "public"."saved_components_name_key";

alter table "public"."saved_components" alter column "component_id" set not null;

alter table "public"."saved_components" alter column "organization_id" set not null;

CREATE UNIQUE INDEX saved_components_id_key ON public.saved_components USING btree (id);

alter table "public"."saved_components" add constraint "saved_components_id_key" UNIQUE using index "saved_components_id_key";

insert into storage.buckets (id, name, PUBLIC)
  values ('components', 'components', true);