import { use } from 'react';

import SingleComponentHeader from '~/app/admin/ui-kit/components/SingleComponentHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import { getComponent } from '~/app/admin/ui-kit/queries';

import UpdateComponentForm from '~/app/admin/ui-kit/components/UpdateComponentForm';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

import type { Metadata } from 'next';
import configuration from '~/configuration';

interface ComponentAdminPageProps {
  params: { uuid: string };
}

export async function generateMetadata({
  params,
}: ComponentAdminPageProps): Promise<Metadata> {
  const uuid = params.uuid;
  const client = getSupabaseServerComponentClient({ admin: true });
  const component = await getComponent(client, uuid);

  return {
    title: `${component.name} | ${configuration.site.siteName}`,
  };
}

function ComponentAdminPage({ params }: ComponentAdminPageProps) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const component = use(getComponent(client, params.uuid));

  return (
    <div className={'flex flex-1 flex-col'}>
      <SingleComponentHeader>{component?.name}</SingleComponentHeader>

      <div className={'max-w-4xl w-full my-10 lg:px-10 lg:my-14 px-4'}>
        <UpdateComponentForm component={component as any} />
      </div>
    </div>
  );
}

export default AdminGuard(ComponentAdminPage);
