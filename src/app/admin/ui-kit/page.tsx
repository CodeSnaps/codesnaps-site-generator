import { use } from 'react';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import ComponentsHeader from '~/app/admin/ui-kit/components/ComponentsHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import ComponentsTable from '~/app/admin/ui-kit/components/ComponentsTable';
import { getComponents } from '~/app/admin/ui-kit/queries';
import getPageFromQueryParams from '~/app/admin/utils/get-page-from-query-param';

import { TextFieldInput } from '~/core/ui/TextField';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

import configuration from '~/configuration';

interface ComponentsAdminPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
  title: `Components | ${configuration.site.siteName}`,
};

function ComponentsAdminPage({ searchParams }: ComponentsAdminPageProps) {
  const page = getPageFromQueryParams(searchParams.page);
  const client = getSupabaseServerComponentClient({ admin: true });
  const perPage = 10;
  const search = searchParams.search || '';

  const { components, count } = use(
    getComponents(client, search, page, perPage),
  );
  const pageCount = count ? Math.ceil(count / perPage) : 0;

  return (
    <div className={'flex flex-1 flex-col'}>
      <ComponentsHeader>Manage Components</ComponentsHeader>

      <AppContainer>
        <div className={'flex flex-col space-y-4'}>
          <form method={'GET'}>
            <TextFieldInput
              name={'search'}
              defaultValue={search}
              placeholder={'Search Components...'}
            />
          </form>

          <ComponentsTable
            perPage={perPage}
            page={page}
            pageCount={pageCount}
            components={components}
          />
        </div>
      </AppContainer>
    </div>
  );
}

export default AdminGuard(ComponentsAdminPage);
