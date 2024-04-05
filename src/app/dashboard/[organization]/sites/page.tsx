import { Button } from '~/core/ui/Button';
import { PageBody, PageHeader } from '~/core/ui/Page';
import { withI18n } from '~/i18n/with-i18n';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import loadAppData from '~/lib/server/loaders/load-app-data';
import { getAllSites } from '~/lib/sites/database/queries';

import Trans from '~/core/ui/Trans';
import SiteCard from '~/app/dashboard/[organization]/sites/components/SiteCard';
import SitePageHeader from '~/app/dashboard/[organization]/sites/components/SitePageHeader';

export const metadata = {
  title: 'AI Site Generator | CodeSnaps',
};

interface SitesPageParams {
  params: {
    organization: string;
  };
}

async function SitesPage({ params }: SitesPageParams) {
  const appData = await loadAppData(params.organization);

  const { sites, count } = await fetchSites(appData.organization?.id);

  return (
    <>
      <SitePageHeader />

      <PageBody>
        {count > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {sites.map((site) => (
              <SiteCard key={site.id} {...site} />
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}

export default withI18n(SitesPage);

async function fetchSites(orgId: number | undefined) {
  const client = getSupabaseServerComponentClient();

  if (!orgId) {
    return {
      sites: [],
      count: 0,
    };
  }

  const { data: sites, error, count } = await getAllSites(client, orgId);

  if (error) {
    console.error(error);

    return {
      sites: [],
      count: 0,
    };
  }

  return {
    sites,
    count: count ?? 0,
  };
}
