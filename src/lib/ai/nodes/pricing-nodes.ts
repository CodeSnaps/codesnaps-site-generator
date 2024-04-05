export const freePricingNodes = [
  {
    type: { resolvedName: 'Pricing1' },
    isCanvas: false,
    props: {
      tagline: '1-3 words. Separate from the heading',
      heading: 'Maximum 7 words',
      description: 'Minimum 2-3 sentences',
      tiers: [
        {
          name: '',
          id: 'tier-',
          href: '#',
          price: { monthly: '$', annually: '$' },
          features: ['', '', ''],
          cta: '',
        },
        {
          name: '',
          id: 'tier-',
          href: '#',
          price: { monthly: '$', annually: '$' },
          features: ['', '', '', ''],
          cta: '',
        },
        {
          name: '',
          id: 'tier-',
          href: '#',
          price: { monthly: '$', annually: '$' },
          features: ['', '', '', '', ''],
          cta: '',
        },
      ],
    },
    displayName: 'Pricing1',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
];

export const pricingNodes = [...freePricingNodes];
