function LoadingComponentsGrid() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 px-10 py-6 justify-center mt-40 xl:mt-20">
      {Array.from(Array(12).keys()).map((_, index) => (
        <GridItem key={index} />
      ))}
    </div>
  );
}

export default LoadingComponentsGrid;

function GridItem() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-neutral-900">
      <div className="m-2.5 rounded-2xl bg-neutral-300 dark:bg-neutral-700 lg:mx-3 lg:my-3.5 animate-pulse">
        <div className="flex items-center justify-center px-6">
          <div className="flex w-full justify-center bg-neutral-200 dark:bg-neutral-500 py-10">
            <div className="h-[300px] w-full bg-neutral-400"></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 sm:pb-8 sm:pt-4">
        <div className="mt-10 flex items-center space-x-2 animate-pulse">
          <div className="h-14 w-full bg-neutral-600 rounded-sm"></div>
          <div className="h-14 w-28 bg-neutral-600 rounded-sm"></div>
          <div className="h-14 w-28 bg-neutral-600 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
