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

export const Header5 = ({
  heading = '',
  description = '',
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
      ref={(ref) => connect(drag(ref as HTMLElement))}
      classes={clsx(maxWidth, 'relative w-full')}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div
        style={{
          backgroundImage:
            'url("https://dummyimage.com/1920x1200/353535/171717")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col justify-between py-24 xl:flex-row xl:items-center">
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
                'mt-6 max-w-md text-lg',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].description,
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/header_5-1700071204639.webp"
      name="Header 5"
      Component={Header5}
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
    <ToolbarSettingsForm hasColor={false}>
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
  };
}

const colors: ColorObject = {
  slate: { heading: 'text-slate-50', description: 'text-slate-300' },
  gray: { heading: 'text-gray-50', description: 'text-gray-300' },
  zinc: { heading: 'text-zinc-50', description: 'text-zinc-300' },
  neutral: { heading: 'text-neutral-50', description: 'text-neutral-300' },
  stone: { heading: 'text-stone-50', description: 'text-stone-300' },
  red: { heading: 'text-red-50', description: 'text-red-50/70' },
  orange: { heading: 'text-orange-50', description: 'text-orange-50/70' },
  amber: { heading: 'text-amber-50', description: 'text-amber-50/70' },
  yellow: { heading: 'text-yellow-50', description: 'text-yellow-50/70' },
  lime: { heading: 'text-lime-50', description: 'text-lime-50/70' },
  green: { heading: 'text-green-50', description: 'text-green-50/70' },
  emerald: { heading: 'text-emerald-50', description: 'text-emerald-50/70' },
  teal: { heading: 'text-teal-50', description: 'text-teal-50/70' },
  cyan: { heading: 'text-cyan-50', description: 'text-cyan-50/70' },
  sky: { heading: 'text-sky-50', description: 'text-sky-50/70' },
  blue: { heading: 'text-blue-50', description: 'text-blue-50/70' },
  indigo: { heading: 'text-indigo-50', description: 'text-indigo-50/70' },
  violet: { heading: 'text-violet-50', description: 'text-violet-50/70' },
  purple: { heading: 'text-purple-50', description: 'text-purple-50/70' },
  fuchsia: { heading: 'text-fuchsia-50', description: 'text-fuchsia-50/70' },
  pink: { heading: 'text-pink-50', description: 'text-pink-50/70' },
  rose: { heading: 'text-rose-50', description: 'text-rose-50/70' },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
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

export default function Header() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
      'relative h-full w-full',
    )}">
      <Image
        priority
        src="https://dummyimage.com/1920x1200/d4d4d4/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full w-full object-cover brightness-[.25]"
        aria-hidden="true"
      />

       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between py-24 xl:flex-row xl:items-center">
          <h1 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h1>

          <p className="mt-6 max-w-md text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
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
      'relative h-full w-full',
    )}">
      <img
        src="https://dummyimage.com/1920x1200/d4d4d4/171717"
        fill={true}
        alt="hero image"
        className="absolute -z-10 h-full w-full object-cover brightness-[.25]"
        aria-hidden="true"
      />

       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between py-24 xl:flex-row xl:items-center">
          <h1 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h1>

          <p className="mt-6 max-w-md text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
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
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Header5 from './components/Header5';`);
  componentContent.push('<Header5 />');
  return zip.file('components/Header5.jsx', content);
}

Header5.craft = {
  props: {
    heading: 'Short heading goes in here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
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
