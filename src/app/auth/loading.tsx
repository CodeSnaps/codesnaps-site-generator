import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Trans from '~/core/ui/Trans';

function Loading() {
  return (
    <div className={'flex h-full items-center py-8'}>
      <PageLoadingIndicator fullPage={false}>
        <Trans i18nKey={'common:loading'} />
      </PageLoadingIndicator>
    </div>
  );
}

export default Loading;
