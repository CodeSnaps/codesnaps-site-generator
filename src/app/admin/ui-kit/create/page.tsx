import { PageBody } from '~/core/ui/Page';
import CreateComponentHeader from '~/app/admin/ui-kit/components/CreateComponentHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';

import CreateComponentForm from '~/app/admin/ui-kit/components/CreateComponentForm';

import configuration from '~/configuration';

export const metadata = {
  title: `Components | ${configuration.site.siteName}`,
};

function CreateComponentPage() {
  return (
    <div className={'flex flex-1 flex-col'}>
      <CreateComponentHeader>Create Component</CreateComponentHeader>

      <PageBody>
        <div className={'max-w-4xl my-10 lg:px-10 lg:my-14'}>
          <CreateComponentForm />
        </div>
      </PageBody>
    </div>
  );
}

export default AdminGuard(CreateComponentPage);
