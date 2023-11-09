import type { Post } from 'contentlayer/generated';

import If from '~/core/ui/If';

import DateFormatter from './DateFormatter';
import CoverImage from './CoverImage';

const PostHeader: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { title, date, readingTime, description, image } = post;

  // NB: change this to display the post's image
  const displayImage = true;
  const preloadImage = true;

  return (
    <div className={'flex flex-col space-y-4 mb-8'}>
      <div className={'flex flex-col space-y-4'}>
        <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
          {title}
        </h1>

        <h2 className="flex flex-col space-y-1 bg-gradient-to-br text-xl dark:from-white dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-neutral-500 font-normal dark:text-transparent">
          {description}
        </h2>
      </div>

      <div className="flex">
        <div className="flex flex-row items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <DateFormatter dateString={date} />
          </div>

          <span>·</span>
          <span>{readingTime} minutes reading</span>
        </div>
      </div>

      <If condition={displayImage && image}>
        {(imageUrl) => (
          <div className="relative mx-auto h-[378px] w-full justify-center">
            <CoverImage
              preloadImage={preloadImage}
              className="rounded-md"
              title={title}
              src={imageUrl}
            />
          </div>
        )}
      </If>
    </div>
  );
};

export default PostHeader;
