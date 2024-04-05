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

export const CTA2 = ({
  heading = '',
  description = '',
  cta = '',
  disclaimer = '',
  termsAndConditions = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'sm:mt-32', 'mt-24', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
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
      ref={(ref) => connect(drag(ref as HTMLElement))}
      classes={clsx(maxWidth)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div
        className={clsx(
          'flex flex-col items-center justify-between gap-7 rounded-xl px-6 py-14 shadow-sm sm:px-10 lg:px-14 xl:flex-row',
          colors[colorKey].background,
        )}
      >
        <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:text-left">
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
              'mt-6 text-base',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />
        </div>

        <div>
          <div className="mx-auto flex max-w-md items-start gap-x-4">
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
                'outline-none',
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
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/cta_2-1699473186986.webp"
      name="CTA 2"
      Component={CTA2}
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
    background: string;
    heading: string;
    description: string;
    cta: string;
    input: string;
    disclaimer: string;
  };
}

const colors: ColorObject = {
  slate: {
    background: 'bg-slate-200 dark:bg-slate-900',
    heading: 'text-slate-900 dark:text-white',
    description: 'text-slate-600 dark:text-slate-400',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    input:
      'bg-white text-slate-900 ring-slate-200 focus:ring-slate-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-slate-600 dark:text-slate-500',
  },
  gray: {
    background: 'bg-gray-200 dark:bg-gray-900',
    heading: 'text-gray-900 dark:text-white',
    description: 'text-gray-600 dark:text-gray-400',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    input:
      'bg-white text-gray-900 ring-gray-200 focus:ring-gray-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-gray-600 dark:text-gray-500',
  },
  zinc: {
    background: 'bg-zinc-200 dark:bg-zinc-900',
    heading: 'text-zinc-900 dark:text-white',
    description: 'text-zinc-600 dark:text-zinc-400',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    input:
      'bg-white text-zinc-900 ring-zinc-200 focus:ring-zinc-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-zinc-600 dark:text-zinc-500',
  },
  neutral: {
    background: 'bg-neutral-200 dark:bg-neutral-900',
    heading: 'text-neutral-900 dark:text-white',
    description: 'text-neutral-600 dark:text-neutral-400',
    cta: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    input:
      'bg-white text-neutral-900 ring-neutral-200 focus:ring-neutral-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-neutral-600 dark:text-neutral-500',
  },
  stone: {
    background: 'bg-stone-200 dark:bg-stone-900',
    heading: 'text-stone-900 dark:text-white',
    description: 'text-stone-600 dark:text-stone-400',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    input:
      'bg-white text-stone-900 ring-stone-200 focus:ring-stone-500 dark:bg-white/5 dark:text-white',
    disclaimer: 'text-stone-600 dark:text-stone-500',
  },
  red: {
    background: 'bg-red-200/50 dark:bg-red-900/50',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-600 dark:text-red-100',
    cta: 'bg-red-900 text-white hover:bg-red-800 focus-visible:outline-red-500 dark:bg-red-100 dark:text-red-900 dark:hover:bg-red-200 dark:focus-visible:outline-red-400',
    input:
      'bg-white text-red-900 ring-red-400 focus:ring-red-600 dark:bg-white/5 dark:text-white dark:ring-red-500',
    disclaimer: 'text-red-950/70 dark:text-red-50/40',
  },
  orange: {
    background: 'bg-orange-200/50 dark:bg-orange-900/50',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-600 dark:text-orange-100',
    cta: 'bg-orange-900 text-white hover:bg-orange-800 focus-visible:outline-orange-500 dark:bg-orange-100 dark:text-orange-900 dark:hover:bg-orange-200 dark:focus-visible:outline-orange-400',
    input:
      'bg-white text-orange-900 ring-orange-400 focus:ring-orange-600 dark:bg-white/5 dark:text-white dark:ring-orange-500',
    disclaimer: 'text-orange-950/70 dark:text-orange-50/40',
  },
  amber: {
    background: 'bg-amber-200/50 dark:bg-amber-900/50',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-600 dark:text-amber-100',
    cta: 'bg-amber-900 text-white hover:bg-amber-800 focus-visible:outline-amber-500 dark:bg-amber-100 dark:text-amber-900 dark:hover:bg-amber-200 dark:focus-visible:outline-amber-400',
    input:
      'bg-white text-amber-900 ring-amber-400 focus:ring-amber-600 dark:bg-white/5 dark:text-white dark:ring-amber-500',
    disclaimer: 'text-amber-950/70 dark:text-amber-50/40',
  },
  yellow: {
    background: 'bg-yellow-200/50 dark:bg-yellow-900/50',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-600 dark:text-yellow-100',
    cta: 'bg-yellow-900 text-white hover:bg-yellow-800 focus-visible:outline-yellow-500 dark:bg-yellow-100 dark:text-yellow-900 dark:hover:bg-yellow-200 dark:focus-visible:outline-yellow-400',
    input:
      'bg-white text-yellow-900 ring-yellow-400 focus:ring-yellow-600 dark:bg-white/5 dark:text-white dark:ring-yellow-500',
    disclaimer: 'text-yellow-950/70 dark:text-yellow-50/40',
  },
  lime: {
    background: 'bg-lime-200/50 dark:bg-lime-900/50',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-600 dark:text-lime-100',
    cta: 'bg-lime-900 text-white hover:bg-lime-800 focus-visible:outline-lime-500 dark:bg-lime-100 dark:text-lime-900 dark:hover:bg-lime-200 dark:focus-visible:outline-lime-400',
    input:
      'bg-white text-lime-900 ring-lime-400 focus:ring-lime-600 dark:bg-white/5 dark:text-white dark:ring-lime-500',
    disclaimer: 'text-lime-950/70 dark:text-lime-50/40',
  },
  green: {
    background: 'bg-green-200/50 dark:bg-green-900/50',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-600 dark:text-green-100',
    cta: 'bg-green-900 text-white hover:bg-green-800 focus-visible:outline-green-500 dark:bg-green-100 dark:text-green-900 dark:hover:bg-green-200 dark:focus-visible:outline-green-400',
    input:
      'bg-white text-green-900 ring-green-400 focus:ring-green-600 dark:bg-white/5 dark:text-white dark:ring-green-500',
    disclaimer: 'text-green-950/70 dark:text-green-50/40',
  },
  emerald: {
    background: 'bg-emerald-200/50 dark:bg-emerald-900/50',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-600 dark:text-emerald-100',
    cta: 'bg-emerald-900 text-white hover:bg-emerald-800 focus-visible:outline-emerald-500 dark:bg-emerald-100 dark:text-emerald-900 dark:hover:bg-emerald-200 dark:focus-visible:outline-emerald-400',
    input:
      'bg-white text-emerald-900 ring-emerald-400 focus:ring-emerald-600 dark:bg-white/5 dark:text-white dark:ring-emerald-500',
    disclaimer: 'text-emerald-950/70 dark:text-emerald-50/40',
  },
  teal: {
    background: 'bg-teal-200/50 dark:bg-teal-900/50',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-600 dark:text-teal-100',
    cta: 'bg-teal-900 text-white hover:bg-teal-800 focus-visible:outline-teal-500 dark:bg-teal-100 dark:text-teal-900 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-400',
    input:
      'bg-white text-teal-900 ring-teal-400 focus:ring-teal-600 dark:bg-white/5 dark:text-white dark:ring-teal-500',
    disclaimer: 'text-teal-950/70 dark:text-teal-50/40',
  },
  cyan: {
    background: 'bg-cyan-200/50 dark:bg-cyan-900/50',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-600 dark:text-cyan-100',
    cta: 'bg-cyan-900 text-white hover:bg-cyan-800 focus-visible:outline-cyan-500 dark:bg-cyan-100 dark:text-cyan-900 dark:hover:bg-cyan-200 dark:focus-visible:outline-cyan-400',
    input:
      'bg-white text-cyan-900 ring-cyan-400 focus:ring-cyan-600 dark:bg-white/5 dark:text-white dark:ring-cyan-500',
    disclaimer: 'text-cyan-950/70 dark:text-cyan-50/40',
  },
  sky: {
    background: 'bg-sky-200/50 dark:bg-sky-900/50',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-600 dark:text-sky-100',
    cta: 'bg-sky-900 text-white hover:bg-sky-800 focus-visible:outline-sky-500 dark:bg-sky-100 dark:text-sky-900 dark:hover:bg-sky-200 dark:focus-visible:outline-sky-400',
    input:
      'bg-white text-sky-900 ring-sky-400 focus:ring-sky-600 dark:bg-white/5 dark:text-white dark:ring-sky-500',
    disclaimer: 'text-sky-950/70 dark:text-sky-50/40',
  },
  blue: {
    background: 'bg-blue-200/50 dark:bg-blue-900/50',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-600 dark:text-blue-100',
    cta: 'bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-500 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 dark:focus-visible:outline-blue-400',
    input:
      'bg-white text-blue-900 ring-blue-400 focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-blue-500',
    disclaimer: 'text-blue-950/70 dark:text-blue-50/40',
  },
  indigo: {
    background: 'bg-indigo-200/50 dark:bg-indigo-900/50',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-600 dark:text-indigo-100',
    cta: 'bg-indigo-900 text-white hover:bg-indigo-800 focus-visible:outline-indigo-500 dark:bg-indigo-100 dark:text-indigo-900 dark:hover:bg-indigo-200 dark:focus-visible:outline-indigo-400',
    input:
      'bg-white text-indigo-900 ring-indigo-400 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-indigo-500',
    disclaimer: 'text-indigo-950/70 dark:text-indigo-50/40',
  },
  violet: {
    background: 'bg-violet-200/50 dark:bg-violet-900/50',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-600 dark:text-violet-100',
    cta: 'bg-violet-900 text-white hover:bg-violet-800 focus-visible:outline-violet-500 dark:bg-violet-100 dark:text-violet-900 dark:hover:bg-violet-200 dark:focus-visible:outline-violet-400',
    input:
      'bg-white text-violet-900 ring-violet-400 focus:ring-violet-600 dark:bg-white/5 dark:text-white dark:ring-violet-500',
    disclaimer: 'text-violet-950/70 dark:text-violet-50/40',
  },
  purple: {
    background: 'bg-purple-200/50 dark:bg-purple-900/50',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-600 dark:text-purple-100',
    cta: 'bg-purple-900 text-white hover:bg-purple-800 focus-visible:outline-purple-500 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200 dark:focus-visible:outline-purple-400',
    input:
      'bg-white text-purple-900 ring-purple-400 focus:ring-purple-600 dark:bg-white/5 dark:text-white dark:ring-purple-500',
    disclaimer: 'text-purple-950/70 dark:text-purple-50/40',
  },
  fuchsia: {
    background: 'bg-fuchsia-200/50 dark:bg-fuchsia-900/50',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-600 dark:text-fuchsia-100',
    cta: 'bg-fuchsia-900 text-white hover:bg-fuchsia-800 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-100 dark:text-fuchsia-900 dark:hover:bg-fuchsia-200 dark:focus-visible:outline-fuchsia-400',
    input:
      'bg-white text-fuchsia-900 ring-fuchsia-400 focus:ring-fuchsia-600 dark:bg-white/5 dark:text-white dark:ring-fuchsia-500',
    disclaimer: 'text-fuchsia-950/70 dark:text-fuchsia-50/40',
  },
  pink: {
    background: 'bg-pink-200/50 dark:bg-pink-900/50',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-600 dark:text-pink-100',
    cta: 'bg-pink-900 text-white hover:bg-pink-800 focus-visible:outline-pink-500 dark:bg-pink-100 dark:text-pink-900 dark:hover:bg-pink-200 dark:focus-visible:outline-pink-400',
    input:
      'bg-white text-pink-900 ring-pink-400 focus:ring-pink-600 dark:bg-white/5 dark:text-white dark:ring-pink-500',
    disclaimer: 'text-pink-950/70 dark:text-pink-50/40',
  },
  rose: {
    background: 'bg-rose-200/50 dark:bg-rose-900/50',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-600 dark:text-rose-100',
    cta: 'bg-rose-900 text-white hover:bg-rose-800 focus-visible:outline-rose-500 dark:bg-rose-100 dark:text-rose-900 dark:hover:bg-rose-200 dark:focus-visible:outline-rose-400',
    input:
      'bg-white text-rose-900 ring-rose-400 focus:ring-rose-600 dark:bg-white/5 dark:text-white dark:ring-rose-500',
    disclaimer: 'text-rose-950/70 dark:text-rose-50/40',
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
      <div className="flex flex-col items-center justify-between gap-7 rounded-xl px-6 py-14 shadow-sm sm:px-10 lg:px-14 xl:flex-row ${colors[colorKey].background}">
        <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:text-left">
          <h2 className="text-3xl font-bold leading-tight tracking-wide lg:text-4xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="mt-6 text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
        </div>

        <div>
          <div className="mx-auto flex max-w-md items-start gap-x-4">
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
      <div className="flex flex-col items-center justify-between gap-7 rounded-xl px-6 py-14 shadow-sm sm:px-10 lg:px-14 xl:flex-row ${colors[colorKey].background}">
        <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:text-left">
          <h2 className="text-3xl font-bold leading-tight tracking-wide lg:text-4xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="mt-6 text-base ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
        </div>

        <div>
          <div className="mx-auto flex max-w-md items-start gap-x-4">
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

  importStatements.push(`import CTA2 from './components/CTA2';`);
  componentContent.push('<CTA2 />');
  return zip.file('components/CTA2.jsx', content);
}

CTA2.craft = {
  props: {
    heading: 'Medium length heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    cta: 'Subscribe',
    disclaimer:
      "By clicking Subscribe you're confirming that you agree with our",
    termsAndConditions: 'Terms and Conditions',
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
