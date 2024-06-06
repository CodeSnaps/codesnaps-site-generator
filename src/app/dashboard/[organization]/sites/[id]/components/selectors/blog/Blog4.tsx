'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
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

const posts = [
  {
    id: 1,
    category: 'Category',
    title: 'Blog title heading',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    imgSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    metadata: {
      author: 'Full Name',
      authorImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
      datetime: '2023-05-01',
      date: 'May 1, 2023',
      readingTime: '5 min read',
    },
  },
  {
    id: 2,
    category: 'Category',
    title: 'Blog title heading',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    imgSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    metadata: {
      author: 'Full Name',
      authorImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
      datetime: '2023-05-01',
      date: 'May 1, 2023',
      readingTime: '5 min read',
    },
  },
  {
    id: 3,
    category: 'Category',
    title: 'Blog title heading',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    imgSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    metadata: {
      author: 'Full Name',
      authorImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
      datetime: '2023-05-01',
      date: 'May 1, 2023',
      readingTime: '5 min read',
    },
  },
  {
    id: 4,
    category: 'Category',
    title: 'Blog title heading',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    imgSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    alt: 'Image',
    metadata: {
      author: 'Full Name',
      authorImg: 'https://dummyimage.com/100x100/d4d4d4/171717',
      datetime: '2023-05-01',
      date: 'May 1, 2023',
      readingTime: '5 min read',
    },
  },
];

export const Blog4 = ({
  tagline = '',
  heading = '',
  description = '',
  posts = [],
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
  posts?: any[];
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
      <div className="block items-end justify-between lg:flex">
        <div className="flex max-w-4xl flex-col space-y-7">
          <ContentEditable
            html={tagline}
            onChange={(e) =>
              setProp(
                (props: { tagline: string }) =>
                  (props.tagline = e.target.value),
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
                (props: { heading: string }) =>
                  (props.heading = e.target.value),
              )
            }
            tagName="h2"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-4xl font-semibold leading-tight tracking-wide xl:text-5xl',
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
              'max-w-xl text-lg',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />
        </div>
      </div>

      <div className="mx-auto mt-14 lg:mt-20">
        <dl className="grid grid-cols-1 gap-20 xl:grid-cols-2">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="flex flex-col items-center gap-8 md:flex-row"
            >
              <Link href={post.href} className="max-w-md xl:max-w-[250px]">
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-lg object-cover"
                />
              </Link>

              <div>
                <dt className="flex flex-col items-start gap-y-3">
                  <ContentEditable
                    html={post.category}
                    onChange={(e) =>
                      setProp((props: any) => {
                        props.posts[index].category = e.target.value;
                      })
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-xs font-medium uppercase',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].postCategory,
                    )}
                  />

                  <ContentEditable
                    html={post.title}
                    onChange={(e) =>
                      setProp((props: any) => {
                        props.posts[index].title = e.target.value;
                      })
                    }
                    tagName="h3"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-2xl font-semibold leading-tight',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].postTitle,
                    )}
                  />
                </dt>

                <dd className="mt-4 flex flex-auto flex-col space-y-4 text-base leading-7 xl:mt-2">
                  <ContentEditable
                    html={post.description}
                    onChange={(e) =>
                      setProp((props: any) => {
                        props.posts[index].description = e.target.value;
                      })
                    }
                    tagName="p"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'flex-auto text-base',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].postDescription,
                    )}
                  />

                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0 self-center">
                      <Image
                        priority
                        src={post.metadata.authorImg}
                        alt={post.metadata.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <ContentEditable
                        html={post.metadata.author}
                        onChange={(e) =>
                          setProp((props: any) => {
                            props.posts[index].metadata.author = e.target.value;
                          })
                        }
                        tagName="h4"
                        disabled={query.getOptions().enabled ? false : true}
                        className={clsx(
                          'text-sm font-medium',
                          'outline-none focus:outline-offset-4 focus:outline-primary',
                          colors[textColorKey].postAuthor,
                        )}
                      />

                      <p
                        className={clsx(
                          'mt-1 text-sm',
                          colors[textColorKey].postMetadata,
                        )}
                      >
                        <ContentEditable
                          html={post.metadata.date}
                          onChange={(e) =>
                            setProp((props: any) => {
                              props.posts[index].metadata.date = e.target.value;
                            })
                          }
                          tagName="time"
                          disabled={query.getOptions().enabled ? false : true}
                          className="outline-none focus:outline-offset-4 focus:outline-primary"
                        />{' '}
                        &middot;
                        <ContentEditable
                          html={post.metadata.readingTime}
                          onChange={(e) =>
                            setProp((props: any) => {
                              props.posts[index].metadata.readingTime =
                                e.target.value;
                            })
                          }
                          tagName="span"
                          disabled={query.getOptions().enabled ? false : true}
                          className="outline-none focus:outline-offset-4 focus:outline-primary"
                        />
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/blog_4-1699792050080.webp"
      name="Blog 4"
      Component={Blog4}
    />
  );
}

