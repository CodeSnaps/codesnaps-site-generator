'use client';

import React from 'react';

import type Organization from '~/lib/organizations/types/organization';
import { canChangeBilling } from '~/lib/organizations/permissions';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import PricingTable from '~/components/PricingTable';
import IfHasPermissions from '~/app/(app)/components/IfHasPermissions';
import CheckoutRedirectButton from '~/app/(app)/settings/subscription/components/CheckoutRedirectButton';
import BillingPortalRedirectButton from '~/app/(app)/settings/subscription/components/BillingRedirectButton';

const PlanSelectionForm: React.FCC<{
  organization: WithId<Organization>;
  customerId: Maybe<string>;
}> = ({ organization, customerId }) => {
  return (
    <div className={'flex flex-col space-y-6'}>
      <IfHasPermissions condition={canChangeBilling}>
        <div className={'flex w-full flex-col space-y-8'}>
          <PricingTable
            CheckoutButton={(props) => {
              return (
                <CheckoutRedirectButton
                  organizationId={organization.id}
                  customerId={customerId}
                  stripePriceId={props.stripePriceId}
                  recommended={props.recommended}
                >
                  <Trans
                    i18nKey={'subscriptions:checkout'}
                    defaults={'Checkout'}
                  />
                </CheckoutRedirectButton>
              );
            }}
          />

          <If condition={customerId}>
            <div className={'flex flex-col space-y-2'}>
              <BillingPortalRedirectButton customerId={customerId as string}>
                <Trans i18nKey={'subscription:manageBilling'} />
              </BillingPortalRedirectButton>

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                <Trans i18nKey={'subscription:manageBillingDescription'} />
              </span>
            </div>
          </If>
        </div>
      </IfHasPermissions>
    </div>
  );
};

export default PlanSelectionForm;
