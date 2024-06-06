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

type SerializedNodeWithId = SerializedNode & { id: string };

const team = [
  {
    id: 1,
    name: 'Full Name',
    imageSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    title: 'Job Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      {
        name: 'LinkedIn',
        url: '#',
        icon: LinkedInIcon,
      },
      {
        name: 'GitHub',
        url: '#',
        icon: GitHubIcon,
      },
      {
        name: 'X',
        url: '#',
        icon: XIcon,
      },
    ],
  },
  {
    id: 2,
    name: 'Full Name',
    imageSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    title: 'Job Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      {
        name: 'LinkedIn',
        url: '#',
        icon: LinkedInIcon,
      },
      {
        name: 'GitHub',
        url: '#',
        icon: GitHubIcon,
      },
      {
        name: 'X',
        url: '#',
        icon: XIcon,
      },
    ],
  },
  {
    id: 3,
    name: 'Full Name',
    imageSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    title: 'Job Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      {
        name: 'LinkedIn',
        url: '#',
        icon: LinkedInIcon,
      },
      {
        name: 'GitHub',
        url: '#',
        icon: GitHubIcon,
      },
      {
        name: 'X',
        url: '#',
        icon: XIcon,
      },
    ],
  },
  {
    id: 4,
    name: 'Full Name',
    imageSrc: 'https://dummyimage.com/1000x1000/d4d4d4/171717',
    title: 'Job Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    socials: [
      {
        name: 'LinkedIn',
        url: '#',
        icon: LinkedInIcon,
      },
      {
        name: 'GitHub',
        url: '#',
        icon: GitHubIcon,
      },
      {
        name: 'X',
        url: '#',
        icon: XIcon,
      },
    ],
  },
];

export const Team3 = ({
  tagline = '',
  heading = '',
  description = '',
  team = [],
  cta = '',
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
  team?: any[];
  teamSocials?: any;
  secondHeading?: string;
  secondDescription?: string;
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
      <div className="grid grid-cols-1 items-start gap-20 xl:grid-cols-3">
        <div className="flex max-w-3xl flex-col gap-8">
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

          <div>
            <ContentEditable
              html={cta}
              onChange={(e) =>
                setProp(
                  (props: { cta: string }) => (props.cta = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[colorKey].cta,
              )}
            />
          </div>
        </div>

        <div className="col-span-2 mt-20 xl:mt-0">
          <dl className="grid w-full gap-14 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col space-y-4">
                <div className="max-w-md">
                  <Image
                    priority
                    src={member.imageSrc}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="mx-auto h-full w-full rounded-sm"
                  />
                </div>

                <div>
                  <ContentEditable
                    html={member.name}
                    onChange={(e) =>
                      setProp(
                        (props: { team: any[] }) =>
                          (props.team[member.id - 1].name = e.target.value),
                      )
                    }
                    tagName="h3"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'mt-2 text-lg font-semibold leading-tight',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].memberName,
                    )}
                  />

                  <ContentEditable
                    html={member.title}
                    onChange={(e) =>
                      setProp(
                        (props: { team: any[] }) =>
                          (props.team[member.id - 1].title = e.target.value),
                      )
                    }
                    tagName="p"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'mt-2 text-base font-medium',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].description,
                    )}
                  />
                </div>

                <ContentEditable
                  html={member.description}
                  onChange={(e) =>
                    setProp(
                      (props: { team: any[] }) =>
                        (props.team[member.id - 1].description =
                          e.target.value),
                    )
                  }
                  tagName="p"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    'mt-2 max-w-md text-base',
                    'outline-none focus:outline-offset-4 focus:outline-primary',
                    colors[textColorKey].memberDescription,
                  )}
                />

                <div className="flex space-x-4">
                  <a className={colors[colorKey].socialLink}>
                    <span className="sr-only">LinkedIn</span>
                    <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a className={colors[colorKey].socialLink}>
                    <span className="sr-only">GitHub</span>
                    <GitHubIcon className="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a className={colors[colorKey].socialLink}>
                    <span className="sr-only">X</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="nonzero"
        d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
      ></path>
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
      <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/team_3-1700174931913.webp"
      name="Team 3"
      Component={Team3}
    />
  );
}

