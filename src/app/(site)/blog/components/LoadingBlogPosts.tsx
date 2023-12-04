import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';

function LoadingBlogPosts() {
  return (
    <Container>
      <div className={'flex flex-col space-y-16 my-8'}>
        <div className={'flex flex-col items-center space-y-4'}>
          <Heading type={1}>Blog</Heading>

          <SubHeading>Tutorials, Guides and Updates from our team</SubHeading>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 px-10 py-6 justify-center mt-18 lg:mt-24">
        {Array.from(Array(6).keys()).map((_, index) => (
          <GridItem key={index} />
        ))}
      </div>
    </Container>
  );
}

export default LoadingBlogPosts;

function GridItem() {
  return (
    <div className="rounded-xl transition-shadow duration-500 dark:text-neutral-800">
      <div className="relative mb-2 w-full">
        <div className="h-[300px] w-full bg-neutral-400 animate-pulse"></div>

        <div className="py-6 sm:pb-8 sm:pt-4 animate-pulse flex flex-col gap-4">
          <div className="h-10 w-full bg-neutral-600 rounded-sm"></div>
          <div className="h-10 w-44 bg-neutral-600 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
