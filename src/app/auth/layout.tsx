import { use } from 'react';

import loadAuthPageData from '~/lib/server/loaders/load-auth-page-data';
import AuthPageShell from '~/app/auth/components/AuthPageShell';

export const dynamic = 'force-dynamic';

function AuthLayout({ children }: React.PropsWithChildren) {
  const data = use(loadAuthPageData());

  return <AuthPageShell language={data.language}>{children}</AuthPageShell>;
}

export default AuthLayout;
