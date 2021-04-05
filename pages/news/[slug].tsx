import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { fetchArticle, fetchArticles } from '@utils/contentfulPosts';
import { PageProvider } from '@utils/contexts.js';

export default function Article({ page, products, paths }) {
    const data = page[0];

    console.log(products, paths)

    const breadcrumbs = [{
        label: 'News',
        link: '/news'
    },{
        label: data?.title
    }];

    return (
        <PageProvider value="news">
            <Layout
            title={data?.title}
            breadcrumbs={breadcrumbs}>
                Hello from a page {data?.title} {data?.slug}
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticPaths() {
    const products = await fetchArticles();
    const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }));

    return {
        paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const res = await fetchArticle(slug);

    const products = await fetchArticles();
    const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }));


    const page = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        page,
        products,
        paths
      },
    }
  }

