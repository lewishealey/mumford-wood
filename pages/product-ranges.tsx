import React from "react";
import { NextSeo } from "next-seo";
import Layout from "src/layouts/Layout";
import Tile from "../src/components/Tile/";
import { BrochureProvider } from "@utils/brochureContexts";
import { fetchRanges, fetchBrochures } from "@utils/contentfulPosts";

export default function ProductRanges({ posts, brochures }) {
  return (
    <BrochureProvider value={brochures}>
      <Layout sidebarType="none" title="Product Ranges">
        <NextSeo
          title={`Product Ranges | Mumford & Wood`}
          description="Mumford & Wood windows and doors product ranges"
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: `https://mumfordwood.com/product-ranges`,
            title: `Product Ranges | Mumford & Wood`,
            description: "Mumford & Wood windows and doors product ranges",
            site_name: "Mumford & Wood",
          }}
          twitter={{
            handle: "@MumfordWood",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
          {posts &&
            posts
              .sort((a, b) => a.order < b.order)
              ?.map((post, i) => (
                <Tile
                  href={`/product-ranges/${post?.slug}`}
                  title={post?.title}
                  summary={post?.summary}
                  size="default"
                  border={false}
                  highlight={post?.area}
                  image={post?.thumbnail?.fields?.file?.url}
                  key={i}
                />
              ))}
        </div>
      </Layout>
    </BrochureProvider>
  );
}

export async function getStaticProps() {
  const res = await fetchRanges();
  const b = await fetchBrochures();
  const brochures = await b.map((p) => {
    return p.fields;
  });

  const posts = await res.map((p) => {
    return p.fields;
  });
  return {
    props: {
      posts,
      brochures,
    },
  };
}
