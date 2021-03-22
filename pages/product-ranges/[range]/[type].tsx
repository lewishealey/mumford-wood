import React from 'react';
import { useRouter } from 'next/router';
import { fetchProduct, fetchProducts } from '@utils/contentfulPosts'
import { route } from 'next/dist/next-server/server/router';

export default function Product({product}) {
    const router = useRouter();
    // console.log(product)
    return (
        <>
            Hello
        </>
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
    const { range, type } = context.params;
    const res = await fetchProduct(range, type);

    const product = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        product,
      },
    }
  }

