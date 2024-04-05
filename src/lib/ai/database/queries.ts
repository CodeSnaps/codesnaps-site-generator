import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { SITES_TABLE } from '~/lib/db-tables';

type Client = SupabaseClient<Database>;

/**
 * @name getSitesByOrganizationId
 * @description Get all the sites for the organization {@link organizationId}
 * @param client
 * @param organizationId
 */
export const getSitesByOrganizationId = async (
  client: Client,
  organizationId: number,
) => {
  return await client
    .from(SITES_TABLE)
    .select('id')
    .eq('organization_id', organizationId);
};
