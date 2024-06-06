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

export const Contact5 = ({
  tagline = '',
  heading = '',
  description = '',
  email = '',
  emailDescription = '',
  phone = '',
  phoneDescription = '',
  address = '',
  addressDescription = '',
  paddingArray = ['px-4', 'sm:px-6', 'lg:px-8'],
  marginArray = ['mx-auto', 'mt-24', 'sm:mt-32', 'md:mt-40'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  tagline?: string;
  heading?: string;
  description?: string;
  email?: string;
  emailDescription?: string;
  phone?: string;
  phoneDescription?: string;
  address?: string;
  addressDescription?: string;
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
      <div className="flex flex-col gap-6">
        <ContentEditable
          html={tagline}
          onChange={(e) =>
            setProp(
              (props: { tagline: string }) => (props.tagline = e.target.value),
            )
          }
          tagName="span"
          disabled={query.getOptions().enabled ? false : true}
          className={clsx(
            'text-lg font-medium',
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

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <MailIcon
              aria-hidden="true"
              className={clsx('h-10 w-10', colors[colorKey].icon)}
            />
            <h3
              className={clsx(
                'text-2xl font-semibold',
                colors[textColorKey].heading,
              )}
            >
              Email
            </h3>

            <ContentEditable
              html={emailDescription}
              onChange={(e) =>
                setProp(
                  (props: { emailDescription: string }) =>
                    (props.emailDescription = e.target.value),
                )
              }
              tagName="p"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].description,
              )}
            />

            <ContentEditable
              html={email}
              onChange={(e) =>
                setProp(
                  (props: { email: string }) => (props.email = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].iconLabel,
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <PhoneIcon
              aria-hidden="true"
              className={clsx('h-10 w-10', colors[colorKey].icon)}
            />
            <h3
              className={clsx(
                'text-2xl font-semibold',
                colors[textColorKey].heading,
              )}
            >
              Phone
            </h3>

            <ContentEditable
              html={phoneDescription}
              onChange={(e) =>
                setProp(
                  (props: { phoneDescription: string }) =>
                    (props.phoneDescription = e.target.value),
                )
              }
              tagName="p"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].description,
              )}
            />

            <ContentEditable
              html={phone}
              onChange={(e) =>
                setProp(
                  (props: { phone: string }) => (props.phone = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].iconLabel,
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <LocationIcon
              aria-hidden="true"
              className={clsx('h-10 w-10', colors[colorKey].icon)}
            />
            <h3
              className={clsx(
                'text-2xl font-semibold',
                colors[textColorKey].heading,
              )}
            >
              Location
            </h3>

            <ContentEditable
              html={addressDescription}
              onChange={(e) =>
                setProp(
                  (props: { addressDescription: string }) =>
                    (props.addressDescription = e.target.value),
                )
              }
              tagName="p"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].description,
              )}
            />

            <ContentEditable
              html={address}
              onChange={(e) =>
                setProp(
                  (props: { address: string }) =>
                    (props.address = e.target.value),
                )
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base underline',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].iconLabel,
              )}
            />
          </div>
        </div>
      </div>
    </PaddingMarginWrapper>
  );
};

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/contact_5-1699916681253.webp"
      name="Contact 5"
      Component={Contact5}
    />
  );
}

