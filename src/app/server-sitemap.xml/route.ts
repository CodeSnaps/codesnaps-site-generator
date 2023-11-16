import { join } from 'path';
import { getServerSideSitemap } from 'next-sitemap';
import { allPosts } from 'contentlayer/generated';
import configuration from '~/configuration';

import { categories } from '~/lib/components/database/filter-list';

const siteUrl = configuration.site.siteUrl as string;

if (!siteUrl) {
  throw new Error(`Invalid "siteUrl", please fix in configuration.ts`);
}

export async function GET() {
  const urls = getSiteUrls();
  const posts = getPostsSitemap();
  const components = getAllComponents();

  return getServerSideSitemap([...urls, ...posts, ...components]);
}

function getSiteUrls() {
  const urls = ['', 'faq', 'pricing', 'browse-components'];

  return urls.map((url) => {
    return {
      loc: join(siteUrl, url),
      lastmod: new Date().toISOString(),
    };
  });
}

function getPostsSitemap() {
  return allPosts.map((post) => {
    return {
      loc: join(siteUrl, post.url),
      lastmod: new Date().toISOString(),
    };
  });
}

function getAllComponents() {
  const remainingCategories = categories.slice(1);

  return remainingCategories.map((category) => {
    return {
      loc: join(siteUrl, category.href),
      lastmod: new Date().toISOString(),
    };
  });
}
