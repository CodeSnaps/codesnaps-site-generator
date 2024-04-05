import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/database.types';
import { estimateTokensCount } from '~/lib/sites/utils';

import {
  setOrganizationTokens,
  subtractOrganizationTokens,
} from '~/lib/sites/database/mutations';

import { assertUserHasEnoughTokens } from '~/lib/sites/database/queries';

type Data = Array<{
  component: string;
  content: string;
}>;

export class TokenUsageTrackerService {
  constructor(
    private readonly adminClient: SupabaseClient<Database>,
    private readonly organizationId: number,
  ) {}

  estimateTokensCountFromData(data: Data) {
    return estimateTokensCount(data);
  }

  async subtractOrganizationTokens(estimatedTokensUsage: number) {
    // Assert that the user has enough tokens to generate the site
    await assertUserHasEnoughTokens(
      this.adminClient,
      this.organizationId,
      estimatedTokensUsage,
    );

    // Subtract the estimated tokens usage from the organization's tokens count
    return subtractOrganizationTokens(
      this.adminClient,
      this.organizationId,
      estimatedTokensUsage,
    );
  }

  async updateOrganizationTokens(params: {
    tokensUsed: number;
    remainingTokens: number;
    estimatedTokensUsage: number;
  }) {
    const actualTokensCountDifference =
      params.estimatedTokensUsage - params.tokensUsed;
    const newTokensCount = params.remainingTokens + actualTokensCountDifference;

    return setOrganizationTokens(
      this.adminClient,
      this.organizationId,
      newTokensCount,
    );
  }

  async rollbackTokensCount(
    remainingTokens: number,
    estimatedTokensUsage: number,
  ) {
    const tokens = remainingTokens + estimatedTokensUsage;

    return setOrganizationTokens(this.adminClient, this.organizationId, tokens);
  }
}
