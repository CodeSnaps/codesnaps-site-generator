'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { compressToEncodedURIComponent } from 'lz-string';

import { SitesLlmService } from '~/lib/ai/sites-llm.service';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import experimental_getSdk from '~/lib/sdk';
import getLogger from '~/core/logger';

import { TokenUsageTrackerService } from '~/lib/sites/token-usage-tracker.service';

const generateSiteParamsSchema = z.object({
  description: z.string().min(1).max(250),
  color: z.string().min(1),
  structure: z.array(
    z.object({
      component: z.string().min(1),
      content: z.string().min(1).max(250),
    }),
  ),
  activeSubscription: z.boolean(),
});

export async function generateSiteSchema(
  body: z.infer<typeof generateSiteParamsSchema>,
) {
  const service = new SitesLlmService();
  const logger = getLogger();

  const client = getSupabaseServerActionClient();
  const adminClient = getSupabaseServerActionClient({ admin: true });

  logger.info('Generating site schema...');

  const sdk = experimental_getSdk(client);
  const organization = await sdk.organization.getCurrent();

  if (!organization) {
    throw new Error('Organization not found');
  }

  const { description, color, structure } =
    generateSiteParamsSchema.parse(body);

  const tokensTracker = new TokenUsageTrackerService(
    adminClient,
    organization.id,
  );

  // Subtract the estimated tokens usage from the organization's tokens count
  const remainingTokens = await tokensTracker.subtractOrganizationTokens(
    tokensTracker.estimateTokensCountFromData(structure),
  );

  let siteId;

  try {
    // Generate the site schema using the LLM
    const schema = await service.generateSiteSchema({
      description,
      color,
      structure,
      activeSubscription: body.activeSubscription,
    });

    logger.info(
      {
        tokens: schema.tokens,
      },
      `Site successfully generated`,
    );

    console.log(schema.siteSchema);

    // Compress the site schema
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

    // Once the site is generated, we can update the organization's tokens count with the actual tokens usage
    try {
      logger.info(
        {
          organizationId: organization.id,
          tokens: schema.tokens,
        },
        `Updating organization tokens count...`,
      );

      await tokensTracker.updateOrganizationTokens({
        tokensUsed: schema.tokens,
        remainingTokens,
        estimatedTokensUsage:
          tokensTracker.estimateTokensCountFromData(structure),
      });

      logger.info(
        {
          organization: organization.id,
          tokens: schema.tokens,
        },
        `Organization's tokens count successfully updated`,
      );
    } catch (error) {
      logger.error(
        {
          organization: organization.id,
          error: error,
        },
        `Failed to update organization's tokens count`,
      );
    }

    siteId = insertSiteResponse.data.id;
  } catch (error) {
    logger.error(
      { error },
      `Failed to generate site. Reverse the tokens count...`,
    );

    // If the site generation failed, reverse the tokens count by adding the estimated tokens usage back to the organization's tokens count
    await tokensTracker.rollbackTokensCount(
      remainingTokens,
      tokensTracker.estimateTokensCountFromData(structure),
    );

    throw new Error('Failed to generate site');
  }

  const urlPath = `/dashboard/${organization.uuid}/sites/${siteId}`;
  return redirect(urlPath);
}
