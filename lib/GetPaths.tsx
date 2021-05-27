import { createContentfulClient } from '@lib/ContentfulClient';
const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN

export async function GetPaths(contentType: string, catchAll?: boolean) {
  const client = createContentfulClient();

  let paths;

  const posts = await client
    .getEntries({ content_type: contentType})
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
    fallback: 'blocking', //blocking
  };
}

export default GetPaths;
