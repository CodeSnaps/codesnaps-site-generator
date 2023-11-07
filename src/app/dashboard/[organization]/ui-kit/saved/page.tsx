import { use } from 'react';

import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import ComponentGrid from '~/app/dashboard/[organization]/ui-kit/saved/components/ComponentGrid';

import { getSavedComponents } from '~/lib/components/database/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import getPageFromQueryParams from '~/app/dashboard/[organization]/utils/get-page-from-query-param';

interface SavedComponentsPageParams {
  params: {
    page?: string;
    organization: string;
  };
}

function SavedComponentsPage({ params }: SavedComponentsPageParams) {
  const { organization } = params;
  const pageIndex = getPageFromQueryParams(params.page);
  const perPage = 30;

  const { components, count } = use(
    fetchComponents({
      orgId: organization,
      pageIndex,
      perPage,
    }),
  );

  const pageCount = count ? Math.ceil(count / perPage) : 0;

  return (
    <>
      <AppHeader>Saved Components</AppHeader>

      <AppContainer>
        <ComponentGrid
          pageIndex={pageIndex}
          pageCount={pageCount}
          components={components}
          organization={organization}
        />

        {components.length === 0 && (
          <>
            <p>You haven&apos;t saved any components yet.</p>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default SavedComponentsPage;

async function fetchComponents(params: {
  pageIndex: number;
  perPage: number;
  orgId: string;
}) {
  const { pageIndex, perPage, orgId } = params;

  const client = getSupabaseServerComponentClient();

  const {
    data: components,
    error,
    count,
  } = await getSavedComponents(client, orgId, pageIndex, perPage);

  if (error) {
    console.error(error);

    return {
      components: [],
      count: 0,
    };
  }

  return {
    components,
    count: count ?? 0,
  };
}
