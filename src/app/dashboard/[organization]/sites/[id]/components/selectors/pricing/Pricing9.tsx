'use client';

import _ from 'lodash';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import { useNode, useEditor, SerializedNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import { Switch } from '@headlessui/react';

import { exportSingleComponent } from '~/app/dashboard/[organization]/sites/[id]/lib/export-components';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/core/ui/Accordion';
import { Button } from '~/core/ui/Button';
import { TextFieldLabel } from '~/core/ui/TextField';
import SidebarItem from '~/app/dashboard/[organization]/sites/[id]/components/editor/SidebarItem';
import PaddingMarginWrapper from '~/app/dashboard/[organization]/sites/[id]/components/selectors/PaddingMarginWrapper';
import ToolbarSettingsForm from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSettingsForm';

import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';
import JSZip from 'jszip';

type SerializedNodeWithId = SerializedNode & { id: string };

const tiers = [
  {
    name: 'Basic',
    id: 'basic',
    href: '#',
    price: { monthly: '$14', yearly: '$140' },
    description: 'Commodo in viverra nunc, ullamcorper ut.',
    cta: 'Get Started',
  },
  {
    name: 'Premium',
    id: 'premium',
    href: '#',
    price: { monthly: '$29', yearly: '$290' },
    description: 'Commodo in viverra nunc, ullamcorper ut.',
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: '#',
    price: { monthly: '$59', yearly: '$590' },
    description: 'Commodo in viverra nunc, ullamcorper ut.',
    cta: 'Get Started',
  },
];

const sections = [
  {
    category: 'Category 1',
    features: [
      {
        name: 'Feature description',
        tiers: {
          basic: '25',
          premium: '100',
          enterprise: 'Unlimited',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: '5GB',
          premium: '10GB',
          enterprise: 'Custom',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: false,
          enterprise: true,
        },
      },
    ],
  },
  {
    category: 'Category 2',
    features: [
      {
        name: 'Feature description',
        tiers: {
          basic: '25',
          premium: '100',
          enterprise: 'Unlimited',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: '5GB',
          premium: '10GB',
          enterprise: 'Custom',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: false,
          enterprise: true,
        },
      },
    ],
  },
  {
    category: 'Category 3',
    features: [
      {
        name: 'Feature description',
        tiers: {
          basic: '25',
          premium: '100',
          enterprise: 'Unlimited',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: '5GB',
          premium: '10GB',
          enterprise: 'Custom',
        },
      },
      {
        name: 'Feature description',
        tiers: {
          basic: false,
          premium: false,
          enterprise: true,
        },
      },
    ],
  },
];

export const Pricing9 = ({
  tagline = '',
  heading = '',
  description = '',
  tiers = [],
  sections = [],
  selectedTierFeature = {
    sectionIdx: 0,
    featureIdx: 0,
    tierId: 'basic',
    isString: false,
    isCheck: false,
    name: '',
  },
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
  tiers?: any[];
  sections?: any[];
  selectedTierFeature?: {
    sectionIdx: number;
    featureIdx: number;
    tierId: string;
    isString: boolean;
    isCheck: boolean;
    name: string;
  };
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

  const [isMonthly, setIsMonthly] = useState(true);

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

      <div className="mt-14 flex justify-center lg:mt-24">
        <button
          className={clsx(
            isMonthly ? colors[colorKey].isActive : colors[colorKey].isInactive,
            'rounded-l-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={clsx(
            isMonthly ? colors[colorKey].isInactive : colors[colorKey].isActive,
            'rounded-r-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(false)}
        >
          Annual
        </button>
      </div>

      {/* MOBILE */}
      <div className="mt-6 xl:hidden">
        {/* MOBILE TIER PLANS */}
        <div className="flex w-full justify-center">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 xl:ml-auto xl:mr-0">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex max-w-xs flex-col justify-between space-y-6 p-6 text-center"
              >
                <div>
                  <h3
                    id={tier.id}
                    className={clsx(
                      'text-lg font-semibold leading-8',
                      colors[textColorKey].tierName,
                    )}
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      <span
                        className={clsx(
                          'text-5xl font-bold tracking-tight',
                          colors[textColorKey].heading,
                        )}
                      >
                        {isMonthly ? tier.price.monthly : tier.price.yearly}
                      </span>
                      <span className={colors[textColorKey].monthly}>
                        {isMonthly ? '/mo' : '/yr'}
                      </span>
                    </p>

                    <p className={colors[textColorKey].description}>
                      {tier.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={clsx(
                    'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    colors[colorKey].cta,
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE SECTIONS */}
        <div className="mt-14 flex flex-col space-y-14">
          {tiers.map((tier) => (
            <div key={tier.id} className="flex flex-col space-y-8">
              <h2
                className={clsx(
                  'text-2xl font-bold leading-tight tracking-wide',
                  colors[textColorKey].tierName,
                )}
              >
                {tier.name}
              </h2>

              {sections.map((section) => (
                <ul key={section.category}>
                  <h3
                    className={clsx(
                      'mb-4 text-base font-semibold',
                      colors[textColorKey].heading,
                    )}
                  >
                    {section.category}
                  </h3>

                  {section.features.map((feature: any, index: number) => (
                    <li
                      key={index}
                      className={clsx(
                        index % 2 !== 0
                          ? colors[textColorKey].tableRowSecond
                          : colors[textColorKey].tableRowFirst,
                        'flex w-full items-center justify-between p-4',
                      )}
                    >
                      <p
                        className={clsx(
                          'text-sm',
                          colors[textColorKey].feature,
                        )}
                      >
                        {feature.name}
                      </p>
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <p
                          className={clsx(
                            'text-sm',
                            colors[textColorKey].feature,
                          )}
                        >
                          {feature.tiers[tier.id]}
                        </p>
                      ) : feature.tiers[tier.id] ? (
                        <CheckIcon
                          className={clsx(
                            'h-5 w-5',
                            colors[textColorKey].checkIcon,
                          )}
                        />
                      ) : (
                        <MinusIcon
                          className={clsx(
                            'h-5 w-5',
                            colors[textColorKey].checkIcon,
                          )}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mt-14 hidden w-full xl:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>

          <thead>
            <tr>
              <td />
              {tiers.map((tier, index) => (
                <th key={tier.id} scope="col" className="pb-4">
                  <div
                    id={tier.id}
                    className={clsx(
                      'text-center text-lg font-semibold leading-8',
                      colors[textColorKey].tierName,
                    )}
                  >
                    <ContentEditable
                      html={tier.name}
                      onChange={(e) =>
                        setProp(
                          (props: { tiers: any[] }) =>
                            (props.tiers[index].name = e.target.value),
                        )
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none focus:outline-offset-4 focus:outline-primary"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier, index) => (
                <td key={tier.id} className="px-4 text-center">
                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      {isMonthly ? (
                        <ContentEditable
                          html={tier.price.monthly}
                          onChange={(e) =>
                            setProp(
                              (props: { tiers: any[] }) =>
                                (props.tiers[index].price.monthly =
                                  e.target.value),
                            )
                          }
                          tagName="span"
                          disabled={query.getOptions().enabled ? false : true}
                          className={clsx(
                            'text-5xl font-bold tracking-tight',
                            'outline-none focus:outline-offset-4 focus:outline-primary',
                            colors[textColorKey].heading,
                          )}
                        />
                      ) : (
                        <ContentEditable
                          html={tier.price.yearly}
                          onChange={(e) =>
                            setProp(
                              (props: { tiers: any[] }) =>
                                (props.tiers[index].price.yearly =
                                  e.target.value),
                            )
                          }
                          tagName="span"
                          disabled={query.getOptions().enabled ? false : true}
                          className={clsx(
                            'text-5xl font-bold tracking-tight',
                            'outline-none focus:outline-offset-4 focus:outline-primary',
                            colors[textColorKey].heading,
                          )}
                        />
                      )}

                      <span className={colors[textColorKey].monthly}>
                        {isMonthly ? '/mo' : '/yr'}
                      </span>
                    </p>

                    <ContentEditable
                      html={tier.description}
                      onChange={(e) =>
                        setProp(
                          (props: { tiers: any[] }) =>
                            (props.tiers[index].description = e.target.value),
                        )
                      }
                      tagName="p"
                      disabled={query.getOptions().enabled ? false : true}
                      className={clsx(
                        'text-center font-normal',
                        'outline-none focus:outline-offset-4 focus:outline-primary',
                        colors[textColorKey].description,
                      )}
                    />
                  </div>

                  <div className="mt-6">
                    <ContentEditable
                      html={tier.cta}
                      onChange={(e) =>
                        setProp(
                          (props: { tiers: any[] }) =>
                            (props.tiers[index].cta = e.target.value),
                        )
                      }
                      tagName="a"
                      disabled={query.getOptions().enabled ? false : true}
                      className={clsx(
                        'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                        'outline-none focus:outline-offset-4 focus:outline-primary',
                        colors[colorKey].cta,
                      )}
                    />
                  </div>
                </td>
              ))}
            </tr>

            <Fragment>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className={clsx(
                    'pt-14 pb-6 text-lg font-semibold leading-6',
                    colors[textColorKey].heading,
                  )}
                >
                  <ContentEditable
                    html={sections[0].category}
                    onChange={(e) =>
                      setProp(
                        (props: { sections: any[] }) =>
                          (props.sections[0].category = e.target.value),
                      )
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className="outline-none focus:outline-offset-4 focus:outline-primary"
                  />
                </th>
              </tr>

              {sections[0].features.map((feature: any, index: number) => (
                <tr
                  key={index}
                  className={clsx(
                    index % 2 !== 0
                      ? colors[textColorKey].tableRowSecond
                      : colors[textColorKey].tableRowFirst,
                  )}
                >
                  <th
                    scope="row"
                    className={clsx(
                      'p-4 text-sm font-normal leading-6',
                      colors[textColorKey].feature,
                    )}
                  >
                    <ContentEditable
                      html={feature.name}
                      onChange={(e) =>
                        setProp(
                          (props: { sections: any[] }) =>
                            (props.sections[0].features[index].name =
                              e.target.value),
                        )
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none focus:outline-offset-4 focus:outline-primary"
                    />
                  </th>

                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 xl:px-8">
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <button
                          className={clsx(
                            'w-full outline-none focus:outline-primary m-0 p-0',
                            colors[textColorKey].feature,
                          )}
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 0;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          {feature.tiers[tier.id]}
                        </button>
                      ) : feature.tiers[tier.id] ? (
                        <button
                          className="w-full outline-none focus:outline-primary"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 0;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <CheckIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      ) : (
                        <button
                          className="w-full outline-none focus:outline-primary mt-1"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 0;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <MinusIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className={clsx(
                    'pt-14 pb-6 text-lg font-semibold leading-6',
                    colors[textColorKey].heading,
                  )}
                >
                  <ContentEditable
                    html={sections[1].category}
                    onChange={(e) =>
                      setProp(
                        (props: { sections: any[] }) =>
                          (props.sections[1].category = e.target.value),
                      )
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className="outline-none focus:outline-offset-4 focus:outline-primary"
                  />
                </th>
              </tr>

              {sections[1].features.map((feature: any, index: number) => (
                <tr
                  key={index}
                  className={clsx(
                    index % 2 !== 0
                      ? colors[textColorKey].tableRowSecond
                      : colors[textColorKey].tableRowFirst,
                  )}
                >
                  <th
                    scope="row"
                    className={clsx(
                      'p-4 text-sm font-normal leading-6',
                      colors[textColorKey].feature,
                    )}
                  >
                    <ContentEditable
                      html={feature.name}
                      onChange={(e) =>
                        setProp(
                          (props: { sections: any[] }) =>
                            (props.sections[1].features[index].name =
                              e.target.value),
                        )
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none focus:outline-offset-4 focus:outline-primary"
                    />
                  </th>

                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 xl:px-8">
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <button
                          className={clsx(
                            'w-full outline-none focus:outline-primary m-0 p-0',
                            colors[textColorKey].feature,
                          )}
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 1;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          {feature.tiers[tier.id]}
                        </button>
                      ) : feature.tiers[tier.id] ? (
                        <button
                          className="w-full outline-none focus:outline-primary"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 1;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <CheckIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      ) : (
                        <button
                          className="w-full outline-none focus:outline-primary mt-1"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 1;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <MinusIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className={clsx(
                    'pt-14 pb-6 text-lg font-semibold leading-6',
                    colors[textColorKey].heading,
                  )}
                >
                  <ContentEditable
                    html={sections[2].category}
                    onChange={(e) =>
                      setProp(
                        (props: { sections: any[] }) =>
                          (props.sections[2].category = e.target.value),
                      )
                    }
                    tagName="span"
                    disabled={query.getOptions().enabled ? false : true}
                    className="outline-none focus:outline-offset-4 focus:outline-primary"
                  />
                </th>
              </tr>

              {sections[2].features.map((feature: any, index: number) => (
                <tr
                  key={index}
                  className={clsx(
                    index % 2 !== 0
                      ? colors[textColorKey].tableRowSecond
                      : colors[textColorKey].tableRowFirst,
                  )}
                >
                  <th
                    scope="row"
                    className={clsx(
                      'p-4 text-sm font-normal leading-6',
                      colors[textColorKey].feature,
                    )}
                  >
                    <ContentEditable
                      html={feature.name}
                      onChange={(e) =>
                        setProp(
                          (props: { sections: any[] }) =>
                            (props.sections[2].features[index].name =
                              e.target.value),
                        )
                      }
                      tagName="span"
                      disabled={query.getOptions().enabled ? false : true}
                      className="outline-none focus:outline-offset-4 focus:outline-primary"
                    />
                  </th>

                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 xl:px-8">
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <button
                          className={clsx(
                            'w-full outline-none focus:outline-primary m-0 p-0',
                            colors[textColorKey].feature,
                          )}
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 2;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          {feature.tiers[tier.id]}
                        </button>
                      ) : feature.tiers[tier.id] ? (
                        <button
                          className="w-full outline-none focus:outline-primary"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 2;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <CheckIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      ) : (
                        <button
                          className="w-full outline-none focus:outline-primary mt-1"
                          onClick={() => {
                            setProp((props: { selectedTierFeature: any }) => {
                              props.selectedTierFeature.sectionIdx = 2;
                              props.selectedTierFeature.featureIdx = index;
                              props.selectedTierFeature.isString =
                                typeof feature.tiers[tier.id] === 'string';
                              props.selectedTierFeature.tierId = tier.id;
                              props.selectedTierFeature.isCheck =
                                feature.tiers[tier.id];
                            });
                          }}
                        >
                          <MinusIcon
                            className={clsx(
                              'mx-auto h-5 w-5',
                              colors[textColorKey].checkIcon,
                            )}
                          />
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>

            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier, index) => (
                <td key={tier.id} className="py-10 text-center">
                  <ContentEditable
                    html={tier.cta}
                    onChange={(e) =>
                      setProp(
                        (props: { tiers: any[] }) =>
                          (props.tiers[index].cta = e.target.value),
                      )
                    }
                    tagName="a"
                    disabled={query.getOptions().enabled ? false : true}
                    className={clsx(
                      'rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'outline-none focus:outline-offset-4 focus:outline-primary',
                      colors[colorKey].cta,
                    )}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </PaddingMarginWrapper>
  );
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
}

function SidebarDraggableItem({ hasActiveSub }: { hasActiveSub: boolean }) {
  return (
    <SidebarItem
      hasActiveSub={hasActiveSub}
      isFreeComponent={false}
      image="https://ablcaocvmgtcodafwvoe.supabase.co/storage/v1/object/public/components/pricing_9-1699801367444.webp"
      name="Pricing 9"
      Component={Pricing9}
    />
  );
}

function ToolbarSettings() {
  const {
    tagline,
    heading,
    description,
    tiers,
    sections,
    selectedTierFeature,
    maxWidth,
    marginArray,
    paddingArray,
    color,
    textColor,
    name,
    actions: { setProp },
  } = useNode((node) => ({
    tagline: node.data.props.tagline,
    heading: node.data.props.heading,
    description: node.data.props.description,
    tiers: node.data.props.tiers,
    sections: node.data.props.sections,
    selectedTierFeature: node.data.props.selectedTierFeature,
    maxWidth: node.data.props.maxWidth,
    marginArray: node.data.props.marginArray,
    paddingArray: node.data.props.paddingArray,
    color: node.data.props.color,
    textColor: node.data.props.textColor,
    name: node.data.custom.displayName || node.data.displayName,
  }));

  const tierId = selectedTierFeature.tierId;

  return (
    <>
      <ToolbarSettingsForm defaultValue="tier-feature">
        <AccordionItem value="tier-feature">
          <AccordionTrigger>
            <h3 className="text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-50">
              Edit Text
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 justify-between">
              <Switch.Group as="div" className="flex items-center p-2">
                <Switch
                  checked={selectedTierFeature.isString}
                  onChange={(enabled) => {
                    setProp((props: { selectedTierFeature: any }) => {
                      props.selectedTierFeature.isString = enabled;
                    });
                  }}
                  className={clsx(
                    selectedTierFeature.isString
                      ? 'bg-primary'
                      : 'bg-neutral-200 dark:bg-neutral-800',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  )}
                >
                  <span className="sr-only">Use custom input</span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      selectedTierFeature.isString
                        ? 'translate-x-5'
                        : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                  />
                </Switch>

                <Switch.Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-foreground">
                    Custom Input
                  </span>
                </Switch.Label>
              </Switch.Group>

              {!selectedTierFeature.isString && (
                <Switch.Group as="div" className="flex items-center p-2">
                  <Switch
                    checked={selectedTierFeature.isCheck}
                    onChange={(enabled) => {
                      setProp((props: { selectedTierFeature: any }) => {
                        props.selectedTierFeature.isCheck = enabled;
                      });

                      setProp((props: { sections: any[] }) => {
                        props.sections[selectedTierFeature.sectionIdx].features[
                          selectedTierFeature.featureIdx
                        ].tiers[tierId] = enabled;
                      });
                    }}
                    className={clsx(
                      selectedTierFeature.isCheck
                        ? 'bg-primary'
                        : 'bg-neutral-200 dark:bg-neutral-800',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    )}
                  >
                    <span className="sr-only">Use check icon</span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        selectedTierFeature.isCheck
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      )}
                    />
                  </Switch>

                  <Switch.Label as="span" className="ml-3 text-sm">
                    <span className="font-medium text-foreground">
                      Check Icon
                    </span>
                  </Switch.Label>
                </Switch.Group>
              )}

              {selectedTierFeature.isString && (
                <div className="flex flex-col gap-1">
                  <TextFieldLabel htmlFor="linkOne">Text</TextFieldLabel>
                  <input
                    type="text"
                    id="linkOne"
                    disabled={!selectedTierFeature.isString}
                    value={
                      sections[selectedTierFeature.sectionIdx].features[
                        selectedTierFeature.featureIdx
                      ].tiers[tierId]
                    }
                    onChange={(e) => {
                      console.log('change');
                      setProp((props: any) => {
                        props.sections[selectedTierFeature.sectionIdx].features[
                          selectedTierFeature.featureIdx
                        ].tiers[tierId] = e.target.value;
                      });
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-neutral-800 dark:text-neutral-100"
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="export">
          <AccordionTrigger>
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 mt-6">
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
                    tiers,
                    sections,
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
                    tiers,
                    sections,
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
    </>
  );
}

interface ColorObject {
  [key: string]: {
    tagline: string;
    heading: string;
    description: string;
    isActive: string;
    isInactive: string;
    tierName: string;
    monthly: string;
    feature: string;
    tableRowFirst: string;
    tableRowSecond: string;
    checkIcon: string;
    cta: string;
  };
}

const colors: ColorObject = {
  slate: {
    tagline: 'text-slate-800 dark:text-slate-200',
    heading: 'text-slate-900 dark:text-slate-50',
    description: 'text-slate-600 dark:text-slate-400',
    isActive:
      'bg-slate-900 text-white ring-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:ring-white dark:hover:bg-slate-300',
    isInactive:
      'bg-transparent text-slate-900 ring-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50',
    tierName: 'text-slate-900 dark:text-slate-200',
    monthly: 'text-slate-600 dark:text-slate-500',
    feature: 'text-slate-900 dark:text-slate-50',
    tableRowFirst: 'bg-slate-200 dark:bg-slate-900',
    tableRowSecond: 'bg-slate-50 dark:bg-slate-800',
    checkIcon: 'text-slate-600 dark:text-slate-400',
    cta: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400',
  },
  gray: {
    tagline: 'text-gray-800 dark:text-gray-200',
    heading: 'text-gray-900 dark:text-gray-50',
    description: 'text-gray-600 dark:text-gray-400',
    isActive:
      'bg-gray-900 text-white ring-gray-900 hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:ring-white dark:hover:bg-gray-300',
    isInactive:
      'bg-transparent text-gray-900 ring-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-50',
    tierName: 'text-gray-900 dark:text-gray-200',
    monthly: 'text-gray-600 dark:text-gray-500',
    feature: 'text-gray-900 dark:text-gray-50',
    tableRowFirst: 'bg-gray-200 dark:bg-gray-900',
    tableRowSecond: 'bg-gray-50 dark:bg-gray-800',
    checkIcon: 'text-gray-600 dark:text-gray-400',
    cta: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus-visible:outline-gray-400',
  },
  zinc: {
    tagline: 'text-zinc-800 dark:text-zinc-200',
    heading: 'text-zinc-900 dark:text-zinc-50',
    description: 'text-zinc-600 dark:text-zinc-400',
    isActive:
      'bg-zinc-900 text-white ring-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-white dark:hover:bg-zinc-300',
    isInactive:
      'bg-transparent text-zinc-900 ring-zinc-200 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
    tierName: 'text-zinc-900 dark:text-zinc-200',
    monthly: 'text-zinc-600 dark:text-zinc-500',
    feature: 'text-zinc-900 dark:text-zinc-50',
    tableRowFirst: 'bg-zinc-200 dark:bg-zinc-900',
    tableRowSecond: 'bg-zinc-50 dark:bg-zinc-800',
    checkIcon: 'text-zinc-600 dark:text-zinc-400',
    cta: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:outline-zinc-400',
  },
  neutral: {
    tagline: 'text-neutral-800 dark:text-neutral-200',
    heading: 'text-neutral-900 dark:text-neutral-50',
    description: 'text-neutral-600 dark:text-neutral-400',
    isActive:
      'bg-neutral-900 text-white ring-neutral-900 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:ring-white dark:hover:bg-neutral-300',
    isInactive:
      'bg-transparent text-neutral-900 ring-neutral-200 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
    tierName: 'text-neutral-900 dark:text-neutral-200',
    monthly: 'text-neutral-600 dark:text-neutral-500',
    feature: 'text-neutral-900 dark:text-neutral-50',
    tableRowFirst: 'bg-neutral-200 dark:bg-neutral-900',
    tableRowSecond: 'bg-neutral-50 dark:bg-neutral-800',
    checkIcon: 'text-neutral-600 dark:text-neutral-400',
    cta: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-500 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-neutral-400',
  },
  stone: {
    tagline: 'text-stone-800 dark:text-stone-200',
    heading: 'text-stone-900 dark:text-stone-50',
    description: 'text-stone-600 dark:text-stone-400',
    isActive:
      'bg-stone-900 text-white ring-stone-900 hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:ring-white dark:hover:bg-stone-300',
    isInactive:
      'bg-transparent text-stone-900 ring-stone-200 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-stone-50',
    tierName: 'text-stone-900 dark:text-stone-200',
    monthly: 'text-stone-600 dark:text-stone-500',
    feature: 'text-stone-900 dark:text-stone-50',
    tableRowFirst: 'bg-stone-200 dark:bg-stone-900',
    tableRowSecond: 'bg-stone-50 dark:bg-stone-800',
    checkIcon: 'text-stone-600 dark:text-stone-400',
    cta: 'bg-stone-900 text-white hover:bg-stone-800 focus-visible:outline-stone-500 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300 dark:focus-visible:outline-stone-400',
  },
  red: {
    tagline: 'text-red-600 dark:text-red-400/80',
    heading: 'text-red-900 dark:text-red-50',
    description: 'text-red-950/70 dark:text-red-50/70',
    isActive:
      'bg-red-700 text-white ring-red-700 hover:bg-red-800 dark:bg-red-900/80 dark:ring-red-900 dark:hover:bg-red-900',
    isInactive:
      'bg-transparent text-red-900 ring-red-200 hover:bg-red-50 dark:text-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-100 dark:ring-red-950',
    tierName: 'text-red-600 dark:text-red-400/80',
    monthly: 'text-red-950/60 dark:text-red-50/50',
    feature: 'text-red-900 dark:text-red-50',
    tableRowSecond: 'bg-red-50 dark:bg-red-800',
    tableRowFirst: 'bg-red-200 dark:bg-red-900',
    checkIcon: 'text-red-600 dark:text-red-800',
    cta: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-500 dark:bg-red-900/80 dark:hover:bg-red-900 dark:focus-visible:outline-red-600',
  },
  orange: {
    tagline: 'text-orange-600 dark:text-orange-400/80',
    heading: 'text-orange-900 dark:text-orange-50',
    description: 'text-orange-950/70 dark:text-orange-50/70',
    isActive:
      'bg-orange-700 text-white ring-orange-700 hover:bg-orange-800 dark:bg-orange-900/80 dark:ring-orange-900 dark:hover:bg-orange-900',
    isInactive:
      'bg-transparent text-orange-900 ring-orange-200 hover:bg-orange-50 dark:text-orange-200 dark:hover:bg-orange-900/30 dark:hover:text-orange-100 dark:ring-orange-950',
    tierName: 'text-orange-600 dark:text-orange-400/80',
    monthly: 'text-orange-950/60 dark:text-orange-50/50',
    feature: 'text-orange-900 dark:text-orange-50',
    tableRowSecond: 'bg-orange-50 dark:bg-orange-800',
    tableRowFirst: 'bg-orange-200 dark:bg-orange-900',
    checkIcon: 'text-orange-600 dark:text-orange-800',
    cta: 'bg-orange-700 text-white hover:bg-orange-600 focus-visible:outline-orange-500 dark:bg-orange-900/80 dark:hover:bg-orange-900 dark:focus-visible:outline-orange-600',
  },
  amber: {
    tagline: 'text-amber-600 dark:text-amber-400/80',
    heading: 'text-amber-900 dark:text-amber-50',
    description: 'text-amber-950/70 dark:text-amber-50/70',
    isActive:
      'bg-amber-700 text-white ring-amber-700 hover:bg-amber-800 dark:bg-amber-900/80 dark:ring-amber-900 dark:hover:bg-amber-900',
    isInactive:
      'bg-transparent text-amber-900 ring-amber-200 hover:bg-amber-50 dark:text-amber-200 dark:hover:bg-amber-900/30 dark:hover:text-amber-100 dark:ring-amber-950',
    tierName: 'text-amber-600 dark:text-amber-400/80',
    monthly: 'text-amber-950/60 dark:text-amber-50/50',
    feature: 'text-amber-900 dark:text-amber-50',
    tableRowSecond: 'bg-amber-50 dark:bg-amber-800',
    tableRowFirst: 'bg-amber-200 dark:bg-amber-900',
    checkIcon: 'text-amber-600 dark:text-amber-800',
    cta: 'bg-amber-700 text-white hover:bg-amber-600 focus-visible:outline-amber-500 dark:bg-amber-900/80 dark:hover:bg-amber-900 dark:focus-visible:outline-amber-600',
  },
  yellow: {
    tagline: 'text-yellow-600 dark:text-yellow-400/80',
    heading: 'text-yellow-900 dark:text-yellow-50',
    description: 'text-yellow-950/70 dark:text-yellow-50/70',
    isActive:
      'bg-yellow-700 text-white ring-yellow-700 hover:bg-yellow-800 dark:bg-yellow-900/80 dark:ring-yellow-900 dark:hover:bg-yellow-900',
    isInactive:
      'bg-transparent text-yellow-900 ring-yellow-200 hover:bg-yellow-50 dark:text-yellow-200 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-100 dark:ring-yellow-950',
    tierName: 'text-yellow-600 dark:text-yellow-400/80',
    monthly: 'text-yellow-950/60 dark:text-yellow-50/50',
    feature: 'text-yellow-900 dark:text-yellow-50',
    tableRowSecond: 'bg-yellow-50 dark:bg-yellow-800',
    tableRowFirst: 'bg-yellow-200 dark:bg-yellow-900',
    checkIcon: 'text-yellow-600 dark:text-yellow-800',
    cta: 'bg-yellow-700 text-white hover:bg-yellow-600 focus-visible:outline-yellow-500 dark:bg-yellow-900/80 dark:hover:bg-yellow-900 dark:focus-visible:outline-yellow-600',
  },
  lime: {
    tagline: 'text-lime-600 dark:text-lime-400/80',
    heading: 'text-lime-900 dark:text-lime-50',
    description: 'text-lime-950/70 dark:text-lime-50/70',
    isActive:
      'bg-lime-700 text-white ring-lime-700 hover:bg-lime-800 dark:bg-lime-900/80 dark:ring-lime-900 dark:hover:bg-lime-900',
    isInactive:
      'bg-transparent text-lime-900 ring-lime-200 hover:bg-lime-50 dark:text-lime-200 dark:hover:bg-lime-900/30 dark:hover:text-lime-100 dark:ring-lime-950',
    tierName: 'text-lime-600 dark:text-lime-400/80',
    monthly: 'text-lime-950/60 dark:text-lime-50/50',
    feature: 'text-lime-900 dark:text-lime-50',
    tableRowSecond: 'bg-lime-50 dark:bg-lime-800',
    tableRowFirst: 'bg-lime-200 dark:bg-lime-900',
    checkIcon: 'text-lime-600 dark:text-lime-800',
    cta: 'bg-lime-700 text-white hover:bg-lime-600 focus-visible:outline-lime-500 dark:bg-lime-900/80 dark:hover:bg-lime-900 dark:focus-visible:outline-lime-600',
  },
  green: {
    tagline: 'text-green-600 dark:text-green-400/80',
    heading: 'text-green-900 dark:text-green-50',
    description: 'text-green-950/70 dark:text-green-50/70',
    isActive:
      'bg-green-700 text-white ring-green-700 hover:bg-green-800 dark:bg-green-900/80 dark:ring-green-900 dark:hover:bg-green-900',
    isInactive:
      'bg-transparent text-green-900 ring-green-200 hover:bg-green-50 dark:text-green-200 dark:hover:bg-green-900/30 dark:hover:text-green-100 dark:ring-green-950',
    tierName: 'text-green-600 dark:text-green-400/80',
    monthly: 'text-green-950/60 dark:text-green-50/50',
    feature: 'text-green-900 dark:text-green-50',
    tableRowSecond: 'bg-green-50 dark:bg-green-800',
    tableRowFirst: 'bg-green-200 dark:bg-green-900',
    checkIcon: 'text-green-600 dark:text-green-800',
    cta: 'bg-green-700 text-white hover:bg-green-600 focus-visible:outline-green-500 dark:bg-green-900/80 dark:hover:bg-green-900 dark:focus-visible:outline-green-600',
  },
  emerald: {
    tagline: 'text-emerald-600 dark:text-emerald-400/80',
    heading: 'text-emerald-900 dark:text-emerald-50',
    description: 'text-emerald-950/70 dark:text-emerald-50/70',
    isActive:
      'bg-emerald-700 text-white ring-emerald-700 hover:bg-emerald-800 dark:bg-emerald-900/80 dark:ring-emerald-900 dark:hover:bg-emerald-900',
    isInactive:
      'bg-transparent text-emerald-900 ring-emerald-200 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-100 dark:ring-emerald-950',
    tierName: 'text-emerald-600 dark:text-emerald-400/80',
    monthly: 'text-emerald-950/60 dark:text-emerald-50/50',
    feature: 'text-emerald-900 dark:text-emerald-50',
    tableRowSecond: 'bg-emerald-50 dark:bg-emerald-800',
    tableRowFirst: 'bg-emerald-200 dark:bg-emerald-900',
    checkIcon: 'text-emerald-600 dark:text-emerald-800',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:outline-emerald-500 dark:bg-emerald-900/80 dark:hover:bg-emerald-900 dark:focus-visible:outline-emerald-600',
  },
  teal: {
    tagline: 'text-teal-600 dark:text-teal-400/80',
    heading: 'text-teal-900 dark:text-teal-50',
    description: 'text-teal-950/70 dark:text-teal-50/70',
    isActive:
      'bg-teal-700 text-white ring-teal-700 hover:bg-teal-800 dark:bg-teal-900/80 dark:ring-teal-900 dark:hover:bg-teal-900',
    isInactive:
      'bg-transparent text-teal-900 ring-teal-200 hover:bg-teal-50 dark:text-teal-200 dark:hover:bg-teal-900/30 dark:hover:text-teal-100 dark:ring-teal-950',
    tierName: 'text-teal-600 dark:text-teal-400/80',
    monthly: 'text-teal-950/60 dark:text-teal-50/50',
    feature: 'text-teal-900 dark:text-teal-50',
    tableRowSecond: 'bg-teal-50 dark:bg-teal-800',
    tableRowFirst: 'bg-teal-200 dark:bg-teal-900',
    checkIcon: 'text-teal-600 dark:text-teal-800',
    cta: 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-500 dark:bg-teal-900/80 dark:hover:bg-teal-900 dark:focus-visible:outline-teal-600',
  },
  cyan: {
    tagline: 'text-cyan-600 dark:text-cyan-400/80',
    heading: 'text-cyan-900 dark:text-cyan-50',
    description: 'text-cyan-950/70 dark:text-cyan-50/70',
    isActive:
      'bg-cyan-700 text-white ring-cyan-700 hover:bg-cyan-800 dark:bg-cyan-900/80 dark:ring-cyan-900 dark:hover:bg-cyan-900',
    isInactive:
      'bg-transparent text-cyan-900 ring-cyan-200 hover:bg-cyan-50 dark:text-cyan-200 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-100 dark:ring-cyan-950',
    tierName: 'text-cyan-600 dark:text-cyan-400/80',
    monthly: 'text-cyan-950/60 dark:text-cyan-50/50',
    feature: 'text-cyan-900 dark:text-cyan-50',
    tableRowSecond: 'bg-cyan-50 dark:bg-cyan-800',
    tableRowFirst: 'bg-cyan-200 dark:bg-cyan-900',
    checkIcon: 'text-cyan-600 dark:text-cyan-800',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-600 focus-visible:outline-cyan-500 dark:bg-cyan-900/80 dark:hover:bg-cyan-900 dark:focus-visible:outline-cyan-600',
  },
  sky: {
    tagline: 'text-sky-600 dark:text-sky-400/80',
    heading: 'text-sky-900 dark:text-sky-50',
    description: 'text-sky-950/70 dark:text-sky-50/70',
    isActive:
      'bg-sky-700 text-white ring-sky-700 hover:bg-sky-800 dark:bg-sky-900/80 dark:ring-sky-900 dark:hover:bg-sky-900',
    isInactive:
      'bg-transparent text-sky-900 ring-sky-200 hover:bg-sky-50 dark:text-sky-200 dark:hover:bg-sky-900/30 dark:hover:text-sky-100 dark:ring-sky-950',
    tierName: 'text-sky-600 dark:text-sky-400/80',
    monthly: 'text-sky-950/60 dark:text-sky-50/50',
    feature: 'text-sky-900 dark:text-sky-50',
    tableRowSecond: 'bg-sky-50 dark:bg-sky-800',
    tableRowFirst: 'bg-sky-200 dark:bg-sky-900',
    checkIcon: 'text-sky-600 dark:text-sky-800',
    cta: 'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline-sky-500 dark:bg-sky-900/80 dark:hover:bg-sky-900 dark:focus-visible:outline-sky-600',
  },
  blue: {
    tagline: 'text-blue-600 dark:text-blue-400/80',
    heading: 'text-blue-900 dark:text-blue-50',
    description: 'text-blue-950/70 dark:text-blue-50/70',
    isActive:
      'bg-blue-700 text-white ring-blue-700 hover:bg-blue-800 dark:bg-blue-900/80 dark:ring-blue-900 dark:hover:bg-blue-900',
    isInactive:
      'bg-transparent text-blue-900 ring-blue-200 hover:bg-blue-50 dark:text-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-100 dark:ring-blue-950',
    tierName: 'text-blue-600 dark:text-blue-400/80',
    monthly: 'text-blue-950/60 dark:text-blue-50/50',
    feature: 'text-blue-900 dark:text-blue-50',
    tableRowSecond: 'bg-blue-50 dark:bg-blue-800',
    tableRowFirst: 'bg-blue-200 dark:bg-blue-900',
    checkIcon: 'text-blue-600 dark:text-blue-800',
    cta: 'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-900/80 dark:hover:bg-blue-900 dark:focus-visible:outline-blue-600',
  },
  indigo: {
    tagline: 'text-indigo-600 dark:text-indigo-400/80',
    heading: 'text-indigo-900 dark:text-indigo-50',
    description: 'text-indigo-950/70 dark:text-indigo-50/70',
    isActive:
      'bg-indigo-700 text-white ring-indigo-700 hover:bg-indigo-800 dark:bg-indigo-900/80 dark:ring-indigo-900 dark:hover:bg-indigo-900',
    isInactive:
      'bg-transparent text-indigo-900 ring-indigo-200 hover:bg-indigo-50 dark:text-indigo-200 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-100 dark:ring-indigo-950',
    tierName: 'text-indigo-600 dark:text-indigo-400/80',
    monthly: 'text-indigo-950/60 dark:text-indigo-50/50',
    feature: 'text-indigo-900 dark:text-indigo-50',
    tableRowSecond: 'bg-indigo-50 dark:bg-indigo-800',
    tableRowFirst: 'bg-indigo-200 dark:bg-indigo-900',
    checkIcon: 'text-indigo-600 dark:text-indigo-800',
    cta: 'bg-indigo-700 text-white hover:bg-indigo-600 focus-visible:outline-indigo-500 dark:bg-indigo-900/80 dark:hover:bg-indigo-900 dark:focus-visible:outline-indigo-600',
  },
  violet: {
    tagline: 'text-violet-600 dark:text-violet-400/80',
    heading: 'text-violet-900 dark:text-violet-50',
    description: 'text-violet-950/70 dark:text-violet-50/70',
    isActive:
      'bg-violet-700 text-white ring-violet-700 hover:bg-violet-800 dark:bg-violet-900/80 dark:ring-violet-900 dark:hover:bg-violet-900',
    isInactive:
      'bg-transparent text-violet-900 ring-violet-200 hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-violet-900/30 dark:hover:text-violet-100 dark:ring-violet-950',
    tierName: 'text-violet-600 dark:text-violet-400/80',
    monthly: 'text-violet-950/60 dark:text-violet-50/50',
    feature: 'text-violet-900 dark:text-violet-50',
    tableRowSecond: 'bg-violet-50 dark:bg-violet-800',
    tableRowFirst: 'bg-violet-200 dark:bg-violet-900',
    checkIcon: 'text-violet-600 dark:text-violet-800',
    cta: 'bg-violet-700 text-white hover:bg-violet-600 focus-visible:outline-violet-500 dark:bg-violet-900/80 dark:hover:bg-violet-900 dark:focus-visible:outline-violet-600',
  },
  purple: {
    tagline: 'text-purple-600 dark:text-purple-400/80',
    heading: 'text-purple-900 dark:text-purple-50',
    description: 'text-purple-950/70 dark:text-purple-50/70',
    isActive:
      'bg-purple-700 text-white ring-purple-700 hover:bg-purple-800 dark:bg-purple-900/80 dark:ring-purple-900 dark:hover:bg-purple-900',
    isInactive:
      'bg-transparent text-purple-900 ring-purple-200 hover:bg-purple-50 dark:text-purple-200 dark:hover:bg-purple-900/30 dark:hover:text-purple-100 dark:ring-purple-950',
    tierName: 'text-purple-600 dark:text-purple-400/80',
    monthly: 'text-purple-950/60 dark:text-purple-50/50',
    feature: 'text-purple-900 dark:text-purple-50',
    tableRowSecond: 'bg-purple-50 dark:bg-purple-800',
    tableRowFirst: 'bg-purple-200 dark:bg-purple-900',
    checkIcon: 'text-purple-600 dark:text-purple-800',
    cta: 'bg-purple-700 text-white hover:bg-purple-600 focus-visible:outline-purple-500 dark:bg-purple-900/80 dark:hover:bg-purple-900 dark:focus-visible:outline-purple-600',
  },
  fuchsia: {
    tagline: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    heading: 'text-fuchsia-900 dark:text-fuchsia-50',
    description: 'text-fuchsia-950/70 dark:text-fuchsia-50/70',
    isActive:
      'bg-fuchsia-700 text-white ring-fuchsia-700 hover:bg-fuchsia-800 dark:bg-fuchsia-900/80 dark:ring-fuchsia-900 dark:hover:bg-fuchsia-900',
    isInactive:
      'bg-transparent text-fuchsia-900 ring-fuchsia-200 hover:bg-fuchsia-50 dark:text-fuchsia-200 dark:hover:bg-fuchsia-900/30 dark:hover:text-fuchsia-100 dark:ring-fuchsia-950',
    tierName: 'text-fuchsia-600 dark:text-fuchsia-400/80',
    monthly: 'text-fuchsia-950/60 dark:text-fuchsia-50/50',
    feature: 'text-fuchsia-900 dark:text-fuchsia-50',
    tableRowSecond: 'bg-fuchsia-50 dark:bg-fuchsia-800',
    tableRowFirst: 'bg-fuchsia-200 dark:bg-fuchsia-900',
    checkIcon: 'text-fuchsia-600 dark:text-fuchsia-800',
    cta: 'bg-fuchsia-700 text-white hover:bg-fuchsia-600 focus-visible:outline-fuchsia-500 dark:bg-fuchsia-900/80 dark:hover:bg-fuchsia-900 dark:focus-visible:outline-fuchsia-600',
  },
  pink: {
    tagline: 'text-pink-600 dark:text-pink-400/80',
    heading: 'text-pink-900 dark:text-pink-50',
    description: 'text-pink-950/70 dark:text-pink-50/70',
    isActive:
      'bg-pink-700 text-white ring-pink-700 hover:bg-pink-800 dark:bg-pink-900/80 dark:ring-pink-900 dark:hover:bg-pink-900',
    isInactive:
      'bg-transparent text-pink-900 ring-pink-200 hover:bg-pink-50 dark:text-pink-200 dark:hover:bg-pink-900/30 dark:hover:text-pink-100 dark:ring-pink-950',
    tierName: 'text-pink-600 dark:text-pink-400/80',
    monthly: 'text-pink-950/60 dark:text-pink-50/50',
    feature: 'text-pink-900 dark:text-pink-50',
    tableRowSecond: 'bg-pink-50 dark:bg-pink-800',
    tableRowFirst: 'bg-pink-200 dark:bg-pink-900',
    checkIcon: 'text-pink-600 dark:text-pink-800',
    cta: 'bg-pink-700 text-white hover:bg-pink-600 focus-visible:outline-pink-500 dark:bg-pink-900/80 dark:hover:bg-pink-900 dark:focus-visible:outline-pink-600',
  },
  rose: {
    tagline: 'text-rose-600 dark:text-rose-400/80',
    heading: 'text-rose-900 dark:text-rose-50',
    description: 'text-rose-950/70 dark:text-rose-50/70',
    isActive:
      'bg-rose-700 text-white ring-rose-700 hover:bg-rose-800 dark:bg-rose-900/80 dark:ring-rose-900 dark:hover:bg-rose-900',
    isInactive:
      'bg-transparent text-rose-900 ring-rose-200 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-rose-900/30 dark:hover:text-rose-100 dark:ring-rose-950',
    tierName: 'text-rose-600 dark:text-rose-400/80',
    monthly: 'text-rose-950/60 dark:text-rose-50/50',
    feature: 'text-rose-900 dark:text-rose-50',
    tableRowSecond: 'bg-rose-50 dark:bg-rose-800',
    tableRowFirst: 'bg-rose-200 dark:bg-rose-900',
    checkIcon: 'text-rose-600 dark:text-rose-800',
    cta: 'bg-rose-700 text-white hover:bg-rose-600 focus-visible:outline-rose-500 dark:bg-rose-900/80 dark:hover:bg-rose-900 dark:focus-visible:outline-rose-600',
  },
};

function generateComponentString({
  isNextjs,
  tagline,
  heading,
  description,
  tiers,
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
  tiers: any[];
  sections: any[];
  maxWidth: string;
  marginArray: string[];
  paddingArray: string[];
  color: string;
  textColor: string;
}) {
  const colorKey = color as keyof typeof colors;
  const textColorKey = textColor as keyof typeof colors;

  function removeHtmlTags(input: string) {
    return input.replace(/<(?!br\s*\/?)[^>]*>/g, '');
  }

  const mappedTiers = tiers.map(
    (tier) => `
  {
    name: '${removeHtmlTags(tier.name)}',
    id: '${tier.id}',
    href: '${tier.href}',
    price: { monthly: '${removeHtmlTags(tier.price.monthly)}', yearly: '${removeHtmlTags(tier.price.yearly)}' },
    description: '${removeHtmlTags(tier.description)}',
    cta: '${removeHtmlTags(tier.cta)}',
  }`,
  );

  const tiersString = `[${mappedTiers.join(',\n')}]`;

  const mappedSections = sections.map(
    (section) => `
  {
    category: '${removeHtmlTags(section.category)}',
    features: [${section.features.map(
      (feature) => `
      {
        name: '${removeHtmlTags(feature.name)}',
        tiers: {
            basic: '${feature.tiers.basic}',
            premium: '${feature.tiers.premium}',
            enterprise: '${feature.tiers.enterprise}',
        },
      }`,
    )}],
  }`,
  );

  const sectionsString = `[${mappedSections.join(',\n')}]`;

  let content: string;

  const nextContent = `/*
The following package is required: npm install clsx
*/

import { Fragment } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

const tiers = ${tiersString};

const sections = ${sectionsString};

export default function Pricing() {
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

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      <div className="mt-14 flex justify-center lg:mt-24">
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isActive}'
              : '${colors[colorKey].isInactive}',
            'rounded-l-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={clsx(
            isMonthly
              ? '${colors[colorKey].isInactive}'
              : '${colors[colorKey].isActive}',
            'rounded-r-md px-10 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          )}
          onClick={() => setIsMonthly(false)}
        >
          Annual
        </button>
      </div>

      {/* MOBILE */}
      <div className="mt-6 xl:hidden">
        {/* MOBILE TIER PLANS */}
        <div className="flex w-full justify-center">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 xl:ml-auto xl:mr-0">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex max-w-xs flex-col justify-between space-y-6 p-6 text-center"
              >
                <div>
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].heading}">
                        {isMonthly ? tier.price.monthly : tier.price.yearly}
                      </span>
                      <span className="${colors[textColorKey].monthly}">
                        {isMonthly ? '/mo' : '/yr'}
                      </span>
                    </p>

                    <p className="${colors[textColorKey].description}">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE SECTIONS */}
        <div className="mt-14 flex flex-col space-y-14">
          {tiers.map((tier) => (
            <div key={tier.id} className="flex flex-col space-y-8">
              <h2 className="text-2xl font-bold leading-tight tracking-wide ${colors[textColorKey].heading}">
                {tier.name}
              </h2>

              {sections.map((section) => (
                <ul key={section.category}>
                  <h3 className="mb-4 text-base font-semibold ${colors[textColorKey].heading}">
                    {section.category}
                  </h3>

                  {section.features.map((feature, index) => (
                    <li
                      key={index}
                      className={clsx(
                        index % 2 !== 0
                          ? '${colors[textColorKey].tableRowSecond}'
                          : '${colors[textColorKey].tableRowFirst}',
                        'flex w-full items-center justify-between p-4',
                      )}
                    >
                      <p className="text-sm ${colors[textColorKey].feature}">
                        {feature.name}
                      </p>
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <p className="text-sm ${colors[textColorKey].feature}">
                          {feature.tiers[tier.id]}
                        </p>
                      ) : feature.tiers[tier.id] ? (
                        <CheckIcon className="h-5 w-5 ${colors[textColorKey].checkIcon}" />
                      ) : (
                        <MinusIcon className="h-5 w-5 ${colors[textColorKey].checkIcon}" />
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mt-14 hidden w-full xl:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>

          <thead>
            <tr>
              <td />
              {tiers.map((tier) => (
                <th key={tier.id} scope="col" className="pb-4">
                  <div
                    id={tier.id}
                    className="text-center text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
                  >
                    {tier.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="px-4 text-center">
                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].heading}">
                        {isMonthly ? tier.price.monthly : tier.price.yearly}
                      </span>
                      <span className="${colors[textColorKey].monthly}">
                        {isMonthly ? '/mo' : '/yr'}
                      </span>
                    </p>

                    <p className="text-center font-normal ${colors[textColorKey].description}">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={tier.href}
                      aria-describedby={tier.id}
                      className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {sections.map((section, sectionIndex) => (
              <Fragment key={section.category}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className={clsx(
                      sectionIndex === 0 ? 'pt-14' : 'pt-20',
                      'pb-6 text-lg font-semibold leading-6 ${colors[textColorKey].heading}',
                    )}
                  >
                    {section.category}
                  </th>
                </tr>

                {section.features.map((feature, index) => (
                  <tr
                    key={index}
                    className={clsx(
                      index % 2 !== 0
                        ? '${colors[textColorKey].tableRowSecond}'
                        : '${colors[textColorKey].tableRowFirst}',
                    )}
                  >
                    <th
                      scope="row"
                      className="p-4 text-sm font-normal leading-6 ${colors[textColorKey].feature}"
                    >
                      {feature.name}
                    </th>

                    {tiers.map((tier) => (
                      <td key={tier.id} className="px-6 py-4 xl:px-8">
                        {typeof feature.tiers[tier.id] === 'string' ? (
                          <p className="text-center text-sm ${colors[textColorKey].feature}">
                            {feature.tiers[tier.id]}
                          </p>
                        ) : feature.tiers[tier.id] ? (
                          <CheckIcon className="mx-auto h-5 w-5 ${colors[textColorKey].checkIcon}" />
                        ) : (
                          <MinusIcon className="mx-auto h-5 w-5 ${colors[textColorKey].checkIcon}" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}

            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="py-10 text-center">
                  <Link
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                  >
                    {tier.cta}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
}`;

  const reactContent = `/*
The following package is required: npm install clsx
*/

import { Fragment } from 'react';

import clsx from 'clsx';

const tiers = ${tiersString};

const sections = ${sectionsString};

export default function Pricing() {
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

        <h2 className="text-4xl font-bold leading-tight tracking-wide xl:text-5xl ${colors[textColorKey].heading}">
          ${removeHtmlTags(heading)}
        </h2>

        <p className="text-lg ${colors[textColorKey].description}">
          ${removeHtmlTags(description)}
        </p>
      </div>

      {/* MOBILE */}
      <div className="mt-14 xl:hidden">
        {/* MOBILE TIER PLANS */}
        <div className="flex w-full justify-center">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 xl:ml-auto xl:mr-0">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex max-w-xs flex-col justify-between space-y-6 p-6 text-center"
              >
                <div>
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].heading}">
                        {tier.price}
                      </span>
                      <span className="${colors[textColorKey].monthly}">
                        /mo
                      </span>
                    </p>

                    <p className="${colors[textColorKey].description}">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE SECTIONS */}
        <div className="mt-14 flex flex-col space-y-14">
          {tiers.map((tier) => (
            <div key={tier.id} className="flex flex-col space-y-8">
              <h2 className="text-2xl font-bold leading-tight tracking-wide ${colors[textColorKey].heading}">
                {tier.name}
              </h2>

              {sections.map((section) => (
                <ul key={section.category}>
                  <h3 className="mb-4 text-base font-semibold ${colors[textColorKey].heading}">
                    {section.category}
                  </h3>

                  {section.features.map((feature, index) => (
                    <li
                      key={index}
                      className={clsx(
                        index % 2 !== 0
                          ? '${colors[textColorKey].tableRowSecond}'
                          : '${colors[textColorKey].tableRowFirst}',
                        'flex w-full items-center justify-between p-4',
                      )}
                    >
                      <p className="text-sm ${colors[textColorKey].feature}">
                        {feature.name}
                      </p>
                      {typeof feature.tiers[tier.id] === 'string' ? (
                        <p className="text-sm ${colors[textColorKey].feature}">
                          {feature.tiers[tier.id]}
                        </p>
                      ) : feature.tiers[tier.id] ? (
                        <CheckIcon className="h-5 w-5 ${colors[textColorKey].checkIcon}" />
                      ) : (
                        <MinusIcon className="h-5 w-5 ${colors[textColorKey].checkIcon}" />
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mt-24 hidden w-full xl:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>

          <thead>
            <tr>
              <td />
              {tiers.map((tier) => (
                <th key={tier.id} scope="col" className="pb-4">
                  <div
                    id={tier.id}
                    className="text-center text-lg font-semibold leading-8 ${colors[textColorKey].tierName}"
                  >
                    {tier.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="px-4 text-center">
                  <div className="mt-2 flex flex-col space-y-4">
                    <p className="flex items-baseline justify-center gap-x-1">
                      <span className="text-5xl font-bold tracking-tight ${colors[textColorKey].heading}">
                        {tier.price}
                      </span>
                      <span className="${colors[textColorKey].monthly}">
                        /mo
                      </span>
                    </p>

                    <p className="text-center font-normal ${colors[textColorKey].description}">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                    >
                      {tier.cta}
                    </a>
                  </div>
                </td>
              ))}
            </tr>

            {sections.map((section, sectionIndex) => (
              <Fragment key={section.category}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className={clsx(
                      sectionIndex === 0 ? 'pt-14' : 'pt-20',
                      'pb-6 text-lg font-semibold leading-6 ${colors[textColorKey].heading}',
                    )}
                  >
                    {section.category}
                  </th>
                </tr>

                {section.features.map((feature, index) => (
                  <tr
                    key={index}
                    className={clsx(
                      index % 2 !== 0
                        ? '${colors[textColorKey].tableRowSecond}'
                        : '${colors[textColorKey].tableRowFirst}',
                    )}
                  >
                    <th
                      scope="row"
                      className="p-4 text-sm font-normal leading-6 ${colors[textColorKey].feature}"
                    >
                      {feature.name}
                    </th>

                    {tiers.map((tier) => (
                      <td key={tier.id} className="px-6 py-4 xl:px-8">
                        {typeof feature.tiers[tier.id] === 'string' ? (
                          <p className="text-center text-sm ${colors[textColorKey].feature}">
                            {feature.tiers[tier.id]}
                          </p>
                        ) : feature.tiers[tier.id] ? (
                          <CheckIcon className="mx-auto h-5 w-5 ${colors[textColorKey].checkIcon}" />
                        ) : (
                          <MinusIcon className="mx-auto h-5 w-5 ${colors[textColorKey].checkIcon}" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}

            <tr>
              <th scope="row">
                <span className="sr-only">Price</span>
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="py-10 text-center">
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="rounded-md px-10 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colors[colorKey].cta}"
                  >
                    {tier.cta}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
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
    tiers,
    sections,
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
    tiers,
    sections,
    paddingArray,
    marginArray,
    maxWidth,
    color,
    textColor,
  });

  importStatements.push(`import Pricing9 from './components/Pricing9';`);
  componentContent.push('<Pricing9 />');
  return zip.file('components/Pricing9.jsx', content);
}

Pricing9.craft = {
  props: {
    tagline: 'Tagline',
    heading: 'Short heading goes in here',
    description:
      'Commodo in viverra nunc, ullamcorper ut.\n Non, amet, aliquet scelerisque falseam sagittis, pulvinar.',
    tiers: tiers,
    sections: sections,
    selectedTierFeature: {
      sectionIdx: 0,
      featureIdx: 0,
      tierId: 'basic',
      isString: false,
      isCheck: false,
      name: '',
    },
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
