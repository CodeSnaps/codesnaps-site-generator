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

const items = [
  {
    id: 1,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: Icon,
  },
  {
    id: 2,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: Icon,
  },
  {
    id: 3,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: Icon,
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Hero14 = ({
  tagline = '',
  heading = '',
  description = '',
  items = [],
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
  items?: { id: number; name: string; description: string; icon: any }[];
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
      classes={clsx(maxWidth, 'relative')}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div
        style={{
          backgroundImage:
            'url("https://dummyimage.com/1920x1200/4A4A4A/171717")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-32 sm:pt-48 lg:pt-56">
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

            <div className="mt-6">
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

        <div className="relative z-10 mx-auto mb-24 grid max-w-7xl translate-y-2/4 gap-2 px-4 sm:grid-cols-3 sm:px-6 lg:gap-10 lg:px-8">
          {/* ITEM 01 */}
          <div
            className={clsx(
              'mx-auto w-full max-w-sm rounded-xl px-10 py-8 shadow-md',
              colors[colorKey].card,
            )}
          >
            <Icon className={clsx('h-8 w-8', colors[colorKey].icon)} />

            <ContentEditable
              html={items[0].name}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[0].name = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-lg font-semibold',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardHeading,
              )}
            />

            <ContentEditable
              html={items[0].description}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[0].description = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-sm',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardDescription,
              )}
            />
          </div>

          {/* ITEM 02 */}
          <div
            className={clsx(
              'mx-auto w-full max-w-sm rounded-xl px-10 py-8 shadow-md',
              colors[colorKey].card,
            )}
          >
            <Icon className={clsx('h-8 w-8', colors[colorKey].icon)} />

            <ContentEditable
              html={items[1].name}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[1].name = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-lg font-semibold',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardHeading,
              )}
            />

            <ContentEditable
              html={items[1].description}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[1].description = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-sm',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardDescription,
              )}
            />
          </div>

          {/* ITEM 03 */}
          <div
            className={clsx(
              'mx-auto w-full max-w-sm rounded-xl px-10 py-8 shadow-md',
              colors[colorKey].card,
            )}
          >
            <Icon className={clsx('h-8 w-8', colors[colorKey].icon)} />

            <ContentEditable
              html={items[2].name}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[2].name = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-lg font-semibold',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardHeading,
              )}
            />

            <ContentEditable
              html={items[2].description}
              onChange={(e) =>
                setProp(
                  (props: any = { items: [] }) =>
                    (props.items[2].description = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'mt-4 text-sm',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].cardDescription,
              )}
            />
          </div>
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/hero_14-1700432252890.webp"
      name="Hero 14"
      Component={Hero14}
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
    items,
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
    items: node.data.props.items,
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
                  items,
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
                  tagline,
                  heading,
                  description,
                  items,
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
    icon: string;
    card: string;
    cardHeading: string;
    cardDescription: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-400',
    heading: 'text-slate-50',
    description: 'text-slate-300',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500',
    icon: 'fill-slate-600 dark:fill-slate-200',
    card: 'bg-white dark:bg-slate-900',
    cardHeading: 'text-slate-900 dark:text-slate-50',
    cardDescription: 'text-slate-600 dark:text-slate-400',
  },
  gray: {
    tagline: 'text-gray-400',
    heading: 'text-gray-50',
    description: 'text-gray-300',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500',
    icon: 'fill-gray-600 dark:fill-gray-200',
    card: 'bg-white dark:bg-gray-900',
    cardHeading: 'text-gray-900 dark:text-gray-50',
    cardDescription: 'text-gray-600 dark:text-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-400',
    heading: 'text-zinc-50',
    description: 'text-zinc-300',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500',
    icon: 'fill-zinc-600 dark:fill-zinc-200',
    card: 'bg-white dark:bg-zinc-900',
    cardHeading: 'text-zinc-900 dark:text-zinc-50',
    cardDescription: 'text-zinc-600 dark:text-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-400',
    heading: 'text-neutral-50',
    description: 'text-neutral-300',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500',
    icon: 'fill-neutral-600 dark:fill-neutral-200',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-neutral-900 dark:text-neutral-50',
    cardDescription: 'text-neutral-600 dark:text-neutral-400',
  },
  stone: {
    tagline: 'text-stone-400',
    heading: 'text-stone-50',
    description: 'text-stone-300',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500',
    icon: 'fill-stone-600 dark:fill-stone-200',
    card: 'bg-white dark:bg-stone-900',
    cardHeading: 'text-stone-900 dark:text-stone-50',
    cardDescription: 'text-stone-600 dark:text-stone-400',
  },
  red: {
    tagline: 'text-red-400/80',
    heading: 'text-red-50',
    description: 'text-red-50/70',
    primaryCta:
      'bg-red-900 text-white hover:bg-red-800 focus-visible:outline-red-500',
    icon: 'fill-red-600 dark:fill-red-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-red-900 dark:text-red-50',
    cardDescription: 'text-red-950/70 dark:text-red-50/70',
  },
  orange: {
    tagline: 'text-orange-400/80',
    heading: 'text-orange-50',
    description: 'text-orange-50/70',
    primaryCta:
      'bg-orange-900 text-white hover:bg-orange-800 focus-visible:outline-orange-500',
    icon: 'fill-orange-600 dark:fill-orange-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-orange-900 dark:text-orange-50',
    cardDescription: 'text-orange-950/70 dark:text-orange-50/70',
  },
  amber: {
    tagline: 'text-amber-400/80',
    heading: 'text-amber-50',
    description: 'text-amber-50/70',
    primaryCta:
      'bg-amber-900 text-white hover:bg-amber-800 focus-visible:outline-amber-500',
    icon: 'fill-amber-600 dark:fill-amber-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-amber-900 dark:text-amber-50',
    cardDescription: 'text-amber-950/70 dark:text-amber-50/70',
  },
  yellow: {
    tagline: 'text-yellow-400/80',
    heading: 'text-yellow-50',
    description: 'text-yellow-50/70',
    primaryCta:
      'bg-yellow-900 text-white hover:bg-yellow-800 focus-visible:outline-yellow-500',
    icon: 'fill-yellow-600 dark:fill-yellow-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-yellow-900 dark:text-yellow-50',
    cardDescription: 'text-yellow-950/70 dark:text-yellow-50/70',
  },
  lime: {
    tagline: 'text-lime-400/80',
    heading: 'text-lime-50',
    description: 'text-lime-50/70',
    primaryCta:
      'bg-lime-900 text-white hover:bg-lime-800 focus-visible:outline-lime-500',
    icon: 'fill-lime-600 dark:fill-lime-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-lime-900 dark:text-lime-50',
    cardDescription: 'text-lime-950/70 dark:text-lime-50/70',
  },
  green: {
    tagline: 'text-green-400/80',
    heading: 'text-green-50',
    description: 'text-green-50/70',
    primaryCta:
      'bg-green-900 text-white hover:bg-green-800 focus-visible:outline-green-500',
    icon: 'fill-green-600 dark:fill-green-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-green-900 dark:text-green-50',
    cardDescription: 'text-green-950/70 dark:text-green-50/70',
  },
  emerald: {
    tagline: 'text-emerald-400/80',
    heading: 'text-emerald-50',
    description: 'text-emerald-50/70',
    primaryCta:
      'bg-emerald-900 text-white hover:bg-emerald-800 focus-visible:outline-emerald-500',
    icon: 'fill-emerald-600 dark:fill-emerald-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-emerald-900 dark:text-emerald-50',
    cardDescription: 'text-emerald-950/70 dark:text-emerald-50/70',
  },
  teal: {
    tagline: 'text-teal-400/80',
    heading: 'text-teal-50',
    description: 'text-teal-50/70',
    primaryCta:
      'bg-teal-900 text-white hover:bg-teal-800 focus-visible:outline-teal-500',
    icon: 'fill-teal-600 dark:fill-teal-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-teal-900 dark:text-teal-50',
    cardDescription: 'text-teal-950/70 dark:text-teal-50/70',
  },
  cyan: {
    tagline: 'text-cyan-400/80',
    heading: 'text-cyan-50',
    description: 'text-cyan-50/70',
    primaryCta:
      'bg-cyan-900 text-white hover:bg-cyan-800 focus-visible:outline-cyan-500',
    icon: 'fill-cyan-600 dark:fill-cyan-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-cyan-900 dark:text-cyan-50',
    cardDescription: 'text-cyan-950/70 dark:text-cyan-50/70',
  },
  sky: {
    tagline: 'text-sky-400/80',
    heading: 'text-sky-50',
    description: 'text-sky-50/70',
    primaryCta:
      'bg-sky-900 text-white hover:bg-sky-800 focus-visible:outline-sky-500',
    icon: 'fill-sky-600 dark:fill-sky-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-sky-900 dark:text-sky-50',
    cardDescription: 'text-sky-950/70 dark:text-sky-50/70',
  },
  blue: {
    tagline: 'text-blue-400/80',
    heading: 'text-blue-50',
    description: 'text-blue-50/70',
    primaryCta:
      'bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-500',
    icon: 'fill-blue-600 dark:fill-blue-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-blue-900 dark:text-blue-50',
    cardDescription: 'text-blue-950/70 dark:text-blue-50/70',
  },
  indigo: {
    tagline: 'text-indigo-400/80',
    heading: 'text-indigo-50',
    description: 'text-indigo-50/70',
    primaryCta:
      'bg-indigo-900 text-white hover:bg-indigo-800 focus-visible:outline-indigo-500',
    icon: 'fill-indigo-600 dark:fill-indigo-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-indigo-900 dark:text-indigo-50',
    cardDescription: 'text-indigo-950/70 dark:text-indigo-50/70',
  },
  violet: {
    tagline: 'text-violet-400/80',
    heading: 'text-violet-50',
    description: 'text-violet-50/70',
    primaryCta:
      'bg-violet-900 text-white hover:bg-violet-800 focus-visible:outline-violet-500',
    icon: 'fill-violet-600 dark:fill-violet-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-violet-900 dark:text-violet-50',
    cardDescription: 'text-violet-950/70 dark:text-violet-50/70',
  },
  purple: {
    tagline: 'text-purple-400/80',
    heading: 'text-purple-50',
    description: 'text-purple-50/70',
    primaryCta:
      'bg-purple-900 text-white hover:bg-purple-800 focus-visible:outline-purple-500',
    icon: 'fill-purple-600 dark:fill-purple-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-purple-900 dark:text-purple-50',
    cardDescription: 'text-purple-950/70 dark:text-purple-50/70',
  },
  fuchsia: {
    tagline: 'text-fuchsia-400/80',
    heading: 'text-fuchsia-50',
    description: 'text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-900 text-white hover:bg-fuchsia-800 focus-visible:outline-fuchsia-500',
    icon: 'fill-fuchsia-600 dark:fill-fuchsia-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-fuchsia-900 dark:text-fuchsia-50',
    cardDescription: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
  },
  pink: {
    tagline: 'text-pink-400/80',
    heading: 'text-pink-50',
    description: 'text-pink-50/70',
    primaryCta:
      'bg-pink-900 text-white hover:bg-pink-800 focus-visible:outline-pink-500',
    icon: 'fill-pink-600 dark:fill-pink-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-pink-900 dark:text-pink-50',
    cardDescription: 'text-pink-950/70 dark:text-pink-50/70',
  },
  rose: {
    tagline: 'text-rose-400/80',
    heading: 'text-rose-50',
    description: 'text-rose-50/70',
    primaryCta:
      'bg-rose-900 text-white hover:bg-rose-800 focus-visible:outline-rose-500',
    icon: 'fill-rose-600 dark:fill-rose-400',
    card: 'bg-white dark:bg-neutral-900',
    cardHeading: 'text-rose-900 dark:text-rose-50',
    cardDescription: 'text-rose-950/70 dark:text-rose-50/70',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  items,
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
  items: { name: string; description: string }[];
  primaryCta: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedItems = items.map(
    (item) => `
  {
    name: '${item.name}',
    description: '${item.description}',
  },`,
  );

  const itemsString = `[${mappedItems.join('')}]`;

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

const items = ${itemsString};

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
        src="https://dummyimage.com/1920x1200/f5f5f5/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full max-h-[90vh] w-full object-cover brightness-[0.3]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-32 sm:pt-48 lg:pt-56">
          <span className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </span>

          <div className="mt-6">
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

      <div className="relative z-10 mx-auto mb-24 grid max-w-7xl translate-y-2/4 gap-2 px-4 sm:grid-cols-3 sm:px-6 lg:gap-10 lg:px-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="mx-auto w-full max-w-sm rounded-xl px-10 py-8 shadow-md ${colors[colorKey].card}"
          >
            <item.icon className="h-8 w-8 ${colors[colorKey].icon}" />

            <h3 className="mt-4 text-lg font-semibold ${colors[textColorKey].cardHeading}">
              {item.name}
            </h3>

            <p className="mt-4 text-sm ${colors[textColorKey].cardDescription}">
              {item.description}
            </p>
          </div>
        ))}
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

