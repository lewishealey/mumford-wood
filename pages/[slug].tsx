import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { fetchPage, fetchPages } from '@utils/contentfulPosts'

export default function Page({ page }) {
    const data = page[0];
    // console.log(data);
    return (
        <Layout
        title={data?.title}>
            Hello from a page {data?.title} {data?.slug}
        </Layout>
    );
  }

  export async function getStaticPaths() {
    // Query Contentful for all products in the space
    const products = await fetchPages();

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    const paths = products.map(({ fields: { slug, type, range } }) => ({ params: { slug, type, range } }))
    //const paths = [];
    return {
      paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const res = await fetchPage(slug);

    const page = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        page
      },
    }
  }

