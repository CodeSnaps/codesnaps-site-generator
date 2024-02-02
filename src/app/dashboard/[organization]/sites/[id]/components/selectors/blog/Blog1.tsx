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
];

export const Blog1 = ({
  tagline = '',
  heading = '',
  description = '',
  posts = [],
  cta = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = '',
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
        <ContentEditable
          html={tagline}
          onChange={(e) =>
            setProp(
              (props: { tagline: string }) => (props.tagline = e.target.value),
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
              (props: { heading: string }) => (props.heading = e.target.value),
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

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 xl:grid-cols-2 2xl:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <div className="xl:mx-auto">
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </div>

              <dt className="mt-8 flex flex-col items-start gap-y-3">
                <ContentEditable
                  html={post.category}
                  onChange={(e) =>
                    setProp((props: any) => {
                      props.posts[post.id - 1].category = e.target.value;
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
                      props.posts[post.id - 1].title = e.target.value;
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
                      props.posts[post.id - 1].description = e.target.value;
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
                          props.posts[post.id - 1].metadata.author =
                            e.target.value;
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

                    <p className="mt-1 text-sm">
                      <ContentEditable
                        html={post.metadata.date}
                        onChange={(e) =>
                          setProp((props: any) => {
                            props.posts[post.id - 1].metadata.date =
                              e.target.value;
                          })
                        }
                        tagName="time"
                        disabled={query.getOptions().enabled ? false : true}
                        className={clsx(
                          'outline-none focus:outline-offset-4 focus:outline-primary',
                          colors[textColorKey].postMetadata,
                        )}
                      />{' '}
                      &middot;{' '}
                      <ContentEditable
                        html={post.metadata.readingTime}
                        onChange={(e) =>
                          setProp((props: any) => {
                            props.posts[post.id - 1].metadata.readingTime =
                              e.target.value;
                          })
                        }
                        tagName="span"
                        disabled={query.getOptions().enabled ? false : true}
                        className={clsx(
                          'outline-none focus:outline-offset-4 focus:outline-primary',
                          colors[textColorKey].postMetadata,
                        )}
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
            colors[colorKey].cta,
          )}
        />
      </div>
    </PaddingMarginWrapper>
  );
};

function SidebarDraggableItem() {
  const { connectors } = useEditor();

  return (
    <div
      ref={(ref) =>
        connectors.create(ref as HTMLElement, <Blog1 isBeingDragged={true} />)
      }
      className="w-full shadow border rounded-md cursor-move"
    >
      <Image
        src="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/blog_1-1699470138430.webp"
        alt="Blog 1"
        width={232}
        height={145}
        className="rounded-md"
      />
    </div>
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
    postCategory: 'text-slate-600 dark:text-slate-400',
    postTitle: 'text-slate-900 dark:text-slate-100',
    postDescription: 'text-slate-600 dark:text-slate-400',
    postAuthor: 'text-slate-600 dark:text-slate-200',
    postMetadata: 'text-slate-600 dark:text-slate-400',
    cta: 'ring-slate-500 dark:ring-slate-600 text-slate-900 bg-transparent hover:bg-slate-50 focus-visible:outline-slate-500 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-400',
  },
  gray: {
    tagline: 'text-gray-900 dark:text-gray-300',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    postCategory: 'text-gray-600 dark:text-gray-400',
    postTitle: 'text-gray-900 dark:text-gray-100',
    postDescription: 'text-gray-600 dark:text-gray-400',
    postAuthor: 'text-gray-600 dark:text-gray-200',
    postMetadata: 'text-gray-600 dark:text-gray-400',
    cta: 'ring-gray-500 dark:ring-gray-600 text-gray-900 bg-transparent hover:bg-gray-50 focus-visible:outline-gray-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-900 dark:text-zinc-300',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    postCategory: 'text-zinc-600 dark:text-zinc-400',
    postTitle: 'text-zinc-900 dark:text-zinc-100',
    postDescription: 'text-zinc-600 dark:text-zinc-400',
    postAuthor: 'text-zinc-600 dark:text-zinc-200',
    postMetadata: 'text-zinc-600 dark:text-zinc-400',
    cta: 'ring-zinc-500 dark:ring-zinc-600 text-zinc-900 bg-transparent hover:bg-zinc-50 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-900 dark:text-neutral-300',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    postCategory: 'text-neutral-600 dark:text-neutral-400',
    postTitle: 'text-neutral-900 dark:text-neutral-100',
    postDescription: 'text-neutral-600 dark:text-neutral-400',
    postAuthor: 'text-neutral-600 dark:text-neutral-200',
    postMetadata: 'text-neutral-600 dark:text-neutral-400',
    cta: 'ring-neutral-500 dark:ring-neutral-600 text-neutral-900 bg-transparent hover:bg-neutral-50 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    tagline: 'text-stone-900 dark:text-stone-300',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    postCategory: 'text-stone-600 dark:text-stone-400',
    postTitle: 'text-stone-900 dark:text-stone-100',
    postDescription: 'text-stone-600 dark:text-stone-400',
    postAuthor: 'text-stone-600 dark:text-stone-200',
    postMetadata: 'text-stone-600 dark:text-stone-400',
    cta: 'ring-stone-500 dark:ring-stone-600 text-stone-900 bg-transparent hover:bg-stone-50 focus-visible:outline-stone-500 dark:text-stone-100 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400',
  },
  red: {
    tagline: 'text-red-900 dark:text-red-300',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-600 dark:text-red-400',
    postCategory: 'text-red-600 dark:text-red-400',
    postTitle: 'text-red-900 dark:text-red-100',
    postDescription: 'text-red-600 dark:text-red-400',
    postAuthor: 'text-red-600 dark:text-red-200',
    postMetadata: 'text-red-600 dark:text-red-400',
    cta: 'ring-red-500 dark:ring-red-600 text-red-900 bg-transparent hover:bg-red-50 focus-visible:outline-red-500 dark:text-red-100 dark:hover:bg-red-800 dark:focus-visible:outline-red-400',
  },
  orange: {
    tagline: 'text-orange-900 dark:text-orange-300',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-600 dark:text-orange-400',
    postCategory: 'text-orange-600 dark:text-orange-400',
    postTitle: 'text-orange-900 dark:text-orange-100',
    postDescription: 'text-orange-600 dark:text-orange-400',
    postAuthor: 'text-orange-600 dark:text-orange-200',
    postMetadata: 'text-orange-600 dark:text-orange-400',
    cta: 'ring-orange-500 dark:ring-orange-600 text-orange-900 bg-transparent hover:bg-orange-50 focus-visible:outline-orange-500 dark:text-orange-100 dark:hover:bg-orange-800 dark:focus-visible:outline-orange-400',
  },
  amber: {
    tagline: 'text-amber-900 dark:text-amber-300',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-600 dark:text-amber-400',
    postCategory: 'text-amber-600 dark:text-amber-400',
    postTitle: 'text-amber-900 dark:text-amber-100',
    postDescription: 'text-amber-600 dark:text-amber-400',
    postAuthor: 'text-amber-600 dark:text-amber-200',
    postMetadata: 'text-amber-600 dark:text-amber-400',
    cta: 'ring-amber-500 dark:ring-amber-600 text-amber-900 bg-transparent hover:bg-amber-50 focus-visible:outline-amber-500 dark:text-amber-100 dark:hover:bg-amber-800 dark:focus-visible:outline-amber-400',
  },
  yellow: {
    tagline: 'text-yellow-900 dark:text-yellow-300',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-600 dark:text-yellow-400',
    postCategory: 'text-yellow-600 dark:text-yellow-400',
    postTitle: 'text-yellow-900 dark:text-yellow-100',
    postDescription: 'text-yellow-600 dark:text-yellow-400',
    postAuthor: 'text-yellow-600 dark:text-yellow-200',
    postMetadata: 'text-yellow-600 dark:text-yellow-400',
    cta: 'ring-yellow-500 dark:ring-yellow-600 text-yellow-900 bg-transparent hover:bg-yellow-50 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:hover:bg-yellow-800 dark:focus-visible:outline-yellow-400',
  },
  lime: {
    tagline: 'text-lime-900 dark:text-lime-300',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-600 dark:text-lime-400',
    postCategory: 'text-lime-600 dark:text-lime-400',
    postTitle: 'text-lime-900 dark:text-lime-100',
    postDescription: 'text-lime-600 dark:text-lime-400',
    postAuthor: 'text-lime-600 dark:text-lime-200',
    postMetadata: 'text-lime-600 dark:text-lime-400',
    cta: 'ring-lime-500 dark:ring-lime-600 text-lime-900 bg-transparent hover:bg-lime-50 focus-visible:outline-lime-500 dark:text-lime-100 dark:hover:bg-lime-800 dark:focus-visible:outline-lime-400',
  },
  green: {
    tagline: 'text-green-900 dark:text-green-300',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-600 dark:text-green-400',
    postCategory: 'text-green-600 dark:text-green-400',
    postTitle: 'text-green-900 dark:text-green-100',
    postDescription: 'text-green-600 dark:text-green-400',
    postAuthor: 'text-green-600 dark:text-green-200',
    postMetadata: 'text-green-600 dark:text-green-400',
    cta: 'ring-green-500 dark:ring-green-600 text-green-900 bg-transparent hover:bg-green-50 focus-visible:outline-green-500 dark:text-green-100 dark:hover:bg-green-800 dark:focus-visible:outline-green-400',
  },
  emerald: {
    tagline: 'text-emerald-900 dark:text-emerald-300',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-600 dark:text-emerald-400',
    postCategory: 'text-emerald-600 dark:text-emerald-400',
    postTitle: 'text-emerald-900 dark:text-emerald-100',
    postDescription: 'text-emerald-600 dark:text-emerald-400',
    postAuthor: 'text-emerald-600 dark:text-emerald-200',
    postMetadata: 'text-emerald-600 dark:text-emerald-400',
    cta: 'ring-emerald-500 dark:ring-emerald-600 text-emerald-900 bg-transparent hover:bg-emerald-50 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:hover:bg-emerald-800 dark:focus-visible:outline-emerald-400',
  },
  teal: {
    tagline: 'text-teal-900 dark:text-teal-300',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-600 dark:text-teal-400',
    postCategory: 'text-teal-600 dark:text-teal-400',
    postTitle: 'text-teal-900 dark:text-teal-100',
    postDescription: 'text-teal-600 dark:text-teal-400',
    postAuthor: 'text-teal-600 dark:text-teal-200',
    postMetadata: 'text-teal-600 dark:text-teal-400',
    cta: 'ring-teal-500 dark:ring-teal-600 text-teal-900 bg-transparent hover:bg-teal-50 focus-visible:outline-teal-500 dark:text-teal-100 dark:hover:bg-teal-800 dark:focus-visible:outline-teal-400',
  },
  cyan: {
    tagline: 'text-cyan-900 dark:text-cyan-300',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-600 dark:text-cyan-400',
    postCategory: 'text-cyan-600 dark:text-cyan-400',
    postTitle: 'text-cyan-900 dark:text-cyan-100',
    postDescription: 'text-cyan-600 dark:text-cyan-400',
    postAuthor: 'text-cyan-600 dark:text-cyan-200',
    postMetadata: 'text-cyan-600 dark:text-cyan-400',
    cta: 'ring-cyan-500 dark:ring-cyan-600 text-cyan-900 bg-transparent hover:bg-cyan-50 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:hover:bg-cyan-800 dark:focus-visible:outline-cyan-400',
  },
  sky: {
    tagline: 'text-sky-900 dark:text-sky-300',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-600 dark:text-sky-400',
    postCategory: 'text-sky-600 dark:text-sky-400',
    postTitle: 'text-sky-900 dark:text-sky-100',
    postDescription: 'text-sky-600 dark:text-sky-400',
    postAuthor: 'text-sky-600 dark:text-sky-200',
    postMetadata: 'text-sky-600 dark:text-sky-400',
    cta: 'ring-sky-500 dark:ring-sky-600 text-sky-900 bg-transparent hover:bg-sky-50 focus-visible:outline-sky-500 dark:text-sky-100 dark:hover:bg-sky-800 dark:focus-visible:outline-sky-400',
  },
  blue: {
    tagline: 'text-blue-900 dark:text-blue-300',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-600 dark:text-blue-400',
    postCategory: 'text-blue-600 dark:text-blue-400',
    postTitle: 'text-blue-900 dark:text-blue-100',
    postDescription: 'text-blue-600 dark:text-blue-400',
    postAuthor: 'text-blue-600 dark:text-blue-200',
    postMetadata: 'text-blue-600 dark:text-blue-400',
    cta: 'ring-blue-500 dark:ring-blue-600 text-blue-900 bg-transparent hover:bg-blue-50 focus-visible:outline-blue-500 dark:text-blue-100 dark:hover:bg-blue-800 dark:focus-visible:outline-blue-400',
  },
  indigo: {
    tagline: 'text-indigo-900 dark:text-indigo-300',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-600 dark:text-indigo-400',
    postCategory: 'text-indigo-600 dark:text-indigo-400',
    postTitle: 'text-indigo-900 dark:text-indigo-100',
    postDescription: 'text-indigo-600 dark:text-indigo-400',
    postAuthor: 'text-indigo-600 dark:text-indigo-200',
    postMetadata: 'text-indigo-600 dark:text-indigo-400',
    cta: 'ring-indigo-500 dark:ring-indigo-600 text-indigo-900 bg-transparent hover:bg-indigo-50 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:hover:bg-indigo-800 dark:focus-visible:outline-indigo-400',
  },
  violet: {
    tagline: 'text-violet-900 dark:text-violet-300',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-600 dark:text-violet-400',
    postCategory: 'text-violet-600 dark:text-violet-400',
    postTitle: 'text-violet-900 dark:text-violet-100',
    postDescription: 'text-violet-600 dark:text-violet-400',
    postAuthor: 'text-violet-600 dark:text-violet-200',
    postMetadata: 'text-violet-600 dark:text-violet-400',
    cta: 'ring-violet-500 dark:ring-violet-600 text-violet-900 bg-transparent hover:bg-violet-50 focus-visible:outline-violet-500 dark:text-violet-100 dark:hover:bg-violet-800 dark:focus-visible:outline-violet-400',
  },
  purple: {
    tagline: 'text-purple-900 dark:text-purple-300',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-600 dark:text-purple-400',
    postCategory: 'text-purple-600 dark:text-purple-400',
    postTitle: 'text-purple-900 dark:text-purple-100',
    postDescription: 'text-purple-600 dark:text-purple-400',
    postAuthor: 'text-purple-600 dark:text-purple-200',
    postMetadata: 'text-purple-600 dark:text-purple-400',
    cta: 'ring-purple-500 dark:ring-purple-600 text-purple-900 bg-transparent hover:bg-purple-50 focus-visible:outline-purple-500 dark:text-purple-100 dark:hover:bg-purple-800 dark:focus-visible:outline-purple-400',
  },
  fuchsia: {
    tagline: 'text-fuchsia-900 dark:text-fuchsia-300',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-600 dark:text-fuchsia-400',
    postCategory: 'text-fuchsia-600 dark:text-fuchsia-400',
    postTitle: 'text-fuchsia-900 dark:text-fuchsia-100',
    postDescription: 'text-fuchsia-600 dark:text-fuchsia-400',
    postAuthor: 'text-fuchsia-600 dark:text-fuchsia-200',
    postMetadata: 'text-fuchsia-600 dark:text-fuchsia-400',
    cta: 'ring-fuchsia-500 dark:ring-fuchsia-600 text-fuchsia-900 bg-transparent hover:bg-fuchsia-50 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:hover:bg-fuchsia-800 dark:focus-visible:outline-fuchsia-400',
  },
  pink: {
    tagline: 'text-pink-900 dark:text-pink-300',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-600 dark:text-pink-400',
    postCategory: 'text-pink-600 dark:text-pink-400',
    postTitle: 'text-pink-900 dark:text-pink-100',
    postDescription: 'text-pink-600 dark:text-pink-400',
    postAuthor: 'text-pink-600 dark:text-pink-200',
    postMetadata: 'text-pink-600 dark:text-pink-400',
    cta: 'ring-pink-500 dark:ring-pink-600 text-pink-900 bg-transparent hover:bg-pink-50 focus-visible:outline-pink-500 dark:text-pink-100 dark:hover:bg-pink-800 dark:focus-visible:outline-pink-400',
  },
  rose: {
    tagline: 'text-rose-900 dark:text-rose-300',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-600 dark:text-rose-400',
    postCategory: 'text-rose-600 dark:text-rose-400',
    postTitle: 'text-rose-900 dark:text-rose-100',
    postDescription: 'text-rose-600 dark:text-rose-400',
    postAuthor: 'text-rose-600 dark:text-rose-200',
    postMetadata: 'text-rose-600 dark:text-rose-400',
    cta: 'ring-rose-500 dark:ring-rose-600 text-rose-900 bg-transparent hover:bg-rose-50 focus-visible:outline-rose-500 dark:text-rose-100 dark:hover:bg-rose-800 dark:focus-visible:outline-rose-400',
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
          ${tagline}
        </h3>

        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${heading}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${description}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <div className="lg:mx-auto">
                <Image
                  priority
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </div>

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
          className="rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
        >
          ${cta}
        </Link>
      </div>
    </div>
  );
}
`;

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
          ${tagline}
        </h3>

        <h2 className="text-4xl font-semibold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${heading}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${description}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md sm:mt-14 md:max-w-2xl lg:mt-20 lg:max-w-none">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <div className="lg:mx-auto">
                <img
                  src={post.imgSrc}
                  alt={post.alt}
                  width={400}
                  height={240}
                  className="w-full"
                />
              </div>

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
          className="rounded-md bg-transparent px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
        >
          ${cta}
        </a>
      </div>
    </div>
  );
}
`;

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

  importStatements.push(`import Blog from './components/Blog';`);
  componentContent.push('<Blog />');
  return zip.file('components/Blog.jsx', content);
}

Blog1.craft = {
  props: {
    tagline: 'Blog',
    heading: 'Short heading goes here',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    posts: posts,
    cta: 'See all posts',
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
