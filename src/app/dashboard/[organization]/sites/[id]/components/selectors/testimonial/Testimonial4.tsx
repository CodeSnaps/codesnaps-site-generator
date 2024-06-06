'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
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

const firstColumn = [
  {
    id: 1,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae.',
  },
  {
    id: 2,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae.',
  },
];

const secondColumn = [
  {
    id: 1,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.',
  },
  {
    id: 2,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.',
  },
];

const thirdColumn = [
  {
    id: 1,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae.',
  },
  {
    id: 2,
    name: 'Full Name',
    position: 'Position',
    company: 'Company Name',
    imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae.',
  },
];

type TestimonialContent = {
  id: number;
  name: string;
  position: string;
  company: string;
  imgSrc: string;
  content: string;
};

type SerializedNodeWithId = SerializedNode & { id: string };

export const Testimonial4 = ({
  heading = '',
  description = '',
  firstColumn = [],
  secondColumn = [],
  thirdColumn = [],
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  firstColumn?: TestimonialContent[];
  secondColumn?: TestimonialContent[];
  thirdColumn?: TestimonialContent[];
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
      <div className="flex flex-col space-y-4 text-center">
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

      <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-3 lg:mt-24">
        <div className="flex flex-col gap-4">
          {firstColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className={clsx(
                'flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10',
                colors[colorKey].border,
              )}
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={clsx('h-5 w-5', colors[colorKey].icon)}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote
                className={clsx(
                  'mt-4 text-base font-semibold leading-relaxed',
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

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    priority
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
                      className={colors[textColorKey].circle}
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
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {secondColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className={clsx(
                'flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10',
                colors[colorKey].border,
              )}
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={clsx('h-5 w-5', colors[colorKey].icon)}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote
                className={clsx(
                  'mt-4 text-base font-semibold leading-relaxed',
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

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    priority
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
                      className={colors[textColorKey].circle}
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
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {thirdColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className={clsx(
                'flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10',
                colors[colorKey].border,
              )}
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={clsx('h-5 w-5', colors[colorKey].icon)}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote
                className={clsx(
                  'mt-4 text-base font-semibold leading-relaxed',
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

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    priority
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
                      className={colors[textColorKey].circle}
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
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/testimonial_4-1700175511485.webp"
      name="Testimonial 4"
      Component={Testimonial4}
    />
  );
}

function ToolbarSettings() {
  const {
    heading,
    description,
    firstColumn,
    secondColumn,
    thirdColumn,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    displayName,
  } = useNode((node) => ({
    heading: node.data.props.heading,
    description: node.data.props.description,
    firstColumn: node.data.props.firstColumn,
    secondColumn: node.data.props.secondColumn,
    thirdColumn: node.data.props.thirdColumn,
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
                  firstColumn,
                  secondColumn,
                  thirdColumn,
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
                  firstColumn,
                  secondColumn,
                  thirdColumn,
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
    border: string;
    icon: string;
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
    border: 'border-slate-200 dark:border-slate-800',
    icon: 'fill-slate-800 dark:fill-slate-500',
    testimonial: 'text-slate-900 dark:text-slate-400',
    name: 'text-slate-950 dark:text-slate-300',
    metaData: 'text-slate-600 dark:text-slate-400',
    circle: 'fill-slate-600 dark:fill-slate-400',
  },
  gray: {
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-800',
    icon: 'fill-gray-800 dark:fill-gray-500',
    testimonial: 'text-gray-900 dark:text-gray-400',
    name: 'text-gray-950 dark:text-gray-300',
    metaData: 'text-gray-600 dark:text-gray-400',
    circle: 'fill-gray-600 dark:fill-gray-400',
  },
  zinc: {
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    border: 'border-zinc-200 dark:border-zinc-800',
    icon: 'fill-zinc-800 dark:fill-zinc-500',
    testimonial: 'text-zinc-900 dark:text-zinc-400',
    name: 'text-zinc-950 dark:text-zinc-300',
    metaData: 'text-zinc-600 dark:text-zinc-400',
    circle: 'fill-zinc-600 dark:fill-zinc-400',
  },
  neutral: {
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    border: 'border-neutral-200 dark:border-neutral-800',
    icon: 'fill-neutral-800 dark:fill-neutral-500',
    testimonial: 'text-neutral-900 dark:text-neutral-400',
    name: 'text-neutral-950 dark:text-neutral-300',
    metaData: 'text-neutral-600 dark:text-neutral-400',
    circle: 'fill-neutral-600 dark:fill-neutral-400',
  },
  stone: {
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    border: 'border-stone-200 dark:border-stone-800',
    icon: 'fill-stone-800 dark:fill-stone-500',
    testimonial: 'text-stone-900 dark:text-stone-400',
    name: 'text-stone-950 dark:text-stone-300',
    metaData: 'text-stone-600 dark:text-stone-400',
    circle: 'fill-stone-600 dark:fill-stone-400',
  },
  red: {
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    border: 'border-red-200 dark:border-red-950',
    icon: 'fill-red-900 dark:fill-red-800',
    testimonial: 'text-red-900 dark:text-red-100/80',
    name: 'text-red-950 dark:text-red-400/70',
    metaData: 'text-red-950/70 dark:text-red-50/50',
    circle: 'fill-red-900 dark:fill-red-200/50',
  },
  orange: {
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    border: 'border-orange-200 dark:border-orange-950',
    icon: 'fill-orange-900 dark:fill-orange-800',
    testimonial: 'text-orange-900 dark:text-orange-100/80',
    name: 'text-orange-950 dark:text-orange-400/70',
    metaData: 'text-orange-950/70 dark:text-orange-50/50',
    circle: 'fill-orange-900 dark:fill-orange-200/50',
  },
  amber: {
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    border: 'border-amber-200 dark:border-amber-950',
    icon: 'fill-amber-900 dark:fill-amber-800',
    testimonial: 'text-amber-900 dark:text-amber-100/80',
    name: 'text-amber-950 dark:text-amber-400/70',
    metaData: 'text-amber-950/70 dark:text-amber-50/50',
    circle: 'fill-amber-900 dark:fill-amber-200/50',
  },
  yellow: {
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    border: 'border-yellow-200 dark:border-yellow-950',
    icon: 'fill-yellow-900 dark:fill-yellow-800',
    testimonial: 'text-yellow-900 dark:text-yellow-100/80',
    name: 'text-yellow-950 dark:text-yellow-400/70',
    metaData: 'text-yellow-950/70 dark:text-yellow-50/50',
    circle: 'fill-yellow-900 dark:fill-yellow-200/50',
  },
  lime: {
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    border: 'border-lime-200 dark:border-lime-950',
    icon: 'fill-lime-900 dark:fill-lime-800',
    testimonial: 'text-lime-900 dark:text-lime-100/80',
    name: 'text-lime-950 dark:text-lime-400/70',
    metaData: 'text-lime-950/70 dark:text-lime-50/50',
    circle: 'fill-lime-900 dark:fill-lime-200/50',
  },
  green: {
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    border: 'border-green-200 dark:border-green-950',
    icon: 'fill-green-900 dark:fill-green-800',
    testimonial: 'text-green-900 dark:text-green-100/80',
    name: 'text-green-950 dark:text-green-400/70',
    metaData: 'text-green-950/70 dark:text-green-50/50',
    circle: 'fill-green-900 dark:fill-green-200/50',
  },
  emerald: {
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    border: 'border-emerald-200 dark:border-emerald-950',
    icon: 'fill-emerald-900 dark:fill-emerald-800',
    testimonial: 'text-emerald-900 dark:text-emerald-100/80',
    name: 'text-emerald-950 dark:text-emerald-400/70',
    metaData: 'text-emerald-950/70 dark:text-emerald-50/50',
    circle: 'fill-emerald-900 dark:fill-emerald-200/50',
  },
  teal: {
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    border: 'border-teal-200 dark:border-teal-950',
    icon: 'fill-teal-900 dark:fill-teal-800',
    testimonial: 'text-teal-900 dark:text-teal-100/80',
    name: 'text-teal-950 dark:text-teal-400/70',
    metaData: 'text-teal-950/70 dark:text-teal-50/50',
    circle: 'fill-teal-900 dark:fill-teal-200/50',
  },
  cyan: {
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    border: 'border-cyan-200 dark:border-cyan-950',
    icon: 'fill-cyan-900 dark:fill-cyan-800',
    testimonial: 'text-cyan-900 dark:text-cyan-100/80',
    name: 'text-cyan-950 dark:text-cyan-400/70',
    metaData: 'text-cyan-950/70 dark:text-cyan-50/50',
    circle: 'fill-cyan-900 dark:fill-cyan-200/50',
  },
  sky: {
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    border: 'border-sky-200 dark:border-sky-950',
    icon: 'fill-sky-900 dark:fill-sky-800',
    testimonial: 'text-sky-900 dark:text-sky-100/80',
    name: 'text-sky-950 dark:text-sky-400/70',
    metaData: 'text-sky-950/70 dark:text-sky-50/50',
    circle: 'fill-sky-900 dark:fill-sky-200/50',
  },
  blue: {
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    border: 'border-blue-200 dark:border-blue-950',
    icon: 'fill-blue-900 dark:fill-blue-800',
    testimonial: 'text-blue-900 dark:text-blue-100/80',
    name: 'text-blue-950 dark:text-blue-400/70',
    metaData: 'text-blue-950/70 dark:text-blue-50/50',
    circle: 'fill-blue-900 dark:fill-blue-200/50',
  },
  indigo: {
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    border: 'border-indigo-200 dark:border-indigo-950',
    icon: 'fill-indigo-900 dark:fill-indigo-800',
    testimonial: 'text-indigo-900 dark:text-indigo-100/80',
    name: 'text-indigo-950 dark:text-indigo-400/70',
    metaData: 'text-indigo-950/70 dark:text-indigo-50/50',
    circle: 'fill-indigo-900 dark:fill-indigo-200/50',
  },
  violet: {
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    border: 'border-violet-200 dark:border-violet-950',
    icon: 'fill-violet-900 dark:fill-violet-800',
    testimonial: 'text-violet-900 dark:text-violet-100/80',
    name: 'text-violet-950 dark:text-violet-400/70',
    metaData: 'text-violet-950/70 dark:text-violet-50/50',
    circle: 'fill-violet-900 dark:fill-violet-200/50',
  },
  purple: {
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    border: 'border-purple-200 dark:border-purple-950',
    icon: 'fill-purple-900 dark:fill-purple-800',
    testimonial: 'text-purple-900 dark:text-purple-100/80',
    name: 'text-purple-950 dark:text-purple-400/70',
    metaData: 'text-purple-950/70 dark:text-purple-50/50',
    circle: 'fill-purple-900 dark:fill-purple-200/50',
  },
  fuchsia: {
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    border: 'border-fuchsia-200 dark:border-fuchsia-950',
    icon: 'fill-fuchsia-900 dark:fill-fuchsia-800',
    testimonial: 'text-fuchsia-900 dark:text-fuchsia-100/80',
    name: 'text-fuchsia-950 dark:text-fuchsia-400/70',
    metaData: 'text-fuchsia-950/70 dark:text-fuchsia-50/50',
    circle: 'fill-fuchsia-900 dark:fill-fuchsia-200/50',
  },
  pink: {
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    border: 'border-pink-200 dark:border-pink-950',
    icon: 'fill-pink-900 dark:fill-pink-800',
    testimonial: 'text-pink-900 dark:text-pink-100/80',
    name: 'text-pink-950 dark:text-pink-400/70',
    metaData: 'text-pink-950/70 dark:text-pink-50/50',
    circle: 'fill-pink-900 dark:fill-pink-200/50',
  },
  rose: {
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    border: 'border-rose-200 dark:border-rose-950',
    icon: 'fill-rose-900 dark:fill-rose-800',
    testimonial: 'text-rose-900 dark:text-rose-100/80',
    name: 'text-rose-950 dark:text-rose-400/70',
    metaData: 'text-rose-950/70 dark:text-rose-50/50',
    circle: 'fill-rose-900 dark:fill-rose-200/50',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  firstColumn,
  secondColumn,
  thirdColumn,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  firstColumn: TestimonialContent[];
  secondColumn: TestimonialContent[];
  thirdColumn: TestimonialContent[];
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedFirstColumn = firstColumn.map(
    (testimonial) => `
  {
    id: ${testimonial.id},
    name: '${removeHtmlTags(testimonial.name)}',
    position: '${removeHtmlTags(testimonial.position)}',
    company: '${removeHtmlTags(testimonial.company)}',
    imgSrc: '${testimonial.imgSrc}',
    content: '${removeHtmlTags(testimonial.content)}',
  }`,
  );

  const mappedSecondColumn = secondColumn.map(
    (testimonial) => `
  {
    id: ${testimonial.id},
    name: '${removeHtmlTags(testimonial.name)}',
    position: '${removeHtmlTags(testimonial.position)}',
    company: '${removeHtmlTags(testimonial.company)}',
    imgSrc: '${testimonial.imgSrc}',
    content: '${removeHtmlTags(testimonial.content)}',
  }`,
  );

  const mappedThirdColumn = thirdColumn.map(
    (testimonial) => `
  {
    id: ${testimonial.id},
    name: '${removeHtmlTags(testimonial.name)}',
    position: '${removeHtmlTags(testimonial.position)}',
    company: '${removeHtmlTags(testimonial.company)}',
    imgSrc: '${testimonial.imgSrc}',
    content: '${removeHtmlTags(testimonial.content)}',
  }`,
  );

  const firstColumnString = `[${mappedFirstColumn.join(',\n')}]`;
  const secondColumnString = `[${mappedSecondColumn.join(',\n')}]`;
  const thirdColumnString = `[${mappedThirdColumn.join(',\n')}]`;

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

const firstColumn = ${firstColumnString};
const secondColumn = ${secondColumnString};
const thirdColumn = ${thirdColumnString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-3 lg:mt-24">
        <div className="flex flex-col gap-4">
          {firstColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>{testimonial.content}</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {secondColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>“{testimonial.content}”</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {thirdColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>{testimonial.content}</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>
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

  const reactContent = `import React from 'react';

const firstColumn = ${firstColumnString};
const secondColumn = ${secondColumnString};
const thirdColumn = ${thirdColumnString};

export default function Testimonial() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-3 lg:mt-24">
        <div className="flex flex-col gap-4">
          {firstColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>“{testimonial.content}”</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <img
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {secondColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>“{testimonial.content}”</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <img
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {thirdColumn.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border px-4 py-8 shadow-md lg:px-6 lg:py-10 ${colors[colorKey].border}"
            >
              <div className="x-space-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 ${colors[colorKey].icon}"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 text-base font-semibold leading-relaxed ${colors[textColorKey].testimonial}">
                <p>“{testimonial.content}”</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center">
                <div className="mr-4 flex-shrink-0 self-center">
                  <img
                    width={48}
                    height={48}
                    className="mx-auto h-12 w-12 rounded-full"
                    src={testimonial.imgSrc}
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
              </figcaption>
            </figure>
          ))}
        </div>
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
    firstColumn,
    secondColumn,
    thirdColumn,
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
    firstColumn,
    secondColumn,
    thirdColumn,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(
    `import Testimonial4 from './components/Testimonial4';`,
  );
  componentContent.push('<Testimonial4 />');
  return zip.file('components/Testimonial4.jsx', content);
}

Testimonial4.craft = {
  props: {
    heading: 'Customer Testimonials',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    firstColumn: firstColumn,
    secondColumn: secondColumn,
    thirdColumn: thirdColumn,
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
