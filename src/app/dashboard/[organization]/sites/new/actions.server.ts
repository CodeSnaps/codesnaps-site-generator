'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { compressToEncodedURIComponent } from 'lz-string';

import { SitesLlmService } from '~/lib/ai/sites-llm.service';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import experimental_getSdk from '~/lib/sdk';
import getLogger from '~/core/logger';

const generateSiteParamsSchema = z.object({
  description: z.string().min(1).max(250),
  color: z.string().min(1),
  structure: z.array(
    z.object({
      component: z.string().min(1),
      content: z.string().min(1).max(250),
    }),
  ),
});

export async function generateSiteSchema(
  body: z.infer<typeof generateSiteParamsSchema>,
) {
  const service = new SitesLlmService();
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
    `Generating site schema...`,
  );

  const { description, color, structure } =
    generateSiteParamsSchema.parse(body);

  const schema = await service.generateSiteSchema({
    description,
    color,
    structure,
  });

  logger.info(
    {
      organization: organization.id,
    },
    `Site successfully generated`,
  );

  const compressedSchema = compressToEncodedURIComponent(schema.siteSchema);

  const insertSiteResponse = await client
    .from('sites')
    .insert({
      page_description: description,
      color_scheme: color,
      structure: structure,
      site_schema: compressedSchema,
      project_name: 'Untitled Site',
      organization_id: organization.id,
    })
    .select('id')
    .single();

  if (insertSiteResponse.error) {
    throw new Error(insertSiteResponse.error.message);
  }

  const id = insertSiteResponse.data.id;
  const urlPath = `/dashboard/${organization.uuid}/sites/${id}`;

  return redirect(urlPath);
}
