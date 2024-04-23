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

import ReactPlayer from 'react-player/lazy';

const features = [
  {
    id: 1,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    icon: Icon,
  },
  {
    id: 2,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    icon: Icon,
  },
  {
    id: 3,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    icon: Icon,
  },
  {
    id: 4,
    name: 'Short heading here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    icon: Icon,
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Feature9 = ({
  featureCta = '',
  primaryCta = '',
  secondaryCta = '',
  features = [],
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  featureCta?: string;
  primaryCta?: string;
  secondaryCta?: string;
  features?: {
    id: number;
    name: string;
    description: string;
    href: string;
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
      ref={(ref) => connect(drag(ref as HTMLElement))}
      classes={clsx(maxWidth)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div className="grid grid-cols-1 items-center gap-14 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col gap-2 lg:gap-4">
                <Icon
                  className={clsx('h-10 w-10 flex-none', colors[colorKey].icon)}
                  aria-hidden="true"
                />

                <ContentEditable
                  html={feature.name}
                  onChange={(e) =>
                    setProp(
                      (props: any) =>
                        (props.features[feature.id - 1].name = e.target.value),
                    )
                  }
                  tagName="dt"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    'flex items-center gap-x-3 text-xl font-semibold leading-7',
                    'outline-none focus:outline-offset-4 focus:outline-primary',
                    colors[textColorKey].heading,
                  )}
                />

                <dd className="flex flex-auto flex-col text-base leading-7">
                  <ContentEditable
                    html={feature.name}
                    onChange={(e) =>
                      setProp(
                        (props: any) =>
                          (props.features[feature.id - 1].name =
                            e.target.value),
                      )
                    }
                    tagName="p"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'flex-auto',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].description,
                    )}
                  />

                  <div className="group">
                    <a
                      className={clsx(
                        'flex items-center gap-x-2 rounded-md bg-transparent py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                        colors[colorKey].cta,
                      )}
                    >
                      <ContentEditable
                        html={featureCta}
                        onChange={(e) =>
                          setProp(
                            (props: { featureCta: string }) =>
                              (props.featureCta = e.target.value),
                          )
                        }
                        tagName="span"
                        disabled={query.getOptions().enabled ? false : true}
                        className="outline-none focus:outline-offset-4 focus:outline-primary"
                      />
                      <ChevronIcon
                        aria-hidden="true"
                        className={clsx('h-4 w-4', colors[colorKey].chevron)}
                      />
                    </a>
                  </div>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex justify-center space-x-4 xl:justify-start">
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
                'rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'outline-none focus:outline-offset-4',
                colors[colorKey].secondaryCta,
              )}
            />
          </div>
        </div>

        <div className="relative order-last mx-auto h-full w-full max-w-2xl bg-neutral-300 pt-[56.25%]">
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light="https://dummyimage.com/"
            className="absolute left-0 top-0"
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/feature_9-1699971755515.webp"
      name="Feature 9"
      Component={Feature9}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    features,
    cta,
    primaryCta,
    secondaryCta,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    features: node.data.props.features,
    cta: node.data.props.cta,
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
                  features,
                  cta,
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
                  features,
                  cta,
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
    cta: string;
    primaryCta: string;
    secondaryCta: string;
    icon: string;
    chevron: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    cta: 'bg-transparent text-slate-600 ring-slate-500 hover:text-slate-700 focus-visible:outline-slate-500 dark:text-slate-100 dark:ring-slate-600 dark:hover:text-slate-200 dark:focus-visible:outline-slate-400',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    secondaryCta:
      'bg-transparent text-slate-900 ring-slate-500 hover:bg-slate-100 focus-visible:outline-slate-500 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-400',
    icon: 'fill-slate-800 dark:fill-slate-100',
    chevron: 'hover:text-slate-500 dark:hover:text-slate-300',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    cta: 'bg-transparent text-gray-600 ring-gray-500 hover:text-gray-700 focus-visible:outline-gray-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:text-gray-200 dark:focus-visible:outline-gray-400',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    secondaryCta:
      'bg-transparent text-gray-900 ring-gray-500 hover:bg-gray-100 focus-visible:outline-gray-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-400',
    icon: 'fill-gray-800 dark:fill-gray-100',
    chevron: 'hover:text-gray-500 dark:hover:text-gray-300',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    cta: 'bg-transparent text-zinc-600 ring-zinc-500 hover:text-zinc-700 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:text-zinc-200 dark:focus-visible:outline-zinc-400',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    secondaryCta:
      'bg-transparent text-zinc-900 ring-zinc-500 hover:bg-zinc-100 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400',
    icon: 'fill-zinc-800 dark:fill-zinc-100',
    chevron: 'hover:text-zinc-500 dark:hover:text-zinc-300',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    cta: 'bg-transparent text-neutral-600 ring-neutral-500 hover:text-neutral-700 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:text-neutral-200 dark:focus-visible:outline-neutral-400',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    secondaryCta:
      'bg-transparent text-neutral-900 ring-neutral-500 hover:bg-neutral-100 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
    icon: 'fill-neutral-800 dark:fill-neutral-100',
    chevron: 'hover:text-neutral-500 dark:hover:text-neutral-300',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    cta: 'bg-transparent text-stone-600 ring-stone-500 hover:text-stone-700 focus-visible:outline-stone-500 dark:text-stone-100 dark:ring-stone-600 dark:hover:text-stone-200 dark:focus-visible:outline-stone-400',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    secondaryCta:
      'bg-transparent text-stone-900 ring-stone-500 hover:bg-stone-100 focus-visible:outline-stone-500 dark:text-stone-100 dark:ring-stone-600 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400',
    icon: 'fill-stone-800 dark:fill-stone-100',
    chevron: 'hover:text-stone-500 dark:hover:text-stone-300',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    cta: 'bg-transparent text-red-800 ring-red-500 hover:text-red-700 focus-visible:outline-red-500 dark:text-red-600 dark:ring-red-600 dark:hover:text-red-500 dark:focus-visible:outline-red-400',
    primaryCta:
      'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
    secondaryCta:
      'bg-transparent text-red-900 ring-red-500 hover:bg-red-100 focus-visible:outline-red-500 dark:text-red-100 dark:ring-red-800 dark:hover:bg-red-900/30 dark:focus-visible:outline-red-400',
    icon: 'fill-red-700 dark:fill-red-600',
    chevron: 'hover:text-red-600 dark:hover:text-red-400',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    cta: 'bg-transparent text-orange-800 ring-orange-500 hover:text-orange-700 focus-visible:outline-orange-500 dark:text-orange-600 dark:ring-orange-600 dark:hover:text-orange-500 dark:focus-visible:outline-orange-400',
    primaryCta:
      'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
    secondaryCta:
      'bg-transparent text-orange-900 ring-orange-500 hover:bg-orange-100 focus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-800 dark:hover:bg-orange-900/30 dark:focus-visible:outline-orange-400',
    icon: 'fill-orange-700 dark:fill-orange-600',
    chevron: 'hover:text-orange-600 dark:hover:text-orange-400',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    cta: 'bg-transparent text-amber-800 ring-amber-500 hover:text-amber-700 focus-visible:outline-amber-500 dark:text-amber-600 dark:ring-amber-600 dark:hover:text-amber-500 dark:focus-visible:outline-amber-400',
    primaryCta:
      'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
    secondaryCta:
      'bg-transparent text-amber-900 ring-amber-500 hover:bg-amber-100 focus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-800 dark:hover:bg-amber-900/30 dark:focus-visible:outline-amber-400',
    icon: 'fill-amber-700 dark:fill-amber-600',
    chevron: 'hover:text-amber-600 dark:hover:text-amber-400',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    cta: 'bg-transparent text-yellow-800 ring-yellow-500 hover:text-yellow-700 focus-visible:outline-yellow-500 dark:text-yellow-600 dark:ring-yellow-600 dark:hover:text-yellow-500 dark:focus-visible:outline-yellow-400',
    primaryCta:
      'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
    secondaryCta:
      'bg-transparent text-yellow-900 ring-yellow-500 hover:bg-yellow-100 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-800 dark:hover:bg-yellow-900/30 dark:focus-visible:outline-yellow-400',
    icon: 'fill-yellow-700 dark:fill-yellow-600',
    chevron: 'hover:text-yellow-600 dark:hover:text-yellow-400',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    cta: 'bg-transparent text-lime-800 ring-lime-500 hover:text-lime-700 focus-visible:outline-lime-500 dark:text-lime-600 dark:ring-lime-600 dark:hover:text-lime-500 dark:focus-visible:outline-lime-400',
    primaryCta:
      'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
    secondaryCta:
      'bg-transparent text-lime-900 ring-lime-500 hover:bg-lime-100 focus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-800 dark:hover:bg-lime-900/30 dark:focus-visible:outline-lime-400',
    icon: 'fill-lime-700 dark:fill-lime-600',
    chevron: 'hover:text-lime-600 dark:hover:text-lime-400',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    cta: 'bg-transparent text-green-800 ring-green-500 hover:text-green-700 focus-visible:outline-green-500 dark:text-green-600 dark:ring-green-600 dark:hover:text-green-500 dark:focus-visible:outline-green-400',
    primaryCta:
      'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
    secondaryCta:
      'bg-transparent text-green-900 ring-green-500 hover:bg-green-100 focus-visible:outline-green-500 dark:text-green-100 dark:ring-green-800 dark:hover:bg-green-900/30 dark:focus-visible:outline-green-400',
    icon: 'fill-green-700 dark:fill-green-600',
    chevron: 'hover:text-green-600 dark:hover:text-green-400',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    cta: 'bg-transparent text-emerald-800 ring-emerald-500 hover:text-emerald-700 focus-visible:outline-emerald-500 dark:text-emerald-600 dark:ring-emerald-600 dark:hover:text-emerald-500 dark:focus-visible:outline-emerald-400',
    primaryCta:
      'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
    secondaryCta:
      'bg-transparent text-emerald-900 ring-emerald-500 hover:bg-emerald-100 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-800 dark:hover:bg-emerald-900/30 dark:focus-visible:outline-emerald-400',
    icon: 'fill-emerald-700 dark:fill-emerald-600',
    chevron: 'hover:text-emerald-600 dark:hover:text-emerald-400',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    cta: 'bg-transparent text-teal-800 ring-teal-500 hover:text-teal-700 focus-visible:outline-teal-500 dark:text-teal-600 dark:ring-teal-600 dark:hover:text-teal-500 dark:focus-visible:outline-teal-400',
    primaryCta:
      'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
    secondaryCta:
      'bg-transparent text-teal-900 ring-teal-500 hover:bg-teal-100 focus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-800 dark:hover:bg-teal-900/30 dark:focus-visible:outline-teal-400',
    icon: 'fill-teal-700 dark:fill-teal-600',
    chevron: 'hover:text-teal-600 dark:hover:text-teal-400',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    cta: 'bg-transparent text-cyan-800 ring-cyan-500 hover:text-cyan-700 focus-visible:outline-cyan-500 dark:text-cyan-600 dark:ring-cyan-600 dark:hover:text-cyan-500 dark:focus-visible:outline-cyan-400',
    primaryCta:
      'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
    secondaryCta:
      'bg-transparent text-cyan-900 ring-cyan-500 hover:bg-cyan-100 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-800 dark:hover:bg-cyan-900/30 dark:focus-visible:outline-cyan-400',
    icon: 'fill-cyan-700 dark:fill-cyan-600',
    chevron: 'hover:text-cyan-600 dark:hover:text-cyan-400',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    cta: 'bg-transparent text-sky-800 ring-sky-500 hover:text-sky-700 focus-visible:outline-sky-500 dark:text-sky-600 dark:ring-sky-600 dark:hover:text-sky-500 dark:focus-visible:outline-sky-400',
    primaryCta:
      'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
    secondaryCta:
      'bg-transparent text-sky-900 ring-sky-500 hover:bg-sky-100 focus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-800 dark:hover:bg-sky-900/30 dark:focus-visible:outline-sky-400',
    icon: 'fill-sky-700 dark:fill-sky-600',
    chevron: 'hover:text-sky-600 dark:hover:text-sky-400',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    cta: 'bg-transparent text-blue-800 ring-blue-500 hover:text-blue-700 focus-visible:outline-blue-500 dark:text-blue-600 dark:ring-blue-600 dark:hover:text-blue-500 dark:focus-visible:outline-blue-400',
    primaryCta:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
    secondaryCta:
      'bg-transparent text-blue-900 ring-blue-500 hover:bg-blue-100 focus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-800 dark:hover:bg-blue-900/30 dark:focus-visible:outline-blue-400',
    icon: 'fill-blue-700 dark:fill-blue-600',
    chevron: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    cta: 'bg-transparent text-indigo-800 ring-indigo-500 hover:text-indigo-700 focus-visible:outline-indigo-500 dark:text-indigo-600 dark:ring-indigo-600 dark:hover:text-indigo-500 dark:focus-visible:outline-indigo-400',
    primaryCta:
      'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
    secondaryCta:
      'bg-transparent text-indigo-900 ring-indigo-500 hover:bg-indigo-100 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-800 dark:hover:bg-indigo-900/30 dark:focus-visible:outline-indigo-400',
    icon: 'fill-indigo-700 dark:fill-indigo-600',
    chevron: 'hover:text-indigo-600 dark:hover:text-indigo-400',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    cta: 'bg-transparent text-violet-800 ring-violet-500 hover:text-violet-700 focus-visible:outline-violet-500 dark:text-violet-600 dark:ring-violet-600 dark:hover:text-violet-500 dark:focus-visible:outline-violet-400',
    primaryCta:
      'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
    secondaryCta:
      'bg-transparent text-violet-900 ring-violet-500 hover:bg-violet-100 focus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-800 dark:hover:bg-violet-900/30 dark:focus-visible:outline-violet-400',
    icon: 'fill-violet-700 dark:fill-violet-600',
    chevron: 'hover:text-violet-600 dark:hover:text-violet-400',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    cta: 'bg-transparent text-purple-800 ring-purple-500 hover:text-purple-700 focus-visible:outline-purple-500 dark:text-purple-600 dark:ring-purple-600 dark:hover:text-purple-500 dark:focus-visible:outline-purple-400',
    primaryCta:
      'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
    secondaryCta:
      'bg-transparent text-purple-900 ring-purple-500 hover:bg-purple-100 focus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-800 dark:hover:bg-purple-900/30 dark:focus-visible:outline-purple-400',
    icon: 'fill-purple-700 dark:fill-purple-600',
    chevron: 'hover:text-purple-600 dark:hover:text-purple-400',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    cta: 'bg-transparent text-fuchsia-800 ring-fuchsia-500 hover:text-fuchsia-700 focus-visible:outline-fuchsia-500 dark:text-fuchsia-600 dark:ring-fuchsia-600 dark:hover:text-fuchsia-500 dark:focus-visible:outline-fuchsia-400',
    primaryCta:
      'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
    secondaryCta:
      'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:bg-fuchsia-100 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-800 dark:hover:bg-fuchsia-900/30 dark:focus-visible:outline-fuchsia-400',
    icon: 'fill-fuchsia-700 dark:fill-fuchsia-600',
    chevron: 'hover:text-fuchsia-600 dark:hover:text-fuchsia-400',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    cta: 'bg-transparent text-pink-800 ring-pink-500 hover:text-pink-700 focus-visible:outline-pink-500 dark:text-pink-600 dark:ring-pink-600 dark:hover:text-pink-500 dark:focus-visible:outline-pink-400',
    primaryCta:
      'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
    secondaryCta:
      'bg-transparent text-pink-900 ring-pink-500 hover:bg-pink-100 focus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-800 dark:hover:bg-pink-900/30 dark:focus-visible:outline-pink-400',
    icon: 'fill-pink-700 dark:fill-pink-600',
    chevron: 'hover:text-pink-600 dark:hover:text-pink-400',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    cta: 'bg-transparent text-rose-800 ring-rose-500 hover:text-rose-700 focus-visible:outline-rose-500 dark:text-rose-600 dark:ring-rose-600 dark:hover:text-rose-500 dark:focus-visible:outline-rose-400',
    primaryCta:
      'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
    secondaryCta:
      'bg-transparent text-rose-900 ring-rose-500 hover:bg-rose-100 focus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-800 dark:hover:bg-rose-900/30 dark:focus-visible:outline-rose-400',
    icon: 'fill-rose-700 dark:fill-rose-600',
    chevron: 'hover:text-rose-600 dark:hover:text-rose-400',
  },
};

