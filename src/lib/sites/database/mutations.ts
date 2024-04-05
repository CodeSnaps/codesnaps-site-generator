import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/database.types';

type Client = SupabaseClient<Database>;

// SUBTRACT ORGANIZATION TOKENS
export async function subtractOrganizationTokens(
  client: Client,
  organizationId: number,
  tokens: number,
) {
  const { data: remainingTokens, error } = await client.rpc('subtract_tokens', {
    org_id: organizationId,
    tokens,
  });

  if (error) {
    throw new Error(error.message);
  }

  return remainingTokens;
}

// SET ORGANIZATION TOKENS
export async function setOrganizationTokens(
  adminClient: Client,
  organizationId: number,
  tokens: number,
) {
  const { error } = await adminClient
    .from('organization_usage')
    .update({
      tokens_quota: tokens,
    })
    .match({
      organization_id: organizationId,
    });

  if (error) {
    throw new Error(error.message);
  }
}
