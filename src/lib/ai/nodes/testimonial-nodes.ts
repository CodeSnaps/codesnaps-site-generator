export const freeTestimonialNodes = [
  {
    type: { resolvedName: 'Testimonial1' },
    isCanvas: false,
    props: {
      testimonial: `Minimum 2-3 sentences`,
      name: '',
      position: '',
      company: '',
    },
    displayName: 'Testimonial1',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  {
    type: { resolvedName: 'Testimonial2' },
    isCanvas: false,
    props: {
      heading: 'Maximum 7 words',
      description: 'Minimum 2-3 sentences',
      testimonials: [
        {
          id: 1,
          name: '',
          position: '',
          company: '',
          imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
          content: '"Minimum 1-2 sentences"',
        },
        {
          id: 2,
          name: '',
          position: '',
          company: '',
          imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
          content: '"Minimum 1-2 sentences"',
        },
        {
          id: 3,
          name: '',
          position: '',
          company: '',
          imgSrc: 'https://dummyimage.com/100x100/d4d4d4/171717',
          content: '"Minimum 1-2 sentences"',
        },
      ],
    },
    displayName: 'Testimonial2',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
];

export const testimonialNodes = [...freeTestimonialNodes];