function generateComponentString({
  isNextjs,
  features,
  cta,
  primaryCta,
  secondaryCta,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  features: {
    id: number;
    name: string;
    description: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  cta: string;
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

  const mappedFeatures = features.map(
    (feature) => `
    {
        id: ${feature.id},
        name: '${removeHtmlTags(feature.name)}',
        description: '${removeHtmlTags(feature.description)}',
        href: '#',
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

You need to install the following package: npm install react-player
*/

'use client';

import Link from 'next/link';
import ReactPlayer from 'react-player/lazy';

const features = ${featuresString};

export default function Feature() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col gap-2 lg:gap-4">
                <feature.icon
                  className="h-10 w-10 flex-none ${colors[colorKey].icon}"
                  aria-hidden="true"
                />

                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 ${colors[textColorKey].heading}">
                  {feature.name}
                </dt>

                <dd className="flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto ${colors[textColorKey].description}">
                    {feature.description}
                  </p>

                  <div className="group">
                    <Link
                      href="#"
                      className="flex items-center gap-x-2 rounded-md py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                    >
                      ${removeHtmlTags(cta)}
                      <ChevronIcon
                        aria-hidden="true"
                        className="h-4 w-4 ${colors[colorKey].chevron}"
                      />
                    </Link>
                  </div>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex justify-center space-x-4 xl:justify-start">
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

        <div className="relative order-last mx-auto h-full w-full max-w-2xl bg-neutral-300 pt-[56.25%]">
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light="https://dummyimage.com/"
            className="absolute left-0 top-0"
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

  const reactContent = `/*
You need to install the following package: npm install react-player
*/

import React from 'react';

const features = ${featuresString};

export default function Feature() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col gap-2 lg:gap-4">
                <feature.icon
                  className="h-10 w-10 flex-none ${colors[colorKey].icon}"
                  aria-hidden="true"
                />

                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 ${colors[textColorKey].heading}">
                  {feature.name}
                </dt>

                <dd className="flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto ${colors[textColorKey].description}">
                    {feature.description}
                  </p>

                  <div className="group">
                    <a
                      href="#"
                      className="flex items-center gap-x-2 rounded-md py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                    >
                      ${removeHtmlTags(cta)}
                      <ChevronIcon
                        aria-hidden="true"
                        className="h-4 w-4 ${colors[colorKey].chevron}"
                      />
                    </a>
                  </div>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex justify-center space-x-4 xl:justify-start">
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

        <div className="relative order-last mx-auto h-full w-full max-w-2xl bg-neutral-300 pt-[56.25%]">
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light="https://dummyimage.com/"
            className="absolute left-0 top-0"
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
    features,
    cta,
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
    features,
    cta,
    primaryCta,
    secondaryCta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Feature9 from './components/Feature9';`);
  componentContent.push('<Feature9 />');
  return zip.file('components/Feature9.jsx', content);
}

Feature9.craft = {
  props: {
    features: features,
    featureCta: 'Learn more',
    primaryCta: 'Get started',
    secondaryCta: 'Learn more',
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
