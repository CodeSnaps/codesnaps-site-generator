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
import SidebarItem from '~/app/dashboard/[organization]/sites/[id]/components/editor/SidebarItem';
import PaddingMarginWrapper from '~/app/dashboard/[organization]/sites/[id]/components/selectors/PaddingMarginWrapper';
import ToolbarSettingsForm from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSettingsForm';

import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';
import JSZip from 'jszip';

type SerializedNodeWithId = SerializedNode & { id: string };

const navigation = {
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'API Documentation', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export const Footer5 = ({
  navigation = {},
  legal = '',
  paddingArray = ['px-6', 'pb-8', 'pt-16', 'sm:pt-24', 'lg:px-8', 'lg:pt-32'],
  marginArray = ['mx-auto'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  navigation?: any;
  legal?: string;
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
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <PaddingMarginWrapper
        classes={clsx(maxWidth)}
        paddingArray={paddingArray}
        marginArray={marginArray}
        ref={(ref) => {
          connect(drag(ref as HTMLElement));
        }}
      >
        <div className="flex flex-col gap-10">
          <Logo
            className={clsx('h-8 w-auto', colors[colorKey].logo)}
            alt="Company name"
          />

          <div className="flex flex-col flex-wrap justify-center gap-10 sm:flex-row">
            <ContentEditable
              html={navigation.company[0].name}
              onChange={(e) => {
                setProp((props: any) => {
                  props.navigation.company[0].name = e.target.value;
                });
              }}
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center text-sm leading-5',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <ContentEditable
              html={navigation.company[1].name}
              onChange={(e) => {
                setProp((props: any) => {
                  props.navigation.company[1].name = e.target.value;
                });
              }}
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center text-sm leading-5',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <ContentEditable
              html={navigation.company[2].name}
              onChange={(e) => {
                setProp((props: any) => {
                  props.navigation.company[2].name = e.target.value;
                });
              }}
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center text-sm leading-5',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <ContentEditable
              html={navigation.company[3].name}
              onChange={(e) => {
                setProp((props: any) => {
                  props.navigation.company[3].name = e.target.value;
                });
              }}
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center text-sm leading-5',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <ContentEditable
              html={navigation.company[4].name}
              onChange={(e) => {
                setProp((props: any) => {
                  props.navigation.company[4].name = e.target.value;
                });
              }}
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-center text-sm leading-5',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />
          </div>
        </div>

        <div
          className={clsx(
            'mt-10 flex flex-col justify-between gap-6 border-t pt-8 sm:flex-row md:mt-14 md:items-end',
            colors[colorKey].border,
          )}
        >
          <ContentEditable
            html={legal}
            onChange={(e) =>
              setProp(
                (props: { legal: string }) => (props.legal = e.target.value),
              )
            }
            tagName="p"
            disabled={query.getOptions().enabled ? false : true}
            className={clsx(
              'text-xs leading-5',
              'outline-none focus:outline-offset-4 focus:outline-primary',
              colors[textColorKey].legal,
            )}
          />

          <div className="flex space-x-6">
            <ContentEditable
              html={navigation.legal[0].name}
              onChange={(e) =>
                setProp(
                  (props: { navigation: { legal: { name: string }[] } }) =>
                    (props.navigation.legal[0].name = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-xs leading-5 underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].legalLink,
              )}
            />

            <ContentEditable
              html={navigation.legal[1].name}
              onChange={(e) =>
                setProp(
                  (props: { navigation: { legal: { name: string }[] } }) =>
                    (props.navigation.legal[1].name = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-xs leading-5 underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].legalLink,
              )}
            />

            <ContentEditable
              html={navigation.legal[2].name}
              onChange={(e) =>
                setProp(
                  (props: { navigation: { legal: { name: string }[] } }) =>
                    (props.navigation.legal[2].name = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-xs leading-5 underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].legalLink,
              )}
            />
          </div>
        </div>
      </PaddingMarginWrapper>
    </footer>
  );
};

function Logo(props: any) {
  return (
    <svg viewBox="0 0 167 41" {...props}>
      <path
        fillRule="nonzero"
        d="M48.631 28.794h11.952v-3.6h-7.704v-13.56h-4.248v17.16zM67.664 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM81.094 33.042c1.824 0 3.432-.408 4.512-1.368.984-.888 1.632-2.232 1.632-4.08V16.506h-3.744v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2h-3.792c.384 2.568 2.616 3.96 6 3.96zm-.024-7.824c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072zM94.937 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM102.655 28.794h3.912V16.506h-3.912v12.288zm0-13.992h3.912v-3.168h-3.912v3.168zM108.264 32.85h3.912v-5.328h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744V32.85zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36zM127.426 29.178c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368zM138.331 29.154c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V16.506h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088v-7.248h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584zM147.521 28.794h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-7.992c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288z"
      ></path>
      <path d="M8.654 3.891a20.168 20.168 0 00-3.847 3.515c4.589-.426 10.42.27 17.189 3.654 7.228 3.614 13.049 3.737 17.1 2.955a19.842 19.842 0 00-1.378-3.199c-4.638.489-10.583-.158-17.511-3.622-4.4-2.2-8.278-3.106-11.553-3.303zM35.009 6.96A19.952 19.952 0 0020.101.294c-1.739 0-3.427.222-5.036.639 2.179.595 4.494 1.465 6.931 2.683 5.072 2.536 9.452 3.353 13.013 3.344zm4.953 10.962c-4.894.966-11.652.768-19.755-3.284-7.576-3.788-13.605-3.74-17.672-2.836-.21.046-.415.095-.615.146a19.9 19.9 0 00-1.262 3.64c.326-.087.662-.17 1.01-.247 4.933-1.096 11.903-1.049 20.328 3.164 7.575 3.787 13.605 3.74 17.672 2.836.139-.031.276-.063.411-.096a20.186 20.186 0 00-.117-3.323zm-.536 7.544c-4.846.847-11.408.522-19.219-3.384-7.576-3.787-13.605-3.74-17.672-2.836-.902.2-1.714.445-2.431.703-.002.114-.003.229-.003.345 0 11.045 8.955 20 20 20 9.258 0 17.046-6.289 19.325-14.828z"></path>
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/footer_5-1700070102798.webp"
      name="Footer 5"
      Component={Footer5}
    />
  );
}

function ToolbarSettings() {
  const {
    navigation,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    navigation: node.data.props.navigation,
    legal: node.data.props.legal,
    paddingArray: node.data.props.paddingArray,
    marginArray: node.data.props.marginArray,
    maxWidth: node.data.props.maxWidth,
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
                  navigation,
                  legal,
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
                  navigation,
                  legal,
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
    logo: string;
    links: string;
    legal: string;
    legalLink: string;
    border: string;
  };
}

const colors: ColorObject = {
  slate: {
    logo: 'fill-slate-950 dark:fill-white',
    links:
      'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
    legal: 'text-slate-500 dark:text-slate-400',
    legalLink:
      'text-slate-500 underline hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
    border: 'border-slate-900/10 dark:border-white/20',
  },
  gray: {
    logo: 'fill-gray-950 dark:fill-white',
    links:
      'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
    legal: 'text-gray-500 dark:text-gray-400',
    legalLink:
      'text-gray-500 underline hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
    border: 'border-gray-900/10 dark:border-white/20',
  },
  zinc: {
    logo: 'fill-zinc-950 dark:fill-white',
    links:
      'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
    legal: 'text-zinc-500 dark:text-zinc-400',
    legalLink:
      'text-zinc-500 underline hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300',
    border: 'border-zinc-900/10 dark:border-white/20',
  },
  neutral: {
    logo: 'fill-neutral-950 dark:fill-white',
    links:
      'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
    legal: 'text-neutral-500 dark:text-neutral-400',
    legalLink:
      'text-neutral-500 underline hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300',
    border: 'border-neutral-900/10 dark:border-white/20',
  },
  stone: {
    logo: 'fill-stone-950 dark:fill-white',
    links:
      'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300',
    legal: 'text-stone-500 dark:text-stone-400',
    legalLink:
      'text-stone-500 underline hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300',
    border: 'border-stone-900/10 dark:border-white/20',
  },
  red: {
    logo: 'fill-red-800 dark:fill-red-500',
    links: 'text-red-950/70 dark:text-red-50/70',
    legal: 'text-red-800/70 dark:text-red-200/60',
    legalLink:
      'text-red-800/70 underline hover:text-red-600 dark:text-red-200/60 dark:hover:text-red-400',
    border: 'border-red-900/10 dark:border-white/20',
  },
  orange: {
    logo: 'fill-orange-800 dark:fill-orange-500',
    links: 'text-orange-950/70 dark:text-orange-50/70',
    legal: 'text-orange-800/70 dark:text-orange-200/60',
    legalLink:
      'text-orange-800/70 underline hover:text-orange-600 dark:text-orange-200/60 dark:hover:text-orange-400',
    border: 'border-orange-900/10 dark:border-white/20',
  },
  amber: {
    logo: 'fill-amber-800 dark:fill-amber-500',
    links: 'text-amber-950/70 dark:text-amber-50/70',
    legal: 'text-amber-800/70 dark:text-amber-200/60',
    legalLink:
      'text-amber-800/70 underline hover:text-amber-600 dark:text-amber-200/60 dark:hover:text-amber-400',
    border: 'border-amber-900/10 dark:border-white/20',
  },
  yellow: {
    logo: 'fill-yellow-800 dark:fill-yellow-500',
    links: 'text-yellow-950/70 dark:text-yellow-50/70',
    legal: 'text-yellow-800/70 dark:text-yellow-200/60',
    legalLink:
      'text-yellow-800/70 underline hover:text-yellow-600 dark:text-yellow-200/60 dark:hover:text-yellow-400',
    border: 'border-yellow-900/10 dark:border-white/20',
  },
  lime: {
    logo: 'fill-lime-800 dark:fill-lime-500',
    links: 'text-lime-950/70 dark:text-lime-50/70',
    legal: 'text-lime-800/70 dark:text-lime-200/60',
    legalLink:
      'text-lime-800/70 underline hover:text-lime-600 dark:text-lime-200/60 dark:hover:text-lime-400',
    border: 'border-lime-900/10 dark:border-white/20',
  },
  green: {
    logo: 'fill-green-800 dark:fill-green-500',
    links: 'text-green-950/70 dark:text-green-50/70',
    legal: 'text-green-800/70 dark:text-green-200/60',
    legalLink:
      'text-green-800/70 underline hover:text-green-600 dark:text-green-200/60 dark:hover:text-green-400',
    border: 'border-green-900/10 dark:border-white/20',
  },
  emerald: {
    logo: 'fill-emerald-800 dark:fill-emerald-500',
    links: 'text-emerald-950/70 dark:text-emerald-50/70',
    legal: 'text-emerald-800/70 dark:text-emerald-200/60',
    legalLink:
      'text-emerald-800/70 underline hover:text-emerald-600 dark:text-emerald-200/60 dark:hover:text-emerald-400',
    border: 'border-emerald-900/10 dark:border-white/20',
  },
  teal: {
    logo: 'fill-teal-800 dark:fill-teal-500',
    links: 'text-teal-950/70 dark:text-teal-50/70',
    legal: 'text-teal-800/70 dark:text-teal-200/60',
    legalLink:
      'text-teal-800/70 underline hover:text-teal-600 dark:text-teal-200/60 dark:hover:text-teal-400',
    border: 'border-teal-900/10 dark:border-white/20',
  },
  cyan: {
    logo: 'fill-cyan-800 dark:fill-cyan-500',
    links: 'text-cyan-950/70 dark:text-cyan-50/70',
    legal: 'text-cyan-800/70 dark:text-cyan-200/60',
    legalLink:
      'text-cyan-800/70 underline hover:text-cyan-600 dark:text-cyan-200/60 dark:hover:text-cyan-400',
    border: 'border-cyan-900/10 dark:border-white/20',
  },
  sky: {
    logo: 'fill-sky-800 dark:fill-sky-500',
    links: 'text-sky-950/70 dark:text-sky-50/70',
    legal: 'text-sky-800/70 dark:text-sky-200/60',
    legalLink:
      'text-sky-800/70 underline hover:text-sky-600 dark:text-sky-200/60 dark:hover:text-sky-400',
    border: 'border-sky-900/10 dark:border-white/20',
  },
  blue: {
    logo: 'fill-blue-800 dark:fill-blue-500',
    links: 'text-blue-950/70 dark:text-blue-50/70',
    legal: 'text-blue-800/70 dark:text-blue-200/60',
    legalLink:
      'text-blue-800/70 underline hover:text-blue-600 dark:text-blue-200/60 dark:hover:text-blue-400',
    border: 'border-blue-900/10 dark:border-white/20',
  },
  indigo: {
    logo: 'fill-indigo-800 dark:fill-indigo-500',
    links: 'text-indigo-950/70 dark:text-indigo-50/70',
    legal: 'text-indigo-800/70 dark:text-indigo-200/60',
    legalLink:
      'text-indigo-800/70 underline hover:text-indigo-600 dark:text-indigo-200/60 dark:hover:text-indigo-400',
    border: 'border-indigo-900/10 dark:border-white/20',
  },
  violet: {
    logo: 'fill-violet-800 dark:fill-violet-500',
    links: 'text-violet-950/70 dark:text-violet-50/70',
    legal: 'text-violet-800/70 dark:text-violet-200/60',
    legalLink:
      'text-violet-800/70 underline hover:text-violet-600 dark:text-violet-200/60 dark:hover:text-violet-400',
    border: 'border-violet-900/10 dark:border-white/20',
  },
  purple: {
    logo: 'fill-purple-800 dark:fill-purple-500',
    links: 'text-purple-950/70 dark:text-purple-50/70',
    legal: 'text-purple-800/70 dark:text-purple-200/60',
    legalLink:
      'text-purple-800/70 underline hover:text-purple-600 dark:text-purple-200/60 dark:hover:text-purple-400',
    border: 'border-purple-900/10 dark:border-white/20',
  },
  fuchsia: {
    logo: 'fill-fuchsia-800 dark:fill-fuchsia-500',
    links: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    legal: 'text-fuchsia-800/70 dark:text-fuchsia-200/60',
    legalLink:
      'text-fuchsia-800/70 underline hover:text-fuchsia-600 dark:text-fuchsia-200/60 dark:hover:text-fuchsia-400',
    border: 'border-fuchsia-900/10 dark:border-white/20',
  },
  pink: {
    logo: 'fill-pink-800 dark:fill-pink-500',
    links: 'text-pink-950/70 dark:text-pink-50/70',
    legal: 'text-pink-800/70 dark:text-pink-200/60',
    legalLink:
      'text-pink-800/70 underline hover:text-pink-600 dark:text-pink-200/60 dark:hover:text-pink-400',
    border: 'border-pink-900/10 dark:border-white/20',
  },
  rose: {
    logo: 'fill-rose-800 dark:fill-rose-500',
    links: 'text-rose-950/70 dark:text-rose-50/70',
    legal: 'text-rose-800/70 dark:text-rose-200/60',
    legalLink:
      'text-rose-800/70 underline hover:text-rose-600 dark:text-rose-200/60 dark:hover:text-rose-400',
    border: 'border-rose-900/10 dark:border-white/20',
  },
};

function generateComponentString({
  isNextjs,
  navigation,
  legal,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  navigation: any;
  legal: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const navigationObject = `{
  company: [
    { name: '${removeHtmlTags(navigation.company[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.company[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.company[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.company[3].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.company[4].name)}', href: '#' },
  ],
  legal: [
    { name: '${removeHtmlTags(navigation.legal[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.legal[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.legal[2].name)}', href: '#' },
  ],
}`;

  let content: string;

  const nextContent = `import Link from 'next/link';

const navigation = ${navigationObject};

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="${clsx(
        maxWidth,
        marginArray.join(' '),
        paddingArray.join(' '),
      )}">
        <div className="flex flex-col gap-10">
          <Logo
            className="h-8 w-auto ${colors[colorKey].logo}"
            alt="Company name"
          />

          <div className="flex flex-col flex-wrap justify-center gap-10 sm:flex-row">
            {navigation.company.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-center text-sm leading-5 ${colors[textColorKey].links}"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t pt-8 sm:flex-row md:mt-14 md:items-end ${colors[colorKey].border}">
          <p className="text-xs leading-5 ${colors[textColorKey].legal}">
            ${removeHtmlTags(legal)}
          </p>

          <div className="flex space-x-6">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs leading-5 underline ${colors[textColorKey].legalLink}"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo(props) {
  return (
    <svg viewBox="0 0 167 41" {...props}>
      <path
        fillRule="nonzero"
        d="M48.631 28.794h11.952v-3.6h-7.704v-13.56h-4.248v17.16zM67.664 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM81.094 33.042c1.824 0 3.432-.408 4.512-1.368.984-.888 1.632-2.232 1.632-4.08V16.506h-3.744v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2h-3.792c.384 2.568 2.616 3.96 6 3.96zm-.024-7.824c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072zM94.937 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM102.655 28.794h3.912V16.506h-3.912v12.288zm0-13.992h3.912v-3.168h-3.912v3.168zM108.264 32.85h3.912v-5.328h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744V32.85zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36zM127.426 29.178c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368zM138.331 29.154c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V16.506h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088v-7.248h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584zM147.521 28.794h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-7.992c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288z"
      ></path>
      <path d="M8.654 3.891a20.168 20.168 0 00-3.847 3.515c4.589-.426 10.42.27 17.189 3.654 7.228 3.614 13.049 3.737 17.1 2.955a19.842 19.842 0 00-1.378-3.199c-4.638.489-10.583-.158-17.511-3.622-4.4-2.2-8.278-3.106-11.553-3.303zM35.009 6.96A19.952 19.952 0 0020.101.294c-1.739 0-3.427.222-5.036.639 2.179.595 4.494 1.465 6.931 2.683 5.072 2.536 9.452 3.353 13.013 3.344zm4.953 10.962c-4.894.966-11.652.768-19.755-3.284-7.576-3.788-13.605-3.74-17.672-2.836-.21.046-.415.095-.615.146a19.9 19.9 0 00-1.262 3.64c.326-.087.662-.17 1.01-.247 4.933-1.096 11.903-1.049 20.328 3.164 7.575 3.787 13.605 3.74 17.672 2.836.139-.031.276-.063.411-.096a20.186 20.186 0 00-.117-3.323zm-.536 7.544c-4.846.847-11.408.522-19.219-3.384-7.576-3.787-13.605-3.74-17.672-2.836-.902.2-1.714.445-2.431.703-.002.114-.003.229-.003.345 0 11.045 8.955 20 20 20 9.258 0 17.046-6.289 19.325-14.828z"></path>
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

const navigation = ${navigationObject};

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="${clsx(
        maxWidth,
        marginArray.join(' '),
        paddingArray.join(' '),
      )}">
        <div className="flex flex-col gap-10">
          <Logo
            className="h-8 w-auto ${colors[colorKey].logo}"
            alt="Company name"
          />

          <div className="flex flex-col flex-wrap justify-center gap-10 sm:flex-row">
            {navigation.company.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-center text-sm leading-5 ${colors[textColorKey].links}"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t pt-8 sm:flex-row md:mt-14 md:items-end ${colors[colorKey].border}">
          <p className="text-xs leading-5 ${colors[textColorKey].legal}">
            ${removeHtmlTags(legal)}
          </p>

          <div className="flex space-x-6">
            {navigation.legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs leading-5 underline ${colors[textColorKey].legalLink}"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo(props) {
  return (
    <svg viewBox="0 0 167 41" {...props}>
      <path
        fillRule="nonzero"
        d="M48.631 28.794h11.952v-3.6h-7.704v-13.56h-4.248v17.16zM67.664 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM81.094 33.042c1.824 0 3.432-.408 4.512-1.368.984-.888 1.632-2.232 1.632-4.08V16.506h-3.744v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2h-3.792c.384 2.568 2.616 3.96 6 3.96zm-.024-7.824c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072zM94.937 26.394c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504zM102.655 28.794h3.912V16.506h-3.912v12.288zm0-13.992h3.912v-3.168h-3.912v3.168zM108.264 32.85h3.912v-5.328h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744V32.85zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36zM127.426 29.178c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368zM138.331 29.154c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V16.506h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088v-7.248h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584zM147.521 28.794h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-7.992c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288z"
      ></path>
      <path d="M8.654 3.891a20.168 20.168 0 00-3.847 3.515c4.589-.426 10.42.27 17.189 3.654 7.228 3.614 13.049 3.737 17.1 2.955a19.842 19.842 0 00-1.378-3.199c-4.638.489-10.583-.158-17.511-3.622-4.4-2.2-8.278-3.106-11.553-3.303zM35.009 6.96A19.952 19.952 0 0020.101.294c-1.739 0-3.427.222-5.036.639 2.179.595 4.494 1.465 6.931 2.683 5.072 2.536 9.452 3.353 13.013 3.344zm4.953 10.962c-4.894.966-11.652.768-19.755-3.284-7.576-3.788-13.605-3.74-17.672-2.836-.21.046-.415.095-.615.146a19.9 19.9 0 00-1.262 3.64c.326-.087.662-.17 1.01-.247 4.933-1.096 11.903-1.049 20.328 3.164 7.575 3.787 13.605 3.74 17.672 2.836.139-.031.276-.063.411-.096a20.186 20.186 0 00-.117-3.323zm-.536 7.544c-4.846.847-11.408.522-19.219-3.384-7.576-3.787-13.605-3.74-17.672-2.836-.902.2-1.714.445-2.431.703-.002.114-.003.229-.003.345 0 11.045 8.955 20 20 20 9.258 0 17.046-6.289 19.325-14.828z"></path>
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
    navigation,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    navigation,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Footer5 from './components/Footer5';`);
  componentContent.push('<Footer5 />');
  return zip.file('components/Footer5.jsx', content);
}

Footer5.craft = {
  props: {
    navigation: navigation,
    legal: '&copy; 2020 Your Company, Inc. All rights reserved.',
    paddingArray: ['px-6', 'pb-8', 'pt-16', 'sm:pt-24', 'lg:px-8', 'lg:pt-32'],
    marginArray: ['mx-auto'],
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
