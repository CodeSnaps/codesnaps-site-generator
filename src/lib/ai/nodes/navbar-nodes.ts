export const freeNavbarNodes = [
  {
    type: { resolvedName: 'Navbar1' },
    isCanvas: false,
    props: {
      primaryCta: '',
      secondaryCta: '',
      navigation: [
        { name: '', href: '#', dropdown: false },
        { name: '', href: '#', dropdown: false },
        {
          name: '',
          dropdown: true,
          dropdownItems: [
            {
              name: '',
              href: '#',
            },
            {
              name: '',
              href: '#',
            },
            {
              name: '',
              href: '#',
            },
          ],
        },
      ],
    },
    displayName: 'Navbar1',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Navbar2' },
    isCanvas: false,
    props: {
      primaryCta: '',
      navigation: [
        { name: '', href: '#' },
        { name: '', href: '#' },
        { name: '', href: '#' },
      ],
    },
    displayName: 'Navbar2',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Navbar3' },
    isCanvas: false,
    props: {
      primaryCta: '',
      navigation: [
        { name: '', href: '#' },
        { name: '', href: '#' },
        { name: '', href: '#' },
      ],
    },
    displayName: 'Navbar3',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
];

export const navbarNodes = [...freeNavbarNodes];
