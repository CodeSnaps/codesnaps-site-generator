'use client';

import NewSiteWizard from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';
import useIsSubscriptionActive from '~/lib/organizations/hooks/use-is-subscription-active';

const NewSiteWizardWrapper = () => {
  const subscription = useIsSubscriptionActive();

  return <NewSiteWizard activeSub={subscription} />;
};

export default NewSiteWizardWrapper;
