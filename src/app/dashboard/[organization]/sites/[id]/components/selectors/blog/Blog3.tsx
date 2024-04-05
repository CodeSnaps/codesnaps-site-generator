'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
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

const posts = [
  {
    id: 1,
    category: 'Category',
    title: 'Blog title heading',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    imgSrc: 'https://dummyimage.com/1280x800/d4d4d4/171717',
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
    imgSrc: 'https://dummyimage.com/1280x800/d4d4d4/171717',
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
    imgSrc: 'https://dummyimage.com/1280x800/d4d4d4/171717',
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
    imgSrc: 'https://dummyimage.com/1280x800/d4d4d4/171717',
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

export const Blog3 = ({
  tagline = '',
  heading = '',
  description = '',
  posts = [],
  cta = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'neutral',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  tagline?: string;
  heading?: string;
  description?: string;
  posts?: any[];
  cta?: string;
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
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
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
              'text-lg',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].description,
            )}
          />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {posts.map((post, index) => (
            <div key={post.id} className="flex flex-col">
              <Link href={post.href}>
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </Link>

              <dt className="mt-8 flex flex-col items-start gap-y-3">
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

              <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
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

                <div className="mt-6 flex items-center">
                  <div className="mr-4 flex-shrink-0 self-center">
                    <Image
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
          ))}
        </dl>
      </div>

      <div className="mt-10 flex justify-center lg:mt-14">
        <ContentEditable
          html={cta}
          onChange={(e) =>
            setProp((props: { cta: string }) => (props.cta = e.target.value))
          }
          tagName="a"
          disabled={query.getOptions().enabled ? false : true}
          className={clsx(
            'rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-2 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
            'outline-none focus:outline-offset-4',
            colors[colorKey].cta,
          )}
        />
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/blog_3-1699791918578.webp"
      name="Blog 3"
      Component={Blog3}
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
    cta: string;
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
    cta: 'ring-slate-500 dark:ring-slate-600 text-slate-900 bg-transparent hover:bg-slate-50 focus-visible:outline-slate-500 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-400',
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
    cta: 'ring-gray-500 dark:ring-gray-600 text-gray-900 bg-transparent hover:bg-gray-50 focus-visible:outline-gray-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-400',
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
    cta: 'ring-zinc-500 dark:ring-zinc-600 text-zinc-900 bg-transparent hover:bg-zinc-50 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400',
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
    cta: 'ring-neutral-500 dark:ring-neutral-600 text-neutral-900 bg-transparent hover:bg-neutral-50 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
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
    cta: 'ring-stone-500 dark:ring-stone-600 text-stone-900 bg-transparent hover:bg-stone-50 focus-visible:outline-stone-500 dark:text-stone-100 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400',
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
    cta: 'bg-transparent text-red-900 ring-red-500 hover:bg-red-100 focus-visible:outline-red-500 dark:text-red-100 dark:ring-red-800 dark:hover:bg-red-900/30 dark:focus-visible:outline-red-400',
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
    cta: 'bg-transparent text-orange-900 ring-orange-500 hover:bg-orange-100 focus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-800 dark:hover:bg-orange-900/30 dark:focus-visible:outline-orange-400',
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
    cta: 'bg-transparent text-amber-900 ring-amber-500 hover:bg-amber-100 focus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-800 dark:hover:bg-amber-900/30 dark:focus-visible:outline-amber-400',
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
    cta: 'bg-transparent text-yellow-900 ring-yellow-500 hover:bg-yellow-100 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-800 dark:hover:bg-yellow-900/30 dark:focus-visible:outline-yellow-400',
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
    cta: 'bg-transparent text-lime-900 ring-lime-500 hover:bg-lime-100 focus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-800 dark:hover:bg-lime-900/30 dark:focus-visible:outline-lime-400',
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
    cta: 'bg-transparent text-green-900 ring-green-500 hover:bg-green-100 focus-visible:outline-green-500 dark:text-green-100 dark:ring-green-800 dark:hover:bg-green-900/30 dark:focus-visible:outline-green-400',
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
    cta: 'bg-transparent text-emerald-900 ring-emerald-500 hover:bg-emerald-100 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-800 dark:hover:bg-emerald-900/30 dark:focus-visible:outline-emerald-400',
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
    cta: 'bg-transparent text-teal-900 ring-teal-500 hover:bg-teal-100 focus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-800 dark:hover:bg-teal-900/30 dark:focus-visible:outline-teal-400',
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
    cta: 'bg-transparent text-cyan-900 ring-cyan-500 hover:bg-cyan-100 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-800 dark:hover:bg-cyan-900/30 dark:focus-visible:outline-cyan-400',
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
    cta: 'bg-transparent text-sky-900 ring-sky-500 hover:bg-sky-100 focus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-800 dark:hover:bg-sky-900/30 dark:focus-visible:outline-sky-400',
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
    cta: 'bg-transparent text-blue-900 ring-blue-500 hover:bg-blue-100 focus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-800 dark:hover:bg-blue-900/30 dark:focus-visible:outline-blue-400',
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
    cta: 'bg-transparent text-indigo-900 ring-indigo-500 hover:bg-indigo-100 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-800 dark:hover:bg-indigo-900/30 dark:focus-visible:outline-indigo-400',
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
    cta: 'bg-transparent text-violet-900 ring-violet-500 hover:bg-violet-100 focus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-800 dark:hover:bg-violet-900/30 dark:focus-visible:outline-violet-400',
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
    cta: 'bg-transparent text-purple-900 ring-purple-500 hover:bg-purple-100 focus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-800 dark:hover:bg-purple-900/30 dark:focus-visible:outline-purple-400',
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
    cta: 'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:bg-fuchsia-100 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-800 dark:hover:bg-fuchsia-900/30 dark:focus-visible:outline-fuchsia-400',
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
    cta: 'bg-transparent text-pink-900 ring-pink-500 hover:bg-pink-100 focus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-800 dark:hover:bg-pink-900/30 dark:focus-visible:outline-pink-400',
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
    cta: 'bg-transparent text-rose-900 ring-rose-500 hover:bg-rose-100 focus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-800 dark:hover:bg-rose-900/30 dark:focus-visible:outline-rose-400',
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

  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
  }

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
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <Link href={post.href}>
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </Link>

              <dt className="mt-8 flex flex-col items-start gap-y-3">
                <span className="text-xs font-medium uppercase ${colors[textColorKey].postCategory}">
                  {post.category}
                </span>
                <h3 className="text-2xl font-semibold leading-tight ${colors[textColorKey].postTitle}">
                  {post.title}
                </h3>
              </dt>

              <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
                <p className="flex-auto text-base ${colors[textColorKey].postDescription}">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center">
                  <div className="mr-4 flex-shrink-0 self-center">
                    <Image
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
          ))}
        </dl>
      </div>

      <div className="mt-10 flex justify-center lg:mt-14">
        <Link
          href="#"
          className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[textColorKey].cta}"
        >
          ${removeHtmlTags(cta)}
        </Link>
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
      <div className="mx-auto flex max-w-4xl flex-col space-y-7 text-center">
        <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </h3>

        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <a href={post.href}>
                <img
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </a>

              <dt className="mt-8 flex flex-col items-start gap-y-3">
                <span className="text-xs font-medium uppercase ${colors[textColorKey].postCategory}">
                  {post.category}
                </span>
                <h3 className="text-2xl font-semibold leading-tight ${colors[textColorKey].postTitle}">
                  {post.title}
                </h3>
              </dt>

              <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
                <p className="flex-auto text-base ${colors[textColorKey].postDescription}">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center">
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
          ))}
        </dl>
      </div>

      <div className="mt-10 flex justify-center lg:mt-14">
        <a
          href="#"
          className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[textColorKey].cta}"
        >
          ${removeHtmlTags(cta)}
        </a>
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

  importStatements.push(`import Blog3 from './components/Blog3';`);
  componentContent.push('<Blog3 />');
  return zip.file('components/Blog3.jsx', content);
}

Blog3.craft = {
  props: {
    tagline: 'Blog',
    heading: 'Short heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    posts: posts,
    cta: 'View all',
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
