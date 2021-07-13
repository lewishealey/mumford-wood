import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Layout from "src/layouts/Layout";
import Tile from "@components/Tile/";
import {
  fetchProductRange,
  fetchRanges,
  fetchRangeProducts,
  fetchBrochures,
} from "@utils/contentfulPosts";
import { BrochureProvider } from "@utils/brochureContexts";
import { PageProvider } from "@utils/contexts.js";

export default function ProductRange({ ranges, products, brochures }) {
  const data = ranges[0];
  const router = useRouter();

  const breadcrumbs = [
    {
      label: "Product Ranges",
      link: "/product-ranges",
    },
    {
      label: data?.title,
    },
  ];

  return (
    <PageProvider value="product-ranges">
      <BrochureProvider value={brochures}>
        <Layout
          id={data?.slug}
          sidebarType="none"
          breadcrumbs={breadcrumbs}
          title={data?.title}
        >
          <NextSeo
            title={`${data?.title} | Mumford & Wood`}
            description={`View product ranges for the ${data?.title} range at Mumford & Wood`}
            canonical="https://www.canonical.ie/"
            openGraph={{
              url: `https://mumfordwood.com${router.asPath}`,
              title: `${data?.title} | Mumford & Wood`,
              description: `View product ranges for the ${data?.title} range at Mumford & Wood`,
              site_name: "Mumford & Wood",
            }}
            twitter={{
              handle: "@MumfordWood",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
          {false && <p>{data?.content}</p>}
          <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1 m-auto">
            {products &&
              products?.map((post, i) => (
                <Tile
                  href={`/product/${data?.slug}/${post?.slug}`}
                  title={`${post?.title}`}
                  size="default"
                  style={post?.range?.replace("-range", "")}
                  border={false}
                  highlight={data?.title}
                  image={post?.thumbnail?.fields?.file?.url}
                  key={`${post?.slug}- ${Math.random()}`}
                />
              ))}
          </div>
        </Layout>
      </BrochureProvider>
    </PageProvider>
  );
}

export async function getStaticPaths() {
  const products = await fetchRanges();
  const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const resR = await fetchProductRange(slug);
  const resP = await fetchRangeProducts(slug);

  const ranges = await resR.map((p) => {
    return p.fields;
  });

  const products = await resP.map((p) => {
    return p.fields;
  });

  const b = await fetchBrochures();
  const brochures = await b.map((p) => {
    return p.fields;
  });

  return {
    props: {
      ranges,
      products,
      brochures,
    },
  };
}
