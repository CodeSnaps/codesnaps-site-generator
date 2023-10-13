import Trans from '~/core/ui/Trans';
import GlobalLoadingIndicator from '~/components/GlobalLoadingIndicator';

function Loading() {
  return (
    <GlobalLoadingIndicator>
      <Trans i18nKey={'common:loading'} />
    </GlobalLoadingIndicator>
  );
}

export default Loading;
