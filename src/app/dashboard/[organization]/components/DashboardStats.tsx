import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/core/ui/Card';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import {
  getOrganizationByUid,
  getOrganizationUsage,
} from '~/lib/organizations/database/queries';
import { getSitesByOrganizationId } from '~/lib/ai/database/queries';
import { getAllSavedComponentsIds } from '~/lib/components/database/queries';

const DashboardStats = async ({ orgUid }: { orgUid: string }) => {
  const { tokensLeft, sitesGenerated, savedComponents } =
    await fetchDashboardStats(orgUid);

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10 mx-10 mt-8">
      <Card className="rounded">
        <CardHeader>
          <CardTitle>Tokens Usage</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-xl text-neutral-500 dark:text-neutral-400">
            <span className="text-primary-600 font-semibold text-2xl mr-2 dark:text-primary-500">
              {tokensLeft?.toLocaleString()}
            </span>{' '}
            {tokensLeft !== 1 ? 'tokens' : 'token'} left
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="rounded">
        <CardHeader>
          <CardTitle>AI-Generated Sites</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-xl text-neutral-500 dark:text-neutral-400">
            <span className="text-primary-600 font-semibold text-2xl mr-2 dark:text-primary-500">
              {sitesGenerated?.toLocaleString()}
            </span>{' '}
            {sitesGenerated !== 1 ? 'sites' : 'site'} generated
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="rounded">
        <CardHeader>
          <CardTitle>Saved Components</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-xl text-neutral-500 dark:text-neutral-400">
            <span className="text-primary-600 font-semibold text-2xl mr-2 dark:text-primary-500">
              {savedComponents?.toLocaleString()}
            </span>{' '}
            {savedComponents !== 1 ? 'components' : 'component'} saved
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

async function fetchDashboardStats(orgUid: string) {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await getOrganizationByUid(client, orgUid);

  if (!data || error) {
    throw new Error(`Organization not found`);
  }

  const usage = await getOrganizationUsage(client, data.id);
  const sites = await getSitesByOrganizationId(client, data.id);
  const savedComponents = await getAllSavedComponentsIds(client, orgUid);

  return {
    tokensLeft: usage.data?.tokens_quota,
    sitesGenerated: sites.data?.length,
    savedComponents: savedComponents.length,
  };
}

export default DashboardStats;
