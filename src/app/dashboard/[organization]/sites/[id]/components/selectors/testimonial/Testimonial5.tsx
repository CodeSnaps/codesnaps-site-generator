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

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

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
  {
    id: 4,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    logoImg: 'https://img.logoipsum.com/297.svg',
    profileImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."',
  },
  {
    id: 5,
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

export const Testimonial5 = ({
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
      <div className="flex flex-col space-y-2 text-center md:space-y-6">
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

      <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
        <Swiper navigation={true} modules={[Pagination, Navigation]}>
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div key={testimonial.id}>
                <figure className="mx-auto flex max-w-2xl flex-col">
                  <div className="x-space-4 flex justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={clsx('h-7 w-7', colors[colorKey].icon)}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote
                    className={clsx(
                      'mt-8 text-center text-lg font-semibold leading-loose md:text-2xl md:leading-loose',
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

                  <figcaption className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                    <div className="flex items-center justify-center">
                      <div className="mr-4 flex-shrink-0 self-center">
                        <Image
                          priority
                          width={48}
                          height={48}
                          className="mx-auto h-12 w-12 rounded-full"
                          src={testimonial.profileImg}
                          alt={testimonial.name}
                        />
                      </div>

                      <div>
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
                            'text-base font-semibold',
                            colors[textColorKey].name,
                            'outline-none focus:outline-offset-4 focus:outline-primary',
                          )}
                        />

                        <p
                          className={clsx(
                            'mt-1 flex items-center space-x-2 text-sm font-medium',
                            colors[textColorKey].metaData,
                          )}
                        >
                          <ContentEditable
                            html={testimonial.position}
                            onChange={(e) =>
                              setProp(
                                (props: any) =>
                                  (props.testimonials[
                                    testimonial.id - 1
                                  ].position = e.target.value),
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
                            className={colors[textColorKey].circle}
                          >
                            <circle cx={1} cy={1} r={1} />
                          </svg>
                          <ContentEditable
                            html={testimonial.company}
                            onChange={(e) =>
                              setProp(
                                (props: any) =>
                                  (props.testimonials[
                                    testimonial.id - 1
                                  ].company = e.target.value),
                              )
                            }
                            tagName="span"
                            disabled={query.getOptions().enabled ? false : true}
                            className="outline-none focus:outline-offset-4 focus:outline-primary"
                          />
                        </p>
                      </div>
                    </div>

                    <div
                      className={clsx(
                        'hidden h-10 rounded-full border-l md:block',
                        colors[textColorKey].border,
                      )}
                    />

                    <div>
                      <Image
                        priority
                        width={200}
                        height={40}
                        className="mx-auto h-8 w-full"
                        src={testimonial.logoImg}
                        alt={testimonial.company}
                      />
                    </div>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </PaddingMarginWrapper>
  );
};

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/testimonial_5-1700175606234.webp"
      name="Testimonial 5"
      Component={Testimonial5}
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
    icon: string;
    heading: string;
    description: string;
    testimonial: string;
    name: string;
    metaData: string;
    circle: string;
    border: string;
  };
}

const colors: ColorObject = {
  slate: {
    icon: 'fill-slate-800 dark:fill-slate-500',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    testimonial: 'text-slate-900 dark:text-slate-300',
    name: 'text-slate-950 dark:text-slate-300',
    metaData: 'text-slate-600 dark:text-slate-400',
    circle: 'fill-slate-600 dark:fill-slate-400',
    border: 'border-slate-200 dark:border-slate-800',
  },
  gray: {
    icon: 'fill-gray-800 dark:fill-gray-500',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    testimonial: 'text-gray-900 dark:text-gray-300',
    name: 'text-gray-950 dark:text-gray-300',
    metaData: 'text-gray-600 dark:text-gray-400',
    circle: 'fill-gray-600 dark:fill-gray-400',
    border: 'border-gray-200 dark:border-gray-800',
  },
  zinc: {
    icon: 'fill-zinc-800 dark:fill-zinc-500',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    testimonial: 'text-zinc-900 dark:text-zinc-300',
    name: 'text-zinc-950 dark:text-zinc-300',
    metaData: 'text-zinc-600 dark:text-zinc-400',
    circle: 'fill-zinc-600 dark:fill-zinc-400',
    border: 'border-zinc-200 dark:border-zinc-800',
  },
  neutral: {
    icon: 'fill-neutral-800 dark:fill-neutral-500',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    testimonial: 'text-neutral-900 dark:text-neutral-300',
    name: 'text-neutral-950 dark:text-neutral-300',
    metaData: 'text-neutral-600 dark:text-neutral-400',
    circle: 'fill-neutral-600 dark:fill-neutral-400',
    border: 'border-neutral-200 dark:border-neutral-800',
  },
  stone: {
    icon: 'fill-stone-800 dark:fill-stone-500',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    testimonial: 'text-stone-900 dark:text-stone-300',
    name: 'text-stone-950 dark:text-stone-300',
    metaData: 'text-stone-600 dark:text-stone-400',
    circle: 'fill-stone-600 dark:fill-stone-400',
    border: 'border-stone-200 dark:border-stone-800',
  },
  red: {
    icon: 'fill-red-900 dark:fill-red-800',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    testimonial: 'text-red-900 dark:text-red-100',
    name: 'text-red-950 dark:text-red-400/70',
    metaData: 'text-red-950/70 dark:text-red-50/50',
    circle: 'fill-red-900 dark:fill-red-200/50',
    border: 'border-red-200 dark:border-red-950',
  },
  orange: {
    icon: 'fill-orange-900 dark:fill-orange-800',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    testimonial: 'text-orange-900 dark:text-orange-100',
    name: 'text-orange-950 dark:text-orange-400/70',
    metaData: 'text-orange-950/70 dark:text-orange-50/50',
    circle: 'fill-orange-900 dark:fill-orange-200/50',
    border: 'border-orange-200 dark:border-orange-950',
  },
  amber: {
    icon: 'fill-amber-900 dark:fill-amber-800',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    testimonial: 'text-amber-900 dark:text-amber-100',
    name: 'text-amber-950 dark:text-amber-400/70',
    metaData: 'text-amber-950/70 dark:text-amber-50/50',
    circle: 'fill-amber-900 dark:fill-amber-200/50',
    border: 'border-amber-200 dark:border-amber-950',
  },
  yellow: {
    icon: 'fill-yellow-900 dark:fill-yellow-800',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    testimonial: 'text-yellow-900 dark:text-yellow-100',
    name: 'text-yellow-950 dark:text-yellow-400/70',
    metaData: 'text-yellow-950/70 dark:text-yellow-50/50',
    circle: 'fill-yellow-900 dark:fill-yellow-200/50',
    border: 'border-yellow-200 dark:border-yellow-950',
  },
  lime: {
    icon: 'fill-lime-900 dark:fill-lime-800',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    testimonial: 'text-lime-900 dark:text-lime-100',
    name: 'text-lime-950 dark:text-lime-400/70',
    metaData: 'text-lime-950/70 dark:text-lime-50/50',
    circle: 'fill-lime-900 dark:fill-lime-200/50',
    border: 'border-lime-200 dark:border-lime-950',
  },
  green: {
    icon: 'fill-green-900 dark:fill-green-800',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    testimonial: 'text-green-900 dark:text-green-100',
    name: 'text-green-950 dark:text-green-400/70',
    metaData: 'text-green-950/70 dark:text-green-50/50',
    circle: 'fill-green-900 dark:fill-green-200/50',
    border: 'border-green-200 dark:border-green-950',
  },
  emerald: {
    icon: 'fill-emerald-900 dark:fill-emerald-800',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    testimonial: 'text-emerald-900 dark:text-emerald-100',
    name: 'text-emerald-950 dark:text-emerald-400/70',
    metaData: 'text-emerald-950/70 dark:text-emerald-50/50',
    circle: 'fill-emerald-900 dark:fill-emerald-200/50',
    border: 'border-emerald-200 dark:border-emerald-950',
  },
  teal: {
    icon: 'fill-teal-900 dark:fill-teal-800',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    testimonial: 'text-teal-900 dark:text-teal-100',
    name: 'text-teal-950 dark:text-teal-400/70',
    metaData: 'text-teal-950/70 dark:text-teal-50/50',
    circle: 'fill-teal-900 dark:fill-teal-200/50',
    border: 'border-teal-200 dark:border-teal-950',
  },
  cyan: {
    icon: 'fill-cyan-900 dark:fill-cyan-800',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    testimonial: 'text-cyan-900 dark:text-cyan-100',
    name: 'text-cyan-950 dark:text-cyan-400/70',
    metaData: 'text-cyan-950/70 dark:text-cyan-50/50',
    circle: 'fill-cyan-900 dark:fill-cyan-200/50',
    border: 'border-cyan-200 dark:border-cyan-950',
  },
  sky: {
    icon: 'fill-sky-900 dark:fill-sky-800',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    testimonial: 'text-sky-900 dark:text-sky-100',
    name: 'text-sky-950 dark:text-sky-400/70',
    metaData: 'text-sky-950/70 dark:text-sky-50/50',
    circle: 'fill-sky-900 dark:fill-sky-200/50',
    border: 'border-sky-200 dark:border-sky-950',
  },
  blue: {
    icon: 'fill-blue-900 dark:fill-blue-800',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    testimonial: 'text-blue-900 dark:text-blue-100',
    name: 'text-blue-950 dark:text-blue-400/70',
    metaData: 'text-blue-950/70 dark:text-blue-50/50',
    circle: 'fill-blue-900 dark:fill-blue-200/50',
    border: 'border-blue-200 dark:border-blue-950',
  },
  indigo: {
    icon: 'fill-indigo-900 dark:fill-indigo-800',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    testimonial: 'text-indigo-900 dark:text-indigo-100',
    name: 'text-indigo-950 dark:text-indigo-400/70',
    metaData: 'text-indigo-950/70 dark:text-indigo-50/50',
    circle: 'fill-indigo-900 dark:fill-indigo-200/50',
    border: 'border-indigo-200 dark:border-indigo-950',
  },
  violet: {
    icon: 'fill-violet-900 dark:fill-violet-800',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    testimonial: 'text-violet-900 dark:text-violet-100',
    name: 'text-violet-950 dark:text-violet-400/70',
    metaData: 'text-violet-950/70 dark:text-violet-50/50',
    circle: 'fill-violet-900 dark:fill-violet-200/50',
    border: 'border-violet-200 dark:border-violet-950',
  },
  purple: {
    icon: 'fill-purple-900 dark:fill-purple-800',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    testimonial: 'text-purple-900 dark:text-purple-100',
    name: 'text-purple-950 dark:text-purple-400/70',
    metaData: 'text-purple-950/70 dark:text-purple-50/50',
    circle: 'fill-purple-900 dark:fill-purple-200/50',
    border: 'border-purple-200 dark:border-purple-950',
  },
  fuchsia: {
    icon: 'fill-fuchsia-900 dark:fill-fuchsia-800',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    testimonial: 'text-fuchsia-900 dark:text-fuchsia-100',
    name: 'text-fuchsia-950 dark:text-fuchsia-400/70',
    metaData: 'text-fuchsia-950/70 dark:text-fuchsia-50/50',
    circle: 'fill-fuchsia-900 dark:fill-fuchsia-200/50',
    border: 'border-fuchsia-200 dark:border-fuchsia-950',
  },
  pink: {
    icon: 'fill-pink-900 dark:fill-pink-800',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    testimonial: 'text-pink-900 dark:text-pink-100',
    name: 'text-pink-950 dark:text-pink-400/70',
    metaData: 'text-pink-950/70 dark:text-pink-50/50',
    circle: 'fill-pink-900 dark:fill-pink-200/50',
    border: 'border-pink-200 dark:border-pink-950',
  },
  rose: {
    icon: 'fill-rose-900 dark:fill-rose-800',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    testimonial: 'text-rose-900 dark:text-rose-100',
    name: 'text-rose-950 dark:text-rose-400/70',
    metaData: 'text-rose-950/70 dark:text-rose-50/50',
    circle: 'fill-rose-900 dark:fill-rose-200/50',
    border: 'border-rose-200 dark:border-rose-950',
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
The following package is required: npm install swiper

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

'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

const testimonials = ${teamString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col space-y-2 text-center md:space-y-6">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
        <Swiper navigation={true} modules={[Pagination, Navigation]}>
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <figure className="mx-auto flex max-w-2xl flex-col">
                <div className="x-space-4 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-7 w-7 ${colors[colorKey].icon}"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-8 text-center text-lg font-semibold leading-loose md:text-2xl md:leading-loose ${colors[textColorKey].testimonial}">
                  <p>{testimonial.content}</p>
                </blockquote>

                <figcaption className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                  <div className="flex items-center justify-center">
                    <div className="mr-4 flex-shrink-0 self-center">
                      <Image
                        width={48}
                        height={48}
                        className="mx-auto h-12 w-12 rounded-full"
                        src={testimonial.profileImg}
                        alt={testimonial.name}
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-semibold ${colors[textColorKey].name}">
                        {testimonial.name}
                      </h4>

                      <p className="mt-1 flex items-center space-x-2 text-sm font-medium ${colors[textColorKey].metaData}">
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
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-10 rounded-full border-l md:block ${colors[textColorKey].border}" />

                  <div>
                    <Image
                      width={200}
                      height={40}
                      className="mx-auto h-8 w-full"
                      src={testimonial.logoImg}
                      alt={testimonial.company}
                    />
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}`;

  const reactContent = `/*
The following package is required: npm install swiper
*/

import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

const testimonials = ${teamString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col space-y-2 text-center md:space-y-6">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
        <Swiper navigation={true} modules={[Pagination, Navigation]}>
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <figure className="mx-auto flex max-w-2xl flex-col">
                <div className="x-space-4 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-7 w-7 ${colors[colorKey].icon}"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-8 text-center text-lg font-semibold leading-loose md:text-2xl md:leading-loose ${colors[textColorKey].testimonial}">
                  <p>{testimonial.content}</p>
                </blockquote>

                <figcaption className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                  <div className="flex items-center justify-center">
                    <div className="mr-4 flex-shrink-0 self-center">
                      <img
                        width={48}
                        height={48}
                        className="mx-auto h-12 w-12 rounded-full"
                        src={testimonial.profileImg}
                        alt={testimonial.name}
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-semibold ${colors[textColorKey].name}">
                        {testimonial.name}
                      </h4>

                      <p className="mt-1 flex items-center space-x-2 text-sm font-medium ${colors[textColorKey].metaData}">
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
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-10 rounded-full border-l md:block ${colors[textColorKey].border}" />

                  <div>
                    <img
                      width={200}
                      height={40}
                      className="mx-auto h-8 w-full"
                      src={testimonial.logoImg}
                      alt={testimonial.company}
                    />
                  </div>
                </figcaption>
              </figure>
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
    `import Testimonial5 from './components/Testimonial5';`,
  );
  componentContent.push('<Testimonial5 />');
  return zip.file('components/Testimonial5.jsx', content);
}

Testimonial5.craft = {
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
