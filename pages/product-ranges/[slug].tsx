import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '@components/Tile/'
import { fetchProductRange, fetchRanges, fetchRangeProducts } from '@utils/contentfulPosts';
import { PageProvider } from '@utils/contexts.js';

export default function ProductRange({ranges, products}) {
    const data = ranges[0];

    const breadcrumbs = [{
        label: 'Product Ranges',
        link: '/product-ranges'
    },{
        label: data?.title
    },];
    return (
        <PageProvider value="product-ranges">
        <Layout
        sidebarType="none"
        breadcrumbs={breadcrumbs}
        title={data?.title}>
            {false && <p>{data?.content}</p>}
            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1 m-auto">
                {products && products?.map((post,i) =>
                    <Tile
                        href={`/product/${data?.slug}/${post?.slug}`}
                        title={post?.title}
                        size="default"
                        border={false}
                        highlight={data?.title}
                        image={post?.thumbnail?.fields?.file?.url}
                        key={i} />
                )}
            </div>
        </Layout>
        </PageProvider>
    );
  }

  export async function getStaticPaths() {
    const products = await fetchRanges();
    const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const resR = await fetchProductRange(slug);
    const resP = await fetchRangeProducts(slug);

    const ranges = await resR.map((p) => {
      return p.fields
    })

    const products = await resP.map((p) => {
        return p.fields
    })

    return {
      props: {
        ranges,
        products,
      },
    }
  }

