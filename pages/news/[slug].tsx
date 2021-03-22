import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { fetchArticle } from '@utils/contentfulPosts'

export default function Article({ page }) {
    const data = page[0];
    return (
        <Layout
        title={data?.title}>
            Hello from a page {data?.title} {data?.slug}
        </Layout>
    );
  }

  export async function getStaticPaths() {
    const products = await fetchArticle();
    const paths = products.map(({ fields: { slug, type, range } }) => ({ params: { slug, type, range } }))
    return {
      paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const res = await fetchArticle(slug);

    const page = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        page
      },
    }
  }

