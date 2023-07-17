import loadAuthPageData from '~/lib/server/loaders/load-auth-page-data';
import AuthPageShell from '~/app/auth/components/AuthPageShell';

export const dynamic = 'force-dynamic';

async function AuthLayout({ children }: React.PropsWithChildren) {
  const data = await loadAuthPageData();

  return <AuthPageShell language={data.language}>{children}</AuthPageShell>;
}

export default AuthLayout;
