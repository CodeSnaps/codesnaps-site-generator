import LoadingComponentsGrid from '~/components/LoadingComponentsGrid';

function Loading() {
  return (
    <div className="3xl:max-w-[85%] w-full mx-auto">
      <div className="xl:max-w-[calc(100%-18rem)] w-full mt-48">
        <LoadingComponentsGrid />
      </div>
    </div>
  );
}

export default Loading;