function ToolbarSettings() {
  const {
    tagline,
    heading,
    description,
    team,
    cta,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    team: node.data.props.team,
    secondHeading: node.data.props.secondHeading,
    secondDescription: node.data.props.secondDescription,
    cta: node.data.props.cta,
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
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
                  tagline,
                  heading,
                  description,
                  team,
                  cta,
                  maxWidth,
                  marginArray,
                  paddingArray,
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
                  tagline,
                  heading,
                  description,
                  team,
                  cta,
                  maxWidth,
                  marginArray,
                  paddingArray,
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
    memberName: string;
    memberDescription: string;
    socialLink: string;
    cta: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-800 dark:text-slate-200',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    memberName: 'text-slate-900 dark:text-slate-100',
    memberDescription: 'text-slate-500 dark:text-slate-400/60',
    socialLink:
      'text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
  },
  gray: {
    tagline: 'text-gray-800 dark:text-gray-200',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    memberName: 'text-gray-900 dark:text-gray-100',
    memberDescription: 'text-gray-500 dark:text-gray-400/60',
    socialLink:
      'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-800 dark:text-zinc-200',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    memberName: 'text-zinc-900 dark:text-zinc-100',
    memberDescription: 'text-zinc-500 dark:text-zinc-400/60',
    socialLink:
      'text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-800 dark:text-neutral-200',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    memberName: 'text-neutral-900 dark:text-neutral-100',
    memberDescription: 'text-neutral-500 dark:text-neutral-400/60',
    socialLink:
      'text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300',
    cta: 'bg-transparent text-neutral-900 ring-neutral-500 hover:bg-neutral-100 ocus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    tagline: 'text-stone-800 dark:text-stone-200',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    memberName: 'text-stone-900 dark:text-stone-100',
    memberDescription: 'text-stone-500 dark:text-stone-400/60',
    socialLink:
      'text-stone-500 hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    memberName: 'text-red-900 dark:text-red-400/70',
    memberDescription: 'text-red-900/80 dark:text-red-100/50',
    socialLink:
      'text-red-700 hover:text-red-800 dark:text-red-500/70 dark:hover:text-red-500',
    cta: 'bg-transparent text-red-900 ring-red-500 hover:bg-red-100 ocus-visible:outline-red-500 dark:text-red-100 dark:ring-red-600 dark:hover:bg-red-800 dark:focus-visible:outline-red-400',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    memberName: 'text-orange-900 dark:text-orange-400/70',
    memberDescription: 'text-orange-900/80 dark:text-orange-100/50',
    socialLink:
      'text-orange-700 hover:text-orange-800 dark:text-orange-500/70 dark:hover:text-orange-500',
    cta: 'bg-transparent text-orange-900 ring-orange-500 hover:bg-orange-100 ocus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-600 dark:hover:bg-orange-800 dark:focus-visible:outline-orange-400',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    memberName: 'text-amber-900 dark:text-amber-400/70',
    memberDescription: 'text-amber-900/80 dark:text-amber-100/50',
    socialLink:
      'text-amber-700 hover:text-amber-800 dark:text-amber-500/70 dark:hover:text-amber-500',
    cta: 'bg-transparent text-amber-900 ring-amber-500 hover:bg-amber-100 ocus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-600 dark:hover:bg-amber-800 dark:focus-visible:outline-amber-400',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    memberName: 'text-yellow-900 dark:text-yellow-400/70',
    memberDescription: 'text-yellow-900/80 dark:text-yellow-100/50',
    socialLink:
      'text-yellow-700 hover:text-yellow-800 dark:text-yellow-500/70 dark:hover:text-yellow-500',
    cta: 'bg-transparent text-yellow-900 ring-yellow-500 hover:bg-yellow-100 ocus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-600 dark:hover:bg-yellow-800 dark:focus-visible:outline-yellow-400',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    memberName: 'text-lime-900 dark:text-lime-400/70',
    memberDescription: 'text-lime-900/80 dark:text-lime-100/50',
    socialLink:
      'text-lime-700 hover:text-lime-800 dark:text-lime-500/70 dark:hover:text-lime-500',
    cta: 'bg-transparent text-lime-900 ring-lime-500 hover:bg-lime-100 ocus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-600 dark:hover:bg-lime-800 dark:focus-visible:outline-lime-400',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    memberName: 'text-green-900 dark:text-green-400/70',
    memberDescription: 'text-green-900/80 dark:text-green-100/50',
    socialLink:
      'text-green-700 hover:text-green-800 dark:text-green-500/70 dark:hover:text-green-500',
    cta: 'bg-transparent text-green-900 ring-green-500 hover:bg-green-100 ocus-visible:outline-green-500 dark:text-green-100 dark:ring-green-600 dark:hover:bg-green-800 dark:focus-visible:outline-green-400',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    memberName: 'text-emerald-900 dark:text-emerald-400/70',
    memberDescription: 'text-emerald-900/80 dark:text-emerald-100/50',
    socialLink:
      'text-emerald-700 hover:text-emerald-800 dark:text-emerald-500/70 dark:hover:text-emerald-500',
    cta: 'bg-transparent text-emerald-900 ring-emerald-500 hover:bg-emerald-100 ocus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-600 dark:hover:bg-emerald-800 dark:focus-visible:outline-emerald-400',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    memberName: 'text-teal-900 dark:text-teal-400/70',
    memberDescription: 'text-teal-900/80 dark:text-teal-100/50',
    socialLink:
      'text-teal-700 hover:text-teal-800 dark:text-teal-500/70 dark:hover:text-teal-500',
    cta: 'bg-transparent text-teal-900 ring-teal-500 hover:bg-teal-100 ocus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-600 dark:hover:bg-teal-800 dark:focus-visible:outline-teal-400',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    memberName: 'text-cyan-900 dark:text-cyan-400/70',
    memberDescription: 'text-cyan-900/80 dark:text-cyan-100/50',
    socialLink:
      'text-cyan-700 hover:text-cyan-800 dark:text-cyan-500/70 dark:hover:text-cyan-500',
    cta: 'bg-transparent text-cyan-900 ring-cyan-500 hover:bg-cyan-100 ocus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-600 dark:hover:bg-cyan-800 dark:focus-visible:outline-cyan-400',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    memberName: 'text-sky-900 dark:text-sky-400/70',
    memberDescription: 'text-sky-900/80 dark:text-sky-100/50',
    socialLink:
      'text-sky-700 hover:text-sky-800 dark:text-sky-500/70 dark:hover:text-sky-500',
    cta: 'bg-transparent text-sky-900 ring-sky-500 hover:bg-sky-100 ocus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-600 dark:hover:bg-sky-800 dark:focus-visible:outline-sky-400',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    memberName: 'text-blue-900 dark:text-blue-400/70',
    memberDescription: 'text-blue-900/80 dark:text-blue-100/50',
    socialLink:
      'text-blue-700 hover:text-blue-800 dark:text-blue-500/70 dark:hover:text-blue-500',
    cta: 'bg-transparent text-blue-900 ring-blue-500 hover:bg-blue-100 ocus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-600 dark:hover:bg-blue-800 dark:focus-visible:outline-blue-400',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    memberName: 'text-indigo-900 dark:text-indigo-400/70',
    memberDescription: 'text-indigo-900/80 dark:text-indigo-100/50',
    socialLink:
      'text-indigo-700 hover:text-indigo-800 dark:text-indigo-500/70 dark:hover:text-indigo-500',
    cta: 'bg-transparent text-indigo-900 ring-indigo-500 hover:bg-indigo-100 ocus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-600 dark:hover:bg-indigo-800 dark:focus-visible:outline-indigo-400',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    memberName: 'text-violet-900 dark:text-violet-400/70',
    memberDescription: 'text-violet-900/80 dark:text-violet-100/50',
    socialLink:
      'text-violet-700 hover:text-violet-800 dark:text-violet-500/70 dark:hover:text-violet-500',
    cta: 'bg-transparent text-violet-900 ring-violet-500 hover:bg-violet-100 ocus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-600 dark:hover:bg-violet-800 dark:focus-visible:outline-violet-400',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    memberName: 'text-purple-900 dark:text-purple-400/70',
    memberDescription: 'text-purple-900/80 dark:text-purple-100/50',
    socialLink:
      'text-purple-700 hover:text-purple-800 dark:text-purple-500/70 dark:hover:text-purple-500',
    cta: 'bg-transparent text-purple-900 ring-purple-500 hover:bg-purple-100 ocus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-600 dark:hover:bg-purple-800 dark:focus-visible:outline-purple-400',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    memberName: 'text-fuchsia-900 dark:text-fuchsia-400/70',
    memberDescription: 'text-fuchsia-900/80 dark:text-fuchsia-100/50',
    socialLink:
      'text-fuchsia-700 hover:text-fuchsia-800 dark:text-fuchsia-500/70 dark:hover:text-fuchsia-500',
    cta: 'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:bg-fuchsia-100 ocus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-600 dark:hover:bg-fuchsia-800 dark:focus-visible:outline-fuchsia-400',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    memberName: 'text-pink-900 dark:text-pink-400/70',
    memberDescription: 'text-pink-900/80 dark:text-pink-100/50',
    socialLink:
      'text-pink-700 hover:text-pink-800 dark:text-pink-500/70 dark:hover:text-pink-500',
    cta: 'bg-transparent text-pink-900 ring-pink-500 hover:bg-pink-100 ocus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-600 dark:hover:bg-pink-800 dark:focus-visible:outline-pink-400',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    memberName: 'text-rose-900 dark:text-rose-400/70',
    memberDescription: 'text-rose-900/80 dark:text-rose-100/50',
    socialLink:
      'text-rose-700 hover:text-rose-800 dark:text-rose-500/70 dark:hover:text-rose-500',
    cta: 'bg-transparent text-rose-900 ring-rose-500 hover:bg-rose-100 ocus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-600 dark:hover:bg-rose-800 dark:focus-visible:outline-rose-400',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  team,
  cta,
  maxWidth,
  marginArray,
  paddingArray,
  color,
  textColor,
}: {
  isNextjs: boolean;
  tagline: string;
  heading: string;
  description: string;
  team: any[];
  cta: string;
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const mappedTeam = team.map(
    (member) => `
  {
    id: ${member.id},
    name: '${removeHtmlTags(member.name)}',
    imageSrc: '${member.imageSrc}',
    title: '${removeHtmlTags(member.title)}',
    description: '${removeHtmlTags(member.description)}',
    socials: ${JSON.stringify(member.socials)},
  }`,
  );

  const teamString = `[${mappedTeam.join(',\n')}]`;

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
import Link from 'next/link';

const team = ${team};

export default function Team() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-start gap-20 xl:grid-cols-3">
        <div className="flex max-w-3xl flex-col gap-8">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div>
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
            >
              ${removeHtmlTags(cta)}
            </Link>
          </div>
        </div>

        <div className="col-span-2 mt-20 xl:mt-0">
          <dl className="grid w-full gap-14 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col space-y-4">
                <div className="max-w-md">
                  <Image
                    priority
                    src={member.imageSrc}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="mx-auto h-full w-full rounded-sm"
                  />
                </div>

                <div>
                  <h3 className="mt-2 text-lg font-semibold leading-tight ${colors[textColorKey].memberName}">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-base font-medium ${colors[textColorKey].description}">
                    {member.title}
                  </p>
                </div>

                <p className="mt-2 max-w-md text-base ${colors[textColorKey].memberDescription}">
                  {member.description}
                </p>

                <div className="flex space-x-4">
                  {member.socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="${colors[colorKey].socialLink}"
                    >
                      <span className="sr-only">{social.name}</span>
                      <social.icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="nonzero"
        d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
      ></path>
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
      <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

const team = ${teamString};

export default function Team() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="grid grid-cols-1 items-start gap-20 xl:grid-cols-3">
        <div className="flex max-w-3xl flex-col gap-8">
          <h3 className="text-lg font-medium uppercase tracking-wide ${colors[textColorKey].tagline}">
            ${removeHtmlTags(tagline)}
          </h3>

          <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
            ${removeHtmlTags(heading)}
          </h2>

          <p className="text-lg ${colors[textColorKey].description}">
            ${removeHtmlTags(description)}
          </p>

          <div>
            <Link
              href="#"
              className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
            >
              ${removeHtmlTags(cta)}
            </Link>
          </div>
        </div>

        <div className="col-span-2 mt-20 xl:mt-0">
          <dl className="grid w-full gap-14 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col space-y-4">
                <div className="max-w-md">
                  <Image
                    priority
                    src={member.imageSrc}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="mx-auto h-full w-full rounded-sm"
                  />
                </div>

                <div>
                  <h3 className="mt-2 text-lg font-semibold leading-tight ${colors[textColorKey].memberName}">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-base font-medium ${colors[textColorKey].description}">
                    {member.title}
                  </p>
                </div>

                <p className="mt-2 max-w-md text-base ${colors[textColorKey].memberDescription}">
                  {member.description}
                </p>

                <div className="flex space-x-4">
                  {member.socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="${colors[colorKey].socialLink}"
                    >
                      <span className="sr-only">{social.name}</span>
                      <social.icon className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="nonzero"
        d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
      ></path>
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
      <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
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
    tagline,
    heading,
    description,
    team,
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
    team,
    cta,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Team3 from './components/Team3';`);
  componentContent.push('<Team3 />');
  return zip.file('components/Team3.jsx', content);
}

Team3.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Our Team',
    description: 'A brief introduction to our team members.',
    cta: 'Open Positions',
    team: team,
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
