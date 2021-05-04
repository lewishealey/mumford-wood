import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/layouts/Layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';
import { fetchArticle, fetchArticles, fetchSalesTeam, fetchBrochures } from '@utils/contentfulPosts';
import { PageProvider } from '@utils/contexts.js';
import { SalesProvider } from '@utils/salesContexts';
import { BrochureProvider } from '@utils/brochureContexts';

export default function Article({ page, products, paths, salesTeam, brochures }) {
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
            <SalesProvider value={salesTeam}>
            <BrochureProvider value={brochures}>
                <Layout
                title={data?.title}
                breadcrumbs={breadcrumbs}>
                    Hello from a page {data?.title} {data?.slug}
                    {documentToReactComponents(data?.content,options)}
                </Layout>
                </BrochureProvider>
            </SalesProvider>
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
    const sales = await fetchSalesTeam();
    const salesT = await sales.map((p) => {
        return p.fields
    })

    const page = await res.map((p) => {
      return p.fields
    });

    const b = await fetchBrochures();
    const brochures = await b.map((p) => {
        return p.fields
    });

    return {
      props: {
        page,
        products,
        paths,
        salesTeam: salesT,
        brochures
      },
    }
  }

