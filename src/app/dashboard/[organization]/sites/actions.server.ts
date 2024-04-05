'use server';

import { z } from 'zod';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import experimental_getSdk from '~/lib/sdk';
import getLogger from '~/core/logger';

const saveSiteDetailsParamsSchema = z.object({
  siteName: z.string().min(1).max(100),
  siteDescription: z.string().min(1).max(250),
  siteId: z.string().min(1),
});

// SAVE SITE DETAILS
export async function saveSiteDetails(
  body: z.infer<typeof saveSiteDetailsParamsSchema>,
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
    `Saving site details...`,
  );

  const updateSiteDetailsResponse = await client
    .from('sites')
    .update({
      project_name: body.siteName,
      page_description: body.siteDescription,
    })
    .eq('id', body.siteId);

  if (updateSiteDetailsResponse.error) {
    throw new Error(updateSiteDetailsResponse.error.message);
  }

  logger.info(
    {
      organization: organization.id,
    },
    `Site details successfully saved`,
  );

  return {
    success: true,
  };
}

// DELETE SITE
export async function deleteSite(siteId: string) {
  const logger = getLogger();
  const client = getSupabaseServerActionClient();

  logger.info(
    {
      siteId,
    },
    `Deleting site...`,
  );

  const deleteSiteResponse = await client
    .from('sites')
    .delete()
    .eq('id', siteId);

  if (deleteSiteResponse.error) {
    throw new Error(deleteSiteResponse.error.message);
  }

  logger.info(
    {
      siteId,
    },
    `Site successfully deleted`,
  );

  return {
    success: true,
  };
}
