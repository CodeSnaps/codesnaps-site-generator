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

const testimonials = [
  {
    id: 1,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    logoImg: 'https://img.logoipsum.com/297.svg',
    profileImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."',
  },
  {
    id: 2,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    logoImg: 'https://img.logoipsum.com/297.svg',
    profileImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."',
  },
  {
    id: 3,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    logoImg: 'https://img.logoipsum.com/297.svg',
    profileImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."',
  },
];

type SerializedNodeWithId = SerializedNode & { id: string };

export const Testimonial3 = ({
  heading = 'Customer Testimonials',
  description = 'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
  testimonials = [],
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-4xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  testimonials?: {
    id: number;
    name: string;
    position: string;
    company: string;
    logoImg: string;
    profileImg: string;
    content: string;
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
      <div className="mx-auto max-w-4xl text-center">
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
            'mx-auto mt-6 max-w-xl text-lg',
            'outline-none focus:outline-offset-4 focus:outline-primary',
            colors[textColorKey].description,
          )}
        />
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <Image
                priority
                width={200}
                height={40}
                className="mx-auto h-8 w-full"
                src={testimonial.logoImg}
                alt={testimonial.company}
              />

              <figure className="mt-6">
                <blockquote
                  className={clsx(
                    'text-center text-lg font-semibold leading-relaxed',
                    colors[textColorKey].testimonial,
                  )}
                >
                  <ContentEditable
                    html={testimonial.content}
                    onChange={(e) =>
                      setProp(
                        (props: any) =>
                          (props.testimonials[testimonial.id - 1].content =
                            e.target.value),
                      )
                    }
                    tagName="p"
                    disabled={query.getOptions().enabled ? false : true}
                    className="outline-none focus:outline-offset-4 focus:outline-primary"
                  />
                </blockquote>

                <figcaption className="mt-6">
                  <Image
                    priority
                    width={56}
                    height={56}
                    className="mx-auto h-14 w-14 rounded-full"
                    src={testimonial.profileImg}
                    alt={testimonial.name}
                  />
                  <div className="mt-4 text-base">
                    <ContentEditable
                      html={testimonial.name}
                      onChange={(e) =>
                        setProp(
                          (props: any) =>
                            (props.testimonials[testimonial.id - 1].name =
                              e.target.value),
                        )
                      }
                      tagName="h4"
                      disabled={query.getOptions().enabled ? false : true}
                      className={clsx(
                        'text-center font-semibold',
                        colors[textColorKey].name,
                        'outline-none focus:outline-offset-4 focus:outline-primary',
                      )}
                    />

                    <div
                      className={clsx(
                        'flex items-center justify-center space-x-2',
                        colors[textColorKey].metaData,
                      )}
                    >
                      <ContentEditable
                        html={testimonial.position}
                        onChange={(e) =>
                          setProp(
                            (props: any) =>
                              (props.testimonials[testimonial.id - 1].position =
                                e.target.value),
                          )
                        }
                        tagName="span"
                        disabled={query.getOptions().enabled ? false : true}
                        className="outline-none focus:outline-offset-4 focus:outline-primary"
                      />{' '}
                      <svg
                        viewBox="0 0 2 2"
                        width={3}
                        height={3}
                        aria-hidden="true"
                        className="fill-neutral-600 dark:fill-neutral-400"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <ContentEditable
                        html={testimonial.company}
                        onChange={(e) =>
                          setProp(
                            (props: any) =>
                              (props.testimonials[testimonial.id - 1].company =
                                e.target.value),
                          )
                        }
                        tagName="span"
                        disabled={query.getOptions().enabled ? false : true}
                        className="outline-none focus:outline-offset-4 focus:outline-primary"
                      />
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </dl>
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/testimonial_3-1700175396447.webp"
      name="Testimonial 3"
      Component={Testimonial3}
    />
  );
}

function ToolbarSettings() {
  const {
    heading,
    description,
    testimonials,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    displayName,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    description: node.data.props.description,
    testimonials: node.data.props.testimonials,
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
                  heading,
                  description,
                  testimonials,
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
                  heading,
                  description,
                  testimonials,
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
    heading: string;
    description: string;
    testimonial: string;
    name: string;
    metaData: string;
    circle: string;
  };
}