function ToolbarSettings() {
  const {
    maxWidth,
    marginArray,
    paddingArray,
    tagline,
    heading,
    description,
    email,
    emailDescription,
    phone,
    phoneDescription,
    address,
    addressDescription,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    email: node.data.props.email,
    emailDescription: node.data.props.emailDescription,
    phone: node.data.props.phone,
    phoneDescription: node.data.props.phoneDescription,
    address: node.data.props.address,
    addressDescription: node.data.props.addressDescription,
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
                  maxWidth,
                  marginArray,
                  paddingArray,
                  tagline,
                  heading,
                  description,
                  email,
                  emailDescription,
                  phone,
                  phoneDescription,
                  address,
                  addressDescription,
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
                  maxWidth,
                  marginArray,
                  paddingArray,
                  tagline,
                  heading,
                  description,
                  email,
                  emailDescription,
                  phone,
                  phoneDescription,
                  address,
                  addressDescription,
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
    icon: string;
    iconLabel: string;
    label: string;
    input: string;
    checkboxInput: string;
    cta: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-900 dark:text-slate-300',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    icon: 'text-slate-700 dark:text-slate-300',
    iconLabel: 'text-slate-700 dark:text-slate-300',
    label: 'text-slate-900 dark:text-slate-200',
    input:
      'text-slate-900 ring-slate-300 placeholder:text-slate-400 focus:ring-slate-600 dark:bg-slate-900 dark:ring-slate-600 dark:focus:ring-slate-400',
    checkboxInput:
      'border-slate-300 bg-white/5 text-slate-900 focus:ring-slate-600 dark:text-slate-600',
    cta: 'bg-slate-900 hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
  },
  gray: {
    tagline: 'text-gray-900 dark:text-gray-300',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    icon: 'text-gray-700 dark:text-gray-300',
    iconLabel: 'text-gray-700 dark:text-gray-300',
    label: 'text-gray-900 dark:text-gray-200',
    input:
      'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 dark:bg-gray-900 dark:ring-gray-600 dark:focus:ring-gray-400',
    checkboxInput:
      'border-gray-300 bg-white/5 text-gray-900 focus:ring-gray-600 dark:text-gray-600',
    cta: 'bg-gray-900 hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-900 dark:text-zinc-300',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    icon: 'text-zinc-700 dark:text-zinc-300',
    iconLabel: 'text-zinc-700 dark:text-zinc-300',
    label: 'text-zinc-900 dark:text-zinc-200',
    input:
      'text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-zinc-600 dark:bg-zinc-900 dark:ring-zinc-600 dark:focus:ring-zinc-400',
    checkboxInput:
      'border-zinc-300 bg-white/5 text-zinc-900 focus:ring-zinc-600 dark:text-zinc-600',
    cta: 'bg-zinc-900 hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-900 dark:text-neutral-300',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    icon: 'text-neutral-700 dark:text-neutral-300',
    iconLabel: 'text-neutral-700 dark:text-neutral-300',
    label: 'text-neutral-900 dark:text-neutral-200',
    input:
      'text-neutral-900 ring-neutral-300 placeholder:text-neutral-400 focus:ring-neutral-600 dark:bg-neutral-900 dark:ring-neutral-600 dark:focus:ring-neutral-400',
    checkboxInput:
      'border-neutral-300 bg-white/5 text-neutral-900 focus:ring-neutral-600 dark:text-neutral-600',
    cta: 'bg-neutral-900 hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    tagline: 'text-stone-900 dark:text-stone-300',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    icon: 'text-stone-700 dark:text-stone-300',
    iconLabel: 'text-stone-700 dark:text-stone-300',
    label: 'text-stone-900 dark:text-stone-200',
    input:
      'text-stone-900 ring-stone-300 placeholder:text-stone-400 focus:ring-stone-600 dark:bg-stone-900 dark:ring-stone-600 dark:focus:ring-stone-400',
    checkboxInput:
      'border-stone-300 bg-white/5 text-stone-900 focus:ring-stone-600 dark:text-stone-600',
    cta: 'bg-stone-900 hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    icon: 'text-red-800 dark:text-red-600/80',
    iconLabel: 'text-red-800 dark:text-red-500/80',
    label: 'text-red-900 dark:text-red-200',
    input:
      'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-400 dark:bg-red-950/20 dark:ring-red-900 dark:focus:ring-red-600',
    checkboxInput:
      'border-red-900 bg-white text-red-600 focus:ring-red-600 dark:text-red-950/90',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    icon: 'text-orange-800 dark:text-orange-600/80',
    iconLabel: 'text-orange-800 dark:text-orange-500/80',
    label: 'text-orange-900 dark:text-orange-200',
    input:
      'text-orange-900 ring-orange-300 placeholder:text-orange-400 focus:ring-orange-400 dark:bg-orange-950/20 dark:ring-orange-900 dark:focus:ring-orange-600',
    checkboxInput:
      'border-orange-900 bg-white text-orange-600 focus:ring-orange-600 dark:text-orange-950/90',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    icon: 'text-amber-800 dark:text-amber-600/80',
    iconLabel: 'text-amber-800 dark:text-amber-500/80',
    label: 'text-amber-900 dark:text-amber-200',
    input:
      'text-amber-900 ring-amber-300 placeholder:text-amber-400 focus:ring-amber-400 dark:bg-amber-950/20 dark:ring-amber-900 dark:focus:ring-amber-600',
    checkboxInput:
      'border-amber-900 bg-white text-amber-600 focus:ring-amber-600 dark:text-amber-950/90',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    icon: 'text-yellow-800 dark:text-yellow-600/80',
    iconLabel: 'text-yellow-800 dark:text-yellow-500/80',
    label: 'text-yellow-900 dark:text-yellow-200',
    input:
      'text-yellow-900 ring-yellow-300 placeholder:text-yellow-400 focus:ring-yellow-400 dark:bg-yellow-950/20 dark:ring-yellow-900 dark:focus:ring-yellow-600',
    checkboxInput:
      'border-yellow-900 bg-white text-yellow-600 focus:ring-yellow-600 dark:text-yellow-950/90',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    icon: 'text-lime-800 dark:text-lime-600/80',
    iconLabel: 'text-lime-800 dark:text-lime-500/80',
    label: 'text-lime-900 dark:text-lime-200',
    input:
      'text-lime-900 ring-lime-300 placeholder:text-lime-400 focus:ring-lime-400 dark:bg-lime-950/20 dark:ring-lime-900 dark:focus:ring-lime-600',
    checkboxInput:
      'border-lime-900 bg-white text-lime-600 focus:ring-lime-600 dark:text-lime-950/90',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    icon: 'text-green-800 dark:text-green-600/80',
    iconLabel: 'text-green-800 dark:text-green-500/80',
    label: 'text-green-900 dark:text-green-200',
    input:
      'text-green-900 ring-green-300 placeholder:text-green-400 focus:ring-green-400 dark:bg-green-950/20 dark:ring-green-900 dark:focus:ring-green-600',
    checkboxInput:
      'border-green-900 bg-white text-green-600 focus:ring-green-600 dark:text-green-950/90',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    icon: 'text-emerald-800 dark:text-emerald-600/80',
    iconLabel: 'text-emerald-800 dark:text-emerald-500/80',
    label: 'text-emerald-900 dark:text-emerald-200',
    input:
      'text-emerald-900 ring-emerald-300 placeholder:text-emerald-400 focus:ring-emerald-400 dark:bg-emerald-950/20 dark:ring-emerald-900 dark:focus:ring-emerald-600',
    checkboxInput:
      'border-emerald-900 bg-white text-emerald-600 focus:ring-emerald-600 dark:text-emerald-950/90',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    icon: 'text-teal-800 dark:text-teal-600/80',
    iconLabel: 'text-teal-800 dark:text-teal-500/80',
    label: 'text-teal-900 dark:text-teal-200',
    input:
      'text-teal-900 ring-teal-300 placeholder:text-teal-400 focus:ring-teal-400 dark:bg-teal-950/20 dark:ring-teal-900 dark:focus:ring-teal-600',
    checkboxInput:
      'border-teal-900 bg-white text-teal-600 focus:ring-teal-600 dark:text-teal-950/90',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    icon: 'text-cyan-800 dark:text-cyan-600/80',
    iconLabel: 'text-cyan-800 dark:text-cyan-500/80',
    label: 'text-cyan-900 dark:text-cyan-200',
    input:
      'text-cyan-900 ring-cyan-300 placeholder:text-cyan-400 focus:ring-cyan-400 dark:bg-cyan-950/20 dark:ring-cyan-900 dark:focus:ring-cyan-600',
    checkboxInput:
      'border-cyan-900 bg-white text-cyan-600 focus:ring-cyan-600 dark:text-cyan-950/90',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    icon: 'text-sky-800 dark:text-sky-600/80',
    iconLabel: 'text-sky-800 dark:text-sky-500/80',
    label: 'text-sky-900 dark:text-sky-200',
    input:
      'text-sky-900 ring-sky-300 placeholder:text-sky-400 focus:ring-sky-400 dark:bg-sky-950/20 dark:ring-sky-900 dark:focus:ring-sky-600',
    checkboxInput:
      'border-sky-900 bg-white text-sky-600 focus:ring-sky-600 dark:text-sky-950/90',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    icon: 'text-blue-800 dark:text-blue-600/80',
    iconLabel: 'text-blue-800 dark:text-blue-500/80',
    label: 'text-blue-900 dark:text-blue-200',
    input:
      'text-blue-900 ring-blue-300 placeholder:text-blue-400 focus:ring-blue-400 dark:bg-blue-950/20 dark:ring-blue-900 dark:focus:ring-blue-600',
    checkboxInput:
      'border-blue-900 bg-white text-blue-600 focus:ring-blue-600 dark:text-blue-950/90',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    icon: 'text-indigo-800 dark:text-indigo-600/80',
    iconLabel: 'text-indigo-800 dark:text-indigo-500/80',
    label: 'text-indigo-900 dark:text-indigo-200',
    input:
      'text-indigo-900 ring-indigo-300 placeholder:text-indigo-400 focus:ring-indigo-400 dark:bg-indigo-950/20 dark:ring-indigo-900 dark:focus:ring-indigo-600',
    checkboxInput:
      'border-indigo-900 bg-white text-indigo-600 focus:ring-indigo-600 dark:text-indigo-950/90',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    icon: 'text-violet-800 dark:text-violet-600/80',
    iconLabel: 'text-violet-800 dark:text-violet-500/80',
    label: 'text-violet-900 dark:text-violet-200',
    input:
      'text-violet-900 ring-violet-300 placeholder:text-violet-400 focus:ring-violet-400 dark:bg-violet-950/20 dark:ring-violet-900 dark:focus:ring-violet-600',
    checkboxInput:
      'border-violet-900 bg-white text-violet-600 focus:ring-violet-600 dark:text-violet-950/90',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    icon: 'text-purple-800 dark:text-purple-600/80',
    iconLabel: 'text-purple-800 dark:text-purple-500/80',
    label: 'text-purple-900 dark:text-purple-200',
    input:
      'text-purple-900 ring-purple-300 placeholder:text-purple-400 focus:ring-purple-400 dark:bg-purple-950/20 dark:ring-purple-900 dark:focus:ring-purple-600',
    checkboxInput:
      'border-purple-900 bg-white text-purple-600 focus:ring-purple-600 dark:text-purple-950/90',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    icon: 'text-fuchsia-800 dark:text-fuchsia-600/80',
    iconLabel: 'text-fuchsia-800 dark:text-fuchsia-500/80',
    label: 'text-fuchsia-900 dark:text-fuchsia-200',
    input:
      'text-fuchsia-900 ring-fuchsia-300 placeholder:text-fuchsia-400 focus:ring-fuchsia-400 dark:bg-fuchsia-950/20 dark:ring-fuchsia-900 dark:focus:ring-fuchsia-600',
    checkboxInput:
      'border-fuchsia-900 bg-white text-fuchsia-600 focus:ring-fuchsia-600 dark:text-fuchsia-950/90',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    icon: 'text-pink-800 dark:text-pink-600/80',
    iconLabel: 'text-pink-800 dark:text-pink-500/80',
    label: 'text-pink-900 dark:text-pink-200',
    input:
      'text-pink-900 ring-pink-300 placeholder:text-pink-400 focus:ring-pink-400 dark:bg-pink-950/20 dark:ring-pink-900 dark:focus:ring-pink-600',
    checkboxInput:
      'border-pink-900 bg-white text-pink-600 focus:ring-pink-600 dark:text-pink-950/90',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    icon: 'text-rose-800 dark:text-rose-600/80',
    iconLabel: 'text-rose-800 dark:text-rose-500/80',
    label: 'text-rose-900 dark:text-rose-200',
    input:
      'text-rose-900 ring-rose-300 placeholder:text-rose-400 focus:ring-rose-400 dark:bg-rose-950/20 dark:ring-rose-900 dark:focus:ring-rose-600',
    checkboxInput:
      'border-rose-900 bg-white text-rose-600 focus:ring-rose-600 dark:text-rose-950/90',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
  },
};

