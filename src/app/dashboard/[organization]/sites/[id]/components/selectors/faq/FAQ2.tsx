'use client';

import _ from 'lodash';
import clsx from 'clsx';
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
import { Disclosure } from '@headlessui/react';
import SidebarItem from '~/app/dashboard/[organization]/sites/[id]/components/editor/SidebarItem';
import PaddingMarginWrapper from '~/app/dashboard/[organization]/sites/[id]/components/selectors/PaddingMarginWrapper';
import ToolbarSettingsForm from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSettingsForm';

import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';
import JSZip from 'jszip';

type SerializedNodeWithId = SerializedNode & { id: string };

const faqs = [
  {
    id: 1,
    question: '#1 Your question should go in here?',
    answer:
      'Aenean diam lectus, ullamcorper ac ipsum a, convallis maximus odio. In hac habitasse platea dictumst. Donec elementum nisi ac magna gravida, at consectetur dolor tristique.',
  },
  {
    id: 2,
    question: '#2 Your question should go in here?',
    answer:
      'Aenean diam lectus, ullamcorper ac ipsum a, convallis maximus odio. In hac habitasse platea dictumst. Donec elementum nisi ac magna gravida, at consectetur dolor tristique.',
  },
  {
    id: 3,
    question: '#3 Your question should go in here?',
    answer:
      'Aenean diam lectus, ullamcorper ac ipsum a, convallis maximus odio. In hac habitasse platea dictumst. Donec elementum nisi ac magna gravida, at consectetur dolor tristique.',
  },
  {
    id: 4,
    question: '#4 Your question should go in here?',
    answer:
      'Aenean diam lectus, ullamcorper ac ipsum a, convallis maximus odio. In hac habitasse platea dictumst. Donec elementum nisi ac magna gravida, at consectetur dolor tristique.',
  },
  {
    id: 5,
    question: '#5 Your question should go in here?',
    answer:
      'Aenean diam lectus, ullamcorper ac ipsum a, convallis maximus odio. In hac habitasse platea dictumst. Donec elementum nisi ac magna gravida, at consectetur dolor tristique.',
  },
];

export const FAQ2 = ({
  heading = '',
  description = '',
  faqs = [],
  cta = '',
  paddingArray = ['px-6', 'sm:px-6', 'lg:px-8', 'mt-24'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'lg:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  heading?: string;
  description?: string;
  faqs?: any[];
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
      ref={(ref) => {
        connect(drag(ref as HTMLElement));
      }}
      classes={clsx(maxWidth)}
      paddingArray={paddingArray}
      marginArray={marginArray}
    >
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
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

          <div className="mt-2">
            <ContentEditable
              html={cta}
              onChange={(e) =>
                setProp((props: { cta: string }) => {
                  props.cta = e.target.value;
                })
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'outline-none focus:outline-offset-4',
                colors[colorKey].cta,
              )}
            />
          </div>
        </div>

        <dl className="flex flex-col space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure
              as="div"
              key={faq.id}
              className={clsx(
                'rounded-md border px-4 py-6',
                colors[colorKey].border,
              )}
            >
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button
                      className={clsx(
                        'flex w-full items-start justify-between text-left',
                        colors[textColorKey].question,
                      )}
                    >
                      <ContentEditable
                        html={faq.question}
                        onChange={(e) =>
                          setProp((props: any) => {
                            props.faqs[index].question = e.target.value;
                          })
                        }
                        tagName="span"
                        disabled={query.getOptions().enabled ? false : true}
                        className={clsx(
                          'text-base font-semibold leading-7',
                          'outline-none focus:outline-offset-4 focus:outline-primary',
                          colors[textColorKey].question,
                        )}
                      />
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <ContentEditable
                      html={faq.answer}
                      onChange={(e) =>
                        setProp((props: any) => {
                          props.faqs[index].answer = e.target.value;
                        })
                      }
                      tagName="p"
                      disabled={query.getOptions().enabled ? false : true}
                      className={clsx(
                        'text-base leading-7',
                        'outline-none focus:outline-offset-4 focus:outline-primary',
                        colors[textColorKey].answer,
                      )}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </PaddingMarginWrapper>
  );
};

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/faq_2-1699473325672.webp"
      name="FAQ 2"
      Component={FAQ2}
    />
  );
}

