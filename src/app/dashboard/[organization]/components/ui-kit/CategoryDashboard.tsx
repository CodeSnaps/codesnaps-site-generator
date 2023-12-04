import { use } from 'react';

import ComponentsFilter from '~/app/dashboard/[organization]/components/ui-kit/ComponentsFilter';
import ComponentGrid from '~/app/dashboard/[organization]/components/ui-kit/ComponentGrid';
import {
  getAllComponentsByCategory,
  getAllSavedComponentsIds,
} from '~/lib/components/database/queries';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import getPageFromQueryParams from '~/app/dashboard/[organization]/utils/get-page-from-query-param';

interface DasbboardPageParams {
  searchParams: {
    page?: string;
    free?: string;
    search?: string;
    interactive?: string;
    layout?: string;
    elements?: string;
  };
  organization: string;
  category: string;
}

export default function CategoryDashboard({
  searchParams,
  organization,
  category,
}: DasbboardPageParams) {
  const pageIndex = getPageFromQueryParams(searchParams.page);
  const perPage = 20;
  const client = getSupabaseServerComponentClient();

  const { components, count } = use(
    fetchComponents({
      pageIndex,
      perPage,
      category,
      ...searchParams,
    }),
  );

  const pageCount = count ? Math.ceil(count / perPage) : 0;

  const savedComponentsIds = use(
    getAllSavedComponentsIds(client, organization),
  );

  return (
    <div className={'my-10'}>
      <ComponentsFilter pageIndex={pageIndex} organization={organization} />

      <ComponentGrid
        pageIndex={pageIndex}
        pageCount={pageCount}
        components={components}
        savedComponentsIds={savedComponentsIds}
        organization={organization}
      />
    </div>
  );
}

async function fetchComponents(params: {
  pageIndex: number;
  perPage: number;
  category: string;
  free?: string;
  search?: string;
  interactive?: string;
  layout?: string;
  elements?: string;
}) {
  const {
    pageIndex,
    perPage,
    free,
    search,
    category,
    interactive,
    layout,
    elements,
  } = params;

  const client = getSupabaseServerComponentClient();

  const searchParams = {
    pageIndex,
    perPage,
    free,
    search,
    interactive,
    layout,
    elements,
  };

  const {
    data: components,
    error,
    count,
  } = await getAllComponentsByCategory(client, category, searchParams);

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