function generateComponentString({
  isNextjs,
  maxWidth,
  marginArray,
  paddingArray,
  tagline,
  heading,
  description,
  email,
  emailDescription,
  phone,
  phoneDescription,
  address,
  addressDescription,
  color,
  textColor,
}: {
  isNextjs: boolean;
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  tagline: string;
  heading: string;
  description: string;
  email: string;
  emailDescription: string;
  phone: string;
  phoneDescription: string;
  address: string;
  addressDescription: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  let content: string;

  const nextContent = `
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col gap-6">
        <span className="text-lg font-medium ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </span>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <MailIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Email
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(emailDescription)}
            </p>
            <Link
              href="mailto:info@codesnaps.io"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(email)}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <PhoneIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Phone
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(phoneDescription)}
            </p>
            <Link
              href="tel:${removeHtmlTags(phone)}"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(phone)}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <LocationIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Location
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(addressDescription)}
            </p>
            <Link
              href="#"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(address)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MailIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function LocationIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}`;

  const reactContent = `import React from 'react';

export default function Contact() {
  return (
    <div className="${clsx(
      maxWidth,
      marginArray.join(' '),
      paddingArray.join(' '),
    )}">
      <div className="flex flex-col gap-6">
        <span className="text-lg font-medium ${colors[textColorKey].tagline}">
          ${removeHtmlTags(tagline)}
        </span>

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <MailIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Email
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(emailDescription)}
            </p>
            <a
              href="mailto:info@codesnaps.io"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(email)}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <PhoneIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Phone
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(phoneDescription)}
            </p>
            <a
              href="tel:${removeHtmlTags(phone)}"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(phone)}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <LocationIcon
              aria-hidden="true"
              className="h-10 w-10 ${colors[colorKey].icon}"
            />
            <h3 className="text-2xl font-semibold ${colors[textColorKey].heading}">
              Location
            </h3>
            <p className="text-base ${colors[textColorKey].description}">
              ${removeHtmlTags(addressDescription)}
            </p>
            <a
              href="#"
              className="text-base underline ${colors[textColorKey].iconLabel}"
            >
              ${removeHtmlTags(address)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MailIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function LocationIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
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
    tagline,
    heading,
    description,
    email,
    emailDescription,
    phone,
    phoneDescription,
    address,
    addressDescription,
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
    email,
    emailDescription,
    phone,
    phoneDescription,
    address,
    addressDescription,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Contact5 from './components/Contact5';`);
  componentContent.push('<Contact5 />');
  return zip.file('components/Contact5.jsx', content);
}

Contact5.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Contact sales',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    email: 'info@codesnaps.io',
    emailDescription:
      'Mauris hendrerit elementum nibh, a ornare elit mollis quis. Aenean consequat purus.',
    phone: '+1 (555) 123-4567',
    phoneDescription:
      'Mauris hendrerit elementum nibh, a ornare elit mollis quis. Aenean consequat purus.',
    address: '1234 Broadway St, New York, NY 10001',
    addressDescription:
      'Mauris hendrerit elementum nibh, a ornare elit mollis quis. Aenean consequat purus.',
    paddingArray: ['px-4', 'sm:px-6', 'lg:px-8'],
    marginArray: ['mx-auto', 'mt-24', 'sm:mt-32', 'md:mt-40'],
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
