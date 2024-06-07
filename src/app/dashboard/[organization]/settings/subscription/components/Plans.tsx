'use client';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import SubscriptionCard from './SubscriptionCard';

import { canChangeBilling } from '~/lib/organizations/permissions';
import PlanSelectionForm from '~/app/dashboard/[organization]/settings/subscription/components/PlanSelectionForm';
import IfHasPermissions from '~/components/IfHasPermissions';
import BillingPortalRedirectButton from '~/app/dashboard/[organization]/settings/subscription/components/BillingRedirectButton';

const Plans = ({ isLifetime }: { isLifetime: boolean }) => {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  const customerId = organization.subscription?.customerId;
  const subscription = organization.subscription?.data;

  if (!subscription) {
    return (
      <div>
        {isLifetime && (
          <div className="flex flex-col space-y-2 mb-5 max-w-4xl">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              You&apos;re on a lifetime plan
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400">
              We truly appreciate your support as a lifetime subscriber!
              However, due to the ongoing costs associated with AI, we kindly
              ask that you upgrade your plan to access the AI site generator.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Rest assured, you will still continue to receive all current and
              future components as part of your lifetime plan.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              If you have any questions, please contact us at info@codesnaps.io
            </p>
          </div>
        )}

        <PlanSelectionForm
          customerId={customerId}
          organization={organization}
        />
      </div>
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <div
          className={'border w-full lg:w-9/12 xl:w-6/12 rounded-xl divide-y'}
        >
          <div className={'p-6'}>
            <SubscriptionCard subscription={subscription} />
          </div>

          <IfHasPermissions condition={canChangeBilling}>
            <If condition={customerId}>
              <div className={'flex justify-end p-6'}>
                <div className={'flex flex-col space-y-2 items-end'}>
                  <BillingPortalRedirectButton
                    customerId={customerId as string}
                  >
                    <Trans i18nKey={'subscription:manageBilling'} />
                  </BillingPortalRedirectButton>

                  <span
                    className={'text-xs text-neutral-500 dark:text-neutral-400'}
                  >
                    <Trans i18nKey={'subscription:manageBillingDescription'} />
                  </span>
                </div>
              </div>
            </If>
          </IfHasPermissions>
        </div>
      </div>
    </div>
  );
};

export default Plans;
