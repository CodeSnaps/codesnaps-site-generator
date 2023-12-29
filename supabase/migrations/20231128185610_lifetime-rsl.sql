drop policy "Enable everything to everyone" on "public"."lifetime_subscriptions";

CREATE UNIQUE INDEX lifetime_subscriptions_id_key ON public.lifetime_subscriptions USING btree (id);

CREATE UNIQUE INDEX lifetime_subscriptions_organization_uid_key ON public.lifetime_subscriptions USING btree (organization_uid);

alter table "public"."lifetime_subscriptions" add constraint "lifetime_subscriptions_id_key" UNIQUE using index "lifetime_subscriptions_id_key";

alter table "public"."lifetime_subscriptions" add constraint "lifetime_subscriptions_organization_uid_key" UNIQUE using index "lifetime_subscriptions_organization_uid_key";

create policy "Access to everyone"
on "public"."lifetime_subscriptions"
as permissive
for all
to public
using (true)
with check (true);



