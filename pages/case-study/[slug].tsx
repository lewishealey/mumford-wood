import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { fetchArticles, fetchCaseStudy } from '@utils/contentfulPosts'

export default function CaseStudy({ page }) {
    const data = page[0];
    return (
        <Layout
        title={data?.title}>
            Hello from a page {data?.title} {data?.slug}
        </Layout>
    );
  }

  export async function getStaticPaths() {
    // Query Contentful for all products in the space
    const products = await fetchArticles();

    const paths = products.map(({ fields: { slug, type, range } }) => ({ params: { slug, type, range } }))
    //const paths = [];
    return {
      paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const res = await fetchCaseStudy(slug);

    const page = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        page
      },
    }
  }

