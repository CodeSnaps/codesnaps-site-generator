import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import Button from '~/core/ui/Button';
import { PageHeader } from '~/core/ui/Page';

function ComponentsHeader({ children }: React.PropsWithChildren) {
  return (
    <PageHeader title={children}>
      <div className={'flex items-center gap-x-5'}>
        <Button href={'/admin/ui-kit/create'}>
          <span className={'flex space-x-2.5 items-center'}>
            <span>Create Component</span>

            <PlusCircleIcon className={'w-4 h-4'} />
          </span>
        </Button>

        <Button variant={'ghost'} href={'/dashboard'}>
          <span className={'flex space-x-2.5 items-center'}>
            <ArrowLeftIcon className={'w-4 h-4'} />

            <span>Back to App</span>
          </span>
        </Button>
      </div>
    </PageHeader>
  );
}

export default ComponentsHeader;
