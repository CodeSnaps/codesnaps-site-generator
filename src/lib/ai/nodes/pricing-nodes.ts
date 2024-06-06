export const freePricingNodes = [
  {
    type: { resolvedName: 'Pricing1' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', annually: 'ACTION: e.g. $100' },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
          ],
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', annually: 'ACTION: e.g. $100' },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
            'ACTION: 1 sentence feature #4',
          ],
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', annually: 'ACTION: e.g. $100' },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
            'ACTION: 1 sentence feature #4',
            'ACTION: 1 sentence feature #5',
          ],
          cta: 'ACTION: 1-2 words',
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

export const pricingNodes = [
  ...freePricingNodes,
  {
    type: { resolvedName: 'Pricing2' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tier: {
        name: 'ACTION: tier name',
        id: 'ACTION: insert id',
        href: '#',
        price: { monthly: 'ACTION: e.g. $10', annually: 'ACTION: e.g. $100' },
        features: [
          'ACTION: 1 sentence feature #1',
          'ACTION: 1 sentence feature #2',
          'ACTION: 1 sentence feature #3',
          'ACTION: 1 sentence feature #4',
        ],
        cta: 'ACTION: 1-2 words',
      },
    },
    displayName: 'Pricing2',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing3' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
      ],
      sections: [
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
      ],
    },
    displayName: 'Pricing3',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing4' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tier: {
        name: 'ACTION: tier name',
        id: 'ACTION: insert id',
        href: '#',
        price: { monthly: 'ACTION: e.g. $10', annually: 'ACTION: e.g. $100' },
        features: [
          'ACTION: 1 sentence feature #1',
          'ACTION: 1 sentence feature #2',
          'ACTION: 1 sentence feature #3',
          'ACTION: 1 sentence feature #4',
        ],
        cta: 'ACTION: 1-2 words',
      },
    },
    displayName: 'Pricing4',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing5' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: {
            monthly: 'ACTION: e.g. $10',
            annually: 'ACTION: e.g. 100$',
            discount: 'ACTION: e.g. Save ...20%',
          },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
          ],
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: {
            monthly: 'ACTION: e.g. $10',
            annually: 'ACTION: e.g. 100$',
            discount: 'ACTION: e.g. Save ...20%',
          },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
            'ACTION: 1 sentence feature #4',
          ],
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: follow the format tier-i',
          href: '#',
          price: {
            monthly: 'ACTION: e.g. $10',
            annually: 'ACTION: e.g. 100$',
            discount: 'ACTION: e.g. Save ...20%',
          },
          features: [
            'ACTION: 1 sentence feature #1',
            'ACTION: 1 sentence feature #2',
            'ACTION: 1 sentence feature #3',
            'ACTION: 1 sentence feature #4',
            'ACTION: 1 sentence feature #5',
          ],
          cta: 'ACTION: 1-2 words',
        },
      ],
    },
    displayName: 'Pricing5',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing6' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
      ],
      sections: [
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
      ],
    },
    displayName: 'Pricing6',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing7' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
      ],
      sections: [
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
      ],
    },
    displayName: 'Pricing7',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing8' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: 'ACTION: Insert price in $',
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
      ],
      sections: [
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
      ],
    },
    displayName: 'Pricing8',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Pricing9' },
    isCanvas: false,
    props: {
      tagline: 'ACTION: 1-3 words. Separate from the heading',
      heading: 'ACTION: Maximum 7 words',
      description: 'ACTION: Minimum 2-3 sentences',
      tiers: [
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
        {
          name: 'ACTION: tier name',
          id: 'ACTION: insert id',
          href: '#',
          price: { monthly: 'ACTION: e.g. $10', yearly: 'ACTION: e.g. 100$' },
          description: 'ACTION: 1 sentence',
          cta: 'ACTION: 1-2 words',
        },
      ],
      sections: [
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
        {
          category: 'ACTION: Insert category name',
          features: [
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: true,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: true,
                enterprise: true,
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: 'ACTION: 1 word',
                premium: 'ACTION: 1 word',
                enterprise: 'ACTION: 1 word',
              },
            },
            {
              name: 'ACTION: Insert feature name',
              tiers: {
                basic: false,
                premium: false,
                enterprise: true,
              },
            },
          ],
        },
      ],
    },
    displayName: 'Pricing9',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
];
