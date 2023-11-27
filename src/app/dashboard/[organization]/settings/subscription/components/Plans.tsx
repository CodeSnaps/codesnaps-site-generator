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

  if (isLifetime) {
    return (
      <div className="py-10">
        <div className={'flex flex-col space-y-2'}>
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            You&apos;re on a lifetime plan
          </h4>
          <p className="text-neutral-500 dark:text-neutral-400">
            You don&apos;t need to worry about billing. Thank you for your
            support!
          </p>
          <p className="text-neutral-500 dark:text-neutral-400">
            If you have any questions, please contact us at info@codesnaps.io
          </p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <PlanSelectionForm customerId={customerId} organization={organization} />
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <SubscriptionCard subscription={subscription} />

      <IfHasPermissions condition={canChangeBilling}>
        <If condition={customerId}>
          <div className={'flex flex-col space-y-2'}>
            <BillingPortalRedirectButton customerId={customerId as string}>
              <Trans i18nKey={'subscription:manageBilling'} />
            </BillingPortalRedirectButton>

            <span className={'text-xs text-neutral-500 dark:text-neutral-400'}>
              <Trans i18nKey={'subscription:manageBillingDescription'} />
            </span>
          </div>
        </If>
      </IfHasPermissions>
    </div>
  );
};

export default Plans;
