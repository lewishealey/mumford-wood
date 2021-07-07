import React from "react";
import { NextSeo } from "next-seo";
import {
  fetchRanges,
  fetchProducts,
  fetchCaseStudies,
  fetchHomepages,
} from "@utils/contentfulPosts";
import Tile from "@components/Tile";
import Card from "@components/Card";
import Layout from "@layouts/Layout";
import Truncate from "react-truncate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";

export default function Home({ ranges, caseStudies, homepage }) {
  const sortedPosts = ranges.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
    return 0;
  });

  return (
    <Layout
      video="mumford-main.webm"
      poster="http://www.mumfordwood.com/images/case-studies/New-Bond-Street-London/Brook-Bond-London.jpg"
      border={false}
      sidebarType="none"
    >
      <NextSeo
        title="Britain's Finest Timber Windows & Doors | Mumford & Wood"
        description="Established in 1954 Mumford & Wood has since become the UK’s premier manufacturer of high quality timber windows and doors."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://mumfordwood.com",
          title: "Britain's Finest Timber Windows & Doors | Mumford & Wood",
          description: "Established in 1954 Mumford & Wood has since become the UK’s premier manufacturer of high quality timber windows and doors.",
          images: [
            {
              url: "https://images.ctfassets.net/uefpddncbaai/6nb6xKrk4jeTz7ThgTVlcf/c9731874c290545e3f51541aa3e414ab/Brook-Bond-Londo",
              width: 900,
              height: 600,
              alt: "Bond Street",
            },
          ],
          site_name: "Mumford & Wood",
        }}
        twitter={{
          handle: "@MumfordWood",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <section className="mb-4">
        <div
          className={`container m-auto max-w-4xl z-10 relative px-1 py-1.5 md:p-2 -mt-2 md:-mt-4 rounded bg-white border-t-4 border-primary-base border-solid`}
        >
          {homepage?.summary && (
            <div className="text-center font-heading text-xl mb-1">
              {documentToReactComponents(homepage?.summary, options)}
            </div>
          )}

          {homepage?.announcementTitle && (
            <div className="flex flex-col md:flex-row justify-center mt-2 md:space-x-2 items-center hover:bg-gray-50 rounded-md transition-all duration-100 ease-in-out pt-2 md:cursor-pointer md:w-2/3 m-auto">
              {homepage?.announcementThumbnail && (
                <img
                  src={`${homepage?.announcementThumbnail?.fields?.file?.url}?w=400`}
                  className="h-8 w-8 min-w-8 object-cover overflow-hidden rounded-md flex-shrink-0 m-auto"
                />
              )}
              <div>
                <h3 className="font-heading text-2xl mb-1 text-center md:text-left mt-1 md:mt-0">
                  {homepage?.announcementTitle}
                </h3>
                <p className="font-body text-default text-gray-600 text-center md:text-left">
                  {homepage?.announcementSummary}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl mb-1 md:mb-2 md:text-3xl font-heading text-center">
          Our Product Ranges
        </h2>
        <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
          {sortedPosts &&
            sortedPosts?.map((post, i) => (
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
      </section>

      <div className="w-full md:w-2/3 m-auto">
        <section className="mb-4">
          <h2 className="text-2xl mb-1 md:mb-2 md:text-3xl font-heading text-center">
            Recent Case Studies
          </h2>
          <div className="flex space-y-3 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-4">
            {caseStudies &&
              caseStudies?.map((post, i) => (
                <Card
                  href={`/case-study/${post?.slug}`}
                  title={post?.title}
                  border={false}
                  highlight={post?.area}
                  image={post?.thumbnail?.fields?.file?.url}
                  key={i}
                >
                  <div className="mb-1 mt-1 font-body text-gray-800 text-lg md:text-base">
                    <Truncate
                      lines={1}
                      width={1000} // width being how much you want to truncate your copy
                      ellipsis="&hellip;"
                    >
                      {documentToReactComponents(post?.content, options)}
                    </Truncate>
                  </div>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetchProducts();
  const rangeData = await fetchRanges();
  const hp = await fetchHomepages();
  const csData = await fetchCaseStudies(2);

  const ranges = await rangeData.map((p) => {
    return p.fields;
  });

  const hps = await hp.map((p) => {
    return p.fields;
  });

  const caseStudies = await csData.map((p) => {
    return p.fields;
  });

  const posts = await res.map((p) => {
    return p.fields;
  });

  return {
    props: {
      posts,
      ranges,
      caseStudies,
      homepage: hps[0],
    },
  };
}
