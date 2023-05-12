import type { Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';

import PostPreview from '~/app/(site)/blog/components/PostPreview';
import GridList from '~/app/(site)/components/GridList';
import Container from '~/core/ui/Container';
import Hero from '~/core/ui/Hero';
import SubHeading from '~/core/ui/SubHeading';

import configuration from '~/configuration';

export const metadata: Metadata = {
  title: `Blog - ${configuration.site.siteName}`,
  description: `Tutorials, Guides and Updates from our team`,
};

async function BlogPage() {
  return (
    <Container>
      <div className={'flex flex-col space-y-16'}>
        <div className={'flex flex-col items-center justify-center'}>
          <Hero>Blog</Hero>

          <SubHeading>Tutorials, Guides and Updates from our team</SubHeading>
        </div>

        <GridList>
          {allPosts.map((post, idx) => {
            return <PostPreview key={idx} post={post} />;
          })}
        </GridList>
      </div>
    </Container>
  );
}

export default BlogPage;
