import { createContentfulClient } from '@lib/ContentfulClient';

export async function GetPaths(contentType: string, catchAll?: boolean) {
  const client = createContentfulClient();

  let paths;

  const posts = await client
    .getEntries({ content_type: contentType, include: 0 })
    .then((response) => response.items);

  if (catchAll === true) {
    paths = posts.map(({ fields: { slug } }) => ({
      params: { slug: [slug] },
    }));
  } else {
    paths = posts.map(({ fields: { slug } }) => ({
      params: { slug },
    }));
  }

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default GetPaths;
