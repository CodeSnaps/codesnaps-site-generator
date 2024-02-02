import { withI18n } from '~/i18n/with-i18n';

import PageBuilder from '~/app/dashboard/[organization]/sites/[id]/components/PageBuilder';

export const metadata = {
  title: 'CodeSnaps Studio',
};

interface SitesPageParams {
  params: {
    organization: string;
    id: string;
  };
}

function SitesPage({ params }: SitesPageParams) {
  return (
    <main>
      <PageBuilder props={params} />
    </main>
  );
}

export default withI18n(SitesPage);
