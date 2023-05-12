import React from 'react';
import { Post } from 'contentlayer/generated';

import PostBody from './PostBody';
import PostHeader from './PostHeader';

const Post: React.FCC<{
  post: Post;
  content: string;
}> = ({ post, content }) => {
  return (
    <div className={'mx-auto max-w-2xl'}>
      <PostHeader post={post} />

      <article className={'mx-auto flex justify-center md:mt-2'}>
        <PostBody content={content} />
      </article>
    </div>
  );
};

export default Post;
