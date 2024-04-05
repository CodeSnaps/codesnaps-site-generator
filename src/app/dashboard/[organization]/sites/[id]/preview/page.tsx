import { notFound } from 'next/navigation';
import { fetchDataFromSupabase } from '@makerkit/data-loader-supabase-core';

import { withI18n } from '~/i18n/with-i18n';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import loadAppData from '~/lib/server/loaders/load-app-data';

import PreviewPage from '~/app/dashboard/[organization]/sites/[id]/preview/components/PreviewPage';

export const metadata = {
  title: 'CodeSnaps Studio',
};

interface SitesPageParams {
  params: {
    organization: string;
    id: string;
  };
}

async function SitesPage({ params }: SitesPageParams) {
  const client = getSupabaseServerComponentClient();
  const appData = await loadAppData(params.organization);

  const fetchedSite = await fetchDataFromSupabase({
    client,
    table: 'sites',
    select: ['id', 'color_scheme', 'site_schema', 'project_name'],
    single: true,
    where: {
      id: {
        eq: params.id,
      },
      organization_id: {
        eq: appData.organization?.id,
      },
    },
  });

  if (!fetchedSite) {
    return notFound();
  }

  return (
    <main className="dark:bg-neutral-950">
      <PreviewPage props={params} site={fetchedSite} />
    </main>
  );
}

export default withI18n(SitesPage);
