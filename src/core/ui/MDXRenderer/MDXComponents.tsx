import Image from 'next/image';
import { forwardRef } from 'react';

import classNames from 'clsx';

import LazyRender from '~/core/ui/LazyRender';
import ClientOnly from '~/core/ui/ClientOnly';

import configuration from '~/configuration';

const NextImage: React.FCC<
  StringObject & {
    width: number;
    height: number;
  }
> = (props) => {
  const className = classNames(props.class, `object-cover`);

  return (
    <Image className={className} src={props.src} alt={props.alt} {...props} />
  );
};

const ExternalLink = forwardRef<
  React.ElementRef<'a'>,
  React.AnchorHTMLAttributes<unknown>
>(function ExternalLink(props, ref) {
  const siteUrl = configuration.site.siteUrl ?? '';
  const href = props.href ?? '';
  const isRoot = href[0] === '/';
  const isInternalLink = href.startsWith(siteUrl) || isRoot;

  if (isInternalLink) {
    return (
      <a {...props} ref={ref} href={href}>
        {props.children}
      </a>
    );
  }

  return (
    <a
      href={href}
      ref={ref}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
});

const Video: React.FCC<{
  src: string;
  width?: string;
  type?: string;
}> = ({ src, type, width }) => {
  const useType = type ?? 'video/mp4';

  return (
    <ClientOnly>
      <LazyRender rootMargin={'-200px 0px'}>
        <video
          className="my-4"
          width={width ?? `100%`}
          height="auto"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={src} type={useType} />
        </video>
      </LazyRender>
    </ClientOnly>
  );
};

const InlineCode: React.FC<{ code: string }> = ({ code }) => {
  return (
    <code className="py-0.5 px-1 bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white rounded-sm text-sm">
      {code}
    </code>
  );
};

const YouTubeVideo = ({ videoId }: { videoId: String }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="my-14">
      <h2>📺 Video Tutorial</h2>
      <p>
        If you prefer to watch a video tutorial instead, here you go! 👇
        <br />
        If not, you can skip this section and continue reading the article
        below.
      </p>

      <ClientOnly>
        <LazyRender rootMargin={'-200px 0px'}>
          <div className="my-4">
            <iframe
              width="100%"
              height="400"
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </LazyRender>
      </ClientOnly>
    </div>
  );
};

const KeyTakeaways = ({ items }: { items: string[] }) => {
  return (
    <div className="pb-6 px-8 border-2 border-blue-500 dark:border-blue-400 rounded-xl my-14 bg-blue-400/10">
      <h2>👨🏻‍💻 Here's What You'll Learn</h2>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const ReadingReferences = ({
  items,
}: {
  items: { name: string; href: string }[];
}) => {
  return (
    <div className="pb-6 px-8 border-2 border-neutral-500 dark:border-neutral-400 rounded-xl mt-10 mb-4 bg-neutral-400/20">
      <h3>📚 Materials/References</h3>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Components = {
  img: NextImage,
  a: ExternalLink,
  Video,
  Image: NextImage,
  InlineCode,
  YouTubeVideo,
  KeyTakeaways,
  Materials: ReadingReferences,
};

export default Components;
