import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
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

      <AppContainer>
        <div className={'max-w-4xl my-10 lg:px-10 lg:my-14'}>
          <CreateComponentForm />
        </div>
      </AppContainer>
    </div>
  );
}

export default AdminGuard(CreateComponentPage);
