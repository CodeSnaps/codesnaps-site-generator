import { notFound } from 'next/navigation';
import { fetchDataFromSupabase } from '@makerkit/data-loader-supabase-core';

import { withI18n } from '~/i18n/with-i18n';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import loadAppData from '~/lib/server/loaders/load-app-data';

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
    <main>
      <div className="absolute z-[10000] block h-screen w-screen bg-black/30 backdrop-blur-sm xl:hidden">
        <div className="flex h-full flex-col items-center justify-center">
          The site generator only supports desktop view.
        </div>
      </div>

      <PageBuilder props={params} site={fetchedSite} />
    </main>
  );
}

export default withI18n(SitesPage);
