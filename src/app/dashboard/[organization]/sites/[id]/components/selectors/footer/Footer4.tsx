'use client';

import _ from 'lodash';
import clsx from 'clsx';
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
  categoryThree: [
    { name: 'Features', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Examples', href: '#' },
  ],
  categoryFour: [
    { name: 'Mac', href: '#' },
    { name: 'Windows', href: '#' },
    { name: 'Linux', href: '#' },
    { name: 'Chrome', href: '#' },
  ],
  social: [
    { name: 'YouTube', href: '#' },
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Facebook', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

export const Footer4 = ({
  newsletterHeading = '',
  newsletterSignUpSubtitle = '',
  newsletterSignUpCTA = '',
  newsletterDisclaimerPart1 = '',
  newsletterDisclaimerPrivatePolicy = '',
  newsletterDisclaimerPart2 = '',
  navigation = {},
  linksLabelOne = '',
  linksLabelTwo = '',
  linksLabelThree = '',
  linksLabelFour = '',
  socialLinksLabel = '',
  legalLinksLabel = '',
  legal = '',
  paddingArray = ['px-6', 'pb-8', 'pt-16', 'sm:pt-24', 'lg:px-8', 'lg:pt-32'],
  marginArray = ['mx-auto'],
  maxWidth = 'max-w-7xl',
  color = 'neutral',
  textColor = 'neutral',
  isBeingDragged = false,
}: {
  newsletterHeading?: string;
  newsletterSignUpSubtitle?: string;
  newsletterSignUpCTA?: string;
  newsletterDisclaimerPart1?: string;
  newsletterDisclaimerPrivatePolicy?: string;
  newsletterDisclaimerPart2?: string;
  navigation?: any;
  navigationSocial?: any;
  linksLabelOne?: string;
  linksLabelTwo?: string;
  linksLabelThree?: string;
  linksLabelFour?: string;
  socialLinksLabel?: string;
  legalLinksLabel?: string;
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
        ref={(ref) => connect(drag(ref as HTMLElement))}
      >
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-14">
          <div>
            <ContentEditable
              html={newsletterHeading}
              onChange={(e) =>
                setProp(
                  (props: { newsletterCategoryLabel: string }) =>
                    (props.newsletterCategoryLabel = e.target.value),
                )
              }
              tagName="h3"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-lg font-semibold leading-6',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].linksLabel,
              )}
            />

            <ContentEditable
              html={newsletterSignUpSubtitle}
              onChange={(e) =>
                setProp(
                  (props: { newsletterSignUpSubtitle: string }) =>
                    (props.newsletterSignUpSubtitle = e.target.value),
                )
              }
              tagName="p"
              disabled={query.getOptions().enabled ? false : true}
              className={clsx(
                'text-base',
                'outline-none focus:outline-offset-4 focus:outline-primary',
                colors[textColorKey].newsletterHeading,
              )}
            />
          </div>

          <div className="flex max-w-xs flex-col gap-3 sm:max-w-lg">
            <div className="flex items-start gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={clsx(
                  'min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                  colors[colorKey].input,
                )}
                placeholder="Enter your email"
              />

              <ContentEditable
                html={newsletterSignUpCTA}
                onChange={(e) =>
                  setProp(
                    (props: { newsletterSignUpCTA: string }) =>
                      (props.newsletterSignUpCTA = e.target.value),
                  )
                }
                tagName="button"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  'outline-none',
                  colors[colorKey].cta,
                )}
              />
            </div>

            <div>
              <ContentEditable
                html={newsletterDisclaimerPart1}
                onChange={(e) =>
                  setProp(
                    (props: { newsletterDisclaimerPart1: string }) =>
                      (props.newsletterDisclaimerPart1 = e.target.value),
                  )
                }
                tagName="span"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'max-w-md text-sm',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].disclaimer,
                )}
              />{' '}
              <ContentEditable
                html={newsletterDisclaimerPrivatePolicy}
                onChange={(e) =>
                  setProp(
                    (props: { newsletterDisclaimerPrivatePolicy: string }) =>
                      (props.newsletterDisclaimerPrivatePolicy =
                        e.target.value),
                  )
                }
                tagName="a"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'text-sm underline',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].disclaimer,
                )}
              />{' '}
              <ContentEditable
                html={newsletterDisclaimerPart2}
                onChange={(e) =>
                  setProp(
                    (props: { newsletterDisclaimerPart2: string }) =>
                      (props.newsletterDisclaimerPart2 = e.target.value),
                  )
                }
                tagName="span"
                disabled={query.getOptions().enabled ? false : true}
                className={clsx(
                  'max-w-md text-sm',
                  'outline-none focus:outline-offset-4 focus:outline-primary',
                  colors[textColorKey].disclaimer,
                )}
              />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'mt-10 border-t pt-8 md:gap-14 md:pt-10',
            colors[colorKey].border,
          )}
        >
          <div className="grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:grid-cols-6 xl:gap-20">
            <div>
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
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

            <div>
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
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

            <div>
              <ContentEditable
                html={linksLabelThree}
                onChange={(e) =>
                  setProp(
                    (props: { linksLabelThree: string }) =>
                      (props.linksLabelThree = e.target.value),
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                <li>
                  <ContentEditable
                    html={navigation.categoryThree[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryThree[0].name = e.target.value;
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
                    html={navigation.categoryThree[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryThree[1].name = e.target.value;
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
                    html={navigation.categoryThree[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryThree[2].name = e.target.value;
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
                    html={navigation.categoryThree[3].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryThree[3].name = e.target.value;
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

            <div>
              <ContentEditable
                html={linksLabelFour}
                onChange={(e) =>
                  setProp(
                    (props: { linksLabelFour: string }) =>
                      (props.linksLabelFour = e.target.value),
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                <li>
                  <ContentEditable
                    html={navigation.categoryFour[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryFour[0].name = e.target.value;
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
                    html={navigation.categoryFour[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryFour[1].name = e.target.value;
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
                    html={navigation.categoryFour[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryFour[2].name = e.target.value;
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
                    html={navigation.categoryFour[3].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.categoryFour[3].name = e.target.value;
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

            <div>
              <ContentEditable
                html={socialLinksLabel}
                onChange={(e) =>
                  setProp(
                    (props: { socialLinksLabel: string }) =>
                      (props.socialLinksLabel = e.target.value),
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                <li>
                  <ContentEditable
                    html={navigation.social[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.social[0].name = e.target.value;
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
                    html={navigation.social[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.social[1].name = e.target.value;
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
                    html={navigation.social[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.social[2].name = e.target.value;
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
                    html={navigation.social[3].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.social[3].name = e.target.value;
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

            <div>
              <ContentEditable
                html={legalLinksLabel}
                onChange={(e) =>
                  setProp(
                    (props: { legalLinksLabel: string }) =>
                      (props.legalLinksLabel = e.target.value),
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
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                <li>
                  <ContentEditable
                    html={navigation.legal[0].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.legal[0].name = e.target.value;
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
                    html={navigation.legal[1].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.legal[1].name = e.target.value;
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
                    html={navigation.legal[2].name}
                    onChange={(e) => {
                      setProp((props: any) => {
                        props.navigation.legal[2].name = e.target.value;
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
            'mt-10 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end',
            colors[colorKey].border,
          )}
        >
          <div>
            <Logo
              className={clsx('h-7 w-auto', colors[colorKey].logo)}
              alt="Company name"
            />
          </div>

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
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/footer4-1700069944218.webp"
      name="Footer 4"
      Component={Footer4}
    />
  );
}

function ToolbarSettings() {
  const {
    newsletterHeading,
    newsletterSignUpSubtitle,
    newsletterSignUpCTA,
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    linksLabelThree,
    linksLabelFour,
    socialLinksLabel,
    legalLinksLabel,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
    name,
  } = useNode((node) => ({
    newsletterHeading: node.data.props.newsletterHeading,
    newsletterSignUpSubtitle: node.data.props.newsletterSignUpSubtitle,
    newsletterSignUpCTA: node.data.props.newsletterSignUpCTA,
    newsletterDisclaimerPart1: node.data.props.newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy:
      node.data.props.newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2: node.data.props.newsletterDisclaimerPart2,
    navigation: node.data.props.navigation,
    linksLabelOne: node.data.props.linksLabelOne,
    linksLabelTwo: node.data.props.linksLabelTwo,
    linksLabelThree: node.data.props.linksLabelThree,
    linksLabelFour: node.data.props.linksLabelFour,
    socialLinksLabel: node.data.props.socialLinksLabel,
    legalLinksLabel: node.data.props.legalLinksLabel,
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
                  newsletterHeading,
                  newsletterSignUpSubtitle,
                  newsletterSignUpCTA,
                  newsletterDisclaimerPart1,
                  newsletterDisclaimerPrivatePolicy,
                  newsletterDisclaimerPart2,
                  navigation,
                  linksLabelOne,
                  linksLabelTwo,
                  linksLabelThree,
                  linksLabelFour,
                  socialLinksLabel,
                  legalLinksLabel,
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
                  newsletterHeading,
                  newsletterSignUpSubtitle,
                  newsletterSignUpCTA,
                  newsletterDisclaimerPart1,
                  newsletterDisclaimerPrivatePolicy,
                  newsletterDisclaimerPart2,
                  navigation,
                  linksLabelOne,
                  linksLabelTwo,
                  linksLabelThree,
                  linksLabelFour,
                  socialLinksLabel,
                  legalLinksLabel,
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
    newsletterHeading: string;
    input: string;
    cta: string;
    disclaimer: string;
    linksLabel: string;
    links: string;
    iconLabel: string;
    legal: string;
    legalLink: string;
    border: string;
    icon: string;
  };
}

const colors: ColorObject = {
  slate: {
    logo: 'fill-slate-950 dark:fill-white',
    newsletterHeading: 'text-slate-600 dark:text-slate-400',
    input:
      'bg-white text-slate-900 ring-slate-200 focus:ring-slate-500 dark:bg-white/5 dark:text-white',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
    disclaimer: 'text-slate-500',
    linksLabel: 'text-slate-900 dark:text-slate-200',
    links:
      'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
    iconLabel:
      'text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300',
    legal: 'text-slate-500 dark:text-slate-400',
    legalLink:
      'text-slate-500 underline hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
    border: 'border-slate-900/10 dark:border-white/20',
    icon: 'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
  },
  gray: {
    logo: 'fill-gray-950 dark:fill-white',
    newsletterHeading: 'text-gray-600 dark:text-gray-400',
    input:
      'bg-white text-gray-900 ring-gray-200 focus:ring-gray-500 dark:bg-white/5 dark:text-white',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
    disclaimer: 'text-gray-500',
    linksLabel: 'text-gray-900 dark:text-gray-200',
    links:
      'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
    iconLabel:
      'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-300',
    legal: 'text-gray-500 dark:text-gray-400',
    legalLink:
      'text-gray-500 underline hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
    border: 'border-gray-900/10 dark:border-white/20',
    icon: 'text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
  },
  zinc: {
    logo: 'fill-zinc-950 dark:fill-white',
    newsletterHeading: 'text-zinc-600 dark:text-zinc-400',
    input:
      'bg-white text-zinc-900 ring-zinc-200 focus:ring-zinc-500 dark:bg-white/5 dark:text-white',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
    disclaimer: 'text-zinc-500',
    linksLabel: 'text-zinc-900 dark:text-zinc-200',
    links:
      'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
    iconLabel:
      'text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-300',
    legal: 'text-zinc-500 dark:text-zinc-400',
    legalLink:
      'text-zinc-500 underline hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300',
    border: 'border-zinc-900/10 dark:border-white/20',
    icon: 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
  },
  neutral: {
    logo: 'fill-neutral-950 dark:fill-white',
    newsletterHeading: 'text-neutral-600 dark:text-neutral-400',
    input:
      'bg-white text-neutral-900 ring-neutral-200 focus:ring-neutral-500 dark:bg-white/5 dark:text-white',
    cta: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
    disclaimer: 'text-neutral-500',
    linksLabel: 'text-neutral-900 dark:text-neutral-200',
    links:
      'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
    iconLabel:
      'text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-300',
    legal: 'text-neutral-500 dark:text-neutral-400',
    legalLink:
      'text-neutral-500 underline hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300',
    border: 'border-neutral-900/10 dark:border-white/20',
    icon: 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300',
  },
  stone: {
    logo: 'fill-stone-950 dark:fill-white',
    newsletterHeading: 'text-stone-600 dark:text-stone-400',
    input:
      'bg-white text-stone-900 ring-stone-200 focus:ring-stone-500 dark:bg-white/5 dark:text-white',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
    disclaimer: 'text-stone-500',
    linksLabel: 'text-stone-900 dark:text-stone-200',
    links:
      'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300',
    iconLabel:
      'text-stone-600 group-hover:text-stone-900 dark:text-stone-400 dark:group-hover:text-stone-300',
    legal: 'text-stone-500 dark:text-stone-400',
    legalLink:
      'text-stone-500 underline hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300',
    border: 'border-stone-900/10 dark:border-white/20',
    icon: 'text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300',
  },
  red: {
    logo: 'fill-red-800 dark:fill-red-500',
    newsletterHeading: 'text-red-600 dark:text-red-400/80',
    input:
      'bg-white text-red-900 ring-red-400 focus:ring-red-600 dark:bg-white/5 dark:text-white dark:ring-red-500',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:text-white dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
    disclaimer: 'text-red-950/70 dark:text-red-50/40',
    linksLabel: 'text-red-900 dark:text-red-50',
    links: 'text-red-950/70 dark:text-red-50/70',
    iconLabel:
      'text-red-700 group-hover:text-red-900 dark:text-red-200 dark:group-hover:text-red-400',
    legal: 'text-red-800/70 dark:text-red-200/60',
    legalLink:
      'text-red-800/70 underline hover:text-red-600 dark:text-red-200/60 dark:hover:text-red-400',
    border: 'border-red-900/10 dark:border-white/20',
    icon: 'text-red-700 hover:text-red-800 dark:text-red-600/60 dark:hover:text-red-700',
  },
  orange: {
    logo: 'fill-orange-800 dark:fill-orange-500',
    newsletterHeading: 'text-orange-600 dark:text-orange-400/80',
    input:
      'bg-white text-orange-900 ring-orange-400 focus:ring-orange-600 dark:bg-white/5 dark:text-white dark:ring-orange-500',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:text-white dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
    disclaimer: 'text-orange-950/70 dark:text-orange-50/40',
    linksLabel: 'text-orange-900 dark:text-orange-50',
    links: 'text-orange-950/70 dark:text-orange-50/70',
    iconLabel:
      'text-orange-700 group-hover:text-orange-900 dark:text-orange-200 dark:group-hover:text-orange-400',
    legal: 'text-orange-800/70 dark:text-orange-200/60',
    legalLink:
      'text-orange-800/70 underline hover:text-orange-600 dark:text-orange-200/60 dark:hover:text-orange-400',
    border: 'border-orange-900/10 dark:border-white/20',
    icon: 'text-orange-700 hover:text-orange-800 dark:text-orange-600/60 dark:hover:text-orange-700',
  },
  amber: {
    logo: 'fill-amber-800 dark:fill-amber-500',
    newsletterHeading: 'text-amber-600 dark:text-amber-400/80',
    input:
      'bg-white text-amber-900 ring-amber-400 focus:ring-amber-600 dark:bg-white/5 dark:text-white dark:ring-amber-500',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:text-white dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
    disclaimer: 'text-amber-950/70 dark:text-amber-50/40',
    linksLabel: 'text-amber-900 dark:text-amber-50',
    links: 'text-amber-950/70 dark:text-amber-50/70',
    iconLabel:
      'text-amber-700 group-hover:text-amber-900 dark:text-amber-200 dark:group-hover:text-amber-400',
    legal: 'text-amber-800/70 dark:text-amber-200/60',
    legalLink:
      'text-amber-800/70 underline hover:text-amber-600 dark:text-amber-200/60 dark:hover:text-amber-400',
    border: 'border-amber-900/10 dark:border-white/20',
    icon: 'text-amber-700 hover:text-amber-800 dark:text-amber-600/60 dark:hover:text-amber-700',
  },
  yellow: {
    logo: 'fill-yellow-800 dark:fill-yellow-500',
    newsletterHeading: 'text-yellow-600 dark:text-yellow-400/80',
    input:
      'bg-white text-yellow-900 ring-yellow-400 focus:ring-yellow-600 dark:bg-white/5 dark:text-white dark:ring-yellow-500',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:text-white dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
    disclaimer: 'text-yellow-950/70 dark:text-yellow-50/40',
    linksLabel: 'text-yellow-900 dark:text-yellow-50',
    links: 'text-yellow-950/70 dark:text-yellow-50/70',
    iconLabel:
      'text-yellow-700 group-hover:text-yellow-900 dark:text-yellow-200 dark:group-hover:text-yellow-400',
    legal: 'text-yellow-800/70 dark:text-yellow-200/60',
    legalLink:
      'text-yellow-800/70 underline hover:text-yellow-600 dark:text-yellow-200/60 dark:hover:text-yellow-400',
    border: 'border-yellow-900/10 dark:border-white/20',
    icon: 'text-yellow-700 hover:text-yellow-800 dark:text-yellow-600/60 dark:hover:text-yellow-700',
  },
  lime: {
    logo: 'fill-lime-800 dark:fill-lime-500',
    newsletterHeading: 'text-lime-600 dark:text-lime-400/80',
    input:
      'bg-white text-lime-900 ring-lime-400 focus:ring-lime-600 dark:bg-white/5 dark:text-white dark:ring-lime-500',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:text-white dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
    disclaimer: 'text-lime-950/70 dark:text-lime-50/40',
    linksLabel: 'text-lime-900 dark:text-lime-50',
    links: 'text-lime-950/70 dark:text-lime-50/70',
    iconLabel:
      'text-lime-700 group-hover:text-lime-900 dark:text-lime-200 dark:group-hover:text-lime-400',
    legal: 'text-lime-800/70 dark:text-lime-200/60',
    legalLink:
      'text-lime-800/70 underline hover:text-lime-600 dark:text-lime-200/60 dark:hover:text-lime-400',
    border: 'border-lime-900/10 dark:border-white/20',
    icon: 'text-lime-700 hover:text-lime-800 dark:text-lime-600/60 dark:hover:text-lime-700',
  },
  green: {
    logo: 'fill-green-800 dark:fill-green-500',
    newsletterHeading: 'text-green-600 dark:text-green-400/80',
    input:
      'bg-white text-green-900 ring-green-400 focus:ring-green-600 dark:bg-white/5 dark:text-white dark:ring-green-500',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:text-white dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
    disclaimer: 'text-green-950/70 dark:text-green-50/40',
    linksLabel: 'text-green-900 dark:text-green-50',
    links: 'text-green-950/70 dark:text-green-50/70',
    iconLabel:
      'text-green-700 group-hover:text-green-900 dark:text-green-200 dark:group-hover:text-green-400',
    legal: 'text-green-800/70 dark:text-green-200/60',
    legalLink:
      'text-green-800/70 underline hover:text-green-600 dark:text-green-200/60 dark:hover:text-green-400',
    border: 'border-green-900/10 dark:border-white/20',
    icon: 'text-green-700 hover:text-green-800 dark:text-green-600/60 dark:hover:text-green-700',
  },
  emerald: {
    logo: 'fill-emerald-800 dark:fill-emerald-500',
    newsletterHeading: 'text-emerald-600 dark:text-emerald-400/80',
    input:
      'bg-white text-emerald-900 ring-emerald-400 focus:ring-emerald-600 dark:bg-white/5 dark:text-white dark:ring-emerald-500',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:text-white dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
    disclaimer: 'text-emerald-950/70 dark:text-emerald-50/40',
    linksLabel: 'text-emerald-900 dark:text-emerald-50',
    links: 'text-emerald-950/70 dark:text-emerald-50/70',
    iconLabel:
      'text-emerald-700 group-hover:text-emerald-900 dark:text-emerald-200 dark:group-hover:text-emerald-400',
    legal: 'text-emerald-800/70 dark:text-emerald-200/60',
    legalLink:
      'text-emerald-800/70 underline hover:text-emerald-600 dark:text-emerald-200/60 dark:hover:text-emerald-400',
    border: 'border-emerald-900/10 dark:border-white/20',
    icon: 'text-emerald-700 hover:text-emerald-800 dark:text-emerald-600/60 dark:hover:text-emerald-700',
  },
  teal: {
    logo: 'fill-teal-800 dark:fill-teal-500',
    newsletterHeading: 'text-teal-600 dark:text-teal-400/80',
    input:
      'bg-white text-teal-900 ring-teal-400 focus:ring-teal-600 dark:bg-white/5 dark:text-white dark:ring-teal-500',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:text-white dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
    disclaimer: 'text-teal-950/70 dark:text-teal-50/40',
    linksLabel: 'text-teal-900 dark:text-teal-50',
    links: 'text-teal-950/70 dark:text-teal-50/70',
    iconLabel:
      'text-teal-700 group-hover:text-teal-900 dark:text-teal-200 dark:group-hover:text-teal-400',
    legal: 'text-teal-800/70 dark:text-teal-200/60',
    legalLink:
      'text-teal-800/70 underline hover:text-teal-600 dark:text-teal-200/60 dark:hover:text-teal-400',
    border: 'border-teal-900/10 dark:border-white/20',
    icon: 'text-teal-700 hover:text-teal-800 dark:text-teal-600/60 dark:hover:text-teal-700',
  },
  cyan: {
    logo: 'fill-cyan-800 dark:fill-cyan-500',
    newsletterHeading: 'text-cyan-600 dark:text-cyan-400/80',
    input:
      'bg-white text-cyan-900 ring-cyan-400 focus:ring-cyan-600 dark:bg-white/5 dark:text-white dark:ring-cyan-500',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:text-white dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
    disclaimer: 'text-cyan-950/70 dark:text-cyan-50/40',
    linksLabel: 'text-cyan-900 dark:text-cyan-50',
    links: 'text-cyan-950/70 dark:text-cyan-50/70',
    iconLabel:
      'text-cyan-700 group-hover:text-cyan-900 dark:text-cyan-200 dark:group-hover:text-cyan-400',
    legal: 'text-cyan-800/70 dark:text-cyan-200/60',
    legalLink:
      'text-cyan-800/70 underline hover:text-cyan-600 dark:text-cyan-200/60 dark:hover:text-cyan-400',
    border: 'border-cyan-900/10 dark:border-white/20',
    icon: 'text-cyan-700 hover:text-cyan-800 dark:text-cyan-600/60 dark:hover:text-cyan-700',
  },
  sky: {
    logo: 'fill-sky-800 dark:fill-sky-500',
    newsletterHeading: 'text-sky-600 dark:text-sky-400/80',
    input:
      'bg-white text-sky-900 ring-sky-400 focus:ring-sky-600 dark:bg-white/5 dark:text-white dark:ring-sky-500',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:text-white dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
    disclaimer: 'text-sky-950/70 dark:text-sky-50/40',
    linksLabel: 'text-sky-900 dark:text-sky-50',
    links: 'text-sky-950/70 dark:text-sky-50/70',
    iconLabel:
      'text-sky-700 group-hover:text-sky-900 dark:text-sky-200 dark:group-hover:text-sky-400',
    legal: 'text-sky-800/70 dark:text-sky-200/60',
    legalLink:
      'text-sky-800/70 underline hover:text-sky-600 dark:text-sky-200/60 dark:hover:text-sky-400',
    border: 'border-sky-900/10 dark:border-white/20',
    icon: 'text-sky-700 hover:text-sky-800 dark:text-sky-600/60 dark:hover:text-sky-700',
  },
  blue: {
    logo: 'fill-blue-800 dark:fill-blue-500',
    newsletterHeading: 'text-blue-600 dark:text-blue-400/80',
    input:
      'bg-white text-blue-900 ring-blue-400 focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-blue-500',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:text-white dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
    disclaimer: 'text-blue-950/70 dark:text-blue-50/40',
    linksLabel: 'text-blue-900 dark:text-blue-50',
    links: 'text-blue-950/70 dark:text-blue-50/70',
    iconLabel:
      'text-blue-700 group-hover:text-blue-900 dark:text-blue-200 dark:group-hover:text-blue-400',
    legal: 'text-blue-800/70 dark:text-blue-200/60',
    legalLink:
      'text-blue-800/70 underline hover:text-blue-600 dark:text-blue-200/60 dark:hover:text-blue-400',
    border: 'border-blue-900/10 dark:border-white/20',
    icon: 'text-blue-700 hover:text-blue-800 dark:text-blue-600/60 dark:hover:text-blue-700',
  },
  indigo: {
    logo: 'fill-indigo-800 dark:fill-indigo-500',
    newsletterHeading: 'text-indigo-600 dark:text-indigo-400/80',
    input:
      'bg-white text-indigo-900 ring-indigo-400 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-indigo-500',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:text-white dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
    disclaimer: 'text-indigo-950/70 dark:text-indigo-50/40',
    linksLabel: 'text-indigo-900 dark:text-indigo-50',
    links: 'text-indigo-950/70 dark:text-indigo-50/70',
    iconLabel:
      'text-indigo-700 group-hover:text-indigo-900 dark:text-indigo-200 dark:group-hover:text-indigo-400',
    legal: 'text-indigo-800/70 dark:text-indigo-200/60',
    legalLink:
      'text-indigo-800/70 underline hover:text-indigo-600 dark:text-indigo-200/60 dark:hover:text-indigo-400',
    border: 'border-indigo-900/10 dark:border-white/20',
    icon: 'text-indigo-700 hover:text-indigo-800 dark:text-indigo-600/60 dark:hover:text-indigo-700',
  },
  violet: {
    logo: 'fill-violet-800 dark:fill-violet-500',
    newsletterHeading: 'text-violet-600 dark:text-violet-400/80',
    input:
      'bg-white text-violet-900 ring-violet-400 focus:ring-violet-600 dark:bg-white/5 dark:text-white dark:ring-violet-500',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:text-white dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
    disclaimer: 'text-violet-950/70 dark:text-violet-50/40',
    linksLabel: 'text-violet-900 dark:text-violet-50',
    links: 'text-violet-950/70 dark:text-violet-50/70',
    iconLabel:
      'text-violet-700 group-hover:text-violet-900 dark:text-violet-200 dark:group-hover:text-violet-400',
    legal: 'text-violet-800/70 dark:text-violet-200/60',
    legalLink:
      'text-violet-800/70 underline hover:text-violet-600 dark:text-violet-200/60 dark:hover:text-violet-400',
    border: 'border-violet-900/10 dark:border-white/20',
    icon: 'text-violet-700 hover:text-violet-800 dark:text-violet-600/60 dark:hover:text-violet-700',
  },
  purple: {
    logo: 'fill-purple-800 dark:fill-purple-500',
    newsletterHeading: 'text-purple-600 dark:text-purple-400/80',
    input:
      'bg-white text-purple-900 ring-purple-400 focus:ring-purple-600 dark:bg-white/5 dark:text-white dark:ring-purple-500',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:text-white dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
    disclaimer: 'text-purple-950/70 dark:text-purple-50/40',
    linksLabel: 'text-purple-900 dark:text-purple-50',
    links: 'text-purple-950/70 dark:text-purple-50/70',
    iconLabel:
      'text-purple-700 group-hover:text-purple-900 dark:text-purple-200 dark:group-hover:text-purple-400',
    legal: 'text-purple-800/70 dark:text-purple-200/60',
    legalLink:
      'text-purple-800/70 underline hover:text-purple-600 dark:text-purple-200/60 dark:hover:text-purple-400',
    border: 'border-purple-900/10 dark:border-white/20',
    icon: 'text-purple-700 hover:text-purple-800 dark:text-purple-600/60 dark:hover:text-purple-700',
  },
  fuchsia: {
    logo: 'fill-fuchsia-800 dark:fill-fuchsia-500',
    newsletterHeading: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    input:
      'bg-white text-fuchsia-900 ring-fuchsia-400 focus:ring-fuchsia-600 dark:bg-white/5 dark:text-white dark:ring-fuchsia-500',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:text-white dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
    disclaimer: 'text-fuchsia-950/70 dark:text-fuchsia-50/40',
    linksLabel: 'text-fuchsia-900 dark:text-fuchsia-50',
    links: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    iconLabel:
      'text-fuchsia-700 group-hover:text-fuchsia-900 dark:text-fuchsia-200 dark:group-hover:text-fuchsia-400',
    legal: 'text-fuchsia-800/70 dark:text-fuchsia-200/60',
    legalLink:
      'text-fuchsia-800/70 underline hover:text-fuchsia-600 dark:text-fuchsia-200/60 dark:hover:text-fuchsia-400',
    border: 'border-fuchsia-900/10 dark:border-white/20',
    icon: 'text-fuchsia-700 hover:text-fuchsia-800 dark:text-fuchsia-600/60 dark:hover:text-fuchsia-700',
  },
  pink: {
    logo: 'fill-pink-800 dark:fill-pink-500',
    newsletterHeading: 'text-pink-600 dark:text-pink-400/80',
    input:
      'bg-white text-pink-900 ring-pink-400 focus:ring-pink-600 dark:bg-white/5 dark:text-white dark:ring-pink-500',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:text-white dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
    disclaimer: 'text-pink-950/70 dark:text-pink-50/40',
    linksLabel: 'text-pink-900 dark:text-pink-50',
    links: 'text-pink-950/70 dark:text-pink-50/70',
    iconLabel:
      'text-pink-700 group-hover:text-pink-900 dark:text-pink-200 dark:group-hover:text-pink-400',
    legal: 'text-pink-800/70 dark:text-pink-200/60',
    legalLink:
      'text-pink-800/70 underline hover:text-pink-600 dark:text-pink-200/60 dark:hover:text-pink-400',
    border: 'border-pink-900/10 dark:border-white/20',
    icon: 'text-pink-700 hover:text-pink-800 dark:text-pink-600/60 dark:hover:text-pink-700',
  },
  rose: {
    logo: 'fill-rose-800 dark:fill-rose-500',
    newsletterHeading: 'text-rose-600 dark:text-rose-400/80',
    input:
      'bg-white text-rose-900 ring-rose-400 focus:ring-rose-600 dark:bg-white/5 dark:text-white dark:ring-rose-500',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:text-white dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
    disclaimer: 'text-rose-950/70 dark:text-rose-50/40',
    linksLabel: 'text-rose-900 dark:text-rose-50',
    links: 'text-rose-950/70 dark:text-rose-50/70',
    iconLabel:
      'text-rose-700 group-hover:text-rose-900 dark:text-rose-200 dark:group-hover:text-rose-400',
    legal: 'text-rose-800/70 dark:text-rose-200/60',
    legalLink:
      'text-rose-800/70 underline hover:text-rose-600 dark:text-rose-200/60 dark:hover:text-rose-400',
    border: 'border-rose-900/10 dark:border-white/20',
    icon: 'text-rose-700 hover:text-rose-800 dark:text-rose-600/60 dark:hover:text-rose-700',
  },
};

function generateComponentString({
  isNextjs,
  newsletterHeading,
  newsletterSignUpSubtitle,
  newsletterSignUpCTA,
  newsletterDisclaimerPart1,
  newsletterDisclaimerPrivatePolicy,
  newsletterDisclaimerPart2,
  navigation,
  linksLabelOne,
  linksLabelTwo,
  linksLabelThree,
  linksLabelFour,
  socialLinksLabel,
  legalLinksLabel,
  legal,
  paddingArray,
  marginArray,
  maxWidth,
  color,
  textColor,
}: {
  isNextjs: boolean;
  newsletterHeading: string;
  newsletterSignUpSubtitle: string;
  newsletterSignUpCTA: string;
  newsletterDisclaimerPart1: string;
  newsletterDisclaimerPrivatePolicy: string;
  newsletterDisclaimerPart2: string;
  navigation: any;
  linksLabelOne: string;
  linksLabelTwo: string;
  linksLabelThree: string;
  linksLabelFour: string;
  socialLinksLabel: string;
  legalLinksLabel: string;
  legal: string;
  paddingArray: string[];
  marginArray: string[];
  maxWidth: string;
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  function removeHtmlTags(input: string) {
    return input.replace(/<[^>]*>/g, '');
  }

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
  categoryThree: [
    { name: '${removeHtmlTags(navigation.categoryThree[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryThree[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryThree[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryThree[3].name)}', href: '#' },
  ],
  categoryFour: [
    { name: '${removeHtmlTags(navigation.categoryFour[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryFour[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryFour[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.categoryFour[3].name)}', href: '#' },
  ],
  social: [
    { name: '${removeHtmlTags(navigation.social[0].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.social[1].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.social[2].name)}', href: '#' },
    { name: '${removeHtmlTags(navigation.social[3].name)}', href: '#' },
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
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-14">
          <div>
            <h3 className="text-lg font-semibold leading-6 ${colors[textColorKey].linksLabel}">
              ${removeHtmlTags(newsletterHeading)}
            </h3>
            <p className="text-base ${colors[textColorKey].newsletterHeading}">
              ${removeHtmlTags(newsletterSignUpSubtitle)}
            </p>
          </div>

          <div className="flex max-w-xs flex-col gap-3 sm:max-w-lg">
            <div className="flex items-start gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${colors[colorKey].input}"
                placeholder="Enter your email"
              />

              <button
                type="submit"
                className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
              >
                ${removeHtmlTags(newsletterSignUpCTA)}
              </button>
            </div>

            <div className="block max-w-md text-sm ${colors[textColorKey].disclaimer}">
              ${removeHtmlTags(newsletterDisclaimerPart1)}{' '}
              <a href="#" className="text-sm underline">
                ${removeHtmlTags(newsletterDisclaimerPrivatePolicy)}
              </a>{' '}
                ${removeHtmlTags(newsletterDisclaimerPart2)}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-8 md:gap-14 md:pt-10 ${colors[colorKey].border}">
          <div className="grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:grid-cols-6 xl:gap-20">
            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelOne)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
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

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelTwo)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
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

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelThree)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.product.map((item) => (
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

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelFour)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.downloads.map((item) => (
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

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(socialLinksLabel)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.social.map((item) => (
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

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(legalLinksLabel)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.legal.map((item) => (
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

        <div className="mt-10 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end ${colors[colorKey].border}">
          <div>
            <Logo
              className="h-7 w-auto ${colors[colorKey].logo}"
              alt="Company name"
            />
          </div>

          <p className="text-xs leading-5 ${colors[textColorKey].legal}">
            ${removeHtmlTags(legal)}
          </p>
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
        <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-14">
          <div>
            <h3 className="text-lg font-semibold leading-6 ${colors[textColorKey].linksLabel}">
              ${removeHtmlTags(newsletterHeading)}
            </h3>
            <p className="text-base ${colors[textColorKey].newsletterHeading}">
              ${removeHtmlTags(newsletterSignUpSubtitle)}
            </p>
          </div>

          <div className="flex max-w-xs flex-col gap-3 sm:max-w-lg">
            <div className="flex items-start gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>

              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${colors[colorKey].input}"
                placeholder="Enter your email"
              />

              <button
                type="submit"
                className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
              >
                ${removeHtmlTags(newsletterSignUpCTA)}
              </button>
            </div>

            <div className="block max-w-md text-sm ${colors[textColorKey].disclaimer}">
              ${removeHtmlTags(newsletterDisclaimerPart1)}{' '}
              <a href="#" className="text-sm underline">
                ${removeHtmlTags(newsletterDisclaimerPrivatePolicy)}
              </a>{' '}
                ${removeHtmlTags(newsletterDisclaimerPart2)}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-8 md:gap-14 md:pt-10 ${colors[colorKey].border}">
          <div className="grid sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:grid-cols-6 xl:gap-20">
            <div>
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelOne)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelTwo)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelThree)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(linksLabelFour)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.downloads.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(socialLinksLabel)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.social.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 sm:mt-0">
              <h3 className="text-sm font-semibold leading-6 ${colors[textColorKey].linksLabel}">
                ${removeHtmlTags(legalLinksLabel)}
              </h3>
              <ul role="list" className="mt-2 space-y-4 lg:mt-6">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 ${colors[textColorKey].links}"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between space-y-6 border-t pt-8 sm:mt-20 md:flex-row md:items-end ${colors[colorKey].border}">
          <div>
            <Logo
              className="h-7 w-auto ${colors[colorKey].logo}"
              alt="Company name"
            />
          </div>

          <p className="text-xs leading-5 ${colors[textColorKey].legal}">
            ${removeHtmlTags(legal)}
          </p>
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
    newsletterHeading,
    newsletterSignUpSubtitle,
    newsletterSignUpCTA,
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    linksLabelThree,
    linksLabelFour,
    socialLinksLabel,
    legalLinksLabel,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  } = node.props;

  const content = generateComponentString({
    isNextjs,
    newsletterHeading,
    newsletterSignUpSubtitle,
    newsletterSignUpCTA,
    newsletterDisclaimerPart1,
    newsletterDisclaimerPrivatePolicy,
    newsletterDisclaimerPart2,
    navigation,
    linksLabelOne,
    linksLabelTwo,
    linksLabelThree,
    linksLabelFour,
    socialLinksLabel,
    legalLinksLabel,
    legal,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Footer4 from './components/Footer4';`);
  componentContent.push('<Footer4 />');
  return zip.file('components/Footer4.jsx', content);
}

Footer4.craft = {
  props: {
    newsletterHeading: 'Join our newsletter',
    newsletterSignUpSubtitle:
      'Get the latest news and articles to your inbox every month.',
    newsletterSignUpCTA: 'Subscribe',
    newsletterDisclaimerPart1: 'By subscribing you agree to with our',
    newsletterDisclaimerPrivatePolicy: 'Privacy Policy',
    newsletterDisclaimerPart2:
      'and provide consent to receive updates from our company.',
    navigation: navigation,
    navigationSocial: navigation.social,
    linksLabelOne: 'Company',
    linksLabelTwo: 'Support',
    linksLabelThree: 'Product',
    linksLabelFour: 'Documentation',
    socialLinksLabel: 'Socials',
    legalLinksLabel: 'Legal',
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
