import type { Stripe } from 'stripe';
import configuration from '~/configuration';
import getStripeInstance from '~/core/stripe/get-stripe';

interface CreateCheckoutParams {
  returnUrl: string;
  organizationUid: string;
  organizationId: number;
  priceId: string;
  customerId?: string;
  trialPeriodDays?: Maybe<number>;
  customerEmail?: string;
  embedded: boolean;
}

/**
 * @name createStripeCheckout
 * @description Creates a Stripe Checkout session, and returns an Object
 * containing the session, which you can use to redirect the user to the
 * checkout page
 * @param params
 */
export default async function createStripeCheckout(
  params: CreateCheckoutParams,
) {
  // in MakerKit, a subscription belongs to an organization,
  // rather than to a user
  // if you wish to change it, use the current user ID instead
  const clientReferenceId = params.organizationUid;

  // we pass an optional customer ID, so we do not duplicate the Stripe
  // customers if an organization subscribes multiple times
  const customer = params.customerId || undefined;

  // if it's a one-time payment
  // you should change this to "payment"
  // docs: https://stripe.com/docs/billing/subscriptions/build-subscription
  // const mode: Stripe.Checkout.SessionCreateParams.Mode = 'subscription';

  let foundPrice = null;

  for (const product of configuration.stripe.products) {
    const plan = product.plans.find(
      (plan) => plan.stripePriceId === params.priceId,
    );

    if (plan) {
      foundPrice = plan;
      break;
    }
  }

  if (!foundPrice) {
    throw new Error(`Price with ID ${params.priceId} not found in config`);
  }

  console.log('foundPrice', foundPrice);

  const mode: Stripe.Checkout.SessionCreateParams.Mode =
    foundPrice.mode as Stripe.Checkout.SessionCreateParams.Mode;

  console.log('mode', mode);

  // get stripe instance
  const stripe = await getStripeInstance();

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price: params.priceId,
  };

  const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData =
    {
      trial_period_days: params.trialPeriodDays,
      metadata: {
        organizationUid: params.organizationUid,
        organizationId: params.organizationId.toString(),
      },
    };

  const urls = getUrls({
    embedded: params.embedded,
    returnUrl: params.returnUrl,
  });

  const uiMode = params.embedded ? 'embedded' : 'hosted';

  return stripe.checkout.sessions.create({
    mode,
    ui_mode: uiMode,
    customer,
    line_items: [lineItem],
    client_reference_id: clientReferenceId.toString(),
    customer_email: params.customerEmail,
    allow_promotion_codes: true,
    ...(mode === 'subscription' ? { subscription_data: subscriptionData } : {}),
    ...urls,
  });
}

function getUrls(params: { returnUrl: string; embedded?: boolean }) {
  const successUrl = `${params.returnUrl}?success=true`;
  const cancelUrl = `${params.returnUrl}?cancel=true`;
  const returnUrl = `${params.returnUrl}/return?session_id={CHECKOUT_SESSION_ID}`;

  return params.embedded
    ? {
        return_url: returnUrl,
      }
    : {
        success_url: successUrl,
        cancel_url: cancelUrl,
      };
}
