'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
import Trans from '~/core/ui/Trans';

import { useNode, useEditor, SerializedNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

import { exportSingleComponent } from '~/app/dashboard/[organization]/sites/[id]/lib/export-components';
import { removeHtmlTags } from '~/app/dashboard/[organization]/sites/[id]/lib/helpers';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/core/ui/Accordion';
import { Button } from '~/core/ui/Button';
import SidebarItem from '~/app/dashboard/[organization]/sites/[id]/components/editor/SidebarItem';
import PaddingMarginWrapper from '~/app/dashboard/[organization]/sites/[id]/components/selectors/PaddingMarginWrapper';
import ToolbarSettingsForm from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSettingsForm';

import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';
import JSZip from 'jszip';

const features = [
  {
    id: 1,
    text: 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    icon: Icon,
  },
  {
    id: 2,
    text: 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    icon: Icon,
  },
  {
    id: 3,
    text: 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    icon: Icon,
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Feature12 = ({
  heading = '',
  description = '',
  features = [],
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  features?: {
    id: number;
    text: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  paddingArray?: string[];
  marginArray?: string[];
  maxWidth?: string;
  color?: string;
  textColor?: string;
  isBeingDragged?: boolean;
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const { query } = useEditor();

  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  return (
    <PaddingMarginWrapper
      ref={(ref) => {
        connect(drag(ref as HTMLElement));
      }}
      classes={clsx(maxWidth)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <ContentEditable
            html={heading}
            onChange={(e) =>
              setProp(
                (props: { heading: string }) =>
                  (props.heading = e.target.value),
              )
            }
            tagName="h2"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-3xl font-bold leading-tight tracking-wide xl:text-4xl',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].heading,
            )}
          />

          <ContentEditable
            html={description}
            onChange={(e) =>
              setProp(
                (props: { description: string }) =>
                  (props.description = e.target.value),
              )
            }
            tagName="p"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-lg',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />

          <ul>
            {features.map((feature) => (
              <li key={feature.id} className="my-4 flex items-center space-x-4">
                <Icon
                  className={clsx('h-6 w-6 flex-none', colors[colorKey].icon)}
                  aria-hidden="true"
                />

                <ContentEditable
                  html={feature.text}
                  onChange={(e) =>
                    setProp(
                      (props: any) =>
                        (props.features[feature.id - 1].name = e.target.value),
                    )
                  }
                  tagName="p"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    'text-lg',
                    'outline-none focus:outline-offset-4 focus:outline-primary',
                    colors[textColorKey].feature,
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="order-last mx-auto max-w-lg">
          <Image
            priority
            src="https://dummyimage.com/1000x1000/d4d4d4/171717"
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/feature_12-1699973327096.webp"
      name="Feature 12"
      Component={Feature12}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    heading,
    description,
    features,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
    description: node.data.props.description,
    features: node.data.props.features,
    color: node.data.props.color,
    textColor: node.data.props.textColor,
    name: node.data.custom.displayName || node.data.displayName,
  }));

  return (
    <ToolbarSettingsForm>
      <AccordionItem value="export">
        <AccordionTrigger>
          <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
            <Trans i18nKey="sites:toolbarExportTitle" />
          </h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex space-x-4 justify-between">
            <Button
              variant="custom"
              className="bg-neutral-950 hover:bg-neutral-800 w-full"
              onClick={() => {
                const content = generateComponentString({
                  isNextjs: true,
                  heading,
                  description,
                  features,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({ name, content, isNextjs: true });
              }}
            >
              <NextJsIcon className="w-6 h-6 fill-white" />
            </Button>

            <Button
              variant="custom"
              className="bg-neutral-950 hover:bg-neutral-800 w-full"
              onClick={() => {
                const content = generateComponentString({
                  isNextjs: false,
                  heading,
                  description,
                  features,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({ name, content, isNextjs: false });
              }}
            >
              <ReactIcon className="w-6 h-6 fill-white" />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </ToolbarSettingsForm>
  );
}

interface ColorObject {
  [key: string]: {
    heading: string;
    description: string;
    icon: string;
    feature: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    icon: 'fill-slate-800 dark:fill-slate-100',
    feature: 'text-slate-700 dark:text-slate-300',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    icon: 'fill-gray-800 dark:fill-gray-100',
    feature: 'text-gray-700 dark:text-gray-300',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    icon: 'fill-zinc-800 dark:fill-zinc-100',
    feature: 'text-zinc-700 dark:text-zinc-300',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    icon: 'fill-neutral-800 dark:fill-neutral-100',
    feature: 'text-neutral-700 dark:text-neutral-300',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    icon: 'fill-stone-800 dark:fill-stone-100',
    feature: 'text-stone-700 dark:text-stone-300',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    icon: 'fill-red-700 dark:fill-red-600',
    feature: 'text-red-900 dark:text-red-100',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    icon: 'fill-orange-700 dark:fill-orange-600',
    feature: 'text-orange-900 dark:text-orange-100',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    icon: 'fill-amber-700 dark:fill-amber-600',
    feature: 'text-amber-900 dark:text-amber-100',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    icon: 'fill-yellow-700 dark:fill-yellow-600',
    feature: 'text-yellow-900 dark:text-yellow-100',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    icon: 'fill-lime-700 dark:fill-lime-600',
    feature: 'text-lime-900 dark:text-lime-100',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    icon: 'fill-green-700 dark:fill-green-600',
    feature: 'text-green-900 dark:text-green-100',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    icon: 'fill-emerald-700 dark:fill-emerald-600',
    feature: 'text-emerald-900 dark:text-emerald-100',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    icon: 'fill-teal-700 dark:fill-teal-600',
    feature: 'text-teal-900 dark:text-teal-100',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    icon: 'fill-cyan-700 dark:fill-cyan-600',
    feature: 'text-cyan-900 dark:text-cyan-100',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    icon: 'fill-sky-700 dark:fill-sky-600',
    feature: 'text-sky-900 dark:text-sky-100',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    icon: 'fill-blue-700 dark:fill-blue-600',
    feature: 'text-blue-900 dark:text-blue-100',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    icon: 'fill-indigo-700 dark:fill-indigo-600',
    feature: 'text-indigo-900 dark:text-indigo-100',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    icon: 'fill-violet-700 dark:fill-violet-600',
    feature: 'text-violet-900 dark:text-violet-100',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    icon: 'fill-purple-700 dark:fill-purple-600',
    feature: 'text-purple-900 dark:text-purple-100',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    icon: 'fill-fuchsia-700 dark:fill-fuchsia-600',
    feature: 'text-fuchsia-900 dark:text-fuchsia-100',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    icon: 'fill-pink-700 dark:fill-pink-600',
    feature: 'text-pink-900 dark:text-pink-100',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    icon: 'fill-rose-700 dark:fill-rose-600',
    feature: 'text-rose-900 dark:text-rose-100',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  features,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  features: {
    id: number;
    text: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  let content: string;

  const mappedFeatures = features.map(
    (feature) => `
    {
        id: ${feature.id},
        text: '${removeHtmlTags(feature.text)}',
        icon: Icon,
    },`,
  );

  const featuresString = `[${mappedFeatures.join(',\n')}]`;

  const nextContent = `/*
You need to configure remotePatterns in next.config.js to use dummyimage.com
  
// next.config.js
const nextConfig = {
// ... other configs
  images: {
    // ... other configs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    // ... other configs
    ],
  },
};
*/

import Image from 'next/image';

const features = ${featuresString};

export default function Feature() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <h2 className="text-3xl font-bold leading-tight tracking-wide xl:text-4xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <ul>
            {features.map((feature) => (
              <li key={feature.id} className="my-4 flex items-center space-x-4">
                <feature.icon
                  className="h-6 w-6 flex-none ${colors[colorKey].icon}"
                  aria-hidden="true"
                />

                <p className="text-lg ${colors[textColorKey].feature}">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-last mx-auto max-w-lg">
          <Image
            priority
            src="https://dummyimage.com/1000x1000/d4d4d4/171717"
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function Icon(props) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

const features = ${featuresString};

export default function Feature() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <h2 className="text-3xl font-bold leading-tight tracking-wide xl:text-4xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <ul>
            {features.map((feature) => (
              <li key={feature.id} className="my-4 flex items-center space-x-4">
                <feature.icon
                  className="h-6 w-6 flex-none ${colors[colorKey].icon}"
                  aria-hidden="true"
                />

                <p className="text-lg ${colors[textColorKey].feature}">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-last mx-auto max-w-lg">
          <img
            src="https://dummyimage.com/1000x1000/d4d4d4/171717"
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function Icon(props) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}`;

  if (!isNextjs) {
    content = reactContent;
  } else {
    content = nextContent;
  }

  return content;
}

function prepForPageExport(
  isNextjs: boolean,
  node: SerializedNodeWithId,
  importStatements: string[],
  componentContent: string[],
  zip: JSZip,
) {
  const {
    heading,
    description,
    features,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    heading,
    description,
    features,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Feature12 from './components/Feature12';`);
  componentContent.push('<Feature12 />');
  return zip.file('components/Feature12.jsx', content);
}

Feature12.craft = {
  props: {
    heading: 'Long length section heading goes here to fill the space',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementue tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    features: features,
    paddingArray: ['px-4', 'sm:px-6', 'lg:px-8'],
    marginArray: ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
    maxWidth: 'max-w-7xl',
    color: 'amber',
    textColor: 'neutral',
  },
  related: {
    sidebar: SidebarDraggableItem,
    toolbar: ToolbarSettings,
  },
  utils: {
    generateString: generateComponentString,
    prepForPageExport: prepForPageExport,
  },
};