function ToolbarSettings() {
  const {
    posts,
    maxWidth,
    marginArray,
    paddingArray,
    tagline,
    heading,
    description,
    cta,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    posts: node.data.props.posts,
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    cta: node.data.props.cta,
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
                  posts,
                  maxWidth,
                  marginArray,
                  paddingArray,
                  tagline,
                  heading,
                  description,
                  cta,
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
                  posts,
                  maxWidth,
                  marginArray,
                  paddingArray,
                  tagline,
                  heading,
                  description,
                  cta,
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
    postCategory: string;
    postTitle: string;
    postDescription: string;
    postAuthor: string;
    postMetadata: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-900 dark:text-slate-300',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    postTitle: 'text-slate-900 dark:text-slate-100',
    postCategory: 'text-slate-600 dark:text-slate-400',
    postDescription: 'text-slate-600 dark:text-slate-400',
    postAuthor: 'text-slate-600 dark:text-slate-200',
    postMetadata: 'text-slate-600 dark:text-slate-400',
  },
  gray: {
    tagline: 'text-gray-900 dark:text-gray-300',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    postTitle: 'text-gray-900 dark:text-gray-100',
    postCategory: 'text-gray-600 dark:text-gray-400',
    postDescription: 'text-gray-600 dark:text-gray-400',
    postAuthor: 'text-gray-600 dark:text-gray-200',
    postMetadata: 'text-gray-600 dark:text-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-900 dark:text-zinc-300',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    postTitle: 'text-zinc-900 dark:text-zinc-100',
    postCategory: 'text-zinc-600 dark:text-zinc-400',
    postDescription: 'text-zinc-600 dark:text-zinc-400',
    postAuthor: 'text-zinc-600 dark:text-zinc-200',
    postMetadata: 'text-zinc-600 dark:text-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-900 dark:text-neutral-300',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    postTitle: 'text-neutral-900 dark:text-neutral-100',
    postCategory: 'text-neutral-600 dark:text-neutral-400',
    postDescription: 'text-neutral-600 dark:text-neutral-400',
    postAuthor: 'text-neutral-600 dark:text-neutral-200',
    postMetadata: 'text-neutral-600 dark:text-neutral-400',
  },
  stone: {
    tagline: 'text-stone-900 dark:text-stone-300',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    postTitle: 'text-stone-900 dark:text-stone-100',
    postCategory: 'text-stone-600 dark:text-stone-400',
    postDescription: 'text-stone-600 dark:text-stone-400',
    postAuthor: 'text-stone-600 dark:text-stone-200',
    postMetadata: 'text-stone-600 dark:text-stone-400',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    postCategory: 'text-red-600 dark:text-red-400/80',
    postTitle: 'text-red-900 dark:text-red-50',
    postDescription: 'text-red-950/70 dark:text-red-50/70',
    postAuthor: 'text-red-900 dark:text-red-400',
    postMetadata: 'text-red-800/70 dark:text-red-200/60',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    postCategory: 'text-orange-600 dark:text-orange-400/80',
    postTitle: 'text-orange-900 dark:text-orange-50',
    postDescription: 'text-orange-950/70 dark:text-orange-50/70',
    postAuthor: 'text-orange-900 dark:text-orange-400',
    postMetadata: 'text-orange-800/70 dark:text-orange-200/60',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    postCategory: 'text-amber-600 dark:text-amber-400/80',
    postTitle: 'text-amber-900 dark:text-amber-50',
    postDescription: 'text-amber-950/70 dark:text-amber-50/70',
    postAuthor: 'text-amber-900 dark:text-amber-400',
    postMetadata: 'text-amber-800/70 dark:text-amber-200/60',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    postCategory: 'text-yellow-600 dark:text-yellow-400/80',
    postTitle: 'text-yellow-900 dark:text-yellow-50',
    postDescription: 'text-yellow-950/70 dark:text-yellow-50/70',
    postAuthor: 'text-yellow-900 dark:text-yellow-400',
    postMetadata: 'text-yellow-800/70 dark:text-yellow-200/60',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    postCategory: 'text-lime-600 dark:text-lime-400/80',
    postTitle: 'text-lime-900 dark:text-lime-50',
    postDescription: 'text-lime-950/70 dark:text-lime-50/70',
    postAuthor: 'text-lime-900 dark:text-lime-400',
    postMetadata: 'text-lime-800/70 dark:text-lime-200/60',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    postCategory: 'text-green-600 dark:text-green-400/80',
    postTitle: 'text-green-900 dark:text-green-50',
    postDescription: 'text-green-950/70 dark:text-green-50/70',
    postAuthor: 'text-green-900 dark:text-green-400',
    postMetadata: 'text-green-800/70 dark:text-green-200/60',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    postCategory: 'text-emerald-600 dark:text-emerald-400/80',
    postTitle: 'text-emerald-900 dark:text-emerald-50',
    postDescription: 'text-emerald-950/70 dark:text-emerald-50/70',
    postAuthor: 'text-emerald-900 dark:text-emerald-400',
    postMetadata: 'text-emerald-800/70 dark:text-emerald-200/60',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    postCategory: 'text-teal-600 dark:text-teal-400/80',
    postTitle: 'text-teal-900 dark:text-teal-50',
    postDescription: 'text-teal-950/70 dark:text-teal-50/70',
    postAuthor: 'text-teal-900 dark:text-teal-400',
    postMetadata: 'text-teal-800/70 dark:text-teal-200/60',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    postCategory: 'text-cyan-600 dark:text-cyan-400/80',
    postTitle: 'text-cyan-900 dark:text-cyan-50',
    postDescription: 'text-cyan-950/70 dark:text-cyan-50/70',
    postAuthor: 'text-cyan-900 dark:text-cyan-400',
    postMetadata: 'text-cyan-800/70 dark:text-cyan-200/60',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    postCategory: 'text-sky-600 dark:text-sky-400/80',
    postTitle: 'text-sky-900 dark:text-sky-50',
    postDescription: 'text-sky-950/70 dark:text-sky-50/70',
    postAuthor: 'text-sky-900 dark:text-sky-400',
    postMetadata: 'text-sky-800/70 dark:text-sky-200/60',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    postCategory: 'text-blue-600 dark:text-blue-400/80',
    postTitle: 'text-blue-900 dark:text-blue-50',
    postDescription: 'text-blue-950/70 dark:text-blue-50/70',
    postAuthor: 'text-blue-900 dark:text-blue-400',
    postMetadata: 'text-blue-800/70 dark:text-blue-200/60',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    postCategory: 'text-indigo-600 dark:text-indigo-400/80',
    postTitle: 'text-indigo-900 dark:text-indigo-50',
    postDescription: 'text-indigo-950/70 dark:text-indigo-50/70',
    postAuthor: 'text-indigo-900 dark:text-indigo-400',
    postMetadata: 'text-indigo-800/70 dark:text-indigo-200/60',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    postCategory: 'text-violet-600 dark:text-violet-400/80',
    postTitle: 'text-violet-900 dark:text-violet-50',
    postDescription: 'text-violet-950/70 dark:text-violet-50/70',
    postAuthor: 'text-violet-900 dark:text-violet-400',
    postMetadata: 'text-violet-800/70 dark:text-violet-200/60',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    postCategory: 'text-purple-600 dark:text-purple-400/80',
    postTitle: 'text-purple-900 dark:text-purple-50',
    postDescription: 'text-purple-950/70 dark:text-purple-50/70',
    postAuthor: 'text-purple-900 dark:text-purple-400',
    postMetadata: 'text-purple-800/70 dark:text-purple-200/60',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    postCategory: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    postTitle: 'text-fuchsia-900 dark:text-fuchsia-50',
    postDescription: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    postAuthor: 'text-fuchsia-900 dark:text-fuchsia-400',
    postMetadata: 'text-fuchsia-800/70 dark:text-fuchsia-200/60',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    postCategory: 'text-pink-600 dark:text-pink-400/80',
    postTitle: 'text-pink-900 dark:text-pink-50',
    postDescription: 'text-pink-950/70 dark:text-pink-50/70',
    postAuthor: 'text-pink-900 dark:text-pink-400',
    postMetadata: 'text-pink-800/70 dark:text-pink-200/60',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    postCategory: 'text-rose-600 dark:text-rose-400/80',
    postTitle: 'text-rose-900 dark:text-rose-50',
    postDescription: 'text-rose-950/70 dark:text-rose-50/70',
    postAuthor: 'text-rose-900 dark:text-rose-400',
    postMetadata: 'text-rose-800/70 dark:text-rose-200/60',
  },
};

