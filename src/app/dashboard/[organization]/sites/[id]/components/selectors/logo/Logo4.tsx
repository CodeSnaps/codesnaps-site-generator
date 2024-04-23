'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
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

export const Logo4 = ({
  heading = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-36'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            'text-left text-lg font-semibold leading-tight tracking-wide',
            'outline-none focus:outline-offset-4 focus:outline-primary',
            colors[textColorKey].heading,
          )}
        />

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-8 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/logo_4-1699792492896.webp"
      name="Logo 4"
      Component={Logo4}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    heading,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
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
    card: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    card: 'bg-slate-200/50 dark:bg-slate-900',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    card: 'bg-gray-200/50 dark:bg-gray-900',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    card: 'bg-zinc-200/50 dark:bg-zinc-900',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    card: 'bg-neutral-200/50 dark:bg-neutral-900',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    card: 'bg-stone-200/50 dark:bg-stone-900',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    card: 'bg-red-100/50 dark:bg-red-950',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    card: 'bg-orange-100/50 dark:bg-orange-950',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    card: 'bg-amber-100/50 dark:bg-amber-950',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    card: 'bg-yellow-100/50 dark:bg-yellow-950',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    card: 'bg-lime-100/50 dark:bg-lime-950',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    card: 'bg-green-100/50 dark:bg-green-950',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    card: 'bg-emerald-100/50 dark:bg-emerald-950',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    card: 'bg-teal-100/50 dark:bg-teal-950',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    card: 'bg-cyan-100/50 dark:bg-cyan-950',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    card: 'bg-sky-100/50 dark:bg-sky-950',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    card: 'bg-blue-100/50 dark:bg-blue-950',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    card: 'bg-indigo-100/50 dark:bg-indigo-950',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    card: 'bg-violet-100/50 dark:bg-violet-950',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    card: 'bg-purple-100/50 dark:bg-purple-950',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    card: 'bg-fuchsia-100/50 dark:bg-fuchsia-950',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    card: 'bg-pink-100/50 dark:bg-pink-950',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    card: 'bg-rose-100/50 dark:bg-rose-950',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
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
       <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-tight tracking-wide ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-8 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
       <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-tight tracking-wide ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-8 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
  const { heading, paddingArray, marginArray, maxWidth, color, textColor } =
    node.props;

  const content = generateComponentString({
    isNextjs,
    heading,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Logo4 from './components/Logo4';`);
  componentContent.push('<Logo4 />');
  return zip.file('components/Logo4.jsx', content);
}

Logo4.craft = {
  props: {
    heading: 'Trusted by the world’s most unkown companies',
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
