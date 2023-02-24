import AuthPageShell from '~/app/auth/components/AuthPageShell';
import useCurrentLanguage from '~/i18n/use-current-language';
import I18nProvider from '~/i18n/I18nProvider';

function InvitePageLayout({ children }: React.PropsWithChildren) {
  const lang = useCurrentLanguage();

  return (
    <I18nProvider lang={lang}>
      <AuthPageShell>{children}</AuthPageShell>
    </I18nProvider>
  );
}

export default InvitePageLayout;
