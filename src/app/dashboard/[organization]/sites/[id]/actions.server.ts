'use server';

import { z } from 'zod';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import experimental_getSdk from '~/lib/sdk';
import getLogger from '~/core/logger';

const saveSiteSchemaParamsSchema = z.object({
  siteSchema: z.string().min(1),
  siteId: z.string().min(1),
  siteName: z.string().min(1),
});

export async function saveSite(
  body: z.infer<typeof saveSiteSchemaParamsSchema>,
) {
  const logger = getLogger();
  const client = getSupabaseServerActionClient();

  const sdk = experimental_getSdk(client);
  const organization = await sdk.organization.getCurrent();

  if (!organization) {
    throw new Error('Organization not found');
  }

  logger.info(
    {
      organization: organization.id,
    },
    `Saving site schema...`,
  );

  const updateSiteSchemaResponse = await client
    .from('sites')
    .update({
      site_schema: body.siteSchema,
      project_name: body.siteName,
    })
    .eq('id', body.siteId);

  if (updateSiteSchemaResponse.error) {
    throw new Error(updateSiteSchemaResponse.error.message);
  }

  logger.info(
    {
      organization: organization.id,
    },
    `Site schema successfully saved`,
  );

  return {
    success: true,
  };
}
