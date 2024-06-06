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
import React from 'react';

const features = [
  {
    id: 1,
    name: 'Long feature heading should be included in this section',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    href: '#',
    icon: Icon,
  },
  {
    id: 2,
    name: 'Long feature heading should be included in this section',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    href: '#',
    icon: Icon,
  },
  {
    id: 3,
    name: 'Long feature heading should be included in this section',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
    href: '#',
    icon: Icon,
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Feature4 = ({
  heading = '',
  features = [],
  cta = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  features?: {
    id: number;
    name: string;
    description: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  cta?: string;
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
          'max-w-4xl text-4xl font-bold leading-tight tracking-wide xl:text-5xl',
          'outline-none focus:outline-offset-4 focus:outline-primary',
          colors[textColorKey].heading,
        )}
      />

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex flex-col">
              <Icon
                className={clsx('h-10 w-10 flex-none', colors[colorKey].icon)}
                aria-hidden="true"
              />

              <ContentEditable
                html={feature.name}
                onChange={(e) =>
                  setProp(
                    (props: any) =>
                      (props.features[index].name = e.target.value),
                  )
                }
                tagName="dt"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'mt-4 flex items-center gap-x-3 text-xl font-semibold leading-7',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].featureName,
                )}
              />

              <dd
                className={clsx(
                  'mt-4 flex flex-auto flex-col text-base leading-7',
                  colors[textColorKey].featureDescription,
                )}
              >
                <ContentEditable
                  html={feature.description}
                  onChange={(e) =>
                    setProp(
                      (props: any) =>
                        (props.features[index].description = e.target.value),
                    )
                  }
                  tagName="p"
                  disabled={query.getOptions().enabled ? false : true}
                  className="flex-auto outline-none focus:outline-offset-4 focus:outline-primary"
                />

                <div className="group mt-4">
                  <a
                    className={clsx(
                      'flex items-center gap-x-2 rounded-md bg-transparent py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      colors[textColorKey].cta,
                    )}
                  >
                    <ContentEditable
                      html={cta}
                      onChange={(e) =>
                        setProp(
                          (props: { cta: string }) =>
                            (props.cta = e.target.value),
                        )
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none focus:outline-offset-4 focus:outline-primary"
                    />
                    <ChevronIcon
                      aria-hidden="true"
                      className={clsx('h-4 w-4', colors[textColorKey].ctaIcon)}
                    />
                  </a>
                </div>
              </dd>
            </div>
          ))}
        </dl>
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
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/feature_4-1699473579423.webp"
      name="Feature 4"
      Component={Feature4}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    heading,
    cta,
    features,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
    cta: node.data.props.cta,
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
                  cta,
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
                  cta,
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
    icon: string;
    featureName: string;
    featureDescription: string;
    cta: string;
    ctaIcon: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    icon: 'fill-slate-800 dark:fill-slate-500',
    featureName: 'text-slate-900 dark:text-slate-200',
    featureDescription: 'text-slate-600 dark:text-slate-500',
    cta: 'bg-transparent text-slate-900 ring-slate-500 hover:text-slate-700 focus-visible:outline-slate-500 dark:text-slate-100 dark:ring-slate-600 dark:hover:text-slate-300 dark:focus-visible:outline-slate-400',
    ctaIcon: 'hover:text-slate-700 dark:hover:text-slate-300',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    icon: 'fill-gray-800 dark:fill-gray-500',
    featureName: 'text-gray-900 dark:text-gray-200',
    featureDescription: 'text-gray-600 dark:text-gray-500',
    cta: 'bg-transparent text-gray-900 ring-gray-500 hover:text-gray-700 focus-visible:outline-gray-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:text-gray-300 dark:focus-visible:outline-gray-400',
    ctaIcon: 'hover:text-gray-700 dark:hover:text-gray-300',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    icon: 'fill-zinc-900 dark:fill-zinc-50',
    featureName: 'text-zinc-900 dark:text-zinc-200',
    featureDescription: 'text-zinc-600 dark:text-zinc-500',
    cta: 'bg-transparent text-zinc-900 ring-zinc-500 hover:text-zinc-700 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:text-zinc-300 dark:focus-visible:outline-zinc-400',
    ctaIcon: 'hover:text-zinc-700 dark:hover:text-zinc-300',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    icon: 'fill-neutral-800 dark:fill-neutral-500',
    featureName: 'text-neutral-900 dark:text-neutral-200',
    featureDescription: 'text-neutral-600 dark:text-neutral-500',
    cta: 'bg-transparent text-neutral-900 ring-neutral-500 hover:text-neutral-700 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:text-neutral-300 dark:focus-visible:outline-neutral-400',
    ctaIcon: 'hover:text-neutral-700 dark:hover:text-neutral-300',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    icon: 'fill-stone-800 dark:fill-stone-500',
    featureName: 'text-stone-900 dark:text-stone-200',
    featureDescription: 'text-stone-600 dark:text-stone-500',
    cta: 'bg-transparent text-stone-900 ring-stone-500 hover:text-stone-700 focus-visible:outline-stone-500 dark:text-stone-100 dark:ring-stone-600 dark:hover:text-stone-300 dark:focus-visible:outline-stone-400',
    ctaIcon: 'hover:text-stone-700 dark:hover:text-stone-300',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    icon: 'fill-red-800 dark:fill-red-600/60',
    featureName: 'text-red-900 dark:text-red-100',
    featureDescription: 'text-red-900/80 dark:text-red-100/50',
    cta: 'bg-transparent text-red-900 ring-red-500 hover:text-red-700 focus-visible:outline-red-500 dark:text-red-100 dark:ring-red-600 dark:hover:text-red-200 dark:focus-visible:outline-red-400',
    ctaIcon: 'hover:text-red-700 dark:hover:text-red-300',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    icon: 'fill-orange-800 dark:fill-orange-600/60',
    featureName: 'text-orange-900 dark:text-orange-100',
    featureDescription: 'text-orange-900/80 dark:text-orange-100/50',
    cta: 'bg-transparent text-orange-900 ring-orange-500 hover:text-orange-700 focus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-600 dark:hover:text-orange-200 dark:focus-visible:outline-orange-400',
    ctaIcon: 'hover:text-orange-700 dark:hover:text-orange-300',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    icon: 'fill-amber-800 dark:fill-amber-600/60',
    featureName: 'text-amber-900 dark:text-amber-100',
    featureDescription: 'text-amber-900/80 dark:text-amber-100/50',
    cta: 'bg-transparent text-amber-900 ring-amber-500 hover:text-amber-700 focus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-600 dark:hover:text-amber-200 dark:focus-visible:outline-amber-400',
    ctaIcon: 'hover:text-amber-700 dark:hover:text-amber-300',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    icon: 'fill-yellow-800 dark:fill-yellow-600/60',
    featureName: 'text-yellow-900 dark:text-yellow-100',
    featureDescription: 'text-yellow-900/80 dark:text-yellow-100/50',
    cta: 'bg-transparent text-yellow-900 ring-yellow-500 hover:text-yellow-700 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-600 dark:hover:text-yellow-200 dark:focus-visible:outline-yellow-400',
    ctaIcon: 'hover:text-yellow-700 dark:hover:text-yellow-300',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    icon: 'fill-lime-800 dark:fill-lime-600/60',
    featureName: 'text-lime-900 dark:text-lime-100',
    featureDescription: 'text-lime-900/80 dark:text-lime-100/50',
    cta: 'bg-transparent text-lime-900 ring-lime-500 hover:text-lime-700 focus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-600 dark:hover:text-lime-200 dark:focus-visible:outline-lime-400',
    ctaIcon: 'hover:text-lime-700 dark:hover:text-lime-300',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    icon: 'fill-green-800 dark:fill-green-600/60',
    featureName: 'text-green-900 dark:text-green-100',
    featureDescription: 'text-green-900/80 dark:text-green-100/50',
    cta: 'bg-transparent text-green-900 ring-green-500 hover:text-green-700 focus-visible:outline-green-500 dark:text-green-100 dark:ring-green-600 dark:hover:text-green-200 dark:focus-visible:outline-green-400',
    ctaIcon: 'hover:text-green-700 dark:hover:text-green-300',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    icon: 'fill-emerald-800 dark:fill-emerald-600/60',
    featureName: 'text-emerald-900 dark:text-emerald-100',
    featureDescription: 'text-emerald-900/80 dark:text-emerald-100/50',
    cta: 'bg-transparent text-emerald-900 ring-emerald-500 hover:text-emerald-700 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-600 dark:hover:text-emerald-200 dark:focus-visible:outline-emerald-400',
    ctaIcon: 'hover:text-emerald-700 dark:hover:text-emerald-300',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    icon: 'fill-teal-800 dark:fill-teal-600/60',
    featureName: 'text-teal-900 dark:text-teal-100',
    featureDescription: 'text-teal-900/80 dark:text-teal-100/50',
    cta: 'bg-transparent text-teal-900 ring-teal-500 hover:text-teal-700 focus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-600 dark:hover:text-teal-200 dark:focus-visible:outline-teal-400',
    ctaIcon: 'hover:text-teal-700 dark:hover:text-teal-300',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    icon: 'fill-cyan-800 dark:fill-cyan-600/60',
    featureName: 'text-cyan-900 dark:text-cyan-100',
    featureDescription: 'text-cyan-900/80 dark:text-cyan-100/50',
    cta: 'bg-transparent text-cyan-900 ring-cyan-500 hover:text-cyan-700 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-600 dark:hover:text-cyan-200 dark:focus-visible:outline-cyan-400',
    ctaIcon: 'hover:text-cyan-700 dark:hover:text-cyan-300',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    icon: 'fill-sky-800 dark:fill-sky-600/60',
    featureName: 'text-sky-900 dark:text-sky-100',
    featureDescription: 'text-sky-900/80 dark:text-sky-100/50',
    cta: 'bg-transparent text-sky-900 ring-sky-500 hover:text-sky-700 focus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-600 dark:hover:text-sky-200 dark:focus-visible:outline-sky-400',
    ctaIcon: 'hover:text-sky-700 dark:hover:text-sky-300',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    icon: 'fill-blue-800 dark:fill-blue-600/60',
    featureName: 'text-blue-900 dark:text-blue-100',
    featureDescription: 'text-blue-900/80 dark:text-blue-100/50',
    cta: 'bg-transparent text-blue-900 ring-blue-500 hover:text-blue-700 focus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-600 dark:hover:text-blue-200 dark:focus-visible:outline-blue-400',
    ctaIcon: 'hover:text-blue-700 dark:hover:text-blue-300',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    icon: 'fill-indigo-800 dark:fill-indigo-600/60',
    featureName: 'text-indigo-900 dark:text-indigo-100',
    featureDescription: 'text-indigo-900/80 dark:text-indigo-100/50',
    cta: 'bg-transparent text-indigo-900 ring-indigo-500 hover:text-indigo-700 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-600 dark:hover:text-indigo-200 dark:focus-visible:outline-indigo-400',
    ctaIcon: 'hover:text-indigo-700 dark:hover:text-indigo-300',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    icon: 'fill-violet-800 dark:fill-violet-600/60',
    featureName: 'text-violet-900 dark:text-violet-100',
    featureDescription: 'text-violet-900/80 dark:text-violet-100/50',
    cta: 'bg-transparent text-violet-900 ring-violet-500 hover:text-violet-700 focus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-600 dark:hover:text-violet-200 dark:focus-visible:outline-violet-400',
    ctaIcon: 'hover:text-violet-700 dark:hover:text-violet-300',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    icon: 'fill-purple-800 dark:fill-purple-600/60',
    featureName: 'text-purple-900 dark:text-purple-100',
    featureDescription: 'text-purple-900/80 dark:text-purple-100/50',
    cta: 'bg-transparent text-purple-900 ring-purple-500 hover:text-purple-700 focus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-600 dark:hover:text-purple-200 dark:focus-visible:outline-purple-400',
    ctaIcon: 'hover:text-purple-700 dark:hover:text-purple-300',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    icon: 'fill-fuchsia-800 dark:fill-fuchsia-600/60',
    featureName: 'text-fuchsia-900 dark:text-fuchsia-100',
    featureDescription: 'text-fuchsia-900/80 dark:text-fuchsia-100/50',
    cta: 'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:text-fuchsia-700 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-600 dark:hover:text-fuchsia-200 dark:focus-visible:outline-fuchsia-400',
    ctaIcon: 'hover:text-fuchsia-700 dark:hover:text-fuchsia-300',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    icon: 'fill-pink-800 dark:fill-pink-600/60',
    featureName: 'text-pink-900 dark:text-pink-100',
    featureDescription: 'text-pink-900/80 dark:text-pink-100/50',
    cta: 'bg-transparent text-pink-900 ring-pink-500 hover:text-pink-700 focus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-600 dark:hover:text-pink-200 dark:focus-visible:outline-pink-400',
    ctaIcon: 'hover:text-pink-700 dark:hover:text-pink-300',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    icon: 'fill-rose-800 dark:fill-rose-600/60',
    featureName: 'text-rose-900 dark:text-rose-100',
    featureDescription: 'text-rose-900/80 dark:text-rose-100/50',
    cta: 'bg-transparent text-rose-900 ring-rose-500 hover:text-rose-700 focus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-600 dark:hover:text-rose-200 dark:focus-visible:outline-rose-400',
    ctaIcon: 'hover:text-rose-700 dark:hover:text-rose-300',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  features,
  cta,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  cta: string;
  features: {
    id: string;
    name: string;
    description: string;
    href: string;
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

  const mappedFeatures = features.map(
    (feature) => `
  {
    id: '${feature.id}',
    name: '${removeHtmlTags(feature.name)}',
    description: '${removeHtmlTags(feature.description)}',
    href: '#',
    icon: Icon,
  },`,
  );

  const featuresString = `[${mappedFeatures.join(',\n')}]`;

  let content: string;

  const nextContent = `import Link from 'next/link';

const features = ${featuresString};

export default function Feature() {
  return (
     <div className="${clsx(
       maxWidth,
       marginArray.join(' '),
       paddingArray.join(' '),
     )}">
      <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
        ${removeHtmlTags(heading)}
      </h2>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <feature.icon
                className="h-10 w-10 flex-none ${colors[colorKey].icon}"
                aria-hidden="true"
              />

              <dt className="mt-4 flex items-center gap-x-3 text-xl font-semibold leading-7 ${colors[textColorKey].featureName}">
                {feature.name}
              </dt>

              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 ${colors[textColorKey].featureDescription}">
                <p className="flex-auto">
                  {feature.description}
                </p>

                <div className="group mt-4">
                  <Link
                    href="#"
                    className="flex items-center gap-x-2 rounded-md py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[textColorKey].cta}"
                  >
                    ${removeHtmlTags(cta)}
                    <ChevronIcon
                      aria-hidden="true"
                      className="h-4 w-4 ${colors[textColorKey].ctaIcon}"
                    />
                  </Link>
                </div>
              </dd>
            </div>
          ))}
        </dl>
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

const features = ${featuresString};

export default function Feature() {
  return (
     <div className="${clsx(
       maxWidth,
       marginArray.join(' '),
       paddingArray.join(' '),
     )}">
      <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
        ${removeHtmlTags(heading)}
      </h2>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <feature.icon
                className="h-10 w-10 flex-none ${colors[colorKey].icon}"
                aria-hidden="true"
              />

              <dt className="mt-4 flex items-center gap-x-3 text-xl font-semibold leading-7 ${colors[textColorKey].featureName}">
                {feature.name}
              </dt>

              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 ${colors[textColorKey].featureDescription}">
                <p className="flex-auto">
                  {feature.description}
                </p>

                <div className="group mt-4">
                  <a
                    href="#"
                    className="flex items-center gap-x-2 rounded-md py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[textColorKey].cta}"
                  >
                    ${removeHtmlTags(cta)}
                    <ChevronIcon
                      aria-hidden="true"
                      className="h-4 w-4 ${colors[textColorKey].ctaIcon}"
                    />
                  </a>
                </div>
              </dd>
            </div>
          ))}
        </dl>
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
    cta,
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
    cta,
    features,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Feature4 from './components/Feature4';`);
  componentContent.push('<Feature4 />');
  return zip.file('components/Feature4.jsx', content);
}

Feature4.craft = {
  props: {
    heading: 'Medium length section heading goes here',
    cta: 'Learn more',
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
