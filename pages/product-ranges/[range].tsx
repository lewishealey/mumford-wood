import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '@components/Tile/'
import { fetchProductRange, fetchProducts, fetchRangeProducts } from '@utils/contentfulPosts'

export default function ProductRange({ranges}) {
    const data = ranges[0];
    // console.log(products, data);
    return (
        <Layout
        title={data?.title}>
            <p>{data?.content}</p>
            <div className="grid grid-cols-3 gap-1">
                {/* {products && products?.map((post,i) =>
                    <Tile
                        href={`/product-ranges/${data?.slug}/${post?.slug}`}
                        title={post?.title}
                        size="compact"
                        border={false}
                        highlight={data?.title}
                        image={post?.thumbnail?.fields?.file?.url}
                        key={i} />
                )} */}
            </div>
        </Layout>
    );
  }

  export async function getStaticPaths() {
    // Query Contentful for all products in the space
    const products = await fetchProducts();

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    // const paths = products.map(({ fields: { range } }) => ({ params: { range } }))
    const paths = [];
    return {
      paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { range } = context.params;
    const res = await fetchProductRange(range);

    const ranges = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        ranges,
      },
    }
  }

