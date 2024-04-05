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

type SerializedNodeWithId = SerializedNode & { id: string };

export const Testimonial1 = ({
  testimonial = '',
  name = '',
  position = '',
  company = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-4xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  testimonial?: string;
  name?: string;
  position?: string;
  company?: string;
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
      <Image
        priority
        width={200}
        height={40}
        className="mx-auto h-10 w-full"
        src="https://img.logoipsum.com/297.svg"
        alt="Logo"
      />

      <figure className="mt-10">
        <ContentEditable
          html={testimonial}
          onChange={(e) =>
            setProp(
              (props: { testimonial: string }) =>
                (props.testimonial = e.target.value),
            )
          }
          tagName="blockquote"
          disabled={query.getOptions().enabled ? false : true}
          className={clsx(
            'text-center text-xl font-semibold leading-8 sm:text-2xl sm:leading-9',
            'outline-none focus:outline-offset-4 focus:outline-primary',
            colors[textColorKey].testimonial,
          )}
        />

        <figcaption className="mt-10">
          <Image
            priority
            width={56}
            height={56}
            className="mx-auto h-14 w-14 rounded-full"
            src="https://dummyimage.com/100x100/d4d4d4/171717"
            alt="Full Name"
          />
          <div className="mt-4 text-base">
            <ContentEditable
              html={name}
              onChange={(e) =>
                setProp(
                  (props: { name: string }) => (props.name = e.target.value),
                )
              }
              tagName="div"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center font-semibold',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].name,
              )}
            />

            <div
              className={clsx(
                'flex items-center justify-center space-x-2',
                colors[textColorKey].metaData,
              )}
            >
              <ContentEditable
                html={position}
                onChange={(e) =>
                  setProp(
                    (props: { position: string }) =>
                      (props.position = e.target.value),
                  )
                }
                tagName="span"
                disabled={query.getOptions().enabled ? false : true}
              />{' '}
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className={colors[textColorKey].circle}
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <ContentEditable
                html={company}
                onChange={(e) =>
                  setProp(
                    (props: { company: string }) =>
                      (props.company = e.target.value),
                  )
                }
                tagName="span"
                disabled={query.getOptions().enabled ? false : true}
              />
            </div>
          </div>
        </figcaption>
      </figure>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/testimonial_1-1699475100918.webp"
      name="Testimonial 1"
      Component={Testimonial1}
    />
  );
}

