import { addApolloState, initializeApollo } from '@lib/ApolloClient';
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export async function GetApolloState(
  query: any,
  slug?: string,
  preview?: boolean,
) {
  const apolloClient = initializeApollo();
  let context = {};
  if (preview) {
    context = {
      headers: {
        authorization: `Bearer LHmzxdmsRkUHfCMeMHwNJT2iL5C-kiaBi-eZBi1-PSc`
      },
    };
  } else {
    preview = false;
  }

//   const data = {};
//   const loading = false;
//   const error = false;

  const { data, loading, error } = await apolloClient.query({
    query: query,
    variables: {
      slug: slug,
      preview: preview,
    },
    context: context,
    revalidate: preview ? 1 : 30,
  });

  if (!data || error) {
    return {
      redirect: {
        destination: '404',
        permanent: false,
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      data,
      loading,
      error: error ? error : null,
      preview,
    },
  });
}

export default GetApolloState;
