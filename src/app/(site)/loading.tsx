import GlobalLoadingIndicator from '~/components/GlobalLoadingIndicator';
import TopLoadingBarIndicator from '~/components/TopLoadingBarIndicator';

function Loading() {
  return (
    <>
      <TopLoadingBarIndicator />
      <GlobalLoadingIndicator fullPage />
    </>
  );
}

export default Loading;
