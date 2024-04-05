'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Trans from '~/core/ui/Trans';

import { useNode, useEditor, SerializedNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

import { exportSingleComponent } from '~/app/dashboard/[organization]/sites/[id]/lib/export-components';

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

export const CTA3 = ({
  heading = '',
  description = '',
  primaryCta = '',
  secondaryCta = '',
  paddingArray = [],
  marginArray = ['sm:mt-32', 'mt-24', 'lg:mt-40'],
  maxWidth = '',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
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
      ref={(ref) => connect(drag(ref as HTMLElement))}
      classes={clsx(maxWidth, 'relative', 'w-full')}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div
        style={{
          backgroundImage:
            'url("https://dummyimage.com/1920x1280/353535/171717")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-start space-y-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8">
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
                'text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl',
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
                'max-w-2xl text-base md:text-lg',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].description,
              )}
            />

            <div className="flex max-w-md flex-row gap-4">
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
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[colorKey].primaryCta,
                )}
              />

              <ContentEditable
                html={secondaryCta}
                onChange={(e) =>
                  setProp(
                    (props: { secondaryCta: string }) =>
                      (props.secondaryCta = e.target.value),
                  )
                }
                tagName="a"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[colorKey].secondaryCta,
                )}
              />
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/cta_3-1699969452897.webp"
      name="CTA 3"
      Component={CTA3}
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
    primaryCta,
    secondaryCta,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
    description: node.data.props.description,
    primaryCta: node.data.props.primaryCta,
    secondaryCta: node.data.props.secondaryCta,
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
                  primaryCta,
                  secondaryCta,
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
                  primaryCta,
                  secondaryCta,
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
    primaryCta: string;
    secondaryCta: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-50',
    description: 'text-slate-400',
    primaryCta:
      'bg-slate-50 text-slate-900 hover:bg-slate-300 focus-visible:outline-slate-400',
    secondaryCta:
      'bg-transparent text-slate-100 ring-slate-600 hover:bg-slate-800 focus-visible:outline-slate-400',
  },
  gray: {
    heading: 'text-gray-50',
    description: 'text-gray-400',
    primaryCta:
      'bg-gray-50 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-400',
    secondaryCta:
      'bg-transparent text-gray-100 ring-gray-600 hover:bg-gray-800 focus-visible:outline-gray-400',
  },
  zinc: {
    heading: 'text-zinc-50',
    description: 'text-zinc-400',
    primaryCta:
      'bg-zinc-50 text-zinc-900 hover:bg-zinc-300 focus-visible:outline-zinc-400',
    secondaryCta:
      'bg-transparent text-zinc-100 ring-zinc-600 hover:bg-zinc-800 focus-visible:outline-zinc-400',
  },
  neutral: {
    heading: 'text-neutral-50',
    description: 'text-neutral-400',
    primaryCta:
      'bg-neutral-50 text-neutral-900 hover:bg-neutral-300 focus-visible:outline-neutral-400',
    secondaryCta:
      'bg-transparent text-neutral-100 ring-neutral-600 hover:bg-neutral-800 focus-visible:outline-neutral-400',
  },
  stone: {
    heading: 'text-stone-50',
    description: 'text-stone-400',
    primaryCta:
      'bg-stone-50 text-stone-900 hover:bg-stone-300 focus-visible:outline-stone-400',
    secondaryCta:
      'bg-transparent text-stone-100 ring-stone-600 hover:bg-stone-800 focus-visible:outline-stone-400',
  },
  red: {
    heading: 'text-red-50',
    description: 'text-red-50/70',
    primaryCta:
      'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500',
    secondaryCta:
      'bg-transparent text-white ring-red-600 hover:bg-red-950/60 focus-visible:outline-red-500',
  },
  orange: {
    heading: 'text-orange-50',
    description: 'text-orange-50/70',
    primaryCta:
      'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500',
    secondaryCta:
      'bg-transparent text-white ring-orange-600 hover:bg-orange-950/60 focus-visible:outline-orange-500',
  },
  amber: {
    heading: 'text-amber-50',
    description: 'text-amber-50/70',
    primaryCta:
      'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500',
    secondaryCta:
      'bg-transparent text-white ring-amber-600 hover:bg-amber-950/60 focus-visible:outline-amber-500',
  },
  yellow: {
    heading: 'text-yellow-50',
    description: 'text-yellow-50/70',
    primaryCta:
      'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500',
    secondaryCta:
      'bg-transparent text-white ring-yellow-600 hover:bg-yellow-950/60 focus-visible:outline-yellow-500',
  },
  lime: {
    heading: 'text-lime-50',
    description: 'text-lime-50/70',
    primaryCta:
      'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500',
    secondaryCta:
      'bg-transparent text-white ring-lime-600 hover:bg-lime-950/60 focus-visible:outline-lime-500',
  },
  green: {
    heading: 'text-green-50',
    description: 'text-green-50/70',
    primaryCta:
      'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500',
    secondaryCta:
      'bg-transparent text-white ring-green-600 hover:bg-green-950/60 focus-visible:outline-green-500',
  },
  emerald: {
    heading: 'text-emerald-50',
    description: 'text-emerald-50/70',
    primaryCta:
      'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500',
    secondaryCta:
      'bg-transparent text-white ring-emerald-600 hover:bg-emerald-950/60 focus-visible:outline-emerald-500',
  },
  teal: {
    heading: 'text-teal-50',
    description: 'text-teal-50/70',
    primaryCta:
      'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500',
    secondaryCta:
      'bg-transparent text-white ring-teal-600 hover:bg-teal-950/60 focus-visible:outline-teal-500',
  },
  cyan: {
    heading: 'text-cyan-50',
    description: 'text-cyan-50/70',
    primaryCta:
      'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500',
    secondaryCta:
      'bg-transparent text-white ring-cyan-600 hover:bg-cyan-950/60 focus-visible:outline-cyan-500',
  },
  sky: {
    heading: 'text-sky-50',
    description: 'text-sky-50/70',
    primaryCta:
      'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500',
    secondaryCta:
      'bg-transparent text-white ring-sky-600 hover:bg-sky-950/60 focus-visible:outline-sky-500',
  },
  blue: {
    heading: 'text-blue-50',
    description: 'text-blue-50/70',
    primaryCta:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500',
    secondaryCta:
      'bg-transparent text-white ring-blue-600 hover:bg-blue-950/60 focus-visible:outline-blue-500',
  },
  indigo: {
    heading: 'text-indigo-50',
    description: 'text-indigo-50/70',
    primaryCta:
      'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500',
    secondaryCta:
      'bg-transparent text-white ring-indigo-600 hover:bg-indigo-950/60 focus-visible:outline-indigo-500',
  },
  violet: {
    heading: 'text-violet-50',
    description: 'text-violet-50/70',
    primaryCta:
      'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500',
    secondaryCta:
      'bg-transparent text-white ring-violet-600 hover:bg-violet-950/60 focus-visible:outline-violet-500',
  },
  purple: {
    heading: 'text-purple-50',
    description: 'text-purple-50/70',
    primaryCta:
      'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500',
    secondaryCta:
      'bg-transparent text-white ring-purple-600 hover:bg-purple-950/60 focus-visible:outline-purple-500',
  },
  fuchsia: {
    heading: 'text-fuchsia-50',
    description: 'text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500',
    secondaryCta:
      'bg-transparent text-white ring-fuchsia-600 hover:bg-fuchsia-950/60 focus-visible:outline-fuchsia-500',
  },
  pink: {
    heading: 'text-pink-50',
    description: 'text-pink-50/70',
    primaryCta:
      'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500',
    secondaryCta:
      'bg-transparent text-white ring-pink-600 hover:bg-pink-950/60 focus-visible:outline-pink-500',
  },
  rose: {
    heading: 'text-rose-50',
    description: 'text-rose-50/70',
    primaryCta:
      'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500',
    secondaryCta:
      'bg-transparent text-white ring-rose-600 hover:bg-rose-950/60 focus-visible:outline-rose-500',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  primaryCta,
  secondaryCta,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
  }

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
  
