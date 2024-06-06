'use client';

import _ from 'lodash';
import clsx from 'clsx';
import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import React, { useState } from 'react';
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
import { Dialog, Menu } from '@headlessui/react';
import SidebarItem from '~/app/dashboard/[organization]/sites/[id]/components/editor/SidebarItem';
import ToolbarSettingsForm from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSettingsForm';

import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';
import JSZip from 'jszip';

type SerializedNodeWithId = SerializedNode & { id: string };

const navigation = [
  { name: 'Link One', href: '#', dropdown: false },
  { name: 'Link Two', href: '#', dropdown: false },
  {
    name: 'Dropdown Three',
    dropdown: true,
    group: [
      {
        name: 'Group Column One',
        items: [
          {
            icon: GroupLinkIcon,
            name: 'Item #1',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #2',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #3',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #4',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
        ],
      },
      {
        name: 'Group Column Two',
        items: [
          {
            icon: GroupLinkIcon,
            name: 'Item #1',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #2',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #3',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: 'Item #4',
            description: 'Lorem ipsum dolor sit amet consectetur elit.',
            href: '#',
          },
        ],
      },
    ],
  },
];

export const Navbar6 = ({
  navigation = [],
  primaryCta = '',
  secondaryCta = '',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  navigation?: any[];
  primaryCta?: string;
  secondaryCta?: string;
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      ref={(ref) => {
        connect(drag(ref as HTMLElement));
      }}
      className="relative"
    >
      <header
        className={clsx(
          'absolute inset-x-0 top-0 z-10 border-b p-6',
          colors[colorKey].header,
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo className={clsx('h-8 w-auto z-0', colors[colorKey].logo)} />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerIcon
                className={clsx('h-6 w-6', colors[colorKey].icon)}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* NAVIGATION ITEMS */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-12">
            <ContentEditable
              html={navigation[0].name}
              onChange={(e) =>
                setProp((props: any) => {
                  props.navigation[0].name = e.target.value;
                })
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-sm font-semibold leading-6',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <ContentEditable
              html={navigation[1].name}
              onChange={(e) =>
                setProp((props: any) => {
                  props.navigation[1].name = e.target.value;
                })
              }
              tagName="a"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-sm font-semibold leading-6',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].links,
              )}
            />

            <Menu as="div" className="relative">
              <Menu.Button
                className={clsx(
                  'flex items-center text-sm font-semibold leading-6',
                  colors[textColorKey].links,
                )}
              >
                {navigation[2].name}
                <ChevronDownIcon
                  className={clsx('ml-2 h-5 w-5', colors[colorKey].chevron)}
                />
              </Menu.Button>

              {/* DROPDOWN ITEMS */}
              <Menu.Items
                className={clsx(
                  'absolute -right-20 mt-2 min-w-[600px] origin-top-right rounded-md py-4 shadow-lg ring-1 focus:outline-none',
                  colors[textColorKey].dropdown,
                )}
              >
                <div className="grid w-full grid-cols-2 gap-6 px-4">
                  {navigation[2].group.map(
                    (group: {
                      name: string;
                      items: {
                        icon: any;
                        name: string;
                        description: string;
                        href: string;
                      }[];
                    }) => (
                      <div key={group.name}>
                        <p
                          className={clsx(
                            'mb-6 block px-3.5 text-sm font-medium',
                            colors[textColorKey].links,
                          )}
                        >
                          {group.name}
                        </p>

                        <div className="flex flex-col gap-6">
                          {group.items.map((groupItem) => (
                            <Menu.Item
                              as="div"
                              key={groupItem.name}
                              className={clsx(
                                'flex gap-3 rounded-md px-3.5 py-2.5',
                                colors[textColorKey].dropdownHover,
                              )}
                            >
                              <Link
                                href={groupItem.href}
                                className="flex gap-4"
                              >
                                <div>
                                  <GroupLinkIcon
                                    className={clsx(
                                      'h-5 w-5',
                                      colors[textColorKey].columnIcon,
                                    )}
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>
                                  <span
                                    className={clsx(
                                      'block text-base font-medium',
                                      colors[textColorKey].links,
                                    )}
                                  >
                                    {groupItem.name}
                                  </span>
                                  <span
                                    className={clsx(
                                      'text-sm leading-none',
                                      colors[textColorKey].description,
                                    )}
                                  >
                                    {groupItem.description}
                                  </span>
                                </div>
                              </Link>
                            </Menu.Item>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </Menu.Items>
            </Menu>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4">
              <Link
                href="#"
                className={clsx(
                  'rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  colors[colorKey].primaryCta,
                )}
              >
                <ContentEditable
                  html={primaryCta}
                  onChange={(e) =>
                    setProp((props: { primaryCta: string }) => {
                      props.primaryCta = e.target.value;
                    })
                  }
                  tagName="span"
                  disabled={query.getOptions().enabled ? false : true}
                  className="outline-none"
                />{' '}
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <ContentEditable
                html={secondaryCta}
                onChange={(e) =>
                  setProp((props: { secondaryCta: string }) => {
                    props.secondaryCta = e.target.value;
                  })
                }
                tagName="a"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[colorKey].secondaryCta,
                )}
              />
            </div>
          </div>
        </nav>

        {/* MOBILE NAVIGATION */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel
            className={clsx(
              'fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1',
              colors[colorKey].dialogPanel,
            )}
          >
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Logo className={clsx('h-8 w-auto', colors[colorKey].logo)} />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className={clsx('h-6 w-6', colors[colorKey].icon)}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* MOBILE NAVIGATION ITEMS */}
            <div className="mt-6 flow-root">
              <div
                className={clsx(
                  '-my-6 divide-y',
                  colors[colorKey].mobileDivide,
                )}
              >
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <div>
                          <span
                            className={clsx(
                              '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7',
                              colors[textColorKey].links,
                            )}
                          >
                            {item.name}
                          </span>

                          <div>
                            {item.group.map(
                              (group: {
                                name: string;
                                items: {
                                  icon: any;
                                  name: string;
                                  description: string;
                                  href: string;
                                }[];
                              }) => (
                                <div key={group.name} className="mt-6">
                                  <p
                                    className={clsx(
                                      'mb-2 block text-sm font-medium',
                                      colors[textColorKey].links,
                                    )}
                                  >
                                    {group.name}
                                  </p>

                                  <div className="flex flex-col gap-2">
                                    {group.items.map((groupItem) => (
                                      <div
                                        key={groupItem.name}
                                        className={clsx(
                                          'flex gap-3 rounded-md px-2 py-2.5',
                                          colors[textColorKey].dropdownHover,
                                        )}
                                      >
                                        <Link
                                          href={groupItem.href}
                                          className="flex items-start gap-3"
                                        >
                                          <div>
                                            <GroupLinkIcon
                                              className={clsx(
                                                'h-5 w-5',
                                                colors[textColorKey].columnIcon,
                                              )}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <div>
                                            <span
                                              className={clsx(
                                                'block text-base font-medium',
                                                colors[textColorKey].links,
                                              )}
                                            >
                                              {groupItem.name}
                                            </span>
                                            <span
                                              className={clsx(
                                                'text-sm leading-none',
                                                colors[textColorKey]
                                                  .description,
                                              )}
                                            >
                                              {groupItem.description}
                                            </span>
                                          </div>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7',
                            colors[colorKey].mobileHover,
                            colors[textColorKey].links,
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-4 py-6">
                  <Link
                    href="#"
                    className={clsx(
                      'rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      colors[colorKey].primaryCta,
                    )}
                  >
                    <ContentEditable
                      html={primaryCta}
                      onChange={(e) =>
                        setProp((props: { primaryCta: string }) => {
                          props.primaryCta = e.target.value;
                        })
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none"
                    />{' '}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>

                  <ContentEditable
                    html={secondaryCta}
                    onChange={(e) =>
                      setProp((props: { secondaryCta: string }) => {
                        props.secondaryCta = e.target.value;
                      })
                    }
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[colorKey].secondaryCta,
                    )}
                  />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

function Logo(props: React.SVGProps<SVGSVGElement>) {
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

function HamburgerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function XMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function GroupLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/navbar_6-1700253992183.webp"
      name="Navbar 6"
      Component={Navbar6}
    />
  );
}

function ToolbarSettings() {
  const { navigation, primaryCta, secondaryCta, color, textColor, name } =
    useNode((node) => ({
      navigation: node.data.props.navigation,
      primaryCta: node.data.props.primaryCta,
      secondaryCta: node.data.props.secondaryCta,
      color: node.data.props.color,
      textColor: node.data.props.textColor,
      name: node.data.custom.displayName || node.data.displayName,
    }));

  return (
    <ToolbarSettingsForm hasMarginAndPadding={false}>
      <AccordionItem value="export">
        <AccordionTrigger>
          <h3 className="text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-50 mt-6">
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
                  primaryCta,
                  secondaryCta,
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
                  primaryCta,
                  secondaryCta,
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
    header: string;
    logo: string;
    chevron: string;
    icon: string;
    links: string;
    description: string;
    dropdown: string;
    dropdownLinks: string;
    dropdownHover: string;
    dialogPanel: string;
    columnIcon: string;
    primaryCta: string;
    secondaryCta: string;
    mobileDivide: string;
    mobileHover: string;
  };
}

const colors: ColorObject = {
  slate: {
    header: 'border-slate-300 dark:border-slate-700',
    logo: 'fill-slate-900 dark:fill-white',
    chevron: 'stroke-slate-700 dark:stroke-slate-300',
    icon: 'stroke-slate-800 dark:stroke-white',
    links: 'text-slate-900 dark:text-slate-100',
    description: 'text-slate-600 dark:text-slate-400',
    dropdown: 'bg-white ring-black/5 dark:bg-slate-900',
    dropdownLinks: 'bg-slate-100 dark:bg-slate-800',
    dropdownHover: 'hover:bg-slate-200 dark:hover:bg-slate-800',
    dialogPanel: 'bg-white sm:ring-slate-900/10 dark:bg-slate-950',
    columnIcon: 'fill-slate-700 dark:fill-slate-300',
    primaryCta:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    secondaryCta:
      'bg-transparent text-slate-900 ring-slate-500 hover:bg-slate-100 focus-visible:outline-slate-500 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-400',
    mobileDivide: 'divide-slate-500/30 dark:divide-white/30',
    mobileHover: 'hover:bg-slate-200 dark:hover:bg-slate-900',
  },
  gray: {
    header: 'border-gray-300 dark:border-gray-700',
    logo: 'fill-gray-900 dark:fill-white',
    chevron: 'stroke-gray-700 dark:stroke-gray-300',
    icon: 'stroke-gray-800 dark:stroke-white',
    links: 'text-gray-900 dark:text-gray-100',
    description: 'text-gray-600 dark:text-gray-400',
    dropdown: 'bg-white ring-black/5 dark:bg-gray-900',
    dropdownLinks: 'bg-gray-100 dark:bg-gray-800',
    dropdownHover: 'hover:bg-gray-200 dark:hover:bg-gray-800',
    dialogPanel: 'bg-white sm:ring-gray-900/10 dark:bg-gray-950',
    columnIcon: 'fill-gray-700 dark:fill-gray-300',
    primaryCta:
      'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    secondaryCta:
      'bg-transparent text-gray-900 ring-gray-500 hover:bg-gray-100 focus-visible:outline-gray-500 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800 dark:focus-visible:outline-gray-400',
    mobileDivide: 'divide-gray-500/30 dark:divide-white/30',
    mobileHover: 'hover:bg-gray-200 dark:hover:bg-gray-900',
  },
  zinc: {
    header: 'border-zinc-300 dark:border-zinc-700',
    logo: 'fill-zinc-900 dark:fill-white',
    chevron: 'stroke-zinc-700 dark:stroke-zinc-300',
    icon: 'stroke-zinc-800 dark:stroke-white',
    links: 'text-zinc-900 dark:text-zinc-100',
    description: 'text-zinc-600 dark:text-zinc-400',
    dropdown: 'bg-white ring-black/5 dark:bg-zinc-900',
    dropdownLinks: 'bg-zinc-100 dark:bg-zinc-800',
    dropdownHover: 'hover:bg-zinc-200 dark:hover:bg-zinc-800',
    dialogPanel: 'bg-white sm:ring-zinc-900/10 dark:bg-zinc-950',
    columnIcon: 'fill-zinc-700 dark:fill-zinc-300',
    primaryCta:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    secondaryCta:
      'bg-transparent text-zinc-900 ring-zinc-500 hover:bg-zinc-100 focus-visible:outline-zinc-500 dark:text-zinc-100 dark:ring-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-400',
    mobileDivide: 'divide-zinc-500/30 dark:divide-white/30',
    mobileHover: 'hover:bg-zinc-200 dark:hover:bg-zinc-900',
  },
  neutral: {
    header: 'border-neutral-300 dark:border-neutral-700',
    logo: 'fill-neutral-900 dark:fill-white',
    chevron: 'stroke-neutral-700 dark:stroke-neutral-300',
    icon: 'stroke-neutral-800 dark:stroke-white',
    links: 'text-neutral-900 dark:text-neutral-100',
    description: 'text-neutral-600 dark:text-neutral-400',
    dropdown: 'bg-white ring-black/5 dark:bg-neutral-900',
    dropdownLinks: 'bg-neutral-100 dark:bg-neutral-800',
    dropdownHover: 'hover:bg-neutral-200 dark:hover:bg-neutral-800',
    dialogPanel: 'bg-white sm:ring-neutral-900/10 dark:bg-neutral-950',
    columnIcon: 'fill-neutral-700 dark:fill-neutral-300',
    primaryCta:
      'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    secondaryCta:
      'bg-transparent text-neutral-900 ring-neutral-500 hover:bg-neutral-100 focus-visible:outline-neutral-500 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400',
    mobileDivide: 'divide-neutral-500/30 dark:divide-white/30',
    mobileHover: 'hover:bg-neutral-200 dark:hover:bg-neutral-900',
  },
  stone: {
    header: 'border-stone-300 dark:border-stone-700',
    logo: 'fill-stone-900 dark:fill-white',
    chevron: 'stroke-stone-700 dark:stroke-stone-300',
    icon: 'stroke-stone-800 dark:stroke-white',
    links: 'text-stone-900 dark:text-stone-100',
    description: 'text-stone-600 dark:text-stone-400',
    dropdown: 'bg-white ring-black/5 dark:bg-stone-900',
    dropdownLinks: 'bg-stone-100 dark:bg-stone-800',
    dropdownHover: 'hover:bg-stone-200 dark:hover:bg-stone-800',
    dialogPanel: 'bg-white sm:ring-stone-900/10 dark:bg-stone-950',
    columnIcon: 'fill-stone-700 dark:fill-stone-300',
    primaryCta:
      'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    secondaryCta:
      'bg-transparent text-stone-900 ring-stone-500 hover:bg-stone-100 focus-visible:outline-stone-500 dark:text-stone-100 dark:ring-stone-600 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400',
    mobileDivide: 'divide-stone-500/30 dark:divide-white/30',
    mobileHover: 'hover:bg-stone-200 dark:hover:bg-stone-900',
  },
  red: {
    header: 'border-red-300/80 dark:border-red-800/70',
    logo: 'fill-red-800 dark:fill-red-500',
    chevron: 'stroke-red-700 dark:stroke-red-300',
    icon: 'stroke-red-800 dark:stroke-red-50',
    links: 'text-red-900 dark:text-red-100',
    description: 'text-red-800/80 dark:text-red-100/60',
    dropdown: 'bg-red-50 ring-black/5 dark:bg-red-950',
    dropdownLinks: 'bg-red-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-red-200/50 dark:hover:bg-red-900/50',
    dialogPanel: 'bg-white sm:ring-red-900/10 dark:bg-black',
    columnIcon: 'fill-red-800 dark:fill-red-100',
    primaryCta:
      'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
    secondaryCta:
      'bg-transparent text-red-900 ring-red-500 hover:bg-red-100 focus-visible:outline-red-500 dark:text-red-100 dark:ring-red-800 dark:hover:bg-red-900/30 dark:focus-visible:outline-red-400',
    mobileDivide: 'divide-red-700/30 dark:divide-red/50',
    mobileHover: 'hover:bg-red-100 dark:hover:bg-red-900/40',
  },
  orange: {
    header: 'border-orange-300/80 dark:border-orange-800/70',
    logo: 'fill-orange-800 dark:fill-orange-500',
    chevron: 'stroke-orange-700 dark:stroke-orange-300',
    icon: 'stroke-orange-800 dark:stroke-orange-50',
    links: 'text-orange-900 dark:text-orange-100',
    description: 'text-orange-800/80 dark:text-orange-100/60',
    dropdown: 'bg-orange-50 ring-black/5 dark:bg-orange-950',
    dropdownLinks: 'bg-orange-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-orange-200/50 dark:hover:bg-orange-900/50',
    dialogPanel: 'bg-white sm:ring-orange-900/10 dark:bg-black',
    columnIcon: 'fill-orange-800 dark:fill-orange-100',
    primaryCta:
      'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
    secondaryCta:
      'bg-transparent text-orange-900 ring-orange-500 hover:bg-orange-100 focus-visible:outline-orange-500 dark:text-orange-100 dark:ring-orange-800 dark:hover:bg-orange-900/30 dark:focus-visible:outline-orange-400',
    mobileDivide: 'divide-orange-700/30 dark:divide-orange/50',
    mobileHover: 'hover:bg-orange-100 dark:hover:bg-orange-900/40',
  },
  amber: {
    header: 'border-amber-300/80 dark:border-amber-800/70',
    logo: 'fill-amber-800 dark:fill-amber-500',
    chevron: 'stroke-amber-700 dark:stroke-amber-300',
    icon: 'stroke-amber-800 dark:stroke-amber-50',
    links: 'text-amber-900 dark:text-amber-100',
    description: 'text-amber-800/80 dark:text-amber-100/60',
    dropdown: 'bg-amber-50 ring-black/5 dark:bg-amber-950',
    dropdownLinks: 'bg-amber-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-amber-200/50 dark:hover:bg-amber-900/50',
    dialogPanel: 'bg-white sm:ring-amber-900/10 dark:bg-black',
    columnIcon: 'fill-amber-800 dark:fill-amber-100',
    primaryCta:
      'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
    secondaryCta:
      'bg-transparent text-amber-900 ring-amber-500 hover:bg-amber-100 focus-visible:outline-amber-500 dark:text-amber-100 dark:ring-amber-800 dark:hover:bg-amber-900/30 dark:focus-visible:outline-amber-400',
    mobileDivide: 'divide-amber-700/30 dark:divide-amber/50',
    mobileHover: 'hover:bg-amber-100 dark:hover:bg-amber-900/40',
  },
  yellow: {
    header: 'border-yellow-300/80 dark:border-yellow-800/70',
    logo: 'fill-yellow-800 dark:fill-yellow-500',
    chevron: 'stroke-yellow-700 dark:stroke-yellow-300',
    icon: 'stroke-yellow-800 dark:stroke-yellow-50',
    links: 'text-yellow-900 dark:text-yellow-100',
    description: 'text-yellow-800/80 dark:text-yellow-100/60',
    dropdown: 'bg-yellow-50 ring-black/5 dark:bg-yellow-950',
    dropdownLinks: 'bg-yellow-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-yellow-200/50 dark:hover:bg-yellow-900/50',
    dialogPanel: 'bg-white sm:ring-yellow-900/10 dark:bg-black',
    columnIcon: 'fill-yellow-800 dark:fill-yellow-100',
    primaryCta:
      'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
    secondaryCta:
      'bg-transparent text-yellow-900 ring-yellow-500 hover:bg-yellow-100 focus-visible:outline-yellow-500 dark:text-yellow-100 dark:ring-yellow-800 dark:hover:bg-yellow-900/30 dark:focus-visible:outline-yellow-400',
    mobileDivide: 'divide-yellow-700/30 dark:divide-yellow/50',
    mobileHover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/40',
  },
  lime: {
    header: 'border-lime-300/80 dark:border-lime-800/70',
    logo: 'fill-lime-800 dark:fill-lime-500',
    chevron: 'stroke-lime-700 dark:stroke-lime-300',
    icon: 'stroke-lime-800 dark:stroke-lime-50',
    links: 'text-lime-900 dark:text-lime-100',
    description: 'text-lime-800/80 dark:text-lime-100/60',
    dropdown: 'bg-lime-50 ring-black/5 dark:bg-lime-950',
    dropdownLinks: 'bg-lime-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-lime-200/50 dark:hover:bg-lime-900/50',
    dialogPanel: 'bg-white sm:ring-lime-900/10 dark:bg-black',
    columnIcon: 'fill-lime-800 dark:fill-lime-100',
    primaryCta:
      'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
    secondaryCta:
      'bg-transparent text-lime-900 ring-lime-500 hover:bg-lime-100 focus-visible:outline-lime-500 dark:text-lime-100 dark:ring-lime-800 dark:hover:bg-lime-900/30 dark:focus-visible:outline-lime-400',
    mobileDivide: 'divide-lime-700/30 dark:divide-lime/50',
    mobileHover: 'hover:bg-lime-100 dark:hover:bg-lime-900/40',
  },
  green: {
    header: 'border-green-300/80 dark:border-green-800/70',
    logo: 'fill-green-800 dark:fill-green-500',
    chevron: 'stroke-green-700 dark:stroke-green-300',
    icon: 'stroke-green-800 dark:stroke-green-50',
    links: 'text-green-900 dark:text-green-100',
    description: 'text-green-800/80 dark:text-green-100/60',
    dropdown: 'bg-green-50 ring-black/5 dark:bg-green-950',
    dropdownLinks: 'bg-green-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-green-200/50 dark:hover:bg-green-900/50',
    dialogPanel: 'bg-white sm:ring-green-900/10 dark:bg-black',
    columnIcon: 'fill-green-800 dark:fill-green-100',
    primaryCta:
      'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
    secondaryCta:
      'bg-transparent text-green-900 ring-green-500 hover:bg-green-100 focus-visible:outline-green-500 dark:text-green-100 dark:ring-green-800 dark:hover:bg-green-900/30 dark:focus-visible:outline-green-400',
    mobileDivide: 'divide-green-700/30 dark:divide-green/50',
    mobileHover: 'hover:bg-green-100 dark:hover:bg-green-900/40',
  },
  emerald: {
    header: 'border-emerald-300/80 dark:border-emerald-800/70',
    logo: 'fill-emerald-800 dark:fill-emerald-500',
    chevron: 'stroke-emerald-700 dark:stroke-emerald-300',
    icon: 'stroke-emerald-800 dark:stroke-emerald-50',
    links: 'text-emerald-900 dark:text-emerald-100',
    description: 'text-emerald-800/80 dark:text-emerald-100/60',
    dropdown: 'bg-emerald-50 ring-black/5 dark:bg-emerald-950',
    dropdownLinks: 'bg-emerald-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50',
    dialogPanel: 'bg-white sm:ring-emerald-900/10 dark:bg-black',
    columnIcon: 'fill-emerald-800 dark:fill-emerald-100',
    primaryCta:
      'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
    secondaryCta:
      'bg-transparent text-emerald-900 ring-emerald-500 hover:bg-emerald-100 focus-visible:outline-emerald-500 dark:text-emerald-100 dark:ring-emerald-800 dark:hover:bg-emerald-900/30 dark:focus-visible:outline-emerald-400',
    mobileDivide: 'divide-emerald-700/30 dark:divide-emerald/50',
    mobileHover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
  },
  teal: {
    header: 'border-teal-300/80 dark:border-teal-800/70',
    logo: 'fill-teal-800 dark:fill-teal-500',
    chevron: 'stroke-teal-700 dark:stroke-teal-300',
    icon: 'stroke-teal-800 dark:stroke-teal-50',
    links: 'text-teal-900 dark:text-teal-100',
    description: 'text-teal-800/80 dark:text-teal-100/60',
    dropdown: 'bg-teal-50 ring-black/5 dark:bg-teal-950',
    dropdownLinks: 'bg-teal-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-teal-200/50 dark:hover:bg-teal-900/50',
    dialogPanel: 'bg-white sm:ring-teal-900/10 dark:bg-black',
    columnIcon: 'fill-teal-800 dark:fill-teal-100',
    primaryCta:
      'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
    secondaryCta:
      'bg-transparent text-teal-900 ring-teal-500 hover:bg-teal-100 focus-visible:outline-teal-500 dark:text-teal-100 dark:ring-teal-800 dark:hover:bg-teal-900/30 dark:focus-visible:outline-teal-400',
    mobileDivide: 'divide-teal-700/30 dark:divide-teal/50',
    mobileHover: 'hover:bg-teal-100 dark:hover:bg-teal-900/40',
  },
  cyan: {
    header: 'border-cyan-300/80 dark:border-cyan-800/70',
    logo: 'fill-cyan-800 dark:fill-cyan-500',
    chevron: 'stroke-cyan-700 dark:stroke-cyan-300',
    icon: 'stroke-cyan-800 dark:stroke-cyan-50',
    links: 'text-cyan-900 dark:text-cyan-100',
    description: 'text-cyan-800/80 dark:text-cyan-100/60',
    dropdown: 'bg-cyan-50 ring-black/5 dark:bg-cyan-950',
    dropdownLinks: 'bg-cyan-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-cyan-200/50 dark:hover:bg-cyan-900/50',
    dialogPanel: 'bg-white sm:ring-cyan-900/10 dark:bg-black',
    columnIcon: 'fill-cyan-800 dark:fill-cyan-100',
    primaryCta:
      'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
    secondaryCta:
      'bg-transparent text-cyan-900 ring-cyan-500 hover:bg-cyan-100 focus-visible:outline-cyan-500 dark:text-cyan-100 dark:ring-cyan-800 dark:hover:bg-cyan-900/30 dark:focus-visible:outline-cyan-400',
    mobileDivide: 'divide-cyan-700/30 dark:divide-cyan/50',
    mobileHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-900/40',
  },
  sky: {
    header: 'border-sky-300/80 dark:border-sky-800/70',
    logo: 'fill-sky-800 dark:fill-sky-500',
    chevron: 'stroke-sky-700 dark:stroke-sky-300',
    icon: 'stroke-sky-800 dark:stroke-sky-50',
    links: 'text-sky-900 dark:text-sky-100',
    description: 'text-sky-800/80 dark:text-sky-100/60',
    dropdown: 'bg-sky-50 ring-black/5 dark:bg-sky-950',
    dropdownLinks: 'bg-sky-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-sky-200/50 dark:hover:bg-sky-900/50',
    dialogPanel: 'bg-white sm:ring-sky-900/10 dark:bg-black',
    columnIcon: 'fill-sky-800 dark:fill-sky-100',
    primaryCta:
      'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
    secondaryCta:
      'bg-transparent text-sky-900 ring-sky-500 hover:bg-sky-100 focus-visible:outline-sky-500 dark:text-sky-100 dark:ring-sky-800 dark:hover:bg-sky-900/30 dark:focus-visible:outline-sky-400',
    mobileDivide: 'divide-sky-700/30 dark:divide-sky/50',
    mobileHover: 'hover:bg-sky-100 dark:hover:bg-sky-900/40',
  },
  blue: {
    header: 'border-blue-300/80 dark:border-blue-800/70',
    logo: 'fill-blue-800 dark:fill-blue-500',
    chevron: 'stroke-blue-700 dark:stroke-blue-300',
    icon: 'stroke-blue-800 dark:stroke-blue-50',
    links: 'text-blue-900 dark:text-blue-100',
    description: 'text-blue-800/80 dark:text-blue-100/60',
    dropdown: 'bg-blue-50 ring-black/5 dark:bg-blue-950',
    dropdownLinks: 'bg-blue-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-blue-200/50 dark:hover:bg-blue-900/50',
    dialogPanel: 'bg-white sm:ring-blue-900/10 dark:bg-black',
    columnIcon: 'fill-blue-800 dark:fill-blue-100',
    primaryCta:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
    secondaryCta:
      'bg-transparent text-blue-900 ring-blue-500 hover:bg-blue-100 focus-visible:outline-blue-500 dark:text-blue-100 dark:ring-blue-800 dark:hover:bg-blue-900/30 dark:focus-visible:outline-blue-400',
    mobileDivide: 'divide-blue-700/30 dark:divide-blue/50',
    mobileHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/40',
  },
  indigo: {
    header: 'border-indigo-300/80 dark:border-indigo-800/70',
    logo: 'fill-indigo-800 dark:fill-indigo-500',
    chevron: 'stroke-indigo-700 dark:stroke-indigo-300',
    icon: 'stroke-indigo-800 dark:stroke-indigo-50',
    links: 'text-indigo-900 dark:text-indigo-100',
    description: 'text-indigo-800/80 dark:text-indigo-100/60',
    dropdown: 'bg-indigo-50 ring-black/5 dark:bg-indigo-950',
    dropdownLinks: 'bg-indigo-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-indigo-200/50 dark:hover:bg-indigo-900/50',
    dialogPanel: 'bg-white sm:ring-indigo-900/10 dark:bg-black',
    columnIcon: 'fill-indigo-800 dark:fill-indigo-100',
    primaryCta:
      'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
    secondaryCta:
      'bg-transparent text-indigo-900 ring-indigo-500 hover:bg-indigo-100 focus-visible:outline-indigo-500 dark:text-indigo-100 dark:ring-indigo-800 dark:hover:bg-indigo-900/30 dark:focus-visible:outline-indigo-400',
    mobileDivide: 'divide-indigo-700/30 dark:divide-indigo/50',
    mobileHover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
  },
  violet: {
    header: 'border-violet-300/80 dark:border-violet-800/70',
    logo: 'fill-violet-800 dark:fill-violet-500',
    chevron: 'stroke-violet-700 dark:stroke-violet-300',
    icon: 'stroke-violet-800 dark:stroke-violet-50',
    links: 'text-violet-900 dark:text-violet-100',
    description: 'text-violet-800/80 dark:text-violet-100/60',
    dropdown: 'bg-violet-50 ring-black/5 dark:bg-violet-950',
    dropdownLinks: 'bg-violet-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-violet-200/50 dark:hover:bg-violet-900/50',
    dialogPanel: 'bg-white sm:ring-violet-900/10 dark:bg-black',
    columnIcon: 'fill-violet-800 dark:fill-violet-100',
    primaryCta:
      'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
    secondaryCta:
      'bg-transparent text-violet-900 ring-violet-500 hover:bg-violet-100 focus-visible:outline-violet-500 dark:text-violet-100 dark:ring-violet-800 dark:hover:bg-violet-900/30 dark:focus-visible:outline-violet-400',
    mobileDivide: 'divide-violet-700/30 dark:divide-violet/50',
    mobileHover: 'hover:bg-violet-100 dark:hover:bg-violet-900/40',
  },
  purple: {
    header: 'border-purple-300/80 dark:border-purple-800/70',
    logo: 'fill-purple-800 dark:fill-purple-500',
    chevron: 'stroke-purple-700 dark:stroke-purple-300',
    icon: 'stroke-purple-800 dark:stroke-purple-50',
    links: 'text-purple-900 dark:text-purple-100',
    description: 'text-purple-800/80 dark:text-purple-100/60',
    dropdown: 'bg-purple-50 ring-black/5 dark:bg-purple-950',
    dropdownLinks: 'bg-purple-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-purple-200/50 dark:hover:bg-purple-900/50',
    dialogPanel: 'bg-white sm:ring-purple-900/10 dark:bg-black',
    columnIcon: 'fill-purple-800 dark:fill-purple-100',
    primaryCta:
      'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
    secondaryCta:
      'bg-transparent text-purple-900 ring-purple-500 hover:bg-purple-100 focus-visible:outline-purple-500 dark:text-purple-100 dark:ring-purple-800 dark:hover:bg-purple-900/30 dark:focus-visible:outline-purple-400',
    mobileDivide: 'divide-purple-700/30 dark:divide-purple/50',
    mobileHover: 'hover:bg-purple-100 dark:hover:bg-purple-900/40',
  },
  fuchsia: {
    header: 'border-fuchsia-300/80 dark:border-fuchsia-800/70',
    logo: 'fill-fuchsia-800 dark:fill-fuchsia-500',
    chevron: 'stroke-fuchsia-700 dark:stroke-fuchsia-300',
    icon: 'stroke-fuchsia-800 dark:stroke-fuchsia-50',
    links: 'text-fuchsia-900 dark:text-fuchsia-100',
    description: 'text-fuchsia-800/80 dark:text-fuchsia-100/60',
    dropdown: 'bg-fuchsia-50 ring-black/5 dark:bg-fuchsia-950',
    dropdownLinks: 'bg-fuchsia-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-fuchsia-200/50 dark:hover:bg-fuchsia-900/50',
    dialogPanel: 'bg-white sm:ring-fuchsia-900/10 dark:bg-black',
    columnIcon: 'fill-fuchsia-800 dark:fill-fuchsia-100',
    primaryCta:
      'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
    secondaryCta:
      'bg-transparent text-fuchsia-900 ring-fuchsia-500 hover:bg-fuchsia-100 focus-visible:outline-fuchsia-500 dark:text-fuchsia-100 dark:ring-fuchsia-800 dark:hover:bg-fuchsia-900/30 dark:focus-visible:outline-fuchsia-400',
    mobileDivide: 'divide-fuchsia-700/30 dark:divide-fuchsia/50',
    mobileHover: 'hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/40',
  },
  pink: {
    header: 'border-pink-300/80 dark:border-pink-800/70',
    logo: 'fill-pink-800 dark:fill-pink-500',
    chevron: 'stroke-pink-700 dark:stroke-pink-300',
    icon: 'stroke-pink-800 dark:stroke-pink-50',
    links: 'text-pink-900 dark:text-pink-100',
    description: 'text-pink-800/80 dark:text-pink-100/60',
    dropdown: 'bg-pink-50 ring-black/5 dark:bg-pink-950',
    dropdownLinks: 'bg-pink-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-pink-200/50 dark:hover:bg-pink-900/50',
    dialogPanel: 'bg-white sm:ring-pink-900/10 dark:bg-black',
    columnIcon: 'fill-pink-800 dark:fill-pink-100',
    primaryCta:
      'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
    secondaryCta:
      'bg-transparent text-pink-900 ring-pink-500 hover:bg-pink-100 focus-visible:outline-pink-500 dark:text-pink-100 dark:ring-pink-800 dark:hover:bg-pink-900/30 dark:focus-visible:outline-pink-400',
    mobileDivide: 'divide-pink-700/30 dark:divide-pink/50',
    mobileHover: 'hover:bg-pink-100 dark:hover:bg-pink-900/40',
  },
  rose: {
    header: 'border-rose-300/80 dark:border-rose-800/70',
    logo: 'fill-rose-800 dark:fill-rose-500',
    chevron: 'stroke-rose-700 dark:stroke-rose-300',
    icon: 'stroke-rose-800 dark:stroke-rose-50',
    links: 'text-rose-900 dark:text-rose-100',
    description: 'text-rose-800/80 dark:text-rose-100/60',
    dropdown: 'bg-rose-50 ring-black/5 dark:bg-rose-950',
    dropdownLinks: 'bg-rose-100/80 dark:bg-white/10',
    dropdownHover: 'hover:bg-rose-200/50 dark:hover:bg-rose-900/50',
    dialogPanel: 'bg-white sm:ring-rose-900/10 dark:bg-black',
    columnIcon: 'fill-rose-800 dark:fill-rose-100',
    primaryCta:
      'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
    secondaryCta:
      'bg-transparent text-rose-900 ring-rose-500 hover:bg-rose-100 focus-visible:outline-rose-500 dark:text-rose-100 dark:ring-rose-800 dark:hover:bg-rose-900/30 dark:focus-visible:outline-rose-400',
    mobileDivide: 'divide-rose-700/30 dark:divide-rose/50',
    mobileHover: 'hover:bg-rose-100 dark:hover:bg-rose-900/40',
  },
};

function generateComponentString({
  isNextjs,
  navigation,
  primaryCta,
  secondaryCta,
  color,
  textColor,
}: {
  isNextjs: boolean;
  navigation: any[];
  primaryCta: string;
  secondaryCta: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  const navigationString = `[
  { name: '${removeHtmlTags(navigation[0].name)}', href: '#', dropdown: false },
  { name: '${removeHtmlTags(navigation[1].name)}', href: '#', dropdown: false },
  {
    name: '${removeHtmlTags(navigation[2].name)}',
    dropdown: true,
    group: [
      {
        name: '${navigation[2].group[0].name}',
        items: [
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[0].items[0].name}',
            description: '${navigation[2].group[0].items[0].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[0].items[1].name}',
            description: '${navigation[2].group[0].items[1].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[0].items[2].name}',
            description: '${navigation[2].group[0].items[2].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[0].items[3].name}',
            description: '${navigation[2].group[0].items[3].description}',
            href: '#',
          },
        ],
      },
      {
        name: '${navigation[2].group[1].name}',
        items: [
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[1].items[0].name}',
            description: '${navigation[2].group[1].items[0].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[1].items[1].name}',
            description: '${navigation[2].group[1].items[1].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[1].items[2].name}',
            description: '${navigation[2].group[1].items[2].description}',
            href: '#',
          },
          {
            icon: GroupLinkIcon,
            name: '${navigation[2].group[1].items[3].name}',
            description: '${navigation[2].group[1].items[3].description}',
            href: '#',
          },
        ],
      },
    ],
  },
];`;

  let content: string;

  const nextContent = `/*
You need to install the following package npm install @headlessui/react@latest
*/

'use client';

import Link from 'next/link';

import { useState } from 'react';
import { Dialog, Menu } from '@headlessui/react';

const navigation = ${navigationString};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b p-6 ${colors[colorKey].header}">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Logo className="h-8 w-auto ${colors[colorKey].logo}" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HamburgerIcon
              className="h-6 w-6 ${colors[colorKey].icon}"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center text-sm font-semibold leading-6 ${colors[textColorKey].links}">
                    {item.name}
                    <ChevronDownIcon className="ml-2 h-5 w-5 ${colors[colorKey].chevron}" />
                  </Menu.Button>

                  {/* DROPDOWN ITEMS */}
                  <Menu.Items className="absolute -right-20 mt-2 min-w-[600px] origin-top-right rounded-md py-4 shadow-lg ring-1 focus:outline-none ${colors[textColorKey].dropdown}">
                    <div className="grid w-full grid-cols-2 gap-6 px-4">
                      {item.group.map((group) => (
                        <div key={group.name}>
                          <p className="mb-6 block px-3.5 text-sm font-medium ${colors[textColorKey].links}">
                            {group.name}
                          </p>

                          <div className="flex flex-col gap-6">
                            {group.items.map((groupItem) => (
                              <Menu.Item
                                as="div"
                                key={groupItem.name}
                                className="flex gap-3 rounded-md px-3.5 py-2.5 ${colors[textColorKey].dropdownHover}"
                              >
                                <Link
                                  href={groupItem.href}
                                  className="flex gap-4"
                                >
                                  <div>
                                    <groupItem.icon
                                      className="h-5 w-5 ${colors[textColorKey].columnIcon}"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <span className="block text-base font-medium ${colors[textColorKey].links}">
                                      {groupItem.name}
                                    </span>
                                    <span className="text-sm leading-none ${colors[textColorKey].description}">
                                      {groupItem.description}
                                    </span>
                                  </div>
                                </Link>
                              </Menu.Item>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 ${colors[textColorKey].links}"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4">
            <Link
              href="#"
              className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </Link>

            <Link
              href="#"
              className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
            >
              ${removeHtmlTags(secondaryCta)}
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 ${colors[colorKey].dialogPanel}">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo className="h-8 w-auto ${colors[colorKey].logo}" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6 ${colors[colorKey].icon}"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* MOBILE NAVIGATION ITEMS */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y ${colors[colorKey].mobileDivide}">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${colors[textColorKey].links}">
                          {item.name}
                        </span>

                        <div>
                          {item.group.map((group) => (
                            <div key={group.name} className="mt-6">
                              <p className="mb-2 block text-sm font-medium ${colors[textColorKey].links}">
                                {group.name}
                              </p>

                              <div className="flex flex-col gap-2">
                                {group.items.map((groupItem) => (
                                  <div
                                    key={groupItem.name}
                                    className="flex gap-3 rounded-md px-2 py-2.5 ${colors[textColorKey].dropdownHover}"
                                  >
                                    <Link
                                      href={groupItem.href}
                                      className="flex items-start gap-3"
                                    >
                                      <div>
                                        <groupItem.icon
                                          className="h-5 w-5 ${colors[textColorKey].columnIcon}"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <div>
                                        <span className="block text-base font-medium ${colors[textColorKey].links}">
                                          {groupItem.name}
                                        </span>
                                        <span className="text-sm leading-none ${colors[textColorKey].description}">
                                          {groupItem.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${colors[textColorKey].links} ${colors[colorKey].mobileHover}"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-4 py-6">
                <Link
                  href="#"
                  className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
                >
                  ${primaryCta} <span aria-hidden="true">&rarr;</span>
                </Link>

                <Link
                  href="#"
                  className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
                >
                  ${secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
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
}

function HamburgerIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function XMarkIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function GroupLinkIcon(props) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}`;

  const reactContent = `/*
You need to install the following package npm install @headlessui/react@latest
*/

import React from 'react';

import { useState } from 'react';
import { Dialog, Menu } from '@headlessui/react';

const navigation = ${navigationString};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b p-6 ${colors[colorKey].header}">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Logo className="h-8 w-auto ${colors[colorKey].logo}" />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HamburgerIcon
              className="h-6 w-6 ${colors[colorKey].icon}"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center text-sm font-semibold leading-6 ${colors[textColorKey].links}">
                    {item.name}
                    <ChevronDownIcon className="ml-2 h-5 w-5 ${colors[colorKey].chevron}" />
                  </Menu.Button>

                  {/* DROPDOWN ITEMS */}
                  <Menu.Items className="absolute -right-20 mt-2 min-w-[600px] origin-top-right rounded-md py-4 shadow-lg ring-1 focus:outline-none ${colors[textColorKey].dropdown}">
                    <div className="grid w-full grid-cols-2 gap-6 px-4">
                      {item.group.map((group) => (
                        <div key={group.name}>
                          <p className="mb-6 block px-3.5 text-sm font-medium ${colors[textColorKey].links}">
                            {group.name}
                          </p>

                          <div className="flex flex-col gap-6">
                            {group.items.map((groupItem) => (
                              <Menu.Item
                                as="div"
                                key={groupItem.name}
                                className="flex gap-3 rounded-md px-3.5 py-2.5 ${colors[textColorKey].dropdownHover}"
                              >
                                <a
                                  href={groupItem.href}
                                  className="flex gap-4"
                                >
                                  <div>
                                    <groupItem.icon
                                      className="h-5 w-5 ${colors[textColorKey].columnIcon}"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <span className="block text-base font-medium ${colors[textColorKey].links}">
                                      {groupItem.name}
                                    </span>
                                    <span className="text-sm leading-none ${colors[textColorKey].description}">
                                      {groupItem.description}
                                    </span>
                                  </div>
                                </a>
                              </Menu.Item>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 ${colors[textColorKey].links}"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4">
            <a
              href="#"
              className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
            >
              ${removeHtmlTags(primaryCta)}
            </a>

            <a
              href="#"
              className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
            >
              ${removeHtmlTags(secondaryCta)}
            </a>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 ${colors[colorKey].dialogPanel}">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Logo className="h-8 w-auto ${colors[colorKey].logo}" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6 ${colors[colorKey].icon}"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* MOBILE NAVIGATION ITEMS */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y ${colors[colorKey].mobileDivide}">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${colors[textColorKey].links}">
                          {item.name}
                        </span>

                        <div>
                          {item.group.map((group) => (
                            <div key={group.name} className="mt-6">
                              <p className="mb-2 block text-sm font-medium ${colors[textColorKey].links}">
                                {group.name}
                              </p>

                              <div className="flex flex-col gap-2">
                                {group.items.map((groupItem) => (
                                  <div
                                    key={groupItem.name}
                                    className="flex gap-3 rounded-md px-2 py-2.5 ${colors[textColorKey].dropdownHover}"
                                  >
                                    <a
                                      href={groupItem.href}
                                      className="flex items-start gap-3"
                                    >
                                      <div>
                                        <groupItem.icon
                                          className="h-5 w-5 ${colors[textColorKey].columnIcon}"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <div>
                                        <span className="block text-base font-medium ${colors[textColorKey].links}">
                                          {groupItem.name}
                                        </span>
                                        <span className="text-sm leading-none ${colors[textColorKey].description}">
                                          {groupItem.description}
                                        </span>
                                      </div>
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${colors[textColorKey].links} ${colors[colorKey].mobileHover}"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-4 py-6">
                <a
                  href="#"
                  className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].primaryCta}"
                >
                  ${primaryCta} <span aria-hidden="true">&rarr;</span>
                </a>

                <a
                  href="#"
                  className="rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].secondaryCta}"
                >
                  ${secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
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
}

function HamburgerIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function XMarkIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function GroupLinkIcon(props) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
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
  const { navigation, primaryCta, secondaryCta, color, textColor } = node.props;

  const content = generateComponentString({
    isNextjs,
    navigation,
    primaryCta,
    secondaryCta,
    color,
    textColor,
  });

  importStatements.push(`import Navbar6 from './components/Navbar6';`);
  componentContent.push('<Navbar6 />');
  return zip.file('components/Navbar6.jsx', content);
}

Navbar6.craft = {
  props: {
    navigation: navigation,
    primaryCta: 'Learn more',
    secondaryCta: 'Contact',
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
