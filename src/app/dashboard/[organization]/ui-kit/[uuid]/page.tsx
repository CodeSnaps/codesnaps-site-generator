import Image from 'next/image';
import Link from 'next/link';

import { use } from 'react';
import {
  getSingleComponent,
  checkIfComponentIsSaved,
} from '~/lib/components/database/queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import loadAppData from '~/lib/server/loaders/load-app-data';
import loadLifetimeSubscription from '~/lib/server/loaders/load-lifetime-data';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';

import ComponentAppHeader from '~/app/dashboard/[organization]/components/ui-kit/ComponentAppHeader';
import CodeTabs from '~/app/dashboard/[organization]/components/ui-kit/CodeTabs';
import SaveComponentButton from '~/app/dashboard/[organization]/components/ui-kit/SaveComponentButton';

import type { Metadata } from 'next';
import configuration from '~/configuration';

interface ComponentDetailPageProps {
  params: { uuid: string; organization: string };
}

export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const uuid = params.uuid;
  const client = getSupabaseServerComponentClient();
  const component = await getSingleComponent(client, uuid);

  return {
    title: `${component.name} | ${configuration.site.siteName}`,
  };
}

function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const { organization } = params;
  const adminOrg = process.env.ADMIN_ORGANIZATION_ID;
  const demoOrg = process.env.DEMO_ORGANIZATION_ID;

  const canAccessPage = use(canUserAccessPage(organization));

  if (!canAccessPage && organization !== adminOrg && organization !== demoOrg) {
    redirect(`/dashboard/${organization}/settings/subscription`);
  }

  const client = getSupabaseServerComponentClient();
  const component = use(getSingleComponent(client, params.uuid));
  const isSaved = use(checkIfComponentIsSaved(client, params.uuid));

  const {
    name,
    description,
    type,
    category,
    is_free,
    is_interactive,
    preview_url,
    image_src,
    image_alt,
    code_tailwindcss_react,
    code_tailwindcss_nextjs,
    code_animation_react,
    code_animation_nextjs,
  } = component;

  return (
    <>
      <ComponentAppHeader
        title={`Component ${name}`}
        description="Code snippets to copy and paste from the component"
      />

      <div className="mx-auto my-14 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-tight tracking-wide text-neutral-900 dark:text-white xl:text-4xl">
            {name}
          </h1>

          <div className="flex items-center space-x-2">
            <div className="group">
              <Link href={preview_url} target="_blank">
                <div className="rounded-md bg-transparent p-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-400 hover:bg-neutral-50 group-hover:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:ring-neutral-100">
                  <PreviewLinkIcon className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
                </div>
              </Link>
            </div>

            <SaveComponentButton
              params={{
                uuid: params.uuid,
                organization: params.organization,
                component: component,
                isSaved: isSaved,
              }}
            />
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-neutral-300 dark:bg-neutral-700">
          <div className="flex items-center justify-center px-10">
            <div
              className={`flex w-full justify-center bg-neutral-200 py-20 dark:bg-neutral-500`}
            >
              <Image
                priority
                src={image_src}
                alt={image_alt}
                width={752}
                height={470}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4">
          <div className="col-span-2 space-y-1 lg:col-span-1">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              Type
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          </div>

          <div className="col-span-2 space-y-1 lg:col-span-1">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              Category
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
          </div>

          <div className="col-span-2 space-y-1 lg:col-span-1">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              Membership
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {is_free ? 'Free' : 'Pro'}
            </p>
          </div>

          <div className="col-span-2 space-y-1 lg:col-span-1">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              Interaction
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {is_interactive ? 'Interactive' : 'Static'}
            </p>
          </div>
        </div>

        {description && (
          <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700">
            <h2 className="mt-6 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Description
            </h2>

            <p className="mt-4 text-base text-neutral-700 dark:text-neutral-300">
              {description}
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700">
          <h2 className="mt-6 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Code Snippets
          </h2>

          <CodeTabs
            code_tailwindcss_react={code_tailwindcss_react}
            code_tailwindcss_nextjs={code_tailwindcss_nextjs}
            code_animation_react={code_animation_react}
            code_animation_nextjs={code_animation_nextjs}
          />
        </div>
      </div>
    </>
  );
}

export default ComponentDetailPage;

async function canUserAccessPage(organizationUid: string) {
  const lifetime = await loadLifetimeSubscription(organizationUid);
  const appData = await loadAppData(organizationUid);
  const subscription = appData.organization?.subscription?.data;

  return (
    (subscription && isSubscriptionActive(subscription.status)) || lifetime
  );
}

function isSubscriptionActive(status: Stripe.Subscription.Status) {
  return ['active', 'trialing'].includes(status);
}

function PreviewLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
