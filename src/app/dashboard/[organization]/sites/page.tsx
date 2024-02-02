import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { Button } from '~/core/ui/Button';
import { PageBody, PageHeader } from '~/core/ui/Page';
import { withI18n } from '~/i18n/with-i18n';

import Trans from '~/core/ui/Trans';

export const metadata = {
  title: 'AI Site Generator | CodeSnaps',
};

interface SitesPageParams {
  params: {
    organization: string;
  };
}

function SitesPage({ params }: SitesPageParams) {
  return (
    <>
      <PageHeader
        title="Site Generator"
        description="Create and generate sites here"
      >
        <Button href={'sites/new'}>
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          <Trans i18nKey="sites:createSiteBtnLabel" />
        </Button>
      </PageHeader>

      <PageBody>
        <p>
          This is the page for the organization <b>{params.organization}</b>.
        </p>
      </PageBody>
    </>
  );
}

export default withI18n(SitesPage);