const items = ${itemsString};

export default function Hero() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative h-full w-full',
    )}">
      <img
        src="https://dummyimage.com/1920x1200/f5f5f5/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full max-h-[90vh] w-full object-cover brightness-[0.3]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl pt-32 sm:pt-48 lg:pt-56">
          <span className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </span>

          <div className="mt-6">
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

      <div className="relative z-10 mx-auto mb-24 grid max-w-7xl translate-y-2/4 gap-2 px-4 sm:grid-cols-3 sm:px-6 lg:gap-10 lg:px-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="mx-auto w-full max-w-sm rounded-xl px-10 py-8 shadow-md ${colors[colorKey].card}"
          >
            <item.icon className="h-8 w-8 ${colors[colorKey].icon}" />

            <h3 className="mt-4 text-lg font-semibold ${colors[textColorKey].cardHeading}">
              {item.name}
            </h3>

            <p className="mt-4 text-sm ${colors[textColorKey].cardDescription}">
              {item.description}
            </p>
          </div>
        ))}
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
    tagline,
    heading,
    description,
    items,
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
    items,
    primaryCta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Hero14 from './components/Hero14';`);
  componentContent.push('<Hero14 />');
  return zip.file('components/Hero14.jsx', content);
}

Hero14.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Medium length section heading goes here',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    items: items,
    primaryCta: 'Get started',
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
