'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
import Trans from '~/core/ui/Trans';

import { useNode, useEditor, SerializedNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

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

const images = [
  {
    id: 1,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 2,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 3,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 4,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 5,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 6,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
  {
    id: 7,
    src: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    width: 1000,
    height: 1000,
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Gallery2 = ({
  heading = '',
  description = '',
  paddingArray = [],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = '',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
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
      <div className="mx-auto flex max-w-7xl flex-col space-y-4">
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

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} className="max-w-xl">
              <Image
                priority
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/gallery_2-1699474163590.webp"
      name="Gallery 2"
      Component={Gallery2}
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
    heading: node.data.props.heading,
    description: node.data.props.description,
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
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
  },
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

  let content: string;

  const nextContent = `/*
  The following package is required: npm install swiper

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

'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const images = ${JSON.stringify(images)};

export default function Gallery() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col space-y-4 text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${
          colors[textColorKey].heading
        }">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 lg:mt-24">
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} className="max-w-xl">
              <Image
                priority
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}`;

  const reactContent = `
  /*
  The following package is required: npm install swiper
  */
  
  import React from 'react';
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Pagination } from 'swiper/modules';
  
  const images = ${JSON.stringify(images)};
  
  export default function Gallery() {
    return (
      <div className="${clsx(
        maxWidth,
        marginArray.join(' '),
        paddingArray.join(' '),
      )}">
        <div className="flex flex-col space-y-4 text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${
            colors[textColorKey].heading
          }">
            ${removeHtmlTags(heading)}
          </h2>
  
          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
        </div>
  
        <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2 lg:mt-24">
          <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="max-w-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="rounded-xl object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
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

  importStatements.push(`import Gallery2 from './components/Gallery2';`);
  componentContent.push('<Gallery2 />');
  return zip.file('components/Gallery2.jsx', content);
}

Gallery2.craft = {
  props: {
    heading: 'Medium length section heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    paddingArray: [],
    marginArray: ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
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
