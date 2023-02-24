import { use } from 'react';
import { redirect } from 'next/navigation';

import Logo from '~/core/ui/Logo';
import I18nProvider from '~/i18n/I18nProvider';
import loadAuthPageData from '~/lib/server/loaders/load-auth-page-data';
import useCurrentLanguage from '~/i18n/use-current-language';

function AuthLayout({ children }: React.PropsWithChildren) {
  const data = use(loadAuthPageData());
  const lang = useCurrentLanguage();

  if ('redirect' in data && data.destination) {
    return redirect(data.destination);
  }

  return (
    <I18nProvider lang={lang}>
      <div
        className={
          'flex h-screen flex-col items-center justify-center space-y-4 md:space-y-8 lg:bg-gray-50 dark:lg:bg-black-700'
        }
      >
        <div
          className={`flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl border-transparent bg-white px-2 py-1 dark:bg-black-600 dark:bg-black-400 md:w-8/12 md:border md:px-8 md:py-6 md:shadow-xl dark:md:border-black-400 lg:w-5/12 lg:px-6 xl:w-4/12 2xl:w-3/12`}
        >
          <Logo />

          {children}
        </div>
      </div>
    </I18nProvider>
  );
}

export default AuthLayout;
