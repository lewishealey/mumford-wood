import React from 'react';
import { fetchProduct, fetchProducts } from '@utils/contentfulPosts'
import Layout from 'src/layouts/Layout';

export default function Product({product}) {
    const data = product[0];
    console.log(product);

    return (
        <Layout
        title={data?.title}
        image={data?.hero?.fields?.file?.url}
        border>
            Hello
        </Layout>
    );
  }

  export async function getStaticPaths() {
    // Query Contentful for all products in the space
    const products = await fetchProducts();

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    const paths = products.map(({ fields: { slug, range } }) => ({ params: { slug, range } }))
    //const paths = [];
    return {
      paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { range, slug } = context.params;
    const res = await fetchProduct(range, slug);

    const product = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        product,
      },
    }
  }

