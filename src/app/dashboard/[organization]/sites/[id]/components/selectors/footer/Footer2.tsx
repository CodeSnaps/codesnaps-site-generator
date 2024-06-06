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
  categoryOne: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  categoryTwo: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
          <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path
            fillRule="nonzero"
            d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
          ></path>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export const Footer2 = ({
  addressLabel = '',
  address = '',
  contactLabel = '',
  phoneNumber = '',
  emailAddress = '',
  linksLabelOne = '',
  linksLabelTwo = '',
  navigation = {},
  navigationSocial = {},
  legal = '',
  paddingArray = ['px-6', 'pb-8', 'pt-16', 'sm:pt-24', 'lg:px-8', 'lg:pt-32'],
  marginArray = ['mx-auto'],
  maxWidth = 'max-w-7xl',
  color = 'amber',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  addressLabel?: string;
  address?: string;
  contactLabel?: string;
  phoneNumber?: string;
  emailAddress?: string;
  linksLabelOne?: string;
  linksLabelTwo?: string;
  legal?: string;
  navigation?: any;
  navigationSocial?: any;
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
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <Logo
              className={clsx('h-7 w-auto', colors[colorKey].logo)}
              alt="Company name"
            />

            <div>
              <ContentEditable
                html={addressLabel}
                onChange={(e) =>
                  setProp(
                    (props: { addressLabel: string }) =>
                      (props.addressLabel = e.target.value),
                  )
                }
                tagName="h3"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm font-semibold leading-6',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].linksLabel,
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
                tagName="p"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm leading-6',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].labelValue,
                )}
              />
            </div>

            <div>
              <ContentEditable
                html={contactLabel}
                onChange={(e) =>
                  setProp(
                    (props: { contactLabel: string }) =>
                      (props.contactLabel = e.target.value),
                  )
                }
                tagName="h3"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm font-semibold leading-6',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].linksLabel,
                )}
              />

              <p
                className={clsx(
                  'text-sm leading-6',
                  colors[textColorKey].labelValue,
                )}
              >
                <ContentEditable
                  html={phoneNumber}
                  onChange={(e) =>
                    setProp(
                      (props: { phoneNumber: string }) =>
                        (props.phoneNumber = e.target.value),
                    )
                  }
                  tagName="a"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    ' hover:underline',
                    'outline-none focus:outline-offset-4 focus:outline-primary',
                    colors[textColorKey].labelValueHover,
                  )}
                />
              </p>
              <p
                className={clsx(
                  'text-sm leading-6',
                  colors[textColorKey].labelValue,
                )}
              >
                <ContentEditable
                  html={emailAddress}
                  onChange={(e) =>
                    setProp(
                      (props: { emailAddress: string }) =>
                        (props.emailAddress = e.target.value),
                    )
                  }
                  tagName="a"
                  disabled={query.getOptions().enabled ? false : true}
                  className={clsx(
                    ' hover:underline',
                    'outline-none focus:outline-offset-4 focus:outline-primary',
                    colors[textColorKey].labelValueHover,
                  )}
                />
              </p>
            </div>

            <ul role="list" className="mt-6 flex items-center space-x-4">
              {navigationSocial.map((item: any) => (
                <li key={item.name}>
                  <a
                    className={clsx('flex items-center', colors[colorKey].icon)}
                  >
                    <span className="sr-only">{item.name}</span>
                    {item.name === 'Facebook' && (
                      <FacebookLogo className="h-6 w-6" aria-hidden="true" />
                    )}
                    {item.name === 'Instagram' && (
                      <InstagramLogo className="h-6 w-6" aria-hidden="true" />
                    )}
                    {item.name === 'X' && (
                      <XLogo className="h-6 w-6" aria-hidden="true" />
                    )}
                    {item.name === 'LinkedIn' && (
                      <LinkedInLogo className="h-6 w-6" aria-hidden="true" />
                    )}
                    {item.name === 'YouTube' && (
                      <YouTubeLogo className="h-6 w-6" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 md:grid md:grid-cols-2 md:gap-8 xl:mt-0">
            <div className="xl:ml-auto">
              <ContentEditable
                html={linksLabelOne}
                onChange={(e) =>
                  setProp(
                    (props: { linksLabelOne: string }) =>
                      (props.linksLabelOne = e.target.value),
                  )
                }
                tagName="h3"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm font-semibold leading-6',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].linksLabel,
                )}
              />

              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <ContentEditable
                    html={navigation.categoryOne[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryOne[0].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryOne[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryOne[1].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryOne[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryOne[2].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryOne[3].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryOne[3].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>
              </ul>
            </div>

            <div className="mt-10 md:mt-0 xl:ml-auto">
              <ContentEditable
                html={linksLabelTwo}
                onChange={(e) =>
                  setProp(
                    (props: { linksLabelTwo: string }) =>
                      (props.linksLabelTwo = e.target.value),
                  )
                }
                tagName="h3"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm font-semibold leading-6',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].linksLabel,
                )}
              />

              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <ContentEditable
                    html={navigation.categoryTwo[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryTwo[0].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryTwo[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryTwo[1].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryTwo[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryTwo[2].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>

                <li>
                  <ContentEditable
                    html={navigation.categoryTwo[3].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryTwo[3].name = e.target.value;
                      });
                    }}
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'text-sm leading-6',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[textColorKey].links,
                    )}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'mt-16 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end lg:mt-24',
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
                setProp((props: any) => {
                  props.navigation.legal[0].name = e.target.value;
                })
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
                setProp((props: any) => {
                  props.navigation.legal[1].name = e.target.value;
                })
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
                setProp((props: any) => {
                  props.navigation.legal[2].name = e.target.value;
                })
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

function FacebookLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
      <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
    </svg>
  );
}

function LinkedInLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="nonzero"
        d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
      ></path>
    </svg>
  );
}

function YouTubeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={true}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/footer_2-1699473756826.webp"
      name="Footer 2"
      Component={Footer2}
    />
  );
}

function ToolbarSettings() {
  const {
    addressLabel,
    address,
    contactLabel,
    phoneNumber,
    emailAddress,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    addressLabel: node.data.props.addressLabel,
    address: node.data.props.address,
    contactLabel: node.data.props.contactLabel,
    phoneNumber: node.data.props.phoneNumber,
    emailAddress: node.data.props.emailAddress,
    navigation: node.data.props.navigation,
    linksLabelOne: node.data.props.linksLabelOne,
    linksLabelTwo: node.data.props.linksLabelTwo,
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
                  addressLabel,
                  address,
                  contactLabel,
                  phoneNumber,
                  emailAddress,
                  navigation,
                  linksLabelOne,
                  linksLabelTwo,
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
                  addressLabel,
                  address,
                  contactLabel,
                  phoneNumber,
                  emailAddress,
                  navigation,
                  linksLabelOne,
                  linksLabelTwo,
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
    labelValue: string;
    linksLabel: string;
    labelValueHover: string;
    links: string;
    icon: string;
    legal: string;
    legalLink: string;
    border: string;
  };
}

const colors: ColorObject = {
  slate: {
    logo: 'fill-slate-950 dark:fill-white',
    linksLabel: 'text-slate-900 dark:text-slate-200',
    labelValue: 'text-slate-600 dark:text-slate-400',
    labelValueHover: 'hover:text-slate-700 dark:hover:text-slate-300',
    links:
      'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
    icon: 'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
    legal: 'text-slate-500 dark:text-slate-400',
    legalLink:
      'text-slate-500 underline hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
    border: 'border-slate-900/10 dark:border-white/20',
  },
  gray: {
    logo: 'fill-gray-950 dark:fill-white',
    linksLabel: 'text-gray-900 dark:text-gray-200',
    labelValue: 'text-gray-600 dark:text-gray-400',
    labelValueHover: 'hover:text-gray-700 dark:hover:text-gray-300',
    links:
      'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
    icon: 'text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
    legal: 'text-gray-500 dark:text-gray-400',
    legalLink:
      'text-gray-500 underline hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
    border: 'border-gray-900/10 dark:border-white/20',
  },
  zinc: {
    logo: 'fill-zinc-950 dark:fill-white',
    linksLabel: 'text-zinc-900 dark:text-zinc-200',
    labelValue: 'text-zinc-600 dark:text-zinc-400',
    labelValueHover: 'hover:text-zinc-700 dark:hover:text-zinc-300',
    links:
      'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
    icon: 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
    legal: 'text-zinc-500 dark:text-zinc-400',
    legalLink:
      'text-zinc-500 underline hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300',
    border: 'border-zinc-900/10 dark:border-white/20',
  },
  neutral: {
    logo: 'fill-neutral-950 dark:fill-white',
    linksLabel: 'text-neutral-900 dark:text-neutral-200',
    labelValue: 'text-neutral-600 dark:text-neutral-400',
    labelValueHover: 'hover:text-neutral-700 dark:hover:text-neutral-300',
    links:
      'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
    icon: 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
    legal: 'text-neutral-500 dark:text-neutral-400',
    legalLink:
      'text-neutral-500 underline hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300',
    border: 'border-neutral-900/10 dark:border-white/20',
  },
  stone: {
    logo: 'fill-stone-950 dark:fill-white',
    linksLabel: 'text-stone-900 dark:text-stone-200',
    labelValue: 'text-stone-600 dark:text-stone-400',
    labelValueHover: 'hover:text-stone-700 dark:hover:text-stone-300',
    links:
      'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300',
    icon: 'text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300',
    legal: 'text-stone-500 dark:text-stone-400',
    legalLink:
      'text-stone-500 underline hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300',
    border: 'border-stone-900/10 dark:border-white/20',
  },
  red: {
    logo: 'fill-red-800 dark:fill-red-500',
    linksLabel: 'text-red-900 dark:text-red-100',
    labelValue: 'text-red-950/70 dark:text-red-100/70',
    labelValueHover: 'hover:text-red-700 dark:hover:text-red-300',
    links: 'text-red-950/70 dark:text-red-50/70',
    icon: 'text-red-700 hover:text-red-800 dark:text-red-600/60 dark:hover:text-red-700',
    legal: 'text-red-800/70 dark:text-red-200/60',
    legalLink:
      'text-red-800/70 underline hover:text-red-600 dark:text-red-200/60 dark:hover:text-red-400',
    border: 'border-red-900/10 dark:border-white/20',
  },
  orange: {
    logo: 'fill-orange-800 dark:fill-orange-500',
    linksLabel: 'text-orange-900 dark:text-orange-100',
    labelValue: 'text-orange-950/70 dark:text-orange-100/70',
    labelValueHover: 'hover:text-orange-700 dark:hover:text-orange-300',
    links: 'text-orange-950/70 dark:text-orange-50/70',
    icon: 'text-orange-700 hover:text-orange-800 dark:text-orange-600/60 dark:hover:text-orange-700',
    legal: 'text-orange-800/70 dark:text-orange-200/60',
    legalLink:
      'text-orange-800/70 underline hover:text-orange-600 dark:text-orange-200/60 dark:hover:text-orange-400',
    border: 'border-orange-900/10 dark:border-white/20',
  },
  amber: {
    logo: 'fill-amber-800 dark:fill-amber-500',
    linksLabel: 'text-amber-900 dark:text-amber-100',
    labelValue: 'text-amber-950/70 dark:text-amber-100/70',
    labelValueHover: 'hover:text-amber-700 dark:hover:text-amber-300',
    links: 'text-amber-950/70 dark:text-amber-50/70',
    icon: 'text-amber-700 hover:text-amber-800 dark:text-amber-600/60 dark:hover:text-amber-700',
    legal: 'text-amber-800/70 dark:text-amber-200/60',
    legalLink:
      'text-amber-800/70 underline hover:text-amber-600 dark:text-amber-200/60 dark:hover:text-amber-400',
    border: 'border-amber-900/10 dark:border-white/20',
  },
  yellow: {
    logo: 'fill-yellow-800 dark:fill-yellow-500',
    linksLabel: 'text-yellow-900 dark:text-yellow-100',
    labelValue: 'text-yellow-950/70 dark:text-yellow-100/70',
    labelValueHover: 'hover:text-yellow-700 dark:hover:text-yellow-300',
    links: 'text-yellow-950/70 dark:text-yellow-50/70',
    icon: 'text-yellow-700 hover:text-yellow-800 dark:text-yellow-600/60 dark:hover:text-yellow-700',
    legal: 'text-yellow-800/70 dark:text-yellow-200/60',
    legalLink:
      'text-yellow-800/70 underline hover:text-yellow-600 dark:text-yellow-200/60 dark:hover:text-yellow-400',
    border: 'border-yellow-900/10 dark:border-white/20',
  },
  lime: {
    logo: 'fill-lime-800 dark:fill-lime-500',
    linksLabel: 'text-lime-900 dark:text-lime-100',
    labelValue: 'text-lime-950/70 dark:text-lime-100/70',
    labelValueHover: 'hover:text-lime-700 dark:hover:text-lime-300',
    links: 'text-lime-950/70 dark:text-lime-50/70',
    icon: 'text-lime-700 hover:text-lime-800 dark:text-lime-600/60 dark:hover:text-lime-700',
    legal: 'text-lime-800/70 dark:text-lime-200/60',
    legalLink:
      'text-lime-800/70 underline hover:text-lime-600 dark:text-lime-200/60 dark:hover:text-lime-400',
    border: 'border-lime-900/10 dark:border-white/20',
  },
  green: {
    logo: 'fill-green-800 dark:fill-green-500',
    linksLabel: 'text-green-900 dark:text-green-100',
    labelValue: 'text-green-950/70 dark:text-green-100/70',
    labelValueHover: 'hover:text-green-700 dark:hover:text-green-300',
    links: 'text-green-950/70 dark:text-green-50/70',
    icon: 'text-green-700 hover:text-green-800 dark:text-green-600/60 dark:hover:text-green-700',
    legal: 'text-green-800/70 dark:text-green-200/60',
    legalLink:
      'text-green-800/70 underline hover:text-green-600 dark:text-green-200/60 dark:hover:text-green-400',
    border: 'border-green-900/10 dark:border-white/20',
  },
  emerald: {
    logo: 'fill-emerald-800 dark:fill-emerald-500',
    linksLabel: 'text-emerald-900 dark:text-emerald-100',
    labelValue: 'text-emerald-950/70 dark:text-emerald-100/70',
    labelValueHover: 'hover:text-emerald-700 dark:hover:text-emerald-300',
    links: 'text-emerald-950/70 dark:text-emerald-50/70',
    icon: 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-600/60 dark:hover:text-emerald-700',
    legal: 'text-emerald-800/70 dark:text-emerald-200/60',
    legalLink:
      'text-emerald-800/70 underline hover:text-emerald-600 dark:text-emerald-200/60 dark:hover:text-emerald-400',
    border: 'border-emerald-900/10 dark:border-white/20',
  },
  teal: {
    logo: 'fill-teal-800 dark:fill-teal-500',
    linksLabel: 'text-teal-900 dark:text-teal-100',
    labelValue: 'text-teal-950/70 dark:text-teal-100/70',
    labelValueHover: 'hover:text-teal-700 dark:hover:text-teal-300',
    links: 'text-teal-950/70 dark:text-teal-50/70',
    icon: 'text-teal-700 hover:text-teal-800 dark:text-teal-600/60 dark:hover:text-teal-700',
    legal: 'text-teal-800/70 dark:text-teal-200/60',
    legalLink:
      'text-teal-800/70 underline hover:text-teal-600 dark:text-teal-200/60 dark:hover:text-teal-400',
    border: 'border-teal-900/10 dark:border-white/20',
  },
  cyan: {
    logo: 'fill-cyan-800 dark:fill-cyan-500',
    linksLabel: 'text-cyan-900 dark:text-cyan-100',
    labelValue: 'text-cyan-950/70 dark:text-cyan-100/70',
    labelValueHover: 'hover:text-cyan-700 dark:hover:text-cyan-300',
    links: 'text-cyan-950/70 dark:text-cyan-50/70',
    icon: 'text-cyan-700 hover:text-cyan-800 dark:text-cyan-600/60 dark:hover:text-cyan-700',
    legal: 'text-cyan-800/70 dark:text-cyan-200/60',
    legalLink:
      'text-cyan-800/70 underline hover:text-cyan-600 dark:text-cyan-200/60 dark:hover:text-cyan-400',
    border: 'border-cyan-900/10 dark:border-white/20',
  },
  sky: {
    logo: 'fill-sky-800 dark:fill-sky-500',
    linksLabel: 'text-sky-900 dark:text-sky-100',
    labelValue: 'text-sky-950/70 dark:text-sky-100/70',
    labelValueHover: 'hover:text-sky-700 dark:hover:text-sky-300',
    links: 'text-sky-950/70 dark:text-sky-50/70',
    icon: 'text-sky-700 hover:text-sky-800 dark:text-sky-600/60 dark:hover:text-sky-700',
    legal: 'text-sky-800/70 dark:text-sky-200/60',
    legalLink:
      'text-sky-800/70 underline hover:text-sky-600 dark:text-sky-200/60 dark:hover:text-sky-400',
    border: 'border-sky-900/10 dark:border-white/20',
  },
  blue: {
    logo: 'fill-blue-800 dark:fill-blue-500',
    linksLabel: 'text-blue-900 dark:text-blue-100',
    labelValue: 'text-blue-950/70 dark:text-blue-100/70',
    labelValueHover: 'hover:text-blue-700 dark:hover:text-blue-300',
    links: 'text-blue-950/70 dark:text-blue-50/70',
    icon: 'text-blue-700 hover:text-blue-800 dark:text-blue-600/60 dark:hover:text-blue-700',
    legal: 'text-blue-800/70 dark:text-blue-200/60',
    legalLink:
      'text-blue-800/70 underline hover:text-blue-600 dark:text-blue-200/60 dark:hover:text-blue-400',
    border: 'border-blue-900/10 dark:border-white/20',
  },
  indigo: {
    logo: 'fill-indigo-800 dark:fill-indigo-500',
    linksLabel: 'text-indigo-900 dark:text-indigo-100',
    labelValue: 'text-indigo-950/70 dark:text-indigo-100/70',
    labelValueHover: 'hover:text-indigo-700 dark:hover:text-indigo-300',
    links: 'text-indigo-950/70 dark:text-indigo-50/70',
    icon: 'text-indigo-700 hover:text-indigo-800 dark:text-indigo-600/60 dark:hover:text-indigo-700',
    legal: 'text-indigo-800/70 dark:text-indigo-200/60',
    legalLink:
      'text-indigo-800/70 underline hover:text-indigo-600 dark:text-indigo-200/60 dark:hover:text-indigo-400',
    border: 'border-indigo-900/10 dark:border-white/20',
  },
  violet: {
    logo: 'fill-violet-800 dark:fill-violet-500',
    linksLabel: 'text-violet-900 dark:text-violet-100',
    labelValue: 'text-violet-950/70 dark:text-violet-100/70',
    labelValueHover: 'hover:text-violet-700 dark:hover:text-violet-300',
    links: 'text-violet-950/70 dark:text-violet-50/70',
    icon: 'text-violet-700 hover:text-violet-800 dark:text-violet-600/60 dark:hover:text-violet-700',
    legal: 'text-violet-800/70 dark:text-violet-200/60',
    legalLink:
      'text-violet-800/70 underline hover:text-violet-600 dark:text-violet-200/60 dark:hover:text-violet-400',
    border: 'border-violet-900/10 dark:border-white/20',
  },
  purple: {
    logo: 'fill-purple-800 dark:fill-purple-500',
    linksLabel: 'text-purple-900 dark:text-purple-100',
    labelValue: 'text-purple-950/70 dark:text-purple-100/70',
    labelValueHover: 'hover:text-purple-700 dark:hover:text-purple-300',
    links: 'text-purple-950/70 dark:text-purple-50/70',
    icon: 'text-purple-700 hover:text-purple-800 dark:text-purple-600/60 dark:hover:text-purple-700',
    legal: 'text-purple-800/70 dark:text-purple-200/60',
    legalLink:
      'text-purple-800/70 underline hover:text-purple-600 dark:text-purple-200/60 dark:hover:text-purple-400',
    border: 'border-purple-900/10 dark:border-white/20',
  },
  fuchsia: {
    logo: 'fill-fuchsia-800 dark:fill-fuchsia-500',
    linksLabel: 'text-fuchsia-900 dark:text-fuchsia-100',
    labelValue: 'text-fuchsia-950/70 dark:text-fuchsia-100/70',
    labelValueHover: 'hover:text-fuchsia-700 dark:hover:text-fuchsia-300',
    links: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    icon: 'text-fuchsia-700 hover:text-fuchsia-800 dark:text-fuchsia-600/60 dark:hover:text-fuchsia-700',
    legal: 'text-fuchsia-800/70 dark:text-fuchsia-200/60',
    legalLink:
      'text-fuchsia-800/70 underline hover:text-fuchsia-600 dark:text-fuchsia-200/60 dark:hover:text-fuchsia-400',
    border: 'border-fuchsia-900/10 dark:border-white/20',
  },
  pink: {
    logo: 'fill-pink-800 dark:fill-pink-500',
    linksLabel: 'text-pink-900 dark:text-pink-100',
    labelValue: 'text-pink-950/70 dark:text-pink-100/70',
    labelValueHover: 'hover:text-pink-700 dark:hover:text-pink-300',
    links: 'text-pink-950/70 dark:text-pink-50/70',
    icon: 'text-pink-700 hover:text-pink-800 dark:text-pink-600/60 dark:hover:text-pink-700',
    legal: 'text-pink-800/70 dark:text-pink-200/60',
    legalLink:
      'text-pink-800/70 underline hover:text-pink-600 dark:text-pink-200/60 dark:hover:text-pink-400',
    border: 'border-pink-900/10 dark:border-white/20',
  },
  rose: {
    logo: 'fill-rose-800 dark:fill-rose-500',
    linksLabel: 'text-rose-900 dark:text-rose-100',
    labelValue: 'text-rose-950/70 dark:text-rose-100/70',
    labelValueHover: 'hover:text-rose-700 dark:hover:text-rose-300',
    links: 'text-rose-950/70 dark:text-rose-50/70',
    icon: 'text-rose-700 hover:text-rose-800 dark:text-rose-600/60 dark:hover:text-rose-700',
    legal: 'text-rose-800/70 dark:text-rose-200/60',
    legalLink:
      'text-rose-800/70 underline hover:text-rose-600 dark:text-rose-200/60 dark:hover:text-rose-400',
    border: 'border-rose-900/10 dark:border-white/20',
  },
};

