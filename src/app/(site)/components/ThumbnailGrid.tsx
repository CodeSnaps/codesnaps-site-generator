import Image from 'next/image';
import Link from 'next/link';

const items = [
  {
    id: 1,
    image: '/assets/images/thumbnails/blog.webp',
    title: 'Blog Sections',
  },
  {
    id: 2,
    image: '/assets/images/thumbnails/contact.webp',
    title: 'Contact Sections',
  },
  {
    id: 3,
    image: '/assets/images/thumbnails/cta.webp',
    title: 'CTA Sections',
  },
  {
    id: 4,
    image: '/assets/images/thumbnails/faq.webp',
    title: 'FAQ Sections',
  },
  {
    id: 5,
    image: '/assets/images/thumbnails/feature.webp',
    title: 'Feature Sections',
  },
  {
    id: 6,
    image: '/assets/images/thumbnails/footer.webp',
    title: 'Footer Sections',
  },
  {
    id: 7,
    image: '/assets/images/thumbnails/gallery.webp',
    title: 'Gallery Sections',
  },
  {
    id: 8,
    image: '/assets/images/thumbnails/header.webp',
    title: 'Header Sections',
  },
  {
    id: 9,
    image: '/assets/images/thumbnails/hero.webp',
    title: 'Hero Sections',
  },
  {
    id: 10,
    image: '/assets/images/thumbnails/pricing.webp',
    title: 'Pricing Sections',
  },
  {
    id: 11,
    image: '/assets/images/thumbnails/team.webp',
    title: 'Team Sections',
  },
  {
    id: 12,
    image: '/assets/images/thumbnails/testimonial.webp',
    title: 'Testimonial Sections',
  },
];

function ThumbnailGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Link href="/browse" key={item.id}>
          <div className="group">
            <div className="flex flex-col p-2 group-hover:bg-neutral-200/40 group-hover:dark:bg-neutral-800 rounded-md">
              <Image
                src={item.image}
                width={300}
                height={150}
                alt={item.title}
                className="rounded-md shadow-sm"
              />
              <h4 className="text-sm font-semibold mt-4 mb-3.5">
                {item.title}
              </h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ThumbnailGrid;
