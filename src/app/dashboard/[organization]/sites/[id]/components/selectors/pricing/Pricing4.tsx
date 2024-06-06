'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Trans from '~/core/ui/Trans';

import { useState } from 'react';

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

const tier = {
  name: 'Premium',
  id: 'premium',
  href: '#',
  price: { monthly: '$9.99', annually: '$99.99' },
  features: [
    '1# Feature text goes here',
    '2# Feature text goes here',
    '3# Feature text goes here',
    '4# Feature text goes here',
  ],
  cta: 'Get Started',
};

type Tier = {
  name: string;
  price: { monthly: string; annually: string };
  features: string[];
  cta: string;
};

export const Pricing4 = ({
  tagline = '',
  heading = '',
  description = '',
  tier = {
    name: '',
    price: { monthly: '', annually: '' },
    features: ['', '', ''],
    cta: '',
  },
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
  tier?: Tier;
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

  const [isMonthly, setIsMonthly] = useState(false);

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
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
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
      </div>

      <div className="mt-14 flex justify-center lg:mt-24">
        <button
          className={clsx(
            isMonthly ? colors[colorKey].isActive : colors[colorKey].isInactive,
            'rounded-l-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={clsx(
            isMonthly ? colors[colorKey].isInactive : colors[colorKey].isActive,
            'rounded-r-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(false)}
        >
          Annual
        </button>
      </div>

      <div className="mt-10 flex justify-center lg:mx-0 lg:mt-14">
        <div
          className={clsx(
            'flex w-full max-w-md flex-col justify-between space-y-10 rounded-xl p-8 text-center ring-1 lg:px-10 lg:py-14',
            colors[colorKey].card,
          )}
        >
          <div>
            <ContentEditable
              html={tier.name}
              onChange={(e) =>
                setProp(
                  (props: { tier: Tier }) => (props.tier.name = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-lg font-semibold leading-8',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].tierName,
              )}
            />

            <div className="mt-2 flex flex-col space-y-4">
              <p className="flex items-baseline justify-center gap-x-1">
                {isMonthly ? (
                  <ContentEditable
                    html={tier.price.monthly}
                    onChange={(e) =>
                      setProp(
                        (props: { tier: Tier }) =>
                          (props.tier.price.monthly = e.target.value),
                      )
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-5xl font-bold tracking-tight',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].priceMonthly,
                    )}
                  />
                ) : (
                  <ContentEditable
                    html={tier.price.annually}
                    onChange={(e) =>
                      setProp(
                        (props: { tier: Tier }) =>
                          (props.tier.price.annually = e.target.value),
                      )
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-5xl font-bold tracking-tight',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].priceMonthly,
                    )}
                  />
                )}

                <span className={colors[textColorKey].monthly}>
                  {isMonthly ? '/month' : '/year'}
                </span>
              </p>
            </div>

            <ul
              role="list"
              className={clsx(
                'mt-6 space-y-3 text-sm leading-6',
                colors[textColorKey].features,
              )}
            >
              <li className="flex gap-x-3">
                <CheckIcon
                  className={clsx(
                    'h-6 w-5 flex-none',
                    colors[colorKey].checkIcon,
                  )}
                  aria-hidden="true"
                />
                <ContentEditable
                  html={tier.features[0]}
                  onChange={(e) =>
                    setProp(
                      (props: { tier: Tier }) =>
                        (props.tier.features[0] = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />
              </li>

              <li className="flex gap-x-3">
                <CheckIcon
                  className={clsx(
                    'h-6 w-5 flex-none',
                    colors[colorKey].checkIcon,
                  )}
                  aria-hidden="true"
                />
                <ContentEditable
                  html={tier.features[1]}
                  onChange={(e) =>
                    setProp(
                      (props: { tier: Tier }) =>
                        (props.tier.features[1] = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />
              </li>

              <li className="flex gap-x-3">
                <CheckIcon
                  className={clsx(
                    'h-6 w-5 flex-none',
                    colors[colorKey].checkIcon,
                  )}
                  aria-hidden="true"
                />
                <ContentEditable
                  html={tier.features[2]}
                  onChange={(e) =>
                    setProp(
                      (props: { tier: Tier }) =>
                        (props.tier.features[2] = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />
              </li>

              <li className="flex gap-x-3">
                <CheckIcon
                  className={clsx(
                    'h-6 w-5 flex-none',
                    colors[colorKey].checkIcon,
                  )}
                  aria-hidden="true"
                />
                <ContentEditable
                  html={tier.features[3]}
                  onChange={(e) =>
                    setProp(
                      (props: { tier: Tier }) =>
                        (props.tier.features[3] = e.target.value),
                    )
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none focus:outline-offset-4 focus:outline-primary"
                />
              </li>
            </ul>
          </div>

          <ContentEditable
            html={tier.cta}
            onChange={(e) =>
              setProp(
                (props: { tier: Tier }) => (props.tier.cta = e.target.value),
              )
            }
            tagName="a"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[colorKey].cta,
            )}
          />
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/pricing_4-1699793178202.webp"
      name="Pricing 4"
      Component={Pricing4}
    />
  );
}

function ToolbarSettings() {
  const {
    tagline,
    heading,
    description,
    tier,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    name,
    actions: { setProp },
  } = useNode((node) => ({
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    tier: node.data.props.tier,
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
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
                  tier,
                  maxWidth,
                  marginArray,
                  paddingArray,
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
                  tier,
                  maxWidth,
                  marginArray,
                  paddingArray,
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
    isActive: string;
    isInactive: string;
    card: string;
    tierName: string;
    priceMonthly: string;
    monthly: string;
    priceAnnually: string;
    features: string;
    checkIcon: string;
    cta: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-800 dark:text-slate-200',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    isActive:
      'bg-slate-900 text-white ring-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:ring-white dark:hover:bg-slate-300',
    isInactive:
      'bg-transparent text-slate-900 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50',
    card: 'bg-white ring-slate-200 dark:bg-slate-950 dark:ring-slate-800',
    tierName: 'text-slate-900 dark:text-slate-200',
    priceMonthly: 'text-slate-900 dark:text-white',
    monthly: 'text-slate-600 dark:text-slate-500',
    priceAnnually: 'text-slate-600 dark:text-slate-400',
    features: 'text-slate-600 dark:text-slate-300',
    checkIcon: 'text-slate-600 dark:text-slate-400',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
  },
  gray: {
    tagline: 'text-gray-800 dark:text-gray-200',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    isActive:
      'bg-gray-900 text-white ring-gray-900 hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:ring-white dark:hover:bg-gray-300',
    isInactive:
      'bg-transparent text-gray-900 ring-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-50',
    card: 'bg-white ring-gray-200 dark:bg-gray-950 dark:ring-gray-800',
    tierName: 'text-gray-900 dark:text-gray-200',
    priceMonthly: 'text-gray-900 dark:text-white',
    monthly: 'text-gray-600 dark:text-gray-500',
    priceAnnually: 'text-gray-600 dark:text-gray-400',
    features: 'text-gray-600 dark:text-gray-300',
    checkIcon: 'text-gray-600 dark:text-gray-400',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-800 dark:text-zinc-200',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    isActive:
      'bg-zinc-900 text-white ring-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-white dark:hover:bg-zinc-300',
    isInactive:
      'bg-transparent text-zinc-900 ring-zinc-200 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
    card: 'bg-white ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800',
    tierName: 'text-zinc-900 dark:text-zinc-200',
    priceMonthly: 'text-zinc-900 dark:text-white',
    monthly: 'text-zinc-600 dark:text-zinc-500',
    priceAnnually: 'text-zinc-600 dark:text-zinc-400',
    features: 'text-zinc-600 dark:text-zinc-300',
    checkIcon: 'text-zinc-600 dark:text-zinc-400',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-800 dark:text-neutral-200',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    isActive:
      'bg-neutral-900 text-white ring-neutral-900 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:ring-white dark:hover:bg-neutral-300',
    isInactive:
      'bg-transparent text-neutral-900 ring-neutral-200 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
    card: 'bg-white ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800',
    tierName: 'text-neutral-900 dark:text-neutral-200',
    priceMonthly: 'text-neutral-900 dark:text-white',
    monthly: 'text-neutral-600 dark:text-neutral-500',
    priceAnnually: 'text-neutral-600 dark:text-neutral-400',
    features: 'text-neutral-600 dark:text-neutral-300',
    checkIcon: 'text-neutral-600 dark:text-neutral-400',
    cta: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    tagline: 'text-stone-800 dark:text-stone-200',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    isActive:
      'bg-stone-900 text-white ring-stone-900 hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:ring-white dark:hover:bg-stone-300',
    isInactive:
      'bg-transparent text-stone-900 ring-stone-200 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-stone-50',
    card: 'bg-white ring-stone-200 dark:bg-stone-950 dark:ring-stone-800',
    tierName: 'text-stone-900 dark:text-stone-200',
    priceMonthly: 'text-stone-900 dark:text-white',
    monthly: 'text-stone-600 dark:text-stone-500',
    priceAnnually: 'text-stone-600 dark:text-stone-400',
    features: 'text-stone-600 dark:text-stone-300',
    checkIcon: 'text-stone-600 dark:text-stone-400',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    isActive:
      'bg-red-900 text-white ring-red-900 hover:bg-red-800 dark:bg-red-900/80 dark:ring-red-900 dark:hover:bg-red-900',
    isInactive:
      'bg-transparent text-red-900 ring-red-200 hover:bg-red-50 dark:text-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-100 dark:ring-red-950',
    card: 'bg-red-50/30 ring-red-200 dark:bg-red-950/20 dark:ring-red-950',
    tierName: 'text-red-600 dark:text-red-400/80',
    priceMonthly: 'text-red-950 dark:text-white',
    monthly: 'text-red-950/60 dark:text-red-50/50',
    priceAnnually: 'text-red-700 dark:text-red-300/60',
    features: 'text-red-950 dark:text-red-50/60',
    checkIcon: 'text-red-600 dark:text-red-800',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    isActive:
      'bg-orange-900 text-white ring-orange-900 hover:bg-orange-800 dark:bg-orange-900/80 dark:ring-orange-900 dark:hover:bg-orange-900',
    isInactive:
      'bg-transparent text-orange-900 ring-orange-200 hover:bg-orange-50 dark:text-orange-200 dark:hover:bg-orange-900/30 dark:hover:text-orange-100 dark:ring-orange-950',
    card: 'bg-orange-50/30 ring-orange-200 dark:bg-orange-950/20 dark:ring-orange-950',
    tierName: 'text-orange-600 dark:text-orange-400/80',
    priceMonthly: 'text-orange-950 dark:text-white',
    monthly: 'text-orange-950/60 dark:text-orange-50/50',
    priceAnnually: 'text-orange-700 dark:text-orange-300/60',
    features: 'text-orange-950 dark:text-orange-50/60',
    checkIcon: 'text-orange-600 dark:text-orange-800',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    isActive:
      'bg-amber-900 text-white ring-amber-900 hover:bg-amber-800 dark:bg-amber-900/80 dark:ring-amber-900 dark:hover:bg-amber-900',
    isInactive:
      'bg-transparent text-amber-900 ring-amber-200 hover:bg-amber-50 dark:text-amber-200 dark:hover:bg-amber-900/30 dark:hover:text-amber-100 dark:ring-amber-950',
    card: 'bg-amber-50/30 ring-amber-200 dark:bg-amber-950/20 dark:ring-amber-950',
    tierName: 'text-amber-600 dark:text-amber-400/80',
    priceMonthly: 'text-amber-950 dark:text-white',
    monthly: 'text-amber-950/60 dark:text-amber-50/50',
    priceAnnually: 'text-amber-700 dark:text-amber-300/60',
    features: 'text-amber-950 dark:text-amber-50/60',
    checkIcon: 'text-amber-600 dark:text-amber-800',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    isActive:
      'bg-yellow-900 text-white ring-yellow-900 hover:bg-yellow-800 dark:bg-yellow-900/80 dark:ring-yellow-900 dark:hover:bg-yellow-900',
    isInactive:
      'bg-transparent text-yellow-900 ring-yellow-200 hover:bg-yellow-50 dark:text-yellow-200 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-100 dark:ring-yellow-950',
    card: 'bg-yellow-50/30 ring-yellow-200 dark:bg-yellow-950/20 dark:ring-yellow-950',
    tierName: 'text-yellow-600 dark:text-yellow-400/80',
    priceMonthly: 'text-yellow-950 dark:text-white',
    monthly: 'text-yellow-950/60 dark:text-yellow-50/50',
    priceAnnually: 'text-yellow-700 dark:text-yellow-300/60',
    features: 'text-yellow-950 dark:text-yellow-50/60',
    checkIcon: 'text-yellow-600 dark:text-yellow-800',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    isActive:
      'bg-lime-900 text-white ring-lime-900 hover:bg-lime-800 dark:bg-lime-900/80 dark:ring-lime-900 dark:hover:bg-lime-900',
    isInactive:
      'bg-transparent text-lime-900 ring-lime-200 hover:bg-lime-50 dark:text-lime-200 dark:hover:bg-lime-900/30 dark:hover:text-lime-100 dark:ring-lime-950',
    card: 'bg-lime-50/30 ring-lime-200 dark:bg-lime-950/20 dark:ring-lime-950',
    tierName: 'text-lime-600 dark:text-lime-400/80',
    priceMonthly: 'text-lime-950 dark:text-white',
    monthly: 'text-lime-950/60 dark:text-lime-50/50',
    priceAnnually: 'text-lime-700 dark:text-lime-300/60',
    features: 'text-lime-950 dark:text-lime-50/60',
    checkIcon: 'text-lime-600 dark:text-lime-800',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    isActive:
      'bg-green-900 text-white ring-green-900 hover:bg-green-800 dark:bg-green-900/80 dark:ring-green-900 dark:hover:bg-green-900',
    isInactive:
      'bg-transparent text-green-900 ring-green-200 hover:bg-green-50 dark:text-green-200 dark:hover:bg-green-900/30 dark:hover:text-green-100 dark:ring-green-950',
    card: 'bg-green-50/30 ring-green-200 dark:bg-green-950/20 dark:ring-green-950',
    tierName: 'text-green-600 dark:text-green-400/80',
    priceMonthly: 'text-green-950 dark:text-white',
    monthly: 'text-green-950/60 dark:text-green-50/50',
    priceAnnually: 'text-green-700 dark:text-green-300/60',
    features: 'text-green-950 dark:text-green-50/60',
    checkIcon: 'text-green-600 dark:text-green-800',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    isActive:
      'bg-emerald-900 text-white ring-emerald-900 hover:bg-emerald-800 dark:bg-emerald-900/80 dark:ring-emerald-900 dark:hover:bg-emerald-900',
    isInactive:
      'bg-transparent text-emerald-900 ring-emerald-200 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-100 dark:ring-emerald-950',
    card: 'bg-emerald-50/30 ring-emerald-200 dark:bg-emerald-950/20 dark:ring-emerald-950',
    tierName: 'text-emerald-600 dark:text-emerald-400/80',
    priceMonthly: 'text-emerald-950 dark:text-white',
    monthly: 'text-emerald-950/60 dark:text-emerald-50/50',
    priceAnnually: 'text-emerald-700 dark:text-emerald-300/60',
    features: 'text-emerald-950 dark:text-emerald-50/60',
    checkIcon: 'text-emerald-600 dark:text-emerald-800',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    isActive:
      'bg-teal-900 text-white ring-teal-900 hover:bg-teal-800 dark:bg-teal-900/80 dark:ring-teal-900 dark:hover:bg-teal-900',
    isInactive:
      'bg-transparent text-teal-900 ring-teal-200 hover:bg-teal-50 dark:text-teal-200 dark:hover:bg-teal-900/30 dark:hover:text-teal-100 dark:ring-teal-950',
    card: 'bg-teal-50/30 ring-teal-200 dark:bg-teal-950/20 dark:ring-teal-950',
    tierName: 'text-teal-600 dark:text-teal-400/80',
    priceMonthly: 'text-teal-950 dark:text-white',
    monthly: 'text-teal-950/60 dark:text-teal-50/50',
    priceAnnually: 'text-teal-700 dark:text-teal-300/60',
    features: 'text-teal-950 dark:text-teal-50/60',
    checkIcon: 'text-teal-600 dark:text-teal-800',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    isActive:
      'bg-cyan-900 text-white ring-cyan-900 hover:bg-cyan-800 dark:bg-cyan-900/80 dark:ring-cyan-900 dark:hover:bg-cyan-900',
    isInactive:
      'bg-transparent text-cyan-900 ring-cyan-200 hover:bg-cyan-50 dark:text-cyan-200 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-100 dark:ring-cyan-950',
    card: 'bg-cyan-50/30 ring-cyan-200 dark:bg-cyan-950/20 dark:ring-cyan-950',
    tierName: 'text-cyan-600 dark:text-cyan-400/80',
    priceMonthly: 'text-cyan-950 dark:text-white',
    monthly: 'text-cyan-950/60 dark:text-cyan-50/50',
    priceAnnually: 'text-cyan-700 dark:text-cyan-300/60',
    features: 'text-cyan-950 dark:text-cyan-50/60',
    checkIcon: 'text-cyan-600 dark:text-cyan-800',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    isActive:
      'bg-sky-900 text-white ring-sky-900 hover:bg-sky-800 dark:bg-sky-900/80 dark:ring-sky-900 dark:hover:bg-sky-900',
    isInactive:
      'bg-transparent text-sky-900 ring-sky-200 hover:bg-sky-50 dark:text-sky-200 dark:hover:bg-sky-900/30 dark:hover:text-sky-100 dark:ring-sky-950',
    card: 'bg-sky-50/30 ring-sky-200 dark:bg-sky-950/20 dark:ring-sky-950',
    tierName: 'text-sky-600 dark:text-sky-400/80',
    priceMonthly: 'text-sky-950 dark:text-white',
    monthly: 'text-sky-950/60 dark:text-sky-50/50',
    priceAnnually: 'text-sky-700 dark:text-sky-300/60',
    features: 'text-sky-950 dark:text-sky-50/60',
    checkIcon: 'text-sky-600 dark:text-sky-800',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    isActive:
      'bg-blue-900 text-white ring-blue-900 hover:bg-blue-800 dark:bg-blue-900/80 dark:ring-blue-900 dark:hover:bg-blue-900',
    isInactive:
      'bg-transparent text-blue-900 ring-blue-200 hover:bg-blue-50 dark:text-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-100 dark:ring-blue-950',
    card: 'bg-blue-50/30 ring-blue-200 dark:bg-blue-950/20 dark:ring-blue-950',
    tierName: 'text-blue-600 dark:text-blue-400/80',
    priceMonthly: 'text-blue-950 dark:text-white',
    monthly: 'text-blue-950/60 dark:text-blue-50/50',
    priceAnnually: 'text-blue-700 dark:text-blue-300/60',
    features: 'text-blue-950 dark:text-blue-50/60',
    checkIcon: 'text-blue-600 dark:text-blue-800',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    isActive:
      'bg-indigo-900 text-white ring-indigo-900 hover:bg-indigo-800 dark:bg-indigo-900/80 dark:ring-indigo-900 dark:hover:bg-indigo-900',
    isInactive:
      'bg-transparent text-indigo-900 ring-indigo-200 hover:bg-indigo-50 dark:text-indigo-200 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-100 dark:ring-indigo-950',
    card: 'bg-indigo-50/30 ring-indigo-200 dark:bg-indigo-950/20 dark:ring-indigo-950',
    tierName: 'text-indigo-600 dark:text-indigo-400/80',
    priceMonthly: 'text-indigo-950 dark:text-white',
    monthly: 'text-indigo-950/60 dark:text-indigo-50/50',
    priceAnnually: 'text-indigo-700 dark:text-indigo-300/60',
    features: 'text-indigo-950 dark:text-indigo-50/60',
    checkIcon: 'text-indigo-600 dark:text-indigo-800',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    isActive:
      'bg-violet-900 text-white ring-violet-900 hover:bg-violet-800 dark:bg-violet-900/80 dark:ring-violet-900 dark:hover:bg-violet-900',
    isInactive:
      'bg-transparent text-violet-900 ring-violet-200 hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-violet-900/30 dark:hover:text-violet-100 dark:ring-violet-950',
    card: 'bg-violet-50/30 ring-violet-200 dark:bg-violet-950/20 dark:ring-violet-950',
    tierName: 'text-violet-600 dark:text-violet-400/80',
    priceMonthly: 'text-violet-950 dark:text-white',
    monthly: 'text-violet-950/60 dark:text-violet-50/50',
    priceAnnually: 'text-violet-700 dark:text-violet-300/60',
    features: 'text-violet-950 dark:text-violet-50/60',
    checkIcon: 'text-violet-600 dark:text-violet-800',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    isActive:
      'bg-purple-900 text-white ring-purple-900 hover:bg-purple-800 dark:bg-purple-900/80 dark:ring-purple-900 dark:hover:bg-purple-900',
    isInactive:
      'bg-transparent text-purple-900 ring-purple-200 hover:bg-purple-50 dark:text-purple-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-100 dark:ring-purple-950',
    card: 'bg-purple-50/30 ring-purple-200 dark:bg-purple-950/20 dark:ring-purple-950',
    tierName: 'text-purple-600 dark:text-purple-400/80',
    priceMonthly: 'text-purple-950 dark:text-white',
    monthly: 'text-purple-950/60 dark:text-purple-50/50',
    priceAnnually: 'text-purple-700 dark:text-purple-300/60',
    features: 'text-purple-950 dark:text-purple-50/60',
    checkIcon: 'text-purple-600 dark:text-purple-800',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    isActive:
      'bg-fuchsia-900 text-white ring-fuchsia-900 hover:bg-fuchsia-800 dark:bg-fuchsia-900/80 dark:ring-fuchsia-900 dark:hover:bg-fuchsia-900',
    isInactive:
      'bg-transparent text-fuchsia-900 ring-fuchsia-200 hover:bg-fuchsia-50 dark:text-fuchsia-200 dark:hover:bg-fuchsia-900/30 dark:hover:text-fuchsia-100 dark:ring-fuchsia-950',
    card: 'bg-fuchsia-50/30 ring-fuchsia-200 dark:bg-fuchsia-950/20 dark:ring-fuchsia-950',
    tierName: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    priceMonthly: 'text-fuchsia-950 dark:text-white',
    monthly: 'text-fuchsia-950/60 dark:text-fuchsia-50/50',
    priceAnnually: 'text-fuchsia-700 dark:text-fuchsia-300/60',
    features: 'text-fuchsia-950 dark:text-fuchsia-50/60',
    checkIcon: 'text-fuchsia-600 dark:text-fuchsia-800',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    isActive:
      'bg-pink-900 text-white ring-pink-900 hover:bg-pink-800 dark:bg-pink-900/80 dark:ring-pink-900 dark:hover:bg-pink-900',
    isInactive:
      'bg-transparent text-pink-900 ring-pink-200 hover:bg-pink-50 dark:text-pink-200 dark:hover:bg-pink-900/30 dark:hover:text-pink-100 dark:ring-pink-950',
    card: 'bg-pink-50/30 ring-pink-200 dark:bg-pink-950/20 dark:ring-pink-950',
    tierName: 'text-pink-600 dark:text-pink-400/80',
    priceMonthly: 'text-pink-950 dark:text-white',
    monthly: 'text-pink-950/60 dark:text-pink-50/50',
    priceAnnually: 'text-pink-700 dark:text-pink-300/60',
    features: 'text-pink-950 dark:text-pink-50/60',
    checkIcon: 'text-pink-600 dark:text-pink-800',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    isActive:
      'bg-rose-900 text-white ring-rose-900 hover:bg-rose-800 dark:bg-rose-900/80 dark:ring-rose-900 dark:hover:bg-rose-900',
    isInactive:
      'bg-transparent text-rose-900 ring-rose-200 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-rose-900/30 dark:hover:text-rose-100 dark:ring-rose-950',
    card: 'bg-rose-50/30 ring-rose-200 dark:bg-rose-950/20 dark:ring-rose-950',
    tierName: 'text-rose-600 dark:text-rose-400/80',
    priceMonthly: 'text-rose-950 dark:text-white',
    monthly: 'text-rose-950/60 dark:text-rose-50/50',
    priceAnnually: 'text-rose-700 dark:text-rose-300/60',
    features: 'text-rose-950 dark:text-rose-50/60',
    checkIcon: 'text-rose-600 dark:text-rose-800',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  tier,
  maxWidth,
  marginArray,
  paddingArray,
  color,
  textColor,
}: {
  isNextjs: boolean;
  tagline: string;
  heading: string;
  description: string;
  tier: Tier;
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedTier = `{
    name: '${removeHtmlTags(tier.name)}',
    id: 'premium',
    href: '#',
    price: { monthly: '${removeHtmlTags(tier.price.monthly)}', annually: '${removeHtmlTags(tier.price.annually)}' },
    features: [
        '${removeHtmlTags(tier.features[0])}',
        '${removeHtmlTags(tier.features[1])}',
        '${removeHtmlTags(tier.features[2])}',
        '${removeHtmlTags(tier.features[3])}',
    ],
    cta: '${removeHtmlTags(tier.cta)}',
},`;

  let content: string;

  const nextContent = `/*
The following package is required: npm install clsx
*/

'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { useState } from 'react';

const tier = ${mappedTier};

export default function Pricing() {
const [isMonthly, setIsMonthly] = useState(false);

  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-14 flex justify-center lg:mt-24">
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isActive}'
              : '${colors[colorKey].isInactive}',
            'rounded-l-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:focus-visible:outline-neutral-400',
          )}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isInactive}'
              : '${colors[colorKey].isActive}',
            'rounded-r-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(false)}
        >
          Annual
        </button>
      </div>

      <div className="mt-10 flex justify-center lg:mx-0 lg:mt-14">
        <div className="flex w-full max-w-md flex-col justify-between space-y-10 rounded-xl p-8 text-center ring-1 lg:px-10 lg:py-14 ${colors[colorKey].card}">
          <div>
            <h3
              id={tier.id}
              className="text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
            >
              {tier.name}
            </h3>

            <div className="mt-2 flex flex-col space-y-4">
              <p className="flex items-baseline justify-center gap-x-1">
                <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].priceMonthly}">
                  {isMonthly ? tier.price.monthly : tier.price.annually}
                </span>
                <span className="${colors[textColorKey].monthly}">
                  {isMonthly ? '/month' : '/year'}
                </span>
              </p>
            </div>

            <ul
              role="list"
              className="mt-6 space-y-3 text-sm leading-6 ${colors[textColorKey].features}"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none ${colors[textColorKey].checkIcon}"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={tier.href}
            aria-describedby={tier.id}
            className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
          >
            {tier.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}`;

  const reactContent = `/*
The following package is required: npm install clsx
*/

import React from 'react';
import clsx from 'clsx';

import { useState } from 'react';

const tier = ${mappedTier};

export default function Pricing() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-14 flex justify-center lg:mt-24">
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isActive}'
              : '${colors[colorKey].isInactive}',
            'rounded-l-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isInactive}'
              : '${colors[colorKey].isActive}',
            'rounded-r-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(false)}
        >
          Annual
        </button>
      </div>

      <div className="mt-10 flex justify-center lg:mx-0 lg:mt-14">
        <div className="flex w-full max-w-md flex-col justify-between space-y-10 rounded-xl p-8 text-center ring-1 lg:px-10 lg:py-14 ${colors[colorKey].card}">
          <div>
            <h3
              id={tier.id}
              className="text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
            >
              {tier.name}
            </h3>

            <div className="mt-2 flex flex-col space-y-4">
              <p className="flex items-baseline justify-center gap-x-1">
                <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].priceMonthly}">
                  {isMonthly ? tier.price.monthly : tier.price.annually}
                </span>
                <span className="${colors[textColorKey].monthly}">
                  {isMonthly ? '/month' : '/year'}
                </span>
              </p>
            </div>

            <ul
              role="list"
              className="mt-6 space-y-3 text-sm leading-6 ${colors[textColorKey].features}"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none ${colors[textColorKey].checkIcon}"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={tier.href}
            aria-describedby={tier.id}
            className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
          >
            {tier.cta}
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
    tagline,
    heading,
    description,
    tier,
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
    tier,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Pricing4 from './components/Pricing4';`);
  componentContent.push('<Pricing4 />');
  return zip.file('components/Pricing4.jsx', content);
}

Pricing4.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Short heading goes in here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar.',
    tier: tier,
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
