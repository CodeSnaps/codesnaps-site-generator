import { withI18n } from '~/i18n/with-i18n';
import { PageBody, PageHeader } from '~/core/ui/Page';

import Trans from '~/core/ui/Trans';
import NewSiteWizard from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';

export const metadata = {
  title: 'AI Site Generator | CodeSnaps',
};

function NewSitePage() {
  return (
    <>
      <PageHeader
        title={<Trans i18nKey="sites:newSiteTabLabel" />}
        description={<Trans i18nKey="sites:newSiteTabDescription" />}
      />

      <PageBody>
        <NewSiteWizard />
      </PageBody>
    </>
  );
}

export default withI18n(NewSitePage);
