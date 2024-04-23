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
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Logo2 = ({
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
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row md:gap-16 lg:px-8">
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

        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 md:mt-0 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <Image
              priority
              key={logo.id}
              className="col-span-1 max-h-10 w-auto object-contain"
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
            />
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/logo_2-1699792321814.webp"
      name="Logo 2"
      Component={Logo2}
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
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
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
];

export default function Logo() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row md:gap-16 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-tight tracking-wide ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 md:mt-0 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <Image
              priority
              key={logo.id}
              className="col-span-1 max-h-10 w-auto object-contain"
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
            />
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
];

export default function Logo() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row md:gap-16 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-tight tracking-wide ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 md:mt-0 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <img
              key={logo.id}
              className="col-span-1 max-h-10 w-auto object-contain"
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
            />
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

  importStatements.push(`import Logo2 from './components/Logo2';`);
  componentContent.push('<Logo2 />');
  return zip.file('components/Logo2.jsx', content);
}

Logo2.craft = {
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
