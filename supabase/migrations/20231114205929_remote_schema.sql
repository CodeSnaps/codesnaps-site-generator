alter table "storage"."buckets" drop constraint "buckets_owner_fkey";

alter table "storage"."buckets" add column "owner_id" text;

alter table "storage"."objects" add column "owner_id" text;


create policy "Give anon users access to images"
on "storage"."objects"
as permissive
for select
to anon
using ((((bucket_id = 'components'::text) AND (storage.extension(name) = 'jpg'::text)) OR (storage.extension(name) = 'png'::text) OR (storage.extension(name) = 'webp'::text) OR ((storage.extension(name) = 'gif'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text))));


create policy "Give auth users access to everything 1rmpq8m_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'components'::text));


create policy "Give auth users access to everything 1rmpq8m_1"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'components'::text));


create policy "Give auth users access to everything 1rmpq8m_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'components'::text));


create policy "Give auth users access to everything 1rmpq8m_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'components'::text));