function ToolbarSettings() {
  const {
    heading,
    description,
    faqs,
    cta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    heading: node.data.props.heading,
    description: node.data.props.description,
    faqs: node.data.props.faqs,
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
                  heading,
                  description,
                  faqs,
                  cta,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({
                  name,
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
                  faqs,
                  cta,
                  paddingArray,
                  marginArray,
                  maxWidth,
                  color,
                  textColor,
                });

                exportSingleComponent({
                  name,
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
    border: string;
    heading: string;
    description: string;
    question: string;
    answer: string;
    cta: string;
  };
}

const colors: ColorObject = {
  slate: {
    border: 'border-slate-300 dark:border-slate-800',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    question: 'text-slate-900 dark:text-slate-200',
    answer: 'text-slate-600 dark:text-slate-400',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
  },
  gray: {
    border: 'border-gray-300 dark:border-gray-800',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    question: 'text-gray-900 dark:text-gray-200',
    answer: 'text-gray-600 dark:text-gray-400',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    border: 'border-zinc-300 dark:border-zinc-800',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    question: 'text-zinc-900 dark:text-zinc-200',
    answer: 'text-zinc-600 dark:text-zinc-400',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    border: 'divide-neutral-900/10 dark:divide-white/30',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    question: 'text-neutral-900 dark:text-neutral-200',
    answer: 'text-neutral-600 dark:text-neutral-400',
    cta: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    border: 'border-stone-300 dark:border-stone-800',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    question: 'text-stone-900 dark:text-stone-200',
    answer: 'text-stone-600 dark:text-stone-400',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
  },
  red: {
    border: 'border-red-200 dark:border-red-950/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    question: 'text-red-800 dark:text-red-500',
    answer: 'text-red-950/70 dark:text-red-50/70',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:text-white dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
  },
  orange: {
    border: 'border-orange-200 dark:border-orange-950/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    question: 'text-orange-800 dark:text-orange-500',
    answer: 'text-orange-950/70 dark:text-orange-50/70',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:text-white dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
  },
  amber: {
    border: 'border-amber-200 dark:border-amber-950/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    question: 'text-amber-800 dark:text-amber-500',
    answer: 'text-amber-950/70 dark:text-amber-50/70',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:text-white dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
  },
  yellow: {
    border: 'border-yellow-200 dark:border-yellow-950/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    question: 'text-yellow-800 dark:text-yellow-500',
    answer: 'text-yellow-950/70 dark:text-yellow-50/70',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:text-white dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
  },
  lime: {
    border: 'border-lime-200 dark:border-lime-950/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    question: 'text-lime-800 dark:text-lime-500',
    answer: 'text-lime-950/70 dark:text-lime-50/70',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:text-white dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
  },
  green: {
    border: 'border-green-200 dark:border-green-950/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    question: 'text-green-800 dark:text-green-500',
    answer: 'text-green-950/70 dark:text-green-50/70',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:text-white dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
  },
  emerald: {
    border: 'border-emerald-200 dark:border-emerald-950/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    question: 'text-emerald-800 dark:text-emerald-500',
    answer: 'text-emerald-950/70 dark:text-emerald-50/70',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:text-white dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
  },
  teal: {
    border: 'border-teal-200 dark:border-teal-950/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    question: 'text-teal-800 dark:text-teal-500',
    answer: 'text-teal-950/70 dark:text-teal-50/70',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:text-white dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
  },
  cyan: {
    border: 'border-cyan-200 dark:border-cyan-950/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    question: 'text-cyan-800 dark:text-cyan-500',
    answer: 'text-cyan-950/70 dark:text-cyan-50/70',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:text-white dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
  },
  sky: {
    border: 'border-sky-200 dark:border-sky-950/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    question: 'text-sky-800 dark:text-sky-500',
    answer: 'text-sky-950/70 dark:text-sky-50/70',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:text-white dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
  },
  blue: {
    border: 'border-blue-200 dark:border-blue-950/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    question: 'text-blue-800 dark:text-blue-500',
    answer: 'text-blue-950/70 dark:text-blue-50/70',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:text-white dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
  },
  indigo: {
    border: 'border-indigo-200 dark:border-indigo-950/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    question: 'text-indigo-800 dark:text-indigo-500',
    answer: 'text-indigo-950/70 dark:text-indigo-50/70',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:text-white dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
  },
  violet: {
    border: 'border-violet-200 dark:border-violet-950/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    question: 'text-violet-800 dark:text-violet-500',
    answer: 'text-violet-950/70 dark:text-violet-50/70',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:text-white dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
  },
  purple: {
    border: 'border-purple-200 dark:border-purple-950/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    question: 'text-purple-800 dark:text-purple-500',
    answer: 'text-purple-950/70 dark:text-purple-50/70',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:text-white dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
  },
  fuchsia: {
    border: 'border-fuchsia-200 dark:border-fuchsia-950/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    question: 'text-fuchsia-800 dark:text-fuchsia-500',
    answer: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:text-white dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
  },
  pink: {
    border: 'border-pink-200 dark:border-pink-950/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    question: 'text-pink-800 dark:text-pink-500',
    answer: 'text-pink-950/70 dark:text-pink-50/70',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:text-white dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
  },
  rose: {
    border: 'border-rose-200 dark:border-rose-950/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    question: 'text-rose-800 dark:text-rose-500',
    answer: 'text-rose-950/70 dark:text-rose-50/70',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:text-white dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
  },
};

function generateComponentString({
  isNextjs,
  heading,
  description,
  faqs,
  cta,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  heading: string;
  description: string;
  faqs: any[];
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  cta: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedFaqs = faqs.map(
    (faq) =>
      `
  {
    id: ${faq.id},
    question: '${removeHtmlTags(faq.question)}',
    answer: '${removeHtmlTags(faq.answer)}',
  }`,
  );

  const faqsString = `[${mappedFaqs.join(',\n')}]`;

  let content: string;

  const nextContent = `/*You need to install the following package: npm install @headlessui/react
*/

'use client';

import Link from 'next/link';

import { Disclosure } from '@headlessui/react';

const faqs = ${faqsString};

export default function FAQ() {
  return (
  <div className="${clsx(
    maxWidth,
    marginArray.join(' '),
    paddingArray.join(' '),
  )}">
    <div className="mt-24 grid grid-cols-1 items-start gap-14 sm:mt-32 lg:mt-40 lg:grid-cols-2">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>
        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="mt-2">
          <Link
            href="#"
            className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
          >
            ${removeHtmlTags(cta)}
          </Link>
        </div>
      </div>

      <dl className="flex flex-col space-y-4">
        {faqs.map((faq) => (
          <Disclosure
            as="div"
            key={faq.id}
            className="rounded-md border px-4 py-6 ${colors[colorKey].border}"
          >
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left ${colors[textColorKey].question}">
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 ${colors[textColorKey].answer}">
                    {faq.answer}
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  </div>
  );
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

import { Disclosure } from '@headlessui/react';

const faqs = ${faqsString};

export default function FAQ() {
  return (
  <div className="${clsx(
    maxWidth,
    marginArray.join(' '),
    paddingArray.join(' '),
  )}">
    <div className="mt-24 grid grid-cols-1 items-start gap-14 sm:mt-32 lg:mt-40 lg:grid-cols-2">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>
        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>

        <div className="mt-2">
          <a
            href="#"
            className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
          >
            ${removeHtmlTags(cta)}
          </a>
        </div>
      </div>

      <dl className="flex flex-col space-y-4">
        {faqs.map((faq) => (
          <Disclosure
            as="div"
            key={faq.id}
            className="rounded-md border px-4 py-6 ${colors[colorKey].border}"
          >
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-start justify-between text-left ${colors[textColorKey].question}">
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 ${colors[textColorKey].answer}">
                    {faq.answer}
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  </div>
  );
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
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
    faqs,
    cta,
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
    faqs,
    cta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import FAQ2 from './components/FAQ2';`);
  componentContent.push('<FAQ2 />');
  return zip.file('components/FAQ2.jsx', content);
}

FAQ2.craft = {
  props: {
    heading: 'FAQs',
    description:
      'Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut.',
    faqs: faqs,
    cta: 'Contact',
    paddingArray: ['px-6', 'sm:px-6', 'lg:px-8'],
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