import Link from 'next/link';
import Image from 'next/image';

export default function CTA() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative w-full',
    )}">
      <Image
        priority
        src="https://dummyimage.com/1920x1280/d4d4d4/171717"
        alt="cta"
        width={1920}
        height={1280}
        className="absolute -z-50 h-full w-full object-cover brightness-[0.25]"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
       <div className="flex flex-col justify-start space-y-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

           <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex max-w-md flex-row gap-4">
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
             ${removeHtmlTags(primaryCta)}
           </Link>

            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
            >
             ${removeHtmlTags(secondaryCta)}
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

export default function CTA() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative w-full',
    )}">
      <img
        src="https://dummyimage.com/1920x1280/d4d4d4/171717"
        alt="cta"
        width={1920}
        height={1280}
        className="absolute -z-50 h-full w-full object-cover brightness-[0.25]"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
       <div className="flex flex-col justify-start space-y-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

           <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex max-w-md flex-row gap-4">
            <a
             href="#"
             className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
             ${removeHtmlTags(primaryCta)}
            </a>

            <a
             href="#"
             className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
            >
             ${removeHtmlTags(secondaryCta)}
            </a>
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
    heading,
    description,
    primaryCta,
    secondaryCta,
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
    primaryCta,
    secondaryCta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import CTA3 from './components/CTA3';`);
  componentContent.push('<CTA3 />');
  return zip.file('components/CTA3.jsx', content);
}

CTA3.craft = {
  props: {
    heading: 'Medium length heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    primaryCta: 'Get started',
    secondaryCta: 'Learn more',
    paddingArray: [],
    marginArray: ['sm:mt-32', 'mt-24', 'lg:mt-40'],
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
