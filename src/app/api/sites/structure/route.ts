import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { SitesLlmService } from '~/lib/ai/sites-llm.service';
import { TokenUsageTrackerService } from '~/lib/sites/token-usage-tracker.service';
import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';
import experimental_getSdk from '~/lib/sdk';

const schema = z.object({
  description: z.string().min(1).max(250),
});

const ESTIMATED_TOKENS_USAGE = 800;

export async function POST(req: NextRequest) {
  const service = new SitesLlmService();
  const body = schema.parse(await req.json());

  const client = getSupabaseRouteHandlerClient();
  const sdk = experimental_getSdk(client);
  const organization = await sdk.organization.getCurrent();

  if (!organization) {
    throw new Error('Organization not found');
  }

  const tokensTracker = new TokenUsageTrackerService(
    getSupabaseRouteHandlerClient({ admin: true }),
    organization.id,
  );

  const remainingTokens = await tokensTracker.subtractOrganizationTokens(
    ESTIMATED_TOKENS_USAGE,
  );

  try {
    const { structure, tokens } = await service.generateSiteStructure(body);

    await tokensTracker.updateOrganizationTokens({
      tokensUsed: tokens,
      remainingTokens,
      estimatedTokensUsage: ESTIMATED_TOKENS_USAGE,
    });

    return NextResponse.json({ data: structure, tokens });
  } catch (error) {
    await tokensTracker.rollbackTokensCount(
      remainingTokens,
      ESTIMATED_TOKENS_USAGE,
    );

    return NextResponse.error();
  }
}
