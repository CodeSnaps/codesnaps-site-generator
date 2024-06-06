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

export const Header7 = ({
  tagline = '',
  heading = '',
  description = '',
  primaryCta = '',
  secondaryCta = '',
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
      classes={clsx(maxWidth, 'w-full', colors[colorKey].bg)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 py-24 text-center">
          <ContentEditable
            html={tagline}
            onChange={(e) =>
              setProp(
                (props: { tagline: string }) =>
                  (props.tagline = e.target.value),
              )
            }
            tagName="span"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-lg font-medium',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].tagline,
            )}
          />

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
            tagName="p"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-lg',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />

          <div className="flex justify-center space-x-8">
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
                'rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'outline-none focus:outline-offset-4',
                colors[colorKey].secondaryCta,
              )}
            />
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/header_7-1700071451635.webp"
      name="Header 7"
      Component={Header7}
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
    secondaryCta,
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
                  tagline,
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
                  tagline,
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
    bg: string;
    tagline: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

const colors: ColorObject = {
  slate: {
    bg: 'bg-slate-700',
    tagline: 'text-slate-100',
    heading: 'text-slate-50',
    description: 'text-slate-300',
    primaryCta:
      'bg-slate-950 text-white hover:bg-slate-900 focus-visible:outline-slate-500',
    secondaryCta:
      'text-white ring-slate-100 hover:bg-slate-50/10 focus-visible:outline-slate-500',
  },
  gray: {
    bg: 'bg-gray-700',
    tagline: 'text-gray-100',
    heading: 'text-gray-50',
    description: 'text-gray-300',
    primaryCta:
      'bg-gray-950 text-white hover:bg-gray-900 focus-visible:outline-gray-500',
    secondaryCta:
      'text-white ring-gray-100 hover:bg-gray-50/10 focus-visible:outline-gray-500',
  },
  zinc: {
    bg: 'bg-zinc-700',
    tagline: 'text-zinc-100',
    heading: 'text-zinc-50',
    description: 'text-zinc-300',
    primaryCta:
      'bg-zinc-950 text-white hover:bg-zinc-900 focus-visible:outline-zinc-500',
    secondaryCta:
      'text-white ring-zinc-100 hover:bg-zinc-50/10 focus-visible:outline-zinc-500',
  },
  neutral: {
    bg: 'bg-neutral-700',
    tagline: 'text-neutral-100',
    heading: 'text-neutral-50',
    description: 'text-neutral-300',
    primaryCta:
      'bg-neutral-950 text-white hover:bg-neutral-900 focus-visible:outline-neutral-500',
    secondaryCta:
      'text-white ring-neutral-100 hover:bg-neutral-50/10 focus-visible:outline-neutral-500',
  },
  stone: {
    bg: 'bg-stone-700',
    tagline: 'text-stone-100',
    heading: 'text-stone-50',
    description: 'text-stone-300',
    primaryCta:
      'bg-stone-950 text-white hover:bg-stone-900 focus-visible:outline-stone-500',
    secondaryCta:
      'text-white ring-stone-100 hover:bg-stone-50/10 focus-visible:outline-stone-500',
  },
  red: {
    bg: 'bg-red-600',
    tagline: 'text-red-100',
    heading: 'text-red-50',
    description: 'text-red-50/70',
    primaryCta:
      'bg-red-950 text-white hover:bg-red-900 focus-visible:outline-red-500',
    secondaryCta:
      'text-white ring-red-100 hover:bg-red-50/10 focus-visible:outline-red-500',
  },
  orange: {
    bg: 'bg-orange-600',
    tagline: 'text-orange-100',
    heading: 'text-orange-50',
    description: 'text-orange-50/70',
    primaryCta:
      'bg-orange-950 text-white hover:bg-orange-900 focus-visible:outline-orange-500',
    secondaryCta:
      'text-white ring-orange-100 hover:bg-orange-50/10 focus-visible:outline-orange-500',
  },
  amber: {
    bg: 'bg-amber-600',
    tagline: 'text-amber-100',
    heading: 'text-amber-50',
    description: 'text-amber-50/70',
    primaryCta:
      'bg-amber-950 text-white hover:bg-amber-900 focus-visible:outline-amber-500',
    secondaryCta:
      'text-white ring-amber-100 hover:bg-amber-50/10 focus-visible:outline-amber-500',
  },
  yellow: {
    bg: 'bg-yellow-600',
    tagline: 'text-yellow-100',
    heading: 'text-yellow-50',
    description: 'text-yellow-50/70',
    primaryCta:
      'bg-yellow-950 text-white hover:bg-yellow-900 focus-visible:outline-yellow-500',
    secondaryCta:
      'text-white ring-yellow-100 hover:bg-yellow-50/10 focus-visible:outline-yellow-500',
  },
  lime: {
    bg: 'bg-lime-600',
    tagline: 'text-lime-100',
    heading: 'text-lime-50',
    description: 'text-lime-50/70',
    primaryCta:
      'bg-lime-950 text-white hover:bg-lime-900 focus-visible:outline-lime-500',
    secondaryCta:
      'text-white ring-lime-100 hover:bg-lime-50/10 focus-visible:outline-lime-500',
  },
  green: {
    bg: 'bg-green-600',
    tagline: 'text-green-100',
    heading: 'text-green-50',
    description: 'text-green-50/70',
    primaryCta:
      'bg-green-950 text-white hover:bg-green-900 focus-visible:outline-green-500',
    secondaryCta:
      'text-white ring-green-100 hover:bg-green-50/10 focus-visible:outline-green-500',
  },
  emerald: {
    bg: 'bg-emerald-600',
    tagline: 'text-emerald-100',
    heading: 'text-emerald-50',
    description: 'text-emerald-50/70',
    primaryCta:
      'bg-emerald-950 text-white hover:bg-emerald-900 focus-visible:outline-emerald-500',
    secondaryCta:
      'text-white ring-emerald-100 hover:bg-emerald-50/10 focus-visible:outline-emerald-500',
  },
  teal: {
    bg: 'bg-teal-600',
    tagline: 'text-teal-100',
    heading: 'text-teal-50',
    description: 'text-teal-50/70',
    primaryCta:
      'bg-teal-950 text-white hover:bg-teal-900 focus-visible:outline-teal-500',
    secondaryCta:
      'text-white ring-teal-100 hover:bg-teal-50/10 focus-visible:outline-teal-500',
  },
  cyan: {
    bg: 'bg-cyan-600',
    tagline: 'text-cyan-100',
    heading: 'text-cyan-50',
    description: 'text-cyan-50/70',
    primaryCta:
      'bg-cyan-950 text-white hover:bg-cyan-900 focus-visible:outline-cyan-500',
    secondaryCta:
      'text-white ring-cyan-100 hover:bg-cyan-50/10 focus-visible:outline-cyan-500',
  },
  sky: {
    bg: 'bg-sky-600',
    tagline: 'text-sky-100',
    heading: 'text-sky-50',
    description: 'text-sky-50/70',
    primaryCta:
      'bg-sky-950 text-white hover:bg-sky-900 focus-visible:outline-sky-500',
    secondaryCta:
      'text-white ring-sky-100 hover:bg-sky-50/10 focus-visible:outline-sky-500',
  },
  blue: {
    bg: 'bg-blue-600',
    tagline: 'text-blue-100',
    heading: 'text-blue-50',
    description: 'text-blue-50/70',
    primaryCta:
      'bg-blue-950 text-white hover:bg-blue-900 focus-visible:outline-blue-500',
    secondaryCta:
      'text-white ring-blue-100 hover:bg-blue-50/10 focus-visible:outline-blue-500',
  },
  indigo: {
    bg: 'bg-indigo-600',
    tagline: 'text-indigo-100',
    heading: 'text-indigo-50',
    description: 'text-indigo-50/70',
    primaryCta:
      'bg-indigo-950 text-white hover:bg-indigo-900 focus-visible:outline-indigo-500',
    secondaryCta:
      'text-white ring-indigo-100 hover:bg-indigo-50/10 focus-visible:outline-indigo-500',
  },
  violet: {
    bg: 'bg-violet-600',
    tagline: 'text-violet-100',
    heading: 'text-violet-50',
    description: 'text-violet-50/70',
    primaryCta:
      'bg-violet-950 text-white hover:bg-violet-900 focus-visible:outline-violet-500',
    secondaryCta:
      'text-white ring-violet-100 hover:bg-violet-50/10 focus-visible:outline-violet-500',
  },
  purple: {
    bg: 'bg-purple-600',
    tagline: 'text-purple-100',
    heading: 'text-purple-50',
    description: 'text-purple-50/70',
    primaryCta:
      'bg-purple-950 text-white hover:bg-purple-900 focus-visible:outline-purple-500',
    secondaryCta:
      'text-white ring-purple-100 hover:bg-purple-50/10 focus-visible:outline-purple-500',
  },
  fuchsia: {
    bg: 'bg-fuchsia-600',
    tagline: 'text-fuchsia-100',
    heading: 'text-fuchsia-50',
    description: 'text-fuchsia-50/70',
    primaryCta:
      'bg-fuchsia-950 text-white hover:bg-fuchsia-900 focus-visible:outline-fuchsia-500',
    secondaryCta:
      'text-white ring-fuchsia-100 hover:bg-fuchsia-50/10 focus-visible:outline-fuchsia-500',
  },
  pink: {
    bg: 'bg-pink-600',
    tagline: 'text-pink-100',
    heading: 'text-pink-50',
    description: 'text-pink-50/70',
    primaryCta:
      'bg-pink-950 text-white hover:bg-pink-900 focus-visible:outline-pink-500',
    secondaryCta:
      'text-white ring-pink-100 hover:bg-pink-50/10 focus-visible:outline-pink-500',
  },
  rose: {
    bg: 'bg-rose-600',
    tagline: 'text-rose-100',
    heading: 'text-rose-50',
    description: 'text-rose-50/70',
    primaryCta:
      'bg-rose-950 text-white hover:bg-rose-900 focus-visible:outline-rose-500',
    secondaryCta:
      'text-white ring-rose-100 hover:bg-rose-50/10 focus-visible:outline-rose-500',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
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
  tagline: string;
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

  const nextContent = `import Link from 'next/link';

export default function Header() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'h-full w-full',
      colors[colorKey].bg,
    )}">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 py-24 text-center">
          <span className="text-lg font-medium ${colors[textColorKey].tagline}">${removeHtmlTags(tagline)}</span>

          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex justify-center space-x-8">
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </Link>

            <Link
              href="#"
              className="rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
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

export default function Header() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'h-full w-full',
      colors[colorKey].bg,
    )}">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 py-24 text-center">
          <span className="text-lg font-medium ${colors[textColorKey].tagline}">${removeHtmlTags(tagline)}</span>

          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div className="flex justify-center space-x-8">
            <a
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </a>

            <a
              href="#"
              className="rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
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
    tagline,
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
    tagline,
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

  importStatements.push(`import Header7 from './components/Header7';`);
  componentContent.push('<Header7 />');
  return zip.file('components/Header7.jsx', content);
}

Header7.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Short heading goes in here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    primaryCta: 'Get started',
    secondaryCta: 'Learn more',
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
