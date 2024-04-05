import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { SITES_TABLE } from '~/lib/db-tables';
import Site from '~/lib/sites/types/site';

type Client = SupabaseClient<Database>;

// FETCH ALL SITES
export async function getAllSites(client: Client, organizationId: number) {
  return client
    .from(SITES_TABLE)
    .select<string, Site>(
      `
    id,
    organization_id,
    page_description,
    created_at,
    project_name
    `,
      { count: 'exact' },
    )
    .eq('organization_id', organizationId);
}

// GET REMAINING TOKENS FOR ORGANIZATION
export async function getOrganizationRemainingTokens(
  client: Client,
  organizationId: number,
) {
  const { data, error } = await client.rpc('get_remaining_tokens', {
    org_id: organizationId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// ASSERT ORGANIZATION HAS ENOUGH TOKENS
export async function assertUserHasEnoughTokens(
  client: Client,
  organizationId: number,
  amount: number,
) {
  const tokens = await getOrganizationRemainingTokens(client, organizationId);

  if (tokens < amount) {
    throw new Error(`Not enough tokens.`);
  }

  return tokens;
}
