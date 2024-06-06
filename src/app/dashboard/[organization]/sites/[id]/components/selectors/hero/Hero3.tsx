'use client';

import _ from 'lodash';
import clsx from 'clsx';
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

type SerializedNodeWithId = SerializedNode & { id: string };

export const Hero3 = ({
  tagline = '',
  heading = '',
  description = '',
  primaryCta = '',
  paddingArray = [],
  marginArray = [],
  maxWidth = '',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCta?: string;
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
      <div
        style={{
          backgroundImage:
            'url("https://dummyimage.com/1920x1200/353535/171717")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-32 text-center sm:py-48 lg:py-56">
            <ContentEditable
              html={tagline}
              onChange={(e) =>
                setProp(
                  (props: { tagline: string }) =>
                    (props.tagline = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-lg font-medium uppercase tracking-wide',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].tagline,
              )}
            />

            <div className="mt-6 text-center">
              <ContentEditable
                html={heading}
                onChange={(e) =>
                  setProp(
                    (props: { heading: string }) =>
                      (props.heading = e.target.value),
                  )
                }
                tagName="h1"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-5xl font-bold leading-tight tracking-wide xl:text-6xl',
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
                  'mt-6 text-lg',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].description,
                )}
              />

              <div className="mt-10">
                <ContentEditable
                  html={primaryCta}
                  onChange={(e) =>
                    setProp(
                      (props: { primaryCta: string }) =>
                        (props.primaryCta = e.target.value),
                    )
                  }
                  tagName="a"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    'outline-none focus:outline-offset-4',
                    colors[colorKey].primaryCta,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/hero_3-1699474722438.webp"
      name="Hero 3"
      Component={Hero3}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    tagline,
    heading,
    description,
    primaryCta,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    primaryCta: node.data.props.primaryCta,
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
                  tagline,
                  heading,
                  description,
                  primaryCta,
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
                  tagline,
                  description,
                  primaryCta,
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
    tagline: string;
    heading: string;
    description: string;
    primaryCta: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-400',
    heading: 'text-slate-50',
    description: 'text-slate-300',
    primaryCta:
      'bg-slate-950 text-white hover:bg-slate-900 focus-visible:outline-slate-500',
  },
  gray: {
    tagline: 'text-gray-400',
    heading: 'text-gray-50',
    description: 'text-gray-300',
    primaryCta:
      'bg-gray-950 text-white hover:bg-gray-900 focus-visible:outline-gray-500',
  },
  zinc: {
    tagline: 'text-zinc-400',
    heading: 'text-zinc-50',
    description: 'text-zinc-300',
    primaryCta:
      'bg-zinc-950 text-white hover:bg-zinc-900 focus-visible:outline-zinc-500',
  },
  neutral: {
    tagline: 'text-neutral-400',
    heading: 'text-neutral-50',
    description: 'text-neutral-300',
    primaryCta:
      'bg-neutral-950 text-white hover:bg-neutral-900 focus-visible:outline-neutral-500',
  },
  stone: {
    tagline: 'text-stone-400',
    heading: 'text-stone-50',
    description: 'text-stone-300',
    primaryCta:
      'bg-stone-950 text-white hover:bg-stone-900 focus-visible:outline-stone-500',
  },
  red: {
    tagline: 'text-red-400/80',
    heading: 'text-red-50',
    description: 'text-red-50/70',
    primaryCta:
      'bg-red-950 text-white hover:bg-red-900 focus-visible:outline-red-500',
  },
  orange: {
    tagline: 'text-orange-400/80',
    heading: 'text-orange-50',
    description: 'text-orange-50/70',
    primaryCta:
      'bg-orange-950 text-white hover:bg-orange-900 focus-visible:outline-orange-500',
  },
  amber: {
    tagline: 'text-amber-400/80',
    heading: 'text-amber-50',
    description: 'text-amber-50/70',
    primaryCta:
      'bg-amber-950 text-white hover:bg-amber-900 focus-visible:outline-amber-500',
  },
  yellow: {
    tagline: 'text-yellow-400/80',
    heading: 'text-yellow-50',
    description: 'text-yellow-50/70',
    primaryCta:
      'bg-yellow-950 text-white hover:bg-yellow-900 focus-visible:outline-yellow-500',
  },
  lime: {
    tagline: 'text-lime-400/80',
    heading: 'text-lime-50',
    description: 'text-lime-50/70',
    primaryCta:
      'bg-lime-950 text-white hover:bg-lime-900 focus-visible:outline-lime-500',
  },
  green: {
    tagline: 'text-green-400/80',
    heading: 'text-green-50',
    description: 'text-green-50/70',
    primaryCta:
      'bg-green-950 text-white hover:bg-green-900 focus-visible:outline-green-500',
  },
  emerald: {
    tagline: 'text-emerald-400/80',
    heading: 'text-emerald-50',
    description: 'text-emerald-50/70',
    primaryCta:
      'bg-emerald-950 text-white hover:bg-emerald-900 focus-visible:outline-emerald-500',
  },
  teal: {
    tagline: 'text-teal-400/80',
    heading: 'text-teal-50',
    description: 'text-teal-50/70',
    primaryCta:
      'bg-teal-950 text-white hover:bg-teal-900 focus-visible:outline-teal-500',
  },
  cyan: {
    tagline: 'text-cyan-400/80',
    heading: 'text-cyan-50',
    description: 'text-cyan-50/70',
    primaryCta:
      'bg-cyan-950 text-white hover:bg-cyan-900 focus-visible:outline-cyan-500',
  },
  sky: {
    tagline: 'text-sky-400/80',
    heading: 'text-sky-50',
    description: 'text-sky-50/70',
    primaryCta:
      'bg-sky-950 text-white hover:bg-sky-900 focus-visible:outline-sky-500',
  },
  blue: {
    tagline: 'text-blue-400/80',
    heading: 'text-blue-50',
    description: 'text-blue-50/70',
    primaryCta:
      'bg-blue-950 text-white hover:bg-blue-900 focus-visible:outline-blue-500',
  },
  indigo: {
    tagline: 'text-indigo-400/80',
    heading: 'text-indigo-50',
    description: 'text-indigo-50/70',
    primaryCta:
      'bg-indigo-950 text-white hover:bg-indigo-900 focus-visible:outline-indigo-500',
  },
  violet: {
    tagline: 'text-violet-400/80',
    heading: 'text-violet-50',
    description: 'text-violet-50/70',
    primaryCta:
      'bg-violet-950 text-white hover:bg-violet-900 focus-visible:outline-violet-500',
  },
  purple: {
    tagline: 'text-purple-400/80',
    heading: 'text-purple-50',
    description: 'text-purple-50/70',
    primaryCta:
      'bg-purple-950 text-white hover:bg-purple-900 focus-visible:outline-purple-500',
  },
  fuchsia: {
    tagline: 'text-fuchsia-400/80',
    heading: 'text-fuchsia-50',
    description: 'text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-950 text-white hover:bg-fuchsia-900 focus-visible:outline-fuchsia-500',
  },
  pink: {
    tagline: 'text-pink-400/80',
    heading: 'text-pink-50',
    description: 'text-pink-50/70',
    primaryCta:
      'bg-pink-950 text-white hover:bg-pink-900 focus-visible:outline-pink-500',
  },
  rose: {
    tagline: 'text-rose-400/80',
    heading: 'text-rose-50',
    description: 'text-rose-50/70',
    primaryCta:
      'bg-rose-950 text-white hover:bg-rose-900 focus-visible:outline-rose-500',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  primaryCta,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  tagline: string;
  heading: string;
  description: string;
  primaryCta: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  let content: string;

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
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative h-full w-full',
    )}">
      <Image
        priority
        src="https://dummyimage.com/1920x1200/d4d4d4/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full max-h-[90vh] w-full object-cover brightness-[.25]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 text-center sm:py-48 lg:py-56">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <div className="mt-6 text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-wide xl:text-6xl ${colors[textColorKey].heading}">
              ${removeHtmlTags(heading)}
            </h1>

            <p className="mt-6 text-lg ${colors[textColorKey].description}">
              ${removeHtmlTags(description)}
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
              >
                ${removeHtmlTags(primaryCta)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

export default function Hero() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative h-full w-full',
    )}">
      <img
        src="https://dummyimage.com/1920x1200/d4d4d4/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full max-h-[90vh] w-full object-cover brightness-[.25]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 text-center sm:py-48 lg:py-56">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <div className="mt-6 text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-wide xl:text-6xl ${colors[textColorKey].heading}">
              ${removeHtmlTags(heading)}
            </h1>

            <p className="mt-6 text-lg ${colors[textColorKey].description}">
              ${removeHtmlTags(description)}
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
              >
                ${removeHtmlTags(primaryCta)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    tagline,
    heading,
    description,
    primaryCta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    tagline,
    heading,
    description,
    primaryCta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Hero3 from './components/Hero3';`);
  componentContent.push('<Hero3 />');
  return zip.file('components/Hero3.jsx', content);
}

Hero3.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Medium length section heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    primaryCta: 'Get started',
    secondaryCta: 'Learn more',
    paddingArray: [],
    marginArray: [],
    maxWidth: '',
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
