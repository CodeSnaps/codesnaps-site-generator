import '../app/globals.css';

import Head from 'next/head';

import configuration from '~/configuration';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';
import Fonts from '~/components/Fonts';

import SiteHeader from '~/app/(site)/components/SiteHeader';
import ServerI18nProvider from '~/i18n/ServerI18nProvider';

const InternalServerErrorPage = () => {
  return (
    <>
      <Fonts />

      <Head>
        <title key="title">{`An error occurred - ${configuration.site.name}`}</title>
      </Head>

      <SiteHeader />

      <ServerI18nProvider>
        <div
          className={
            'm-auto flex min-h-[50vh] w-full items-center justify-center'
          }
        >
          <div className={'flex flex-col space-y-8'}>
            <div className={'flex space-x-8 divide-x divide-gray-100'}>
              <div>
                <Heading type={1}>
                  <span className={'text-primary-500'}>500</span>
                </Heading>
              </div>

              <div className={'flex flex-col space-y-4 pl-8'}>
                <div className={'flex flex-col space-y-2'}>
                  <div>
                    <Heading type={1}>
                      <Trans i18nKey={'common:genericError'} />
                    </Heading>
                  </div>

                  <p className={'text-gray-500 dark:text-gray-300'}>
                    <Trans i18nKey={'common:genericErrorSubHeading'} />
                  </p>
                </div>

                <div className={'flex space-x-4'}>
                  <Button color={'secondary'} href={'/'}>
                    <Trans i18nKey={'common:contactUs'} />
                  </Button>

                  <Button href={'/'}>
                    <Trans i18nKey={'common:backToHomePage'} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServerI18nProvider>
    </>
  );
};
export default InternalServerErrorPage;
