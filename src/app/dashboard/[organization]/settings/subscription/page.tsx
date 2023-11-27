import Trans from '~/core/ui/Trans';

import Plans from './components/Plans';
import PlansStatusAlertContainer from './components/PlanStatusAlertContainer';
import { withI18n } from '~/i18n/with-i18n';
import Heading from '~/core/ui/Heading';

import { use } from 'react';
import loadLifetimeSubscription from '~/lib/server/loaders/load-lifetime-data';

interface SubscriptionPageProps {
  params: { uuid: string; organization: string };
}

export const metadata = {
  title: 'Subscription',
};

const SubscriptionSettingsPage = ({ params }: SubscriptionPageProps) => {
  const { organization } = params;
  const isLifetime = use(isOnLifetime(organization));

  return (
    <div className={'flex flex-col space-y-4 w-full'}>
      <div className={'flex flex-col px-2 space-y-1'}>
        <Heading type={4}>
          <Trans i18nKey={'common:subscriptionSettingsTabLabel'} />
        </Heading>

        <span className={'text-neutral-500 dark:text-neutral-400'}>
          <Trans i18nKey={'subscription:subscriptionTabSubheading'} />
        </span>
      </div>

      <PlansStatusAlertContainer />

      <Plans isLifetime={isLifetime} />
    </div>
  );
};

export default withI18n(SubscriptionSettingsPage);

async function isOnLifetime(organizationUid: string) {
  const lifetime = await loadLifetimeSubscription(organizationUid);

  if (lifetime) {
    return true;
  } else {
    return false;
  }
}
