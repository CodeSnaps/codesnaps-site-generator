import type { Post } from 'contentlayer/generated';

import If from '~/core/ui/If';
import SubHeading from '~/core/ui/SubHeading';
import Hero from '~/core/ui/Hero';

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
    <>
      <Hero>{title}</Hero>

      <SubHeading>{description}</SubHeading>

      <div className="mx-auto mb-4 mt-6 flex">
        <div className="flex flex-row items-center space-x-2 text-sm text-gray-600 dark:text-gray-200">
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
    </>
  );
};

export default PostHeader;
