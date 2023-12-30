import Container from '~/core/ui/Container';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import GlobalLoadingIndicator from '~/components/GlobalLoadingIndicator';

function Loading() {
  return (
    <Container>
      <div className="3xl:max-w-none w-full xl:max-w-[calc(100%-18rem)]">
        <div className="mx-auto mb-10 mt-14 flex flex-col items-center space-y-3 text-center xl:mt-20">
          <Heading type={1} className="max-w-sm md:max-w-none">
            Components created with ❤️ by CodeSnaps
          </Heading>

          <SubHeading className="max-w-xl">
            <span>Browse our collection of components.</span>
            <span>We add several new components every week.</span>
          </SubHeading>
        </div>

        <GlobalLoadingIndicator />
      </div>
    </Container>
  );
}

export default Loading;