function ToolbarSettings() {
  const {
    testimonial,
    name,
    position,
    company,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    displayName,
  } = useNode((node) => ({
    testimonial: node.data.props.testimonial,
    name: node.data.props.name,
    position: node.data.props.position,
    company: node.data.props.company,
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    color: node.data.props.color,
    textColor: node.data.props.textColor,
    displayName: node.data.custom.displayName || node.data.displayName,
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
                  testimonial,
                  name,
                  position,
                  company,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({
                  name: displayName,
                  content,
                  isNextjs: true,
                });
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
                  testimonial,
                  name,
                  position,
                  company,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({
                  name: displayName,
                  content,
                  isNextjs: false,
                });
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
    testimonial: string;
    name: string;
    metaData: string;
    circle: string;
  };
}

const colors: ColorObject = {
  slate: {
    testimonial: 'text-slate-900 dark:text-slate-200',
    name: 'text-slate-900 dark:text-slate-300',
    metaData: 'text-slate-600 dark:text-slate-400',
    circle: 'fill-slate-600 dark:fill-slate-400',
  },
  gray: {
    testimonial: 'text-gray-900 dark:text-gray-200',
    name: 'text-gray-900 dark:text-gray-300',
    metaData: 'text-gray-600 dark:text-gray-400',
    circle: 'fill-gray-600 dark:fill-gray-400',
  },
  zinc: {
    testimonial: 'text-zinc-900 dark:text-zinc-200',
    name: 'text-zinc-900 dark:text-zinc-300',
    metaData: 'text-zinc-600 dark:text-zinc-400',
    circle: 'fill-zinc-600 dark:fill-zinc-400',
  },
  neutral: {
    testimonial: 'text-neutral-900 dark:text-neutral-200',
    name: 'text-neutral-900 dark:text-neutral-300',
    metaData: 'text-neutral-600 dark:text-neutral-400',
    circle: 'fill-neutral-600 dark:fill-neutral-400',
  },
  stone: {
    testimonial: 'text-stone-900 dark:text-stone-200',
    name: 'text-stone-900 dark:text-stone-300',
    metaData: 'text-stone-600 dark:text-stone-400',
    circle: 'fill-stone-600 dark:fill-stone-400',
  },
  red: {
    testimonial: 'text-red-900 dark:text-red-50',
    name: 'text-red-900 dark:text-red-300',
    metaData: 'text-red-700 dark:text-red-400/60',
    circle: 'fill-red-700 dark:fill-red-400/60',
  },
  orange: {
    testimonial: 'text-orange-900 dark:text-orange-50',
    name: 'text-orange-900 dark:text-orange-300',
    metaData: 'text-orange-700 dark:text-orange-400/60',
    circle: 'fill-orange-700 dark:fill-orange-400/60',
  },
  amber: {
    testimonial: 'text-amber-900 dark:text-amber-50',
    name: 'text-amber-900 dark:text-amber-300',
    metaData: 'text-amber-700 dark:text-amber-400/60',
    circle: 'fill-amber-700 dark:fill-amber-400/60',
  },
  yellow: {
    testimonial: 'text-yellow-900 dark:text-yellow-50',
    name: 'text-yellow-900 dark:text-yellow-300',
    metaData: 'text-yellow-700 dark:text-yellow-400/60',
    circle: 'fill-yellow-700 dark:fill-yellow-400/60',
  },
  lime: {
    testimonial: 'text-lime-900 dark:text-lime-50',
    name: 'text-lime-900 dark:text-lime-300',
    metaData: 'text-lime-700 dark:text-lime-400/60',
    circle: 'fill-lime-700 dark:fill-lime-400/60',
  },
  green: {
    testimonial: 'text-green-900 dark:text-green-50',
    name: 'text-green-900 dark:text-green-300',
    metaData: 'text-green-700 dark:text-green-400/60',
    circle: 'fill-green-700 dark:fill-green-400/60',
  },
  emerald: {
    testimonial: 'text-emerald-900 dark:text-emerald-50',
    name: 'text-emerald-900 dark:text-emerald-300',
    metaData: 'text-emerald-700 dark:text-emerald-400/60',
    circle: 'fill-emerald-700 dark:fill-emerald-400/60',
  },
  teal: {
    testimonial: 'text-teal-900 dark:text-teal-50',
    name: 'text-teal-900 dark:text-teal-300',
    metaData: 'text-teal-700 dark:text-teal-400/60',
    circle: 'fill-teal-700 dark:fill-teal-400/60',
  },
  cyan: {
    testimonial: 'text-cyan-900 dark:text-cyan-50',
    name: 'text-cyan-900 dark:text-cyan-300',
    metaData: 'text-cyan-700 dark:text-cyan-400/60',
    circle: 'fill-cyan-700 dark:fill-cyan-400/60',
  },
  sky: {
    testimonial: 'text-sky-900 dark:text-sky-50',
    name: 'text-sky-900 dark:text-sky-300',
    metaData: 'text-sky-700 dark:text-sky-400/60',
    circle: 'fill-sky-700 dark:fill-sky-400/60',
  },
  blue: {
    testimonial: 'text-blue-900 dark:text-blue-50',
    name: 'text-blue-900 dark:text-blue-300',
    metaData: 'text-blue-700 dark:text-blue-400/60',
    circle: 'fill-blue-700 dark:fill-blue-400/60',
  },
  indigo: {
    testimonial: 'text-indigo-900 dark:text-indigo-50',
    name: 'text-indigo-900 dark:text-indigo-300',
    metaData: 'text-indigo-700 dark:text-indigo-400/60',
    circle: 'fill-indigo-700 dark:fill-indigo-400/60',
  },
  violet: {
    testimonial: 'text-violet-900 dark:text-violet-50',
    name: 'text-violet-900 dark:text-violet-300',
    metaData: 'text-violet-700 dark:text-violet-400/60',
    circle: 'fill-violet-700 dark:fill-violet-400/60',
  },
  purple: {
    testimonial: 'text-purple-900 dark:text-purple-50',
    name: 'text-purple-900 dark:text-purple-300',
    metaData: 'text-purple-700 dark:text-purple-400/60',
    circle: 'fill-purple-700 dark:fill-purple-400/60',
  },
  fuchsia: {
    testimonial: 'text-fuchsia-900 dark:text-fuchsia-50',
    name: 'text-fuchsia-900 dark:text-fuchsia-300',
    metaData: 'text-fuchsia-700 dark:text-fuchsia-400/60',
    circle: 'fill-fuchsia-700 dark:fill-fuchsia-400/60',
  },
  pink: {
    testimonial: 'text-pink-900 dark:text-pink-50',
    name: 'text-pink-900 dark:text-pink-300',
    metaData: 'text-pink-700 dark:text-pink-400/60',
    circle: 'fill-pink-700 dark:fill-pink-400/60',
  },
  rose: {
    testimonial: 'text-rose-900 dark:text-rose-50',
    name: 'text-rose-900 dark:text-rose-300',
    metaData: 'text-rose-700 dark:text-rose-400/60',
    circle: 'fill-rose-700 dark:fill-rose-400/60',
  },
};

function generateComponentString({
  isNextjs,
  testimonial,
  name,
  position,
  company,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  testimonial: string;
  name: string;
  position: string;
  company: string;
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
You need to configure remotePatterns in next.config.js to use dummyimage.com and logoipsum.com
  
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

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <Image
        priority
        width={200}
        height={40}
        className="mx-auto h-10 w-full"
        src="https://img.logoipsum.com/297.svg"
        alt="Logo"
      />

      <figure className="mt-10">
        <blockquote className="text-center text-xl font-semibold leading-8 sm:text-2xl sm:leading-9 ${colors[textColorKey].testimonial}">
          <p>
            ${removeHtmlTags(testimonial)}
          </p>
        </blockquote>

        <figcaption className="mt-10">
          <Image
            priority
            width={56}
            height={56}
            className="mx-auto h-14 w-14 rounded-full"
            src="https://dummyimage.com/100x100/d4d4d4/171717"
            alt="Full Name"
          />
          <div className="mt-4 text-base">
            <div className="text-center font-semibold ${colors[textColorKey].name}">
              ${removeHtmlTags(name)}
            </div>

            <div className="flex items-center justify-center space-x-2 ${colors[textColorKey].metaData}">
              <span>${removeHtmlTags(position)}</span>{' '}
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="${colors[textColorKey].circle}"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <span>${removeHtmlTags(company)}</span>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <Image
        priority
        width={200}
        height={40}
        className="mx-auto h-10 w-full"
        src="https://img.logoipsum.com/297.svg"
        alt="Logo"
      />

      <figure className="mt-10">
        <blockquote className="text-center text-xl font-semibold leading-8 sm:text-2xl sm:leading-9 ${colors[textColorKey].testimonial}">
          <p>
            ${removeHtmlTags(testimonial)}
          </p>
        </blockquote>

        <figcaption className="mt-10">
          <Image
            priority
            width={56}
            height={56}
            className="mx-auto h-14 w-14 rounded-full"
            src="https://dummyimage.com/100x100/d4d4d4/171717"
            alt="Full Name"
          />
          <div className="mt-4 text-base">
            <div className="text-center font-semibold ${colors[textColorKey].name}">
              ${removeHtmlTags(name)}
            </div>

            <div className="flex items-center justify-center space-x-2 ${colors[textColorKey].metaData}">
              <span>${removeHtmlTags(position)}</span>{' '}
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="${colors[textColorKey].circle}"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <span>${removeHtmlTags(company)}</span>
            </div>
          </div>
        </figcaption>
      </figure>
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
    testimonial,
    name,
    position,
    company,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    testimonial,
    name,
    position,
    company,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(
    `import Testimonial1 from './components/Testimonial1';`,
  );
  componentContent.push('<Testimonial1 />');
  return zip.file('components/Testimonial1.jsx', content);
}

Testimonial1.craft = {
  props: {
    testimonial:
      '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."',
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
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
