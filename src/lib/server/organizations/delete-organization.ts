import { Database } from '~/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

import {
  MEMBERSHIPS_TABLE,
  ORGANIZATIONS_SUBSCRIPTIONS_TABLE,
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

import MembershipRole from '~/lib/organizations/types/membership-role';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import getLogger from '~/core/logger';
import getStripeInstance from '~/core/stripe/get-stripe';

/**
 * Deletes an organization.
 *
 * @param {SupabaseClient<Database>} client - The Supabase client instance.
 * @param {Object} params - The parameters for deleting the organization.
 * @param {number} params.organizationId - The ID of the organization to delete.
 * @param {string} params.userId - The ID of the user performing the deletion.
 *
 * @throws {Error} If there was an error deleting the organization.
 **/
export default async function deleteOrganization(
  client: SupabaseClient<Database>,
  params: {
    organizationId: number;
    userId: string;
  },
) {
  const logger = getLogger();
  const { organizationId, userId } = params;

  logger.info(params, `User deleting organization...`);

  const membershipResponse = await client
    .from(MEMBERSHIPS_TABLE)
    .select('id, role')
    .eq('organization_id', organizationId)
    .eq('user_id', userId)
    .single();

  if (membershipResponse.error) {
    logger.info(
      { ...params, error: membershipResponse.error },
      `Error deleting organization. The user is not a member of the organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  const role = membershipResponse.data.role;
  const isOwner = role === MembershipRole.Owner;

  if (!isOwner) {
    logger.info(
      params,
      `Error deleting organization. The user is not the owner of the organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  const subscriptionResponse = await client
    .from(ORGANIZATIONS_SUBSCRIPTIONS_TABLE)
    .select(
      `
    subscriptionId: subscription_id,
    organizationId: organization_id
  `,
    )
    .eq('organization_id', organizationId)
    .maybeSingle();

  if (subscriptionResponse.data) {
    const id = subscriptionResponse.data.subscriptionId;

    // cancel the Stripe subscription if it exists
    if (id) {
      await cancelStripeSubscription(id);
    }
  }

  const adminClient = getSupabaseServerActionClient({ admin: true });

  const response = await adminClient
    .from(ORGANIZATIONS_TABLE)
    .delete()
    .eq('id', organizationId);

  if (response.error) {
    logger.info(
      { ...params, error: response.error },
      `Error deleting organization`,
    );

    throw new Error(`Error deleting organization`);
  }

  logger.info(params, `User successfully deleted organization`);
}

/**
 * Cancel a Stripe subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription to cancel.
 * @throws {Error} - If there's an error cancelling the subscription.
 */
async function cancelStripeSubscription(subscriptionId: string) {
  const stripe = await getStripeInstance();

  try {
    await stripe.subscriptions.cancel(subscriptionId, {
      invoice_now: true,
    });
  } catch (e) {
    getLogger().error(
      {
        e,
      },
      'Failed to cancel stripe subscription',
    );

    throw e;
  }
}