function generateComponentString({
  isNextjs,
  addressLabel,
  address,
  contactLabel,
  phoneNumber,
  emailAddress,
  navigation,
  linksLabelOne,
  linksLabelTwo,
  legal,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  addressLabel: string;
  address: string;
  contactLabel: string;
  phoneNumber: string;
  emailAddress: string;
  navigation: any;
  linksLabelOne: string;
  linksLabelTwo: string;
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
  categoryOne: [
    { name: '${removeHtmlTags(navigation.categoryOne[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryOne[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryOne[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryOne[3].name)}', href: '#' },
  ],
  categoryTwo: [
    { name: '${removeHtmlTags(navigation.categoryTwo[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryTwo[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryTwo[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryTwo[3].name)}', href: '#' },
  ],
  legal: [
    { name: '${removeHtmlTags(navigation.legal[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.legal[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.legal[2].name)}', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 300 271" {...props}>
          <path d="M236 0h46L181 115l118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123L-1.1 0h94.9l65.5 86.6L236 0zm-16.1 244h25.5L80.4 26H53l166.9 218z"></path>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path
            fillRule="nonzero"
            d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
          ></path>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
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
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <Logo
              className="h-7 w-auto ${colors[colorKey].logo}"
              alt="Company name"
            />

            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(addressLabel)}
              </h3>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                ${removeHtmlTags(address)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(contactLabel)}
              </h3>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                <Link
                  href="tel:${removeHtmlTags(phoneNumber)}"
                  className="hover:underline ${colors[textColorKey].labelValueHover}"
                >
                  ${removeHtmlTags(phoneNumber)}
                </Link>
              </p>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                <Link
                  href="mailto:${removeHtmlTags(emailAddress)}"
                  className="hover:underline ${colors[textColorKey].labelValueHover}"
                >
                  ${removeHtmlTags(emailAddress)}
                </Link>
              </p>
            </div>

            <ul role="list" className="mt-6 flex items-center space-x-4">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center ${colors[colorKey].icon}"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 md:grid md:grid-cols-2 md:gap-8 xl:mt-0">
            <div className="xl:ml-auto">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelOne)}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 md:mt-0 xl:ml-auto">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelTwo)}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end lg:mt-24 ${colors[colorKey].border}">
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
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <Logo
              className="h-7 w-auto ${colors[colorKey].logo}"
              alt="Company name"
            />

            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(addressLabel)}
              </h3>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                ${removeHtmlTags(address)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(contactLabel)}
              </h3>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                <Link
                  href="tel:${removeHtmlTags(phoneNumber)}"
                  className="hover:underline ${colors[textColorKey].labelValueHover}"
                >
                  ${removeHtmlTags(phoneNumber)}
                </Link>
              </p>
              <p className="text-sm leading-6 ${colors[textColorKey].labelValue}">
                <Link
                  href="mailto:${removeHtmlTags(emailAddress)}"
                  className="hover:underline ${colors[textColorKey].labelValueHover}"
                >
                  ${removeHtmlTags(emailAddress)}
                </Link>
              </p>
            </div>

            <ul role="list" className="mt-6 flex items-center space-x-4">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center ${colors[colorKey].icon}"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 md:grid md:grid-cols-2 md:gap-8 xl:mt-0">
            <div className="xl:ml-auto">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelOne)}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 md:mt-0 xl:ml-auto">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelTwo)}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end lg:mt-24 ${colors[colorKey].border}">
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
    addressLabel,
    address,
    contactLabel,
    phoneNumber,
    emailAddress,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    addressLabel,
    address,
    contactLabel,
    phoneNumber,
    emailAddress,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Footer2 from './components/Footer2';`);
  componentContent.push('<Footer2 />');
  return zip.file('components/Footer2.jsx', content);
}

Footer2.craft = {
  props: {
    addressLabel: 'Address',
    address: '1234 North 1st Street, San Francisco, CA 94102',
    contactLabel: 'Contact',
    phoneNumber: '+1 (555) 555-5555',
    emailAddress: 'info@codesnaps.io',
    linksLabelOne: 'Company',
    linksLabelTwo: 'Support',
    legal: '&copy; 2020 Your Company, Inc. All rights reserved.',
    navigation: navigation,
    navigationSocial: navigation.social,
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
