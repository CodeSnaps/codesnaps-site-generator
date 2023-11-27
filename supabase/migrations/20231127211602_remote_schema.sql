alter table "public"."lifetime_subscriptions" enable row level security;

create policy "Enable everything to everyone"
on "public"."lifetime_subscriptions"
as permissive
for all
to public
using (true)
with check (true);



