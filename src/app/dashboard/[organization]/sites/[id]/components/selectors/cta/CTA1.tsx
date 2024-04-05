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

export const CTA1 = ({
  heading = '',
  description = '',
  primaryCta = '',
  secondaryCta = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'sm:mt-32', 'mt-24', 'lg:mt-40'],
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
      ref={(ref) => connect(drag(ref as HTMLElement))}
      classes={clsx(maxWidth)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div
        className={clsx(
          'flex flex-col space-y-7 rounded-xl px-4 py-14 text-center shadow-sm sm:px-6 lg:px-8',
          colors[colorKey].background,
        )}
      >
        <ContentEditable
          html={heading}
          onChange={(e) =>
            setProp(
              (props: { heading: string }) => (props.heading = e.target.value),
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
            'mx-auto max-w-2xl text-base md:text-lg',
            'outline-none focus:outline-offset-4 focus:outline-primary',
            colors[textColorKey].description,
          )}
        />

        <div className="flex max-w-md flex-col justify-center space-y-4 sm:mx-auto lg:flex-row lg:space-x-4 lg:space-y-0">
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
              colors[colorKey].secondaryCta,
            )}
          />
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/cta_1-1699473157739.webp"
      name="CTA 1"
      Component={CTA1}
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
    background: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

const colors: ColorObject = {
  slate: {
    background: 'bg-slate-200 dark:bg-slate-900',
    heading: 'text-slate-900 dark:text-white',
    description: 'text-slate-600 dark:text-slate-400',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    secondaryCta:
      'bg-transparent text-slate-900 ring-slate-500 hover:bg-slate-100 focus-visible:outline-slate-500 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-400',
  },
  gray: {
    background: 'bg-gray-200 dark:bg-gray-900',
    heading: 'text-gray-900 dark:text-white',
    description: 'text-gray-600 dark:text-gray-400',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    secondaryCta:
      'bg-transparent text-gray-900 ring-gray-500 hover:bg-gray-100 focus-visible:outline-gray-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    background: 'bg-zinc-200 dark:bg-zinc-900',
    heading: 'text-zinc-900 dark:text-white',
    description: 'text-zinc-600 dark:text-zinc-400',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    secondaryCta:
      'bg-transparent text-zinc-900 ring-zinc-500 hover:bg-zinc-100 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    background: 'bg-neutral-200 dark:bg-neutral-900',
    heading: 'text-neutral-900 dark:text-white',
    description: 'text-neutral-600 dark:text-neutral-400',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    secondaryCta:
      'bg-transparent text-neutral-900 ring-neutral-500 hover:bg-neutral-100 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    background: 'bg-stone-200 dark:bg-stone-900',
    heading: 'text-stone-900 dark:text-white',
    description: 'text-stone-600 dark:text-stone-400',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    secondaryCta:
      'bg-transparent text-stone-900 ring-stone-500 hover:bg-stone-100 focus-visible:outline-stone-500 dark:text-stone-100 dark:ring-stone-600 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400',
  },
  red: {
    background: 'bg-red-200/50 dark:bg-red-900/50',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-600 dark:text-red-100',
    primaryCta:
      'bg-red-900 text-white hover:bg-red-800 focus-visible:outline-red-500 dark:bg-red-100 dark:text-red-900 dark:hover:bg-red-200 dark:focus-visible:outline-red-400',
    secondaryCta:
      'bg-transparent text-red-900 ring-red-500 hover:bg-red-100 focus-visible:outline-red-500 dark:text-red-100 dark:ring-red-800 dark:hover:bg-red-900/50 dark:focus-visible:outline-red-400',
  },
  orange: {
    background: 'bg-orange-200/50 dark:bg-orange-900/50',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-600 dark:text-orange-100',
    primaryCta:
      'bg-orange-900 text-white hover:bg-orange-800 focus-visible:outline-orange-500 dark:bg-orange-100 dark:text-orange-900 dark:hover:bg-orange-200 dark:focus-visible:outline-orange-400',
    secondaryCta:
      'bg-transparent text-orange-900 ring-orange-500 hover:bg-orange-100 focus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-800 dark:hover:bg-orange-900/50 dark:focus-visible:outline-orange-400',
  },
  amber: {
    background: 'bg-amber-200/50 dark:bg-amber-900/50',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-600 dark:text-amber-100',
    primaryCta:
      'bg-amber-900 text-white hover:bg-amber-800 focus-visible:outline-amber-500 dark:bg-amber-100 dark:text-amber-900 dark:hover:bg-amber-200 dark:focus-visible:outline-amber-400',
    secondaryCta:
      'bg-transparent text-amber-900 ring-amber-500 hover:bg-amber-100 focus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-800 dark:hover:bg-amber-900/50 dark:focus-visible:outline-amber-400',
  },
  yellow: {
    background: 'bg-yellow-200/50 dark:bg-yellow-900/50',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-600 dark:text-yellow-100',
    primaryCta:
      'bg-yellow-900 text-white hover:bg-yellow-800 focus-visible:outline-yellow-500 dark:bg-yellow-100 dark:text-yellow-900 dark:hover:bg-yellow-200 dark:focus-visible:outline-yellow-400',
    secondaryCta:
      'bg-transparent text-yellow-900 ring-yellow-500 hover:bg-yellow-100 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-800 dark:hover:bg-yellow-900/50 dark:focus-visible:outline-yellow-400',
  },
  lime: {
    background: 'bg-lime-200/50 dark:bg-lime-900/50',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-600 dark:text-lime-100',
    primaryCta:
      'bg-lime-900 text-white hover:bg-lime-800 focus-visible:outline-lime-500 dark:bg-lime-100 dark:text-lime-900 dark:hover:bg-lime-200 dark:focus-visible:outline-lime-400',
    secondaryCta:
      'bg-transparent text-lime-900 ring-lime-500 hover:bg-lime-100 focus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-800 dark:hover:bg-lime-900/50 dark:focus-visible:outline-lime-400',
  },
  green: {
    background: 'bg-green-200/50 dark:bg-green-900/50',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-600 dark:text-green-100',
    primaryCta:
      'bg-green-900 text-white hover:bg-green-800 focus-visible:outline-green-500 dark:bg-green-100 dark:text-green-900 dark:hover:bg-green-200 dark:focus-visible:outline-green-400',
    secondaryCta:
      'bg-transparent text-green-900 ring-green-500 hover:bg-green-100 focus-visible:outline-green-500 dark:text-green-100 dark:ring-green-800 dark:hover:bg-green-900/50 dark:focus-visible:outline-green-400',
  },
  emerald: {
    background: 'bg-emerald-200/50 dark:bg-emerald-900/50',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-600 dark:text-emerald-100',
    primaryCta:
      'bg-emerald-900 text-white hover:bg-emerald-800 focus-visible:outline-emerald-500 dark:bg-emerald-100 dark:text-emerald-900 dark:hover:bg-emerald-200 dark:focus-visible:outline-emerald-400',
    secondaryCta:
      'bg-transparent text-emerald-900 ring-emerald-500 hover:bg-emerald-100 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-800 dark:hover:bg-emerald-900/50 dark:focus-visible:outline-emerald-400',
  },
  teal: {
    background: 'bg-teal-200/50 dark:bg-teal-900/50',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-600 dark:text-teal-100',
    primaryCta:
      'bg-teal-900 text-white hover:bg-teal-800 focus-visible:outline-teal-500 dark:bg-teal-100 dark:text-teal-900 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-400',
    secondaryCta:
      'bg-transparent text-teal-900 ring-teal-500 hover:bg-teal-100 focus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-800 dark:hover:bg-teal-900/50 dark:focus-visible:outline-teal-400',
  },
  cyan: {
    background: 'bg-cyan-200/50 dark:bg-cyan-900/50',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-600 dark:text-cyan-100',
    primaryCta:
      'bg-cyan-900 text-white hover:bg-cyan-800 focus-visible:outline-cyan-500 dark:bg-cyan-100 dark:text-cyan-900 dark:hover:bg-cyan-200 dark:focus-visible:outline-cyan-400',
    secondaryCta:
      'bg-transparent text-cyan-900 ring-cyan-500 hover:bg-cyan-100 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-800 dark:hover:bg-cyan-900/50 dark:focus-visible:outline-cyan-400',
  },
  sky: {
    background: 'bg-sky-200/50 dark:bg-sky-900/50',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-600 dark:text-sky-100',
    primaryCta:
      'bg-sky-900 text-white hover:bg-sky-800 focus-visible:outline-sky-500 dark:bg-sky-100 dark:text-sky-900 dark:hover:bg-sky-200 dark:focus-visible:outline-sky-400',
    secondaryCta:
      'bg-transparent text-sky-900 ring-sky-500 hover:bg-sky-100 focus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-800 dark:hover:bg-sky-900/50 dark:focus-visible:outline-sky-400',
  },
  blue: {
    background: 'bg-blue-200/50 dark:bg-blue-900/50',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-600 dark:text-blue-100',
    primaryCta:
      'bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-500 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 dark:focus-visible:outline-blue-400',
    secondaryCta:
      'bg-transparent text-blue-900 ring-blue-500 hover:bg-blue-100 focus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-800 dark:hover:bg-blue-900/50 dark:focus-visible:outline-blue-400',
  },
  indigo: {
    background: 'bg-indigo-200/50 dark:bg-indigo-900/50',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-600 dark:text-indigo-100',
    primaryCta:
      'bg-indigo-900 text-white hover:bg-indigo-800 focus-visible:outline-indigo-500 dark:bg-indigo-100 dark:text-indigo-900 dark:hover:bg-indigo-200 dark:focus-visible:outline-indigo-400',
    secondaryCta:
      'bg-transparent text-indigo-900 ring-indigo-500 hover:bg-indigo-100 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-800 dark:hover:bg-indigo-900/50 dark:focus-visible:outline-indigo-400',
  },
  violet: {
    background: 'bg-violet-200/50 dark:bg-violet-900/50',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-600 dark:text-violet-100',
    primaryCta:
      'bg-violet-900 text-white hover:bg-violet-800 focus-visible:outline-violet-500 dark:bg-violet-100 dark:text-violet-900 dark:hover:bg-violet-200 dark:focus-visible:outline-violet-400',
    secondaryCta:
      'bg-transparent text-violet-900 ring-violet-500 hover:bg-violet-100 focus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-800 dark:hover:bg-violet-900/50 dark:focus-visible:outline-violet-400',
  },
  purple: {
    background: 'bg-purple-200/50 dark:bg-purple-900/50',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-600 dark:text-purple-100',
    primaryCta:
      'bg-purple-900 text-white hover:bg-purple-800 focus-visible:outline-purple-500 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200 dark:focus-visible:outline-purple-400',
    secondaryCta:
      'bg-transparent text-purple-900 ring-purple-500 hover:bg-purple-100 focus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-800 dark:hover:bg-purple-900/50 dark:focus-visible:outline-purple-400',
  },
  fuchsia: {
    background: 'bg-fuchsia-200/50 dark:bg-fuchsia-900/50',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-600 dark:text-fuchsia-100',
    primaryCta:
      'bg-fuchsia-900 text-white hover:bg-fuchsia-800 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-100 dark:text-fuchsia-900 dark:hover:bg-fuchsia-200 dark:focus-visible:outline-fuchsia-400',
    secondaryCta:
      'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:bg-fuchsia-100 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-800 dark:hover:bg-fuchsia-900/50 dark:focus-visible:outline-fuchsia-400',
  },
  pink: {
    background: 'bg-pink-200/50 dark:bg-pink-900/50',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-600 dark:text-pink-100',
    primaryCta:
      'bg-pink-900 text-white hover:bg-pink-800 focus-visible:outline-pink-500 dark:bg-pink-100 dark:text-pink-900 dark:hover:bg-pink-200 dark:focus-visible:outline-pink-400',
    secondaryCta:
      'bg-transparent text-pink-900 ring-pink-500 hover:bg-pink-100 focus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-800 dark:hover:bg-pink-900/50 dark:focus-visible:outline-pink-400',
  },
  rose: {
    background: 'bg-rose-200/50 dark:bg-rose-900/50',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-600 dark:text-rose-100',
    primaryCta:
      'bg-rose-900 text-white hover:bg-rose-800 focus-visible:outline-rose-500 dark:bg-rose-100 dark:text-rose-900 dark:hover:bg-rose-200 dark:focus-visible:outline-rose-400',
    secondaryCta:
      'bg-transparent text-rose-900 ring-rose-500 hover:bg-rose-100 focus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-800 dark:hover:bg-rose-900/50 dark:focus-visible:outline-rose-400',
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

  const nextContent = `import Link from 'next/link';

export default function CTA() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col space-y-7 rounded-xl px-4 py-14 text-center shadow-sm sm:px-6 lg:px-8 ${colors[colorKey].background}">
        <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="flex max-w-md flex-col justify-center space-y-4 sm:mx-auto lg:flex-row lg:space-x-4 lg:space-y-0">
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
  );
}`;

  const reactContent = `import React from 'react';

export default function CTA() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col space-y-7 rounded-xl px-4 py-14 text-center shadow-sm sm:px-6 lg:px-8 ${colors[colorKey].background}">
        <h2 className="text-3xl font-bold leading-tight tracking-wide md:text-4xl xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto max-w-2xl text-base ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="flex max-w-md flex-col justify-center space-y-4 sm:mx-auto lg:flex-row lg:space-x-4 lg:space-y-0">
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

  importStatements.push(`import CTA1 from './components/CTA1';`);
  componentContent.push('<CTA1 />');
  return zip.file('components/CTA1.jsx', content);
}

CTA1.craft = {
  props: {
    heading: 'Medium length heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    primaryCta: 'Get started',
    secondaryCta: 'Learn more',
    paddingArray: ['px-4', 'sm:px-6', 'lg:px-8'],
    marginArray: ['mx-auto', 'sm:mt-32', 'mt-24', 'lg:mt-40'],
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
