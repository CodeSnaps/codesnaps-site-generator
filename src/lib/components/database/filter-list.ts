interface FilterList {
  name: string;
  value: string;
}

const categories: Array<FilterList> = [
  { name: 'All', value: 'all' },
  { name: 'Blog', value: 'blog' },
  { name: 'Contact', value: 'contact' },
  { name: 'CTA', value: 'cta' },
  { name: 'FAQ', value: 'faq' },
  { name: 'Feature', value: 'feature' },
  { name: 'Footer', value: 'footer' },
  { name: 'Gallery', value: 'gallery' },
  { name: 'Header', value: 'header' },
  { name: 'Hero', value: 'hero' },
  { name: 'Logos', value: 'logos' },
  { name: 'Navbar', value: 'navbar' },
  { name: 'Pricing', value: 'pricing' },
  { name: 'Team', value: 'team' },
  { name: 'Testimonial', value: 'testimonial' },
];

const textLayout: Array<FilterList> = [
  { name: 'Text Align Left', value: 'text-align-left' },
  { name: 'Text Align Center', value: 'text-align-center' },
];

const visualLayout: Array<FilterList> = [
  { name: 'Video/Image Left', value: 'video-image-left' },
  { name: 'Video/Image Center', value: 'video-image-center' },
  { name: 'Video/Image Right', value: 'video-image-right' },
];

const columnLayout: Array<FilterList> = [
  { name: '1 Column', value: '1-column' },
  { name: '2 Columns', value: '2-columns' },
  { name: '3 Columns', value: '3-columns' },
  { name: '4 Columns', value: '4-columns' },
  { name: '5+ Columns', value: '5-or-more-columns' },
];

const elementsProps: Array<FilterList> = [
  { name: 'Accordion', value: 'accordion' },
  { name: 'Animation', value: 'animation' },
  { name: 'Background Image', value: 'background-image' },
  { name: 'Background Video', value: 'background-video' },
  { name: 'Banner', value: 'banner' },
  { name: 'Buttons', value: 'buttons' },
  { name: 'Cards', value: 'cards' },
  { name: 'Checkboxes', value: 'checkboxes' },
  { name: 'Dropdown', value: 'dropdown' },
  { name: 'Filters', value: 'filters' },
  { name: 'Forms', value: 'forms' },
  { name: 'Icons', value: 'icons' },
  { name: 'Image', value: 'image' },
  { name: 'Image Focus', value: 'image-focus' },
  { name: 'List', value: 'list' },
  { name: 'Loading Animation', value: 'loading-animation' },
  { name: 'Logos', value: 'logos' },
  { name: 'Modal', value: 'modal' },
  { name: 'Multiple Images', value: 'multiple-images' },
  { name: 'Navbar', value: 'navbar' },
  { name: 'Pagination', value: 'pagination' },
  { name: 'Progress Bar', value: 'progress-bar' },
  { name: 'Radio Buttons', value: 'radio-buttons' },
  { name: 'Rich Text', value: 'rich-text' },
  { name: 'Search Bar', value: 'search-bar' },
  { name: 'Side Panel', value: 'side-panel' },
  { name: 'Sidebar', value: 'sidebar' },
  { name: 'Slider', value: 'slider' },
  { name: 'Table of Contents', value: 'table-of-contents' },
  { name: 'Tabs', value: 'tabs' },
  { name: 'Tags', value: 'tags' },
  { name: 'Text Only', value: 'text-only' },
  { name: 'Toggles', value: 'toggles' },
  { name: 'Video Focus', value: 'video-focus' },
];

const layoutProperties: Array<FilterList> = [
  { name: 'Text Align Left', value: 'text-align-left' },
  { name: 'Text Align Center', value: 'text-align-center' },
  { name: 'Video/Image Left', value: 'video-image-left' },
  { name: 'Video/Image Center', value: 'video-image-center' },
  { name: 'Video/Image Right', value: 'video-image-right' },
  { name: '1 Column', value: '1-column' },
  { name: '2 Columns', value: '2-columns' },
  { name: '3 Columns', value: '3-columns' },
  { name: '4 Columns', value: '4-columns' },
  { name: '5+ Columns', value: '5-or-more-columns' },
];

const tabs: Array<FilterList> = [
  { name: 'Next.js', value: 'nextjs' },
  { name: 'React', value: 'react' },
  { name: 'Animation React', value: 'animationReact' },
  { name: 'Animation Next.js', value: 'animationNextjs' },
];

const allProperties: Array<FilterList> = [
  ...textLayout,
  ...visualLayout,
  ...columnLayout,
  ...elementsProps,
];

export {
  categories,
  textLayout,
  visualLayout,
  columnLayout,
  elementsProps,
  layoutProperties,
  allProperties,
  tabs,
};
