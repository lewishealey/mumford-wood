import React, { useEffect } from "react";
import {
  fetchRanges,
  fetchProducts,
  fetchCaseStudies,
} from "@utils/contentfulPosts";
import Tile from "@components/Tile";
import Card from "@components/Card";
import Layout from "@layouts/Layout";
import Truncate from "react-truncate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";

export default function Home({ ranges, caseStudies }) {
  // console.log(posts)
  return (
    <Layout video="mumford-2.mp4" border={false} sidebarType="none">
      <section className="mb-4">
        <div
          className={`container m-auto max-w-4xl z-10 relative p-2 -mt-4 rounded bg-white border-t-4 border-primary-base border-solid`}
        >
          <p className="text-center font-heading text-xl mb-1">
            Established in 1954 Mumford & Wood has since become the UK’s premier
            manufacturer of high quality timber windows and doors.
          </p>
          <p className="text-center font-heading text-xl mb-1">
            Recognised within the industry as market leaders, Mumford & Wood has
            built a well-earned reputation amongst architects, developers and
            aspirational home owners for products of outstanding quality. All
            our wooden windows and doors are proudly made in our Tiptree factory
            using time-served craftsmanship and state of the art technology,
            using the finest quality wood.
          </p>
          <p className="text-center font-heading text-xl">
            Learn more about our Our Conservation™ timber windows and timber
            doors and see why we're the UK's leading manufacturers and suppliers
            of wooden windows and doors.
          </p>

          <div className="flex justify-center mt-2 space-x-2 items-center hover:bg-gray-50 rounded-md transition-all duration-100 ease-in-out pt-2 md:cursor-pointer md:w-2/3 m-auto">
              <img src="http://images.ctfassets.net/uefpddncbaai/77WSbUKU6cykDPTmLkLasu/7918d31a2dd77224c5e918d9cb87e56c/conservation.png?w=400" className="h-8 w-8 min-w-8 object-cover overflow-hidden rounded-md flex-shrink-0"/>
              <div>
                  <h3 className="font-heading text-2xl mb-1">Learn more about the brand</h3>
                  <p className="font-body text-default text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum quam quam, sit amet vehicula nulla interdum eu. Orci varius natoque penatibus et magnis</p>
              </div>
          </div>

        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl mb-1 md:mb-2 md:text-3xl font-heading text-center">
            Our Product Ranges
          </h2>
        <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
          {ranges &&
            ranges?.map((post, i) => (
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
          <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-4">
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
                  <div className="mb-1 font-body text-gray-800 text-lg md:text-base">
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
  const csData = await fetchCaseStudies();

  const ranges = await rangeData.map((p) => {
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
    },
  };
}
