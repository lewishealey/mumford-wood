import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { fetchArticles, fetchCaseStudy } from '@utils/contentfulPosts'
import { PageProvider } from '@utils/contexts.js';


export default function CaseStudy({ page }) {
    const data = page[0];

    const breadcrumbs = [{
        label: 'Case Studies',
        link: '/case-studies'
    },{
        label: data?.title,
    }];


    return (
        <PageProvider value="case-studies">
            <Layout
            title={data?.title}
            breadcrumbs={breadcrumbs}>
                Hello from a page {data?.title} {data?.slug}
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticPaths() {
    // Query Contentful for all products in the space
    const products = await fetchCaseStudy();

    const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }))
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

