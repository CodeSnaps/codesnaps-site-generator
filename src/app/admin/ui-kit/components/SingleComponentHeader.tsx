import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Button from '~/core/ui/Button';
import { PageHeader } from '~/core/ui/Page';

function SingleComponensHeader({ children }: React.PropsWithChildren) {
  return (
    <PageHeader title={children}>
      <Button variant={'ghost'} href={'/admin/ui-kit'}>
        <span className={'flex space-x-2.5 items-center'}>
          <ArrowLeftIcon className={'w-4 h-4'} />

          <span>Back to Components</span>
        </span>
      </Button>
    </PageHeader>
  );
}

export default SingleComponensHeader;
