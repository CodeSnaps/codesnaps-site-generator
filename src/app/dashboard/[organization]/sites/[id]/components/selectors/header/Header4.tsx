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

export const Header4 = ({
  tagline = '',
  heading = '',
  description = '',
  primaryCta = '',
  newsletterDisclaimerPart1 = '',
  newsletterDisclaimerPrivatePolicy = '',
  newsletterDisclaimerPart2 = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCta?: string;
  newsletterDisclaimerPart1?: string;
  newsletterDisclaimerPrivatePolicy?: string;
  newsletterDisclaimerPart2?: string;
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
      <div className="flex max-w-4xl flex-col space-y-7">
        <ContentEditable
          html={tagline}
          onChange={(e) =>
            setProp(
              (props: { tagline: string }) => (props.tagline = e.target.value),
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
          tagName="p"
          disabled={query.getOptions().enabled ? false : true}
          className={clsx(
            'text-lg',
            'outline-none focus:outline-offset-4 focus:outline-primary',
            colors[textColorKey].description,
          )}
        />

        <div className="flex max-w-lg items-start gap-x-4">
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
            html={primaryCta}
            onChange={(e) =>
              setProp(
                (props: { primaryCta: string }) =>
                  (props.primaryCta = e.target.value),
              )
            }
            tagName="button"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'outline-none',
              colors[colorKey].primaryCta,
            )}
          />
        </div>

        <div
          className={clsx('max-w-md text-sm', colors[textColorKey].disclaimer)}
        >
          <ContentEditable
            html={newsletterDisclaimerPart1}
            onChange={(e) =>
              setProp(
                (props: { newsletterDisclaimerPart1: string }) =>
                  (props.newsletterDisclaimerPart1 = e.target.value),
              )
            }
            tagName="span"
            disabled={query.getOptions().enabled ? false : true}
            className="outline-none focus:outline-offset-4 focus:outline-primary"
          />{' '}
          <ContentEditable
            html={newsletterDisclaimerPrivatePolicy}
            onChange={(e) =>
              setProp(
                (props: { newsletterDisclaimerPrivatePolicy: string }) =>
                  (props.newsletterDisclaimerPrivatePolicy = e.target.value),
              )
            }
            tagName="a"
            disabled={query.getOptions().enabled ? false : true}
            className="text-sm underline outline-none focus:outline-offset-4 focus:outline-primary"
          />{' '}
          <ContentEditable
            html={newsletterDisclaimerPart2}
            onChange={(e) =>
              setProp(
                (props: { newsletterDisclaimerPart2: string }) =>
                  (props.newsletterDisclaimerPart2 = e.target.value),
              )
            }
            tagName="span"
            disabled={query.getOptions().enabled ? false : true}
            className="outline-none focus:outline-offset-4 focus:outline-primary"
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
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/header_4-1700071047403.webp"
      name="Header 4"
      Component={Header4}
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
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
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
    newsletterDisclaimerPart1: node.data.props.newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy:
      node.data.props.newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2: node.data.props.newsletterDisclaimerPart2,
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
                  newsletterDisclaimerPart1,
                  newsletterDisclaimerPrivatePolicy,
                  newsletterDisclaimerPart2,
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
                  newsletterDisclaimerPart1,
                  newsletterDisclaimerPrivatePolicy,
                  newsletterDisclaimerPart2,
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
    input: string;
    disclaimer: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-800 dark:text-slate-200',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    input:
      'bg-white text-slate-900 ring-slate-200 focus:ring-slate-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-slate-500',
  },
  gray: {
    tagline: 'text-gray-800 dark:text-gray-200',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    input:
      'bg-white text-gray-900 ring-gray-200 focus:ring-gray-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-gray-500',
  },
  zinc: {
    tagline: 'text-zinc-800 dark:text-zinc-200',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    input:
      'bg-white text-zinc-900 ring-zinc-200 focus:ring-zinc-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-zinc-500',
  },
  neutral: {
    tagline: 'text-neutral-800 dark:text-neutral-200',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    input:
      'bg-white text-neutral-900 ring-neutral-200 focus:ring-neutral-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-neutral-500',
  },
  stone: {
    tagline: 'text-stone-800 dark:text-stone-200',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    input:
      'bg-white text-stone-900 ring-stone-200 focus:ring-stone-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-stone-500',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    primaryCta:
      'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
    input:
      'bg-white text-red-900 ring-red-400 focus:ring-red-600 dark:bg-white/5 dark:text-white dark:ring-red-500',
    disclaimer: 'text-red-950/70 dark:text-red-50/40',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    primaryCta:
      'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
    input:
      'bg-white text-orange-900 ring-orange-400 focus:ring-orange-600 dark:bg-white/5 dark:text-white dark:ring-orange-500',
    disclaimer: 'text-orange-950/70 dark:text-orange-50/40',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    primaryCta:
      'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
    input:
      'bg-white text-amber-900 ring-amber-400 focus:ring-amber-600 dark:bg-white/5 dark:text-white dark:ring-amber-500',
    disclaimer: 'text-amber-950/70 dark:text-amber-50/40',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    primaryCta:
      'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
    input:
      'bg-white text-yellow-900 ring-yellow-400 focus:ring-yellow-600 dark:bg-white/5 dark:text-white dark:ring-yellow-500',
    disclaimer: 'text-yellow-950/70 dark:text-yellow-50/40',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    primaryCta:
      'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
    input:
      'bg-white text-lime-900 ring-lime-400 focus:ring-lime-600 dark:bg-white/5 dark:text-white dark:ring-lime-500',
    disclaimer: 'text-lime-950/70 dark:text-lime-50/40',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    primaryCta:
      'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
    input:
      'bg-white text-green-900 ring-green-400 focus:ring-green-600 dark:bg-white/5 dark:text-white dark:ring-green-500',
    disclaimer: 'text-green-950/70 dark:text-green-50/40',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    primaryCta:
      'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
    input:
      'bg-white text-emerald-900 ring-emerald-400 focus:ring-emerald-600 dark:bg-white/5 dark:text-white dark:ring-emerald-500',
    disclaimer: 'text-emerald-950/70 dark:text-emerald-50/40',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    primaryCta:
      'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
    input:
      'bg-white text-teal-900 ring-teal-400 focus:ring-teal-600 dark:bg-white/5 dark:text-white dark:ring-teal-500',
    disclaimer: 'text-teal-950/70 dark:text-teal-50/40',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    primaryCta:
      'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
    input:
      'bg-white text-cyan-900 ring-cyan-400 focus:ring-cyan-600 dark:bg-white/5 dark:text-white dark:ring-cyan-500',
    disclaimer: 'text-cyan-950/70 dark:text-cyan-50/40',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    primaryCta:
      'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
    input:
      'bg-white text-sky-900 ring-sky-400 focus:ring-sky-600 dark:bg-white/5 dark:text-white dark:ring-sky-500',
    disclaimer: 'text-sky-950/70 dark:text-sky-50/40',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    primaryCta:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
    input:
      'bg-white text-blue-900 ring-blue-400 focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-blue-500',
    disclaimer: 'text-blue-950/70 dark:text-blue-50/40',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    primaryCta:
      'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
    input:
      'bg-white text-indigo-900 ring-indigo-400 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-indigo-500',
    disclaimer: 'text-indigo-950/70 dark:text-indigo-50/40',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    primaryCta:
      'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
    input:
      'bg-white text-violet-900 ring-violet-400 focus:ring-violet-600 dark:bg-white/5 dark:text-white dark:ring-violet-500',
    disclaimer: 'text-violet-950/70 dark:text-violet-50/40',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    primaryCta:
      'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
    input:
      'bg-white text-purple-900 ring-purple-400 focus:ring-purple-600 dark:bg-white/5 dark:text-white dark:ring-purple-500',
    disclaimer: 'text-purple-950/70 dark:text-purple-50/40',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
    input:
      'bg-white text-fuchsia-900 ring-fuchsia-400 focus:ring-fuchsia-600 dark:bg-white/5 dark:text-white dark:ring-fuchsia-500',
    disclaimer: 'text-fuchsia-950/70 dark:text-fuchsia-50/40',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    primaryCta:
      'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
    input:
      'bg-white text-pink-900 ring-pink-400 focus:ring-pink-600 dark:bg-white/5 dark:text-white dark:ring-pink-500',
    disclaimer: 'text-pink-950/70 dark:text-pink-50/40',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    primaryCta:
      'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
    input:
      'bg-white text-rose-900 ring-rose-400 focus:ring-rose-600 dark:bg-white/5 dark:text-white dark:ring-rose-500',
    disclaimer: 'text-rose-950/70 dark:text-rose-50/40',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  primaryCta,
  newsletterDisclaimerPart1,
  newsletterDisclaimerPrivatePolicy,
  newsletterDisclaimerPart2,
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
  newsletterDisclaimerPart1: string;
  newsletterDisclaimerPrivatePolicy: string;
  newsletterDisclaimerPart2: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  let content: string;

  const nextContent = `import Link from 'next/link';

export default function Header() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="flex max-w-4xl flex-col space-y-7">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="flex max-w-lg items-start gap-x-4">
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
            className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
          >
            ${removeHtmlTags(primaryCta)}
          </button>
        </div>

        <div className="max-w-md text-xs ${colors[textColorKey].disclaimer}">
          ${removeHtmlTags(newsletterDisclaimerPart1)}{' '}
          <Link href="#" className="text-xs underline">
            ${removeHtmlTags(newsletterDisclaimerPrivatePolicy)}
          </Link>{' '}
          ${removeHtmlTags(newsletterDisclaimerPart2)}
        </div>
      </div>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

export default function Header() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex max-w-4xl flex-col space-y-7">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="flex max-w-lg items-start gap-x-4">
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
            className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
          >
            ${removeHtmlTags(primaryCta)}
          </button>
        </div>

        <div className="max-w-md text-xs ${colors[textColorKey].disclaimer}">
          ${removeHtmlTags(newsletterDisclaimerPart1)}{' '}
          <a href="#" className="text-xs underline">
            ${removeHtmlTags(newsletterDisclaimerPrivatePolicy)}
          </a>{' '}
          ${removeHtmlTags(newsletterDisclaimerPart2)}
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
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
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
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Header4 from './components/Header4';`);
  componentContent.push('<Header4 />');
  return zip.file('components/Header4.jsx', content);
}

Header4.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Short heading goes in here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    primaryCta: 'Subscribe',
    newsletterDisclaimerPart1: 'By subscribing you agree to with our',
    newsletterDisclaimerPrivatePolicy: 'Privacy Policy',
    newsletterDisclaimerPart2:
      'and provide consent to receive updates from our company.',
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
