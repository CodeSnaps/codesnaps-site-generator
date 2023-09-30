import GlobalLoadingIndicator from '~/components/GlobalLoadingIndicator';
import Trans from '~/core/ui/Trans';

function Loading() {
  return (
    <GlobalLoadingIndicator>
      <Trans i18nKey={'common:loading'} />
    </GlobalLoadingIndicator>
  );
}

export default Loading;