const colors: ColorObject = {
  slate: {
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    testimonial: 'text-slate-900 dark:text-slate-300',
    name: 'text-slate-950 dark:text-slate-300',
    metaData: 'text-slate-600 dark:text-slate-400',
    circle: 'fill-slate-600 dark:fill-slate-400',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    testimonial: 'text-gray-900 dark:text-gray-300',
    name: 'text-gray-950 dark:text-gray-300',
    metaData: 'text-gray-600 dark:text-gray-400',
    circle: 'fill-gray-600 dark:fill-gray-400',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    testimonial: 'text-zinc-900 dark:text-zinc-300',
    name: 'text-zinc-950 dark:text-zinc-300',
    metaData: 'text-zinc-600 dark:text-zinc-400',
    circle: 'fill-zinc-600 dark:fill-zinc-400',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    testimonial: 'text-neutral-900 dark:text-neutral-300',
    name: 'text-neutral-950 dark:text-neutral-300',
    metaData: 'text-neutral-600 dark:text-neutral-400',
    circle: 'fill-neutral-600 dark:fill-neutral-400',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    testimonial: 'text-stone-900 dark:text-stone-300',
    name: 'text-stone-950 dark:text-stone-300',
    metaData: 'text-stone-600 dark:text-stone-400',
    circle: 'fill-stone-600 dark:fill-stone-400',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    testimonial: 'text-red-900 dark:text-red-100',
    name: 'text-red-950 dark:text-red-400/70',
    metaData: 'text-red-950/70 dark:text-red-50/50',
    circle: 'fill-red-700 dark:fill-red-400/60',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    testimonial: 'text-orange-900 dark:text-orange-100',
    name: 'text-orange-950 dark:text-orange-400/70',
    metaData: 'text-orange-950/70 dark:text-orange-50/50',
    circle: 'fill-orange-700 dark:fill-orange-400/60',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    testimonial: 'text-amber-900 dark:text-amber-100',
    name: 'text-amber-950 dark:text-amber-400/70',
    metaData: 'text-amber-950/70 dark:text-amber-50/50',
    circle: 'fill-amber-700 dark:fill-amber-400/60',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    testimonial: 'text-yellow-900 dark:text-yellow-100',
    name: 'text-yellow-950 dark:text-yellow-400/70',
    metaData: 'text-yellow-950/70 dark:text-yellow-50/50',
    circle: 'fill-yellow-700 dark:fill-yellow-400/60',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    testimonial: 'text-lime-900 dark:text-lime-100',
    name: 'text-lime-950 dark:text-lime-400/70',
    metaData: 'text-lime-950/70 dark:text-lime-50/50',
    circle: 'fill-lime-700 dark:fill-lime-400/60',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    testimonial: 'text-green-900 dark:text-green-100',
    name: 'text-green-950 dark:text-green-400/70',
    metaData: 'text-green-950/70 dark:text-green-50/50',
    circle: 'fill-green-700 dark:fill-green-400/60',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    testimonial: 'text-emerald-900 dark:text-emerald-100',
    name: 'text-emerald-950 dark:text-emerald-400/70',
    metaData: 'text-emerald-950/70 dark:text-emerald-50/50',
    circle: 'fill-emerald-700 dark:fill-emerald-400/60',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    testimonial: 'text-teal-900 dark:text-teal-100',
    name: 'text-teal-950 dark:text-teal-400/70',
    metaData: 'text-teal-950/70 dark:text-teal-50/50',
    circle: 'fill-teal-700 dark:fill-teal-400/60',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    testimonial: 'text-cyan-900 dark:text-cyan-100',
    name: 'text-cyan-950 dark:text-cyan-400/70',
    metaData: 'text-cyan-950/70 dark:text-cyan-50/50',
    circle: 'fill-cyan-700 dark:fill-cyan-400/60',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    testimonial: 'text-sky-900 dark:text-sky-100',
    name: 'text-sky-950 dark:text-sky-400/70',
    metaData: 'text-sky-950/70 dark:text-sky-50/50',
    circle: 'fill-sky-700 dark:fill-sky-400/60',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    testimonial: 'text-blue-900 dark:text-blue-100',
    name: 'text-blue-950 dark:text-blue-400/70',
    metaData: 'text-blue-950/70 dark:text-blue-50/50',
    circle: 'fill-blue-700 dark:fill-blue-400/60',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    testimonial: 'text-indigo-900 dark:text-indigo-100',
    name: 'text-indigo-950 dark:text-indigo-400/70',
    metaData: 'text-indigo-950/70 dark:text-indigo-50/50',
    circle: 'fill-indigo-700 dark:fill-indigo-400/60',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    testimonial: 'text-violet-900 dark:text-violet-100',
    name: 'text-violet-950 dark:text-violet-400/70',
    metaData: 'text-violet-950/70 dark:text-violet-50/50',
    circle: 'fill-violet-700 dark:fill-violet-400/60',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    testimonial: 'text-purple-900 dark:text-purple-100',
    name: 'text-purple-950 dark:text-purple-400/70',
    metaData: 'text-purple-950/70 dark:text-purple-50/50',
    circle: 'fill-purple-700 dark:fill-purple-400/60',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    testimonial: 'text-fuchsia-900 dark:text-fuchsia-100',
    name: 'text-fuchsia-950 dark:text-fuchsia-400/70',
    metaData: 'text-fuchsia-950/70 dark:text-fuchsia-50/50',
    circle: 'fill-fuchsia-700 dark:fill-fuchsia-400/60',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    testimonial: 'text-pink-900 dark:text-pink-100',
    name: 'text-pink-950 dark:text-pink-400/70',
    metaData: 'text-pink-950/70 dark:text-pink-50/50',
    circle: 'fill-pink-700 dark:fill-pink-400/60',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    testimonial: 'text-rose-900 dark:text-rose-100',
    name: 'text-rose-950 dark:text-rose-400/70',
    metaData: 'text-rose-950/70 dark:text-rose-50/50',
    circle: 'fill-rose-700 dark:fill-rose-400/60',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  testimonials,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  testimonials: {
    id: number;
    name: string;
    position: string;
    company: string;
    logoImg: string;
    profileImg: string;
    content: string;
  }[];
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

  const mappedTestimonials = testimonials.map(
    (testimonial) => `
  {
    id: ${testimonial.id},
    name: '${removeHtmlTags(testimonial.name)}',
    position: '${removeHtmlTags(testimonial.position)}',
    company: '${removeHtmlTags(testimonial.company)}',
    logoImg: '${testimonial.logoImg}',
    profileImg: '${testimonial.profileImg}',
    content: '${removeHtmlTags(testimonial.content)}',
  }`,
  );

  const teamString = `[${mappedTestimonials.join(',\n')}]`;

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

const testimonials = ${teamString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <Image
                width={200}
                height={40}
                className="mx-auto h-8 w-full"
                src={testimonial.logoImg}
                alt={testimonial.company}
              />

              <figure className="mt-6">
                <blockquote className="text-center text-lg font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                  <p>{testimonial.content}</p>
                </blockquote>

                <figcaption className="mt-6">
                  <Image
                    width={56}
                    height={56}
                    className="mx-auto h-14 w-14 rounded-full"
                    src={testimonial.profileImg}
                    alt={testimonial.name}
                  />
                  <div className="mt-4 text-base">
                    <h4 className="text-center font-semibold ${colors[textColorKey].name}">
                      {testimonial.name}
                    </h4>

                    <div className="flex items-center justify-center space-x-2 ${colors[textColorKey].metaData}">
                      <span>{testimonial.position}</span>{' '}
                      <svg
                        viewBox="0 0 2 2"
                        width={3}
                        height={3}
                        aria-hidden="true"
                        className="${colors[textColorKey].circle}"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <span>{testimonial.company}</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

const testimonials = ${teamString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
       <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <img
                width={200}
                height={40}
                className="mx-auto h-8 w-full"
                src={testimonial.logoImg}
                alt={testimonial.company}
              />

              <figure className="mt-6">
                <blockquote className="text-center text-lg font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                  <p>{testimonial.content}</p>
                </blockquote>

                <figcaption className="mt-6">
                  <img
                    width={56}
                    height={56}
                    className="mx-auto h-14 w-14 rounded-full"
                    src={testimonial.profileImg}
                    alt={testimonial.name}
                  />
                  <div className="mt-4 text-base">
                    <h4 className="text-center font-semibold ${colors[textColorKey].name}">
                      {testimonial.name}
                    </h4>

                    <div className="flex items-center justify-center space-x-2 ${colors[textColorKey].metaData}">
                      <span>{testimonial.position}</span>{' '}
                      <svg
                        viewBox="0 0 2 2"
                        width={3}
                        height={3}
                        aria-hidden="true"
                        className="${colors[textColorKey].circle}"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <span>{testimonial.company}</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </dl>
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
    testimonials,
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
    testimonials,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(
    `import Testimonial3 from './components/Testimonial3';`,
  );
  componentContent.push('<Testimonial3 />');
  return zip.file('components/Testimonial3.jsx', content);
}

Testimonial3.craft = {
  props: {
    heading: 'Customer Testimonials',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    testimonials: testimonials,
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
