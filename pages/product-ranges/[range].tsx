import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '@components/Tile/'
import { fetchProductRange, fetchProducts, fetchRangeProducts } from '@utils/contentfulPosts';
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
        sidebar="none"
        breadcrumbs={breadcrumbs}
        title={data?.title}>
            {false && <p>{data?.content}</p>}
            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-1">
                {products && products?.map((post,i) =>
                    <Tile
                        href={`/product-ranges/${data?.slug}/${post?.slug}`}
                        title={post?.title}
                        size="compact"
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
    // Query Contentful for all products in the space
    const products = await fetchProducts();

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
    const { range } = context.params;
    const resR = await fetchProductRange(range);
    const resP = await fetchRangeProducts(range);

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

