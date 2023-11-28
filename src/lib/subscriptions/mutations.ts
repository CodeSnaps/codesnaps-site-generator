import type { SupabaseClient } from '@supabase/supabase-js';
import type { Stripe } from 'stripe';

import {
  SUBSCRIPTIONS_TABLE,
  LIFETIME_SUBSCRIPTIONS_TABLE,
} from '~/lib/db-tables';
import type { Database } from '../../database.types';

type Client = SupabaseClient<Database>;

type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];

interface PaymentIntentPayload {
  id: string;
  organizationUid: string;
  amount: number;
  currency: string;
  status: string;
}

export async function addSubscription(
  client: Client,
  subscription: Stripe.Subscription,
) {
  const data = subscriptionMapper(subscription);

  return getSubscriptionsTable(client)
    .insert({
      ...data,
      id: subscription.id,
    })
    .select('id')
    .throwOnError()
    .single();
}

export async function addLifetimeSubscription(
  client: Client,
  payload: PaymentIntentPayload,
) {
  const data = {
    id: payload.id,
    organization_uid: payload.organizationUid,
    amount: payload.amount,
    currency: payload.currency,
    status: payload.status ?? 'incomplete',
  };

  try {
    // Check if the subscription already exists
    const existingSubscription = await getLifetimeSubscriptionsTable(client)
      .select('id')
      .match({ id: payload.id })
      .single();

    if (existingSubscription) {
      return {
        error: "Subscription already exists, can't create a new one",
        data: existingSubscription,
      };
    }

    // Insert the new lifetime subscription
    const insertedSubscription = await getLifetimeSubscriptionsTable(client)
      .insert(data)
      .throwOnError()
      .single();

    return {
      error: null,
      data: insertedSubscription,
    };
  } catch (error) {
    // Handle any database insertion errors
    return {
      error: `Failed to add lifetime subscription to the database: ${error}`,
      data: null,
    };
  }

  //   // Check if the subscription already exists, if so, do nothing
  //   const existingSubscription = await getLifetimeSubscriptionsTable(client)
  //     .select('id')
  //     .match({ id: payload.id })
  //     .single();

  //   if (existingSubscription) {
  //     return {
  //       error: "Subscription already exists, can't create a new one",
  //       data: existingSubscription,
  //     };
  //   }

  //   return getLifetimeSubscriptionsTable(client)
  //     .insert(data)
  //     .select('id')
  //     .throwOnError()
  //     .single();
}

/**
 * @name deleteSubscription
 * @description Removes a subscription from an organization by
 * Stripe subscription ID
 */
export async function deleteSubscription(
  client: Client,
  subscriptionId: string,
) {
  return getSubscriptionsTable(client)
    .delete()
    .match({ id: subscriptionId })
    .throwOnError();
}

/**
 * @name updateSubscriptionById
 * @default Update subscription with ID {@link subscriptionId} with data
 * object {@link subscription}
 */
export async function updateSubscriptionById(
  client: Client,
  subscription: Stripe.Subscription,
) {
  return getSubscriptionsTable(client)
    .update(subscriptionMapper(subscription))
    .match({
      id: subscription.id,
    })
    .throwOnError();
}

function subscriptionMapper(
  subscription: Stripe.Subscription,
): SubscriptionRow {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;
  const priceId = price.id;
  const interval = price?.recurring?.interval ?? null;
  const intervalCount = price?.recurring?.interval_count ?? null;

  const row: Partial<SubscriptionRow> = {
    price_id: priceId,
    currency: subscription.currency,
    status: subscription.status ?? 'incomplete',
    interval,
    interval_count: intervalCount,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    created_at: subscription.created ? toISO(subscription.created) : undefined,
    period_starts_at: subscription.current_period_start
      ? toISO(subscription.current_period_start)
      : undefined,
    period_ends_at: subscription.current_period_end
      ? toISO(subscription.current_period_end)
      : undefined,
  };

  if (subscription.trial_start) {
    row.trial_starts_at = toISO(subscription.trial_start);
  }

  if (subscription.trial_end) {
    row.trial_ends_at = toISO(subscription.trial_end);
  }

  return row as SubscriptionRow;
}

function toISO(timestamp: number) {
  return new Date(timestamp * 1000).toISOString();
}

function getSubscriptionsTable(client: Client) {
  return client.from(SUBSCRIPTIONS_TABLE);
}

function getLifetimeSubscriptionsTable(client: Client) {
  return client.from(LIFETIME_SUBSCRIPTIONS_TABLE);
}
