set -e

npm run supabase:start -- -x studio,migra,deno-relay,pgadmin-schema-diff,imgproxy &
npm run dev:test &
npm run stripe:mock-server &
npm run cypress:headless
npm run supabase:stop
exit 0