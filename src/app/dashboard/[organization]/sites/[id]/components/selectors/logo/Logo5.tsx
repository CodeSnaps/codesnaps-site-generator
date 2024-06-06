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

const logos = [
  {
    id: 1,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/221.svg',
  },
  {
    id: 2,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/220.svg',
  },
  {
    id: 3,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/219.svg',
  },
  {
    id: 4,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/218.svg',
  },
  {
    id: 5,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/217.svg',
  },
  {
    id: 6,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/216.svg',
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Logo5 = ({
  heading = '',
  description = '',
  primaryCta = '',
  secondaryCta = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-36'],
  maxWidth = 'max-w-7xl',
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
              'text-4xl font-bold leading-tight tracking-wide xl:text-5xl',
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
            tagName="h2"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-lg',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />

          <div className="flex space-x-8">
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

            <div className="flex items-center">
              <a
                className={clsx(
                  'flex items-center gap-x-2 text-base',
                  colors[colorKey].secondaryCta,
                )}
              >
                <ContentEditable
                  html={secondaryCta}
                  onChange={(e) =>
                    setProp(
                      (props: { secondaryCta: string }) =>
                        (props.secondaryCta = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />
                <ChevronIcon aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="order-last">
          <div className="grid grid-cols-2 gap-8">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className={clsx(
                  'col-span-1 flex h-full min-h-[100px] items-center justify-center rounded-md px-2 py-4 shadow-sm',
                  colors[colorKey].card,
                )}
              >
                <Image
                  priority
                  className="w-auto object-contain"
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/logo_5-1699792567281.webp"
      name="Logo 5"
      Component={Logo5}
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
    card: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    secondaryCta: 'text-slate-600 dark:text-slate-200',
    card: 'bg-slate-200/50 dark:bg-slate-900',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    secondaryCta: 'text-gray-600 dark:text-gray-200',
    card: 'bg-gray-200/50 dark:bg-gray-900',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    secondaryCta: 'text-zinc-600 dark:text-zinc-200',
    card: 'bg-zinc-200/50 dark:bg-zinc-900',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    secondaryCta: 'text-neutral-600 dark:text-neutral-200',
    card: 'bg-neutral-200/50 dark:bg-neutral-900',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    secondaryCta: 'text-stone-600 dark:text-stone-200',
    card: 'bg-stone-200/50 dark:bg-stone-900',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    primaryCta:
      'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
    secondaryCta: 'text-red-800 dark:text-red-400',
    card: 'bg-red-100/50 dark:bg-red-950',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    primaryCta:
      'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
    secondaryCta: 'text-orange-800 dark:text-orange-400',
    card: 'bg-orange-100/50 dark:bg-orange-950',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    primaryCta:
      'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
    secondaryCta: 'text-amber-800 dark:text-amber-400',
    card: 'bg-amber-100/50 dark:bg-amber-950',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    primaryCta:
      'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
    secondaryCta: 'text-yellow-800 dark:text-yellow-400',
    card: 'bg-yellow-100/50 dark:bg-yellow-950',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    primaryCta:
      'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
    secondaryCta: 'text-lime-800 dark:text-lime-400',
    card: 'bg-lime-100/50 dark:bg-lime-950',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    primaryCta:
      'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
    secondaryCta: 'text-green-800 dark:text-green-400',
    card: 'bg-green-100/50 dark:bg-green-950',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    primaryCta:
      'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
    secondaryCta: 'text-emerald-800 dark:text-emerald-400',
    card: 'bg-emerald-100/50 dark:bg-emerald-950',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    primaryCta:
      'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
    secondaryCta: 'text-teal-800 dark:text-teal-400',
    card: 'bg-teal-100/50 dark:bg-teal-950',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    primaryCta:
      'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
    secondaryCta: 'text-cyan-800 dark:text-cyan-400',
    card: 'bg-cyan-100/50 dark:bg-cyan-950',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    primaryCta:
      'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
    secondaryCta: 'text-sky-800 dark:text-sky-400',
    card: 'bg-sky-100/50 dark:bg-sky-950',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    primaryCta:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
    secondaryCta: 'text-blue-800 dark:text-blue-400',
    card: 'bg-blue-100/50 dark:bg-blue-950',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    primaryCta:
      'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
    secondaryCta: 'text-indigo-800 dark:text-indigo-400',
    card: 'bg-indigo-100/50 dark:bg-indigo-950',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    primaryCta:
      'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
    secondaryCta: 'text-violet-800 dark:text-violet-400',
    card: 'bg-violet-100/50 dark:bg-violet-950',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    primaryCta:
      'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
    secondaryCta: 'text-purple-800 dark:text-purple-400',
    card: 'bg-purple-100/50 dark:bg-purple-950',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
    secondaryCta: 'text-fuchsia-800 dark:text-fuchsia-400',
    card: 'bg-fuchsia-100/50 dark:bg-fuchsia-950',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    primaryCta:
      'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
    secondaryCta: 'text-pink-800 dark:text-pink-400',
    card: 'bg-pink-100/50 dark:bg-pink-950',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    primaryCta:
      'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
    secondaryCta: 'text-rose-800 dark:text-rose-400',
    card: 'bg-rose-100/50 dark:bg-rose-950',
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

  let content: string;

  const nextContent = `/*You need to configure remotePatterns in next.config.js to use logoipsum.com
  
// next.config.js
const nextConfig = {
// ... other configs
  images: {
    // ... other configs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.logoipsum.com',
      },
    // ... other configs
    ],
  },
};
*/

import Image from 'next/image';

const logos = [
  {
    id: 1,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/221.svg',
  },
  {
    id: 2,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/220.svg',
  },
  {
    id: 3,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/219.svg',
  },
  {
    id: 4,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/218.svg',
  },
  {
    id: 5,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/217.svg',
  },
  {
    id: 6,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/216.svg',
  },
];

export default function Logo() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex space-x-8">
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </Link>

            <div className="flex items-center">
              <Link
                href="#"
                className="flex items-center gap-x-2 text-base ${colors[colorKey].secondaryCta}"
              >
                ${removeHtmlTags(secondaryCta)}
                <ChevronIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="order-last">
          <div className="grid grid-cols-2 gap-8">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="col-span-1 flex h-full min-h-[100px] items-center justify-center rounded-md px-2 py-4 shadow-sm ${colors[colorKey].card}"
              >
                <Image
                  priority
                  className="w-auto object-contain"
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

const logos = [
  {
    id: 1,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/221.svg',
  },
  {
    id: 2,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/220.svg',
  },
  {
    id: 3,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/219.svg',
  },
  {
    id: 4,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/218.svg',
  },
  {
    id: 5,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/217.svg',
  },
  {
    id: 6,
    name: 'Logo Name',
    height: 35,
    width: 130,
    src: 'https://img.logoipsum.com/216.svg',
  },
];

export default function Logo() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex space-x-8">
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </Link>

            <div className="flex items-center">
              <Link
                href="#"
                className="flex items-center gap-x-2 text-base ${colors[colorKey].secondaryCta}"
              >
                ${removeHtmlTags(secondaryCta)}
                <ChevronIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="order-last">
          <div className="grid grid-cols-2 gap-8">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="col-span-1 flex h-full min-h-[100px] items-center justify-center rounded-md px-2 py-4 shadow-sm ${colors[colorKey].card}"
              >
                <Image
                  priority
                  className="w-auto object-contain"
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
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

  importStatements.push(`import Logo5 from './components/Logo5';`);
  componentContent.push('<Logo5 />');
  return zip.file('components/Logo5.jsx', content);
}

Logo5.craft = {
  props: {
    heading: 'Trusted by the world’s most unkown companies',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    primaryCta: 'Get Started',
    secondaryCta: 'Learn More',
    paddingArray: ['px-4', 'sm:px-6', 'lg:px-8'],
    marginArray: ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-36'],
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
