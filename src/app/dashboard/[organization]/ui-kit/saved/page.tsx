import { use } from 'react';

import { PageHeader, PageBody } from '~/core/ui/Page';
import ComponentGrid from '~/app/dashboard/[organization]/ui-kit/saved/components/ComponentGrid';
import Trans from '~/core/ui/Trans';

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
      <PageHeader
        title={<Trans i18nKey="components:savedComponentsPageTitle" />}
        description={
          <Trans i18nKey="components:savedComponentsPageDescription" />
        }
      />

      <PageBody>
        <ComponentGrid
          pageIndex={pageIndex}
          pageCount={pageCount}
          components={components}
          organization={organization}
        />
      </PageBody>
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
