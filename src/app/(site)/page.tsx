import clsx from 'clsx';
import Image from 'next/image';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';
import PricingTable from '~/components/PricingTable';
import ThumbnailGrid from '~/app/(site)/components/ThumbnailGrid';
import FaqComponent from '~/app/(site)/components/FaqComponent';
import { withI18n } from '~/i18n/with-i18n';

function Home() {
  return (
    <div className="flex flex-col space-y-16">
      <Container>
        <div className="my-12 flex flex-col items-center md:flex-row lg:my-16 mx-auto flex-1 justify-center animate-in fade-in duration-1000 slide-in-from-top-12">
          <div className="flex w-full flex-1 flex-col items-center space-y-8">
            <Pill>
              <span>React and Tailwind CSS UI Library</span>
            </Pill>

            <HeroTitle>
              <span>Build faster, design better </span>
              <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-400 to-primary-700 leading-[1.2]">
                in React and Tailwind CSS
              </span>
            </HeroTitle>

            <SubHeading className="text-center">
              <span>Access React and Tailwind CSS components instantly.</span>
              <span>
                Design better websites in minutes with no package installation
                required.
              </span>
              <span>New: AI site generator for Tailwind CSS and React.</span>
            </SubHeading>

            <div className="flex flex-col items-center space-y-4">
              <MainCallToActionButton />

              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Free plan. No credit card required.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in duration-1000 slide-in-from-top-16 fill-mode-both delay-300">
          <Image
            priority
            className="rounded-2xl animate-in fade-in zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
            width={2688}
            height={1824}
            src="/assets/images/Dashboard.webp"
            alt="App Image"
          />
        </div>
      </Container>

      <Container>
        <div className="mb-10 mt-14 flex flex-col items-center space-y-20 xl:mt-20">
          <div className="flex flex-col items-center space-y-8">
            <Pill>Production-ready components. Simply copy and paste.</Pill>

            <div className="flex flex-col space-y-2.5 text-center justify-center">
              <Heading type={2}>
                Components created with ❤️ by CodeSnaps
              </Heading>

              <SubHeading as={'h3'}>
                <span>Build websites as quickly as with no-code tools.</span>
                <span>Each week, we add several new components.</span>
              </SubHeading>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <ThumbnailGrid />

            <Button round href="/browse-components" className="mx-auto px-4">
              <span className="flex space-x-2 items-center">
                <span>Browse Components</span>
                <ChevronRightIcon className={'h-3'} />
              </span>
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-4">
          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <Image
                className="rounded-2xl dark:border-2 dark:border-neutral-700 my-10 lg:my-0"
                src="/assets/images/SiteGenerator.webp"
                width={626}
                height={683}
                alt="Component Filtering"
              />
            </LeftFeatureContainer>

            <RightFeatureContainer isFirst={false}>
              <div className={'flex flex-col space-y-4'}>
                <Heading
                  type={2}
                  className="text-primary-600 dark:text-primary-500"
                >
                  AI Site Generator
                </Heading>

                <SubHeading as={'h3'}>
                  Create Websites with AI in Tailwind CSS and React
                </SubHeading>

                <div>
                  Provide a site description, choose a primary color, and let
                  our AI generate the site structure. Customize margins,
                  padding, and components before downloading the code in React
                  or Next.js.
                </div>

                <div>
                  <Button round variant="outline" href="/auth/sign-up">
                    <span className={'flex space-x-2 items-center'}>
                      <span>Try AI Site Generator</span>
                      <ChevronRightIcon className={'h-3'} />
                    </span>
                  </Button>
                </div>
              </div>
            </RightFeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <div className="flex flex-col space-y-4">
                <Heading
                  type={2}
                  className="text-primary-600 dark:text-primary-500"
                >
                  Code Snippets
                </Heading>

                <SubHeading as={'h3'}>
                  Detailed React and next.js Code Snippets Ready to Use in Your
                  Projects
                </SubHeading>
              </div>

              <div>
                Our code snippets can be easily copied with a simple click of a
                button. Each component can be saved and previewed.
              </div>

              <div>
                <Button
                  round
                  variant="outline"
                  href="/browse-components"
                  className="mb-14 lg:mb-0"
                >
                  <span className="flex space-x-2 items-center">
                    <span>Browse Components</span>
                    <ChevronRightIcon className="h-3" />
                  </span>
                </Button>
              </div>
            </LeftFeatureContainer>

            <RightFeatureContainer isFirst={true}>
              <Image
                className="rounded-2xl dark:border-2 dark:border-neutral-700 mb-10 lg:mb-0"
                src="/assets/images/CodeSnippet.webp"
                width={626}
                height={683}
                alt="Code Snippet"
              />
            </RightFeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <Image
                className="rounded-2xl dark:border-2 dark:border-neutral-700 my-10 lg:my-0"
                src="/assets/images/ComponentFiltering.webp"
                width={626}
                height={683}
                alt="Component Filtering"
              />
            </LeftFeatureContainer>

            <RightFeatureContainer isFirst={false}>
              <div className={'flex flex-col space-y-4'}>
                <Heading
                  type={2}
                  className="text-primary-600 dark:text-primary-500"
                >
                  Advanced Filtering
                </Heading>

                <SubHeading as={'h3'}>
                  Real-Time and Extensive Filtering to Find the Right Components
                  in Seconds
                </SubHeading>

                <div>
                  Explore filters for search, category, text alignment, layout,
                  columns, and elements. Mix and match these filters to find the
                  perfect components in seconds.
                </div>

                <div>
                  <Button round variant="outline" href="/browse-components">
                    <span className={'flex space-x-2 items-center'}>
                      <span>Browse Components</span>
                      <ChevronRightIcon className={'h-3'} />
                    </span>
                  </Button>
                </div>
              </div>
            </RightFeatureContainer>
          </FeatureShowcaseContainer>
        </div>
      </Container>

      <Container>
        <FaqComponent />
      </Container>

      <Divider />

      <Container>
        <div className="flex flex-col items-center justify-center py-16 space-y-16">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Pill>
              Get started for free. No credit card required. Cancel anytime.
            </Pill>

            <div className={'flex flex-col space-y-2.5'}>
              <Heading type={2}>Start building with CodeSnaps today.</Heading>

              <SubHeading as={'h3'}>
                Get started on our free plan and upgrade when you are ready.
              </SubHeading>
            </div>
          </div>

          <div className={'w-full'}>
            <PricingTable />
          </div>
        </div>
      </Container>

      <Divider />

      <Container>
        <div
          className="mx-auto max-w-xl bg-neutral-200/50 dark:bg-neutral-900 rounded-xl shadow-sm px-10 py-12 mb-10 lg:px-14 lg:py-16"
          id="who-we-are"
        >
          <div className="flex flex-col space-y-4">
            <p className="font-semibold">
              I&apos;ve always been envious of how many no-code tools designers
              have to create beautiful websites quickly.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400">
              But developers don&apos;t have that luxury, and there aren&apos;t
              many great libraries and resources to help us work smarter, not
              harder.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400">
              So most of us end up in one of two boats: either we build things
              from scratch (which can be a real time sink), or we settle for
              no-code tools that have their limitations.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold dark:text-white">
                That&apos;s why I created CodeSnaps{' '}
              </span>
              - to help developers build websites and MVPs faster, using the
              tech stacks they love.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400">
              Every single component in CodeSnaps has a clean and minimalist
              design. Use it to wireframe, design, or build your projects. Give
              it a try!
            </p>
          </div>

          <div className="mt-6 flex items-center max-w-xl">
            <div className="mr-4 flex-shrink-0 self-center">
              <Image
                priority
                src="/assets/images/kaumon.webp"
                alt="Kaumon, Founder of CodeSnaps"
                width={60}
                height={60}
                className="rounded-full shadow-md border"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Kaumon A.
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Creator of CodeSnaps
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default withI18n(Home);

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-neutral-600 dark:text-white md:text-5xl' +
        ' flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-neutral-200 dark:via-neutral-400' +
        ' dark:to-neutral-600 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-neutral-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function FeatureShowcaseContainer(props: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row items-center justify-between gap-10' +
        ' lg:space-x-24'
      }
    >
      {props.children}
    </div>
  );
}

function LeftFeatureContainer(props: React.PropsWithChildren) {
  return (
    <div className={'flex flex-col space-y-8 w-full lg:w-6/12'}>
      {props.children}
    </div>
  );
}

function RightFeatureContainer({
  children,
  isFirst = false,
}: React.PropsWithChildren<{ isFirst: boolean }>) {
  return (
    <div
      className={clsx(
        isFirst ? 'order-first mt-20 lg:mt-0' : 'order-last lg:order-first',
        'flex w-full lg:w-6/12',
      )}
    >
      {children}
    </div>
  );
}

function MainCallToActionButton() {
  return (
    <Button
      className={
        'bg-transparent bg-gradient-to-r shadow-2xl' +
        ' hover:shadow-primary/60 from-primary' +
        ' to-primary-600 hover:to-primary-600 text-white'
      }
      variant={'custom'}
      size={'lg'}
      round
      href={'/browse-components'}
    >
      <span className={'flex items-center space-x-2'}>
        <span>Browse Components</span>
        <ChevronRightIcon
          className={
            'h-4 animate-in fade-in slide-in-from-left-8' +
            ' delay-1000 fill-mode-both duration-1000 zoom-in'
          }
        />
      </span>
    </Button>
  );
}
