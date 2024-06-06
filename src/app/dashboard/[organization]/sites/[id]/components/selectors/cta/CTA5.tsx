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

export const CTA5 = ({
  heading = '',
  description = '',
  cta = '',
  disclaimer = '',
  termsAndConditions = '',
  paddingArray = [],
  marginArray = ['sm:mt-32', 'mt-24', 'lg:mt-40'],
  maxWidth = '',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  cta?: string;
  disclaimer?: string;
  termsAndConditions?: string;
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
          <div className="flex flex-col items-start justify-between gap-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8 xl:flex-row">
            <div className="flex max-w-2xl flex-col gap-4">
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
                  'text-3xl font-bold leading-tight tracking-wide md:text-4xl',
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
            </div>

            <div className="max-w-md">
              <div className="flex items-start gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={clsx(
                    'min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                    colors[colorKey].input,
                  )}
                  placeholder="Enter your email"
                />

                <ContentEditable
                  html={cta}
                  onChange={(e) =>
                    setProp(
                      (props: { cta: string }) => (props.cta = e.target.value),
                    )
                  }
                  tagName="button"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    'flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    'outline-none focus:outline-primary',
                    colors[colorKey].cta,
                  )}
                />
              </div>

              <p
                className={clsx(
                  'mt-4 text-sm md:mt-3',
                  colors[textColorKey].disclaimer,
                )}
              >
                <ContentEditable
                  html={disclaimer}
                  onChange={(e) =>
                    setProp(
                      (props: { disclaimer: string }) =>
                        (props.disclaimer = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />{' '}
                <ContentEditable
                  html={termsAndConditions}
                  onChange={(e) =>
                    setProp(
                      (props: { termsAndConditions: string }) =>
                        (props.termsAndConditions = e.target.value),
                    )
                  }
                  tagName="a"
                  disabled={query.getOptions().enabled ? false : true}
                  className="underline outline-none focus:outline-offset-4 focus:outline-primary"
                />
              </p>
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/cta_5-1699970736276.webp"
      name="CTA 5"
      Component={CTA5}
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
    cta,
    disclaimer,
    termsAndConditions,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
    description: node.data.props.description,
    cta: node.data.props.cta,
    disclaimer: node.data.props.disclaimer,
    termsAndConditions: node.data.props.termsAndConditions,
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
                  cta,
                  disclaimer,
                  termsAndConditions,
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
                  cta,
                  disclaimer,
                  termsAndConditions,
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
    cta: string;
    input: string;
    disclaimer: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-50',
    description: 'text-slate-400',
    cta: 'bg-slate-50 text-slate-900 hover:bg-slate-300 focus-visible:outline-slate-400',
    input: 'bg-white text-slate-900 ring-slate-200 focus:ring-slate-500',
    disclaimer: 'text-slate-50/40',
  },
  gray: {
    heading: 'text-gray-50',
    description: 'text-gray-400',
    cta: 'bg-gray-50 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-400',
    input: 'bg-white text-gray-900 ring-gray-200 focus:ring-gray-500',
    disclaimer: 'text-gray-50/40',
  },
  zinc: {
    heading: 'text-zinc-50',
    description: 'text-zinc-400',
    cta: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-300 focus-visible:outline-zinc-400',
    input: 'bg-white text-zinc-900 ring-zinc-200 focus:ring-zinc-500',
    disclaimer: 'text-zinc-50/40',
  },
  neutral: {
    heading: 'text-neutral-50',
    description: 'text-neutral-400',
    cta: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-300 focus-visible:outline-neutral-400',
    input: 'bg-white text-neutral-900 ring-neutral-200 focus:ring-neutral-500',
    disclaimer: 'text-neutral-50/40',
  },
  stone: {
    heading: 'text-stone-50',
    description: 'text-stone-400',
    cta: 'bg-stone-50 text-stone-900 hover:bg-stone-300 focus-visible:outline-stone-400',
    input: 'bg-white text-stone-900 ring-stone-200 focus:ring-stone-500',
    disclaimer: 'text-stone-50/40',
  },
  red: {
    heading: 'text-red-50',
    description: 'text-red-50/70',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500',
    input: 'bg-white text-red-900 ring-red-400 focus:ring-red-600',
    disclaimer: 'text-red-50/50',
  },
  orange: {
    heading: 'text-orange-50',
    description: 'text-orange-50/70',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500',
    input: 'bg-white text-orange-900 ring-orange-400 focus:ring-orange-600',
    disclaimer: 'text-orange-50/50',
  },
  amber: {
    heading: 'text-amber-50',
    description: 'text-amber-50/70',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500',
    input: 'bg-white text-amber-900 ring-amber-400 focus:ring-amber-600',
    disclaimer: 'text-amber-50/50',
  },
  yellow: {
    heading: 'text-yellow-50',
    description: 'text-yellow-50/70',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500',
    input: 'bg-white text-yellow-900 ring-yellow-400 focus:ring-yellow-600',
    disclaimer: 'text-yellow-50/50',
  },
  lime: {
    heading: 'text-lime-50',
    description: 'text-lime-50/70',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500',
    input: 'bg-white text-lime-900 ring-lime-400 focus:ring-lime-600',
    disclaimer: 'text-lime-50/50',
  },
  green: {
    heading: 'text-green-50',
    description: 'text-green-50/70',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500',
    input: 'bg-white text-green-900 ring-green-400 focus:ring-green-600',
    disclaimer: 'text-green-50/50',
  },
  emerald: {
    heading: 'text-emerald-50',
    description: 'text-emerald-50/70',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500',
    input: 'bg-white text-emerald-900 ring-emerald-400 focus:ring-emerald-600',
    disclaimer: 'text-emerald-50/50',
  },
  teal: {
    heading: 'text-teal-50',
    description: 'text-teal-50/70',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500',
    input: 'bg-white text-teal-900 ring-teal-400 focus:ring-teal-600',
    disclaimer: 'text-teal-50/50',
  },
  cyan: {
    heading: 'text-cyan-50',
    description: 'text-cyan-50/70',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500',
    input: 'bg-white text-cyan-900 ring-cyan-400 focus:ring-cyan-600',
    disclaimer: 'text-cyan-50/50',
  },
  sky: {
    heading: 'text-sky-50',
    description: 'text-sky-50/70',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500',
    input: 'bg-white text-sky-900 ring-sky-400 focus:ring-sky-600',
    disclaimer: 'text-sky-50/50',
  },
  blue: {
    heading: 'text-blue-50',
    description: 'text-blue-50/70',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500',
    input: 'bg-white text-blue-900 ring-blue-400 focus:ring-blue-600',
    disclaimer: 'text-blue-50/50',
  },
  indigo: {
    heading: 'text-indigo-50',
    description: 'text-indigo-50/70',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500',
    input: 'bg-white text-indigo-900 ring-indigo-400 focus:ring-indigo-600',
    disclaimer: 'text-indigo-50/50',
  },
  violet: {
    heading: 'text-violet-50',
    description: 'text-violet-50/70',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500',
    input: 'bg-white text-violet-900 ring-violet-400 focus:ring-violet-600',
    disclaimer: 'text-violet-50/50',
  },
  purple: {
    heading: 'text-purple-50',
    description: 'text-purple-50/70',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500',
    input: 'bg-white text-purple-900 ring-purple-400 focus:ring-purple-600',
    disclaimer: 'text-purple-50/50',
  },
  fuchsia: {
    heading: 'text-fuchsia-50',
    description: 'text-fuchsia-50/70',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500',
    input: 'bg-white text-fuchsia-900 ring-fuchsia-400 focus:ring-fuchsia-600',
    disclaimer: 'text-fuchsia-50/50',
  },
  pink: {
    heading: 'text-pink-50',
    description: 'text-pink-50/70',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500',
    input: 'bg-white text-pink-900 ring-pink-400 focus:ring-pink-600',
    disclaimer: 'text-pink-50/50',
  },
  rose: {
    heading: 'text-rose-50',
    description: 'text-rose-50/70',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500',
    input: 'bg-white text-rose-900 ring-rose-400 focus:ring-rose-600',
    disclaimer: 'text-rose-50/50',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  cta,
  disclaimer,
  termsAndConditions,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  cta: string;
  disclaimer: string;
  termsAndConditions: string;
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
        <div className="flex flex-col items-start justify-between gap-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8 xl:flex-row">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
             ${removeHtmlTags(heading)}
            </h2>

           <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
           </p>
          </div>

          <div className="max-w-md">
            <div className="flex items-start gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
               id="email-address"
               name="email"
               type="email"
               autoComplete="email"
               required
               className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${colors[colorKey].input}"
               placeholder="Enter your email"
              />

              <button
               type="submit"
               className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
              >
               ${removeHtmlTags(cta)}
              </button>
            </div>

            <p className="mt-4 text-sm md:mt-3 ${colors[textColorKey].disclaimer}">
              ${removeHtmlTags(disclaimer)}{' '}
               <Link href="#" className="underline">
                ${removeHtmlTags(termsAndConditions)}
               </Link>
            </p>
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
        <div className="flex flex-col items-start justify-between gap-7 rounded-xl px-4 py-14 text-left sm:px-6 lg:px-8 xl:flex-row">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
             ${removeHtmlTags(heading)}
            </h2>

           <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
           </p>
          </div>

          <div className="max-w-md">
            <div className="flex items-start gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
               id="email-address"
               name="email"
               type="email"
               autoComplete="email"
               required
               className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${colors[colorKey].input}"
               placeholder="Enter your email"
              />

              <button
               type="submit"
               className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
              >
               ${removeHtmlTags(cta)}
              </button>
            </div>

            <p className="mt-4 text-sm md:mt-3 ${colors[textColorKey].disclaimer}">
              ${removeHtmlTags(disclaimer)}{' '}
               <a href="#" className="underline">
                ${removeHtmlTags(termsAndConditions)}
               </a>
            </p>
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
    cta,
    disclaimer,
    termsAndConditions,
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
    cta,
    disclaimer,
    termsAndConditions,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import CTA5 from './components/CTA5';`);
  componentContent.push('<CTA5 />');
  return zip.file('components/CTA5.jsx', content);
}

CTA5.craft = {
  props: {
    heading: 'Medium length heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    cta: 'Subscribe',
    disclaimer:
      "By clicking Subscribe you're confirming that you agree with our",
    termsAndConditions: 'Terms and Conditions',
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