function generateComponentString({
  isNextjs,
  posts,
  maxWidth,
  marginArray,
  paddingArray,
  tagline,
  heading,
  description,
  cta,
  color,
  textColor,
}: {
  isNextjs: boolean;
  posts: any[];
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  tagline: string;
  heading: string;
  description: string;
  cta: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedPosts = posts.map(
    (post) =>
      `
  {
    id: ${post.id},
    category: '${removeHtmlTags(post.category)}',
    title: '${removeHtmlTags(post.title)}',
    description: '${removeHtmlTags(post.description)}',
    href: '${post.href}',
    imgSrc: '${post.imgSrc}',
    alt: '${post.alt}',
    metadata: {
      author: '${removeHtmlTags(post.metadata.author)}',
      authorImg: '${post.metadata.authorImg}',
      datetime: '${post.metadata.datetime}',
      date: '${removeHtmlTags(post.metadata.date)}',
      readingTime: '${removeHtmlTags(post.metadata.readingTime)}',
    },
  }`,
  );

  const postsString = `[${mappedPosts.join(',\n')}]`;

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

import Link from 'next/link';
import Image from 'next/image';

const posts = ${postsString};

export default function Blog() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="block items-end justify-between lg:flex">
        <div className="flex max-w-4xl flex-col space-y-7">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="max-w-xl text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 lg:mt-20">
        <dl className="grid grid-cols-1 gap-20 xl:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-center gap-8 md:flex-row"
            >
              <Link href={post.href} className="max-w-md xl:max-w-[250px]">
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-lg object-cover"
                />
              </Link>

              <div>
                <dt className="flex flex-col items-start gap-y-3">
                  <span className="text-xs font-medium uppercase ${colors[textColorKey].postCategory}">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight ${colors[textColorKey].postTitle}">
                    {post.title}
                  </h3>
                </dt>

                <dd className="mt-4 flex flex-auto flex-col space-y-4 text-base leading-7 xl:mt-2">
                  <p className="flex-auto text-base ${colors[textColorKey].postDescription}">
                    {post.description}
                  </p>

                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0 self-center">
                      <Image
                        priority
                        src={post.metadata.authorImg}
                        alt={post.metadata.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium ${colors[textColorKey].postAuthor}">
                        {post.metadata.author}
                      </h4>
                      <p className="mt-1 text-sm ${colors[textColorKey].postMetadata}">
                        <time dateTime={post.metadata.datetime}>
                          {post.metadata.date}
                        </time>{' '}
                        &middot; <span>{post.metadata.readingTime}</span>
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}`;

  const reactContent = `import React from 'react';

const posts = ${postsString};

export default function Blog() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="block items-end justify-between lg:flex">
        <div className="flex max-w-4xl flex-col space-y-7">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="max-w-xl text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 lg:mt-20">
        <dl className="grid grid-cols-1 gap-20 xl:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-center gap-8 md:flex-row"
            >
              <a href={post.href} className="max-w-md xl:max-w-[250px]">
                <img
                  src={post.imgSrc}
                  alt={post.alt}
                  width={1000}
                  height={1000}
                  className="h-full w-full rounded-lg object-cover"
                />
              </a>

              <div>
                <dt className="flex flex-col items-start gap-y-3">
                  <span className="text-xs font-medium uppercase ${colors[textColorKey].postCategory}">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight ${colors[textColorKey].postTitle}">
                    {post.title}
                  </h3>
                </dt>

                <dd className="mt-4 flex flex-auto flex-col space-y-4 text-base leading-7 xl:mt-2">
                  <p className="flex-auto text-base ${colors[textColorKey].postDescription}">
                    {post.description}
                  </p>

                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0 self-center">
                      <img
                        src={post.metadata.authorImg}
                        alt={post.metadata.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium ${colors[textColorKey].postAuthor}">
                        {post.metadata.author}
                      </h4>
                      <p className="mt-1 text-sm ${colors[textColorKey].postMetadata}">
                        <time dateTime={post.metadata.datetime}>
                          {post.metadata.date}
                        </time>{' '}
                        &middot; <span>{post.metadata.readingTime}</span>
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
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
    tagline,
    heading,
    description,
    posts,
    cta,
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
    posts,
    cta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Blog4 from './components/Blog4';`);
  componentContent.push('<Blog4 />');
  return zip.file('components/Blog4.jsx', content);
}

Blog4.craft = {
  props: {
    tagline: 'Blog',
    heading: 'Short heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    posts: posts,
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
