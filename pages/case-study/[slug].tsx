import React, { useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Layout from "src/layouts/Layout";
import RichText from "@utils/renderers/RichText";
import {
  fetchCaseStudies,
  fetchCaseStudy,
  fetchSalesTeam,
  fetchBrochures,
} from "@utils/contentfulPosts";
import { PageProvider } from "@utils/contexts.js";
import { SalesProvider } from "@utils/salesContexts";
import { BrochureProvider } from "@utils/brochureContexts";
import Gallery from "@components/Gallery";
import Tile from "@components/Tile";
import Card from "@components/Card";
import { Waypoint } from "react-waypoint";
import { sectionClasses } from "@utils/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import { Link, animateScroll as scroll } from "react-scroll";

export default function CaseStudy({ page, caseStudies, salesTeam, brochures }) {
  const data = page[0];
  const router = useRouter();
  const [waypointItem, setWaypointItem] = useState("gallery");

  const breadcrumbs = [
    {
      label: "Case Studies",
      link: "/case-studies",
    },
    {
      label: data?.title,
    },
  ];

  const waypointOptions = {
    fireOnRapidScroll: false,
  };

  return (
    <PageProvider value="case-studies">
      <SalesProvider value={salesTeam}>
        <BrochureProvider value={brochures}>
          <Layout
            title={data?.title}
            image={data?.thumbnail?.fields?.file?.url}
            breadcrumbs={breadcrumbs}
          >
            <NextSeo
              title={`${data?.title} | Mumford & Wood`}
              description="Mumford & Wood windows and doors product ranges"
              canonical="https://www.canonical.ie/"
              openGraph={{
                url: `https://mumfordwood.com/case-study${router.asPath}`,
                title: `${data?.title} | Mumford & Wood`,
                description: "Mumford & Wood windows and doors product ranges",
                site_name: "Mumford & Wood",
              }}
              twitter={{
                handle: "@MumfordWood",
                site: "@site",
                cardType: "summary_large_image",
              }}
            />

            <div className="mt-2">
              {documentToReactComponents(data?.content, options)}
            </div>

            <div className="sticky z-20 bg-white flex w-full top-mobile md:top-desktop pt-1 mb-2">
              <nav className="space-x-1.5 mb-1 md:pl-2 md:-ml-2 -mr-4 w-full overflow-x-auto md:overflow-visible bg-white">
                <Link
                  to="gallery"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Gallery
                </Link>
                {data?.products && (
                  <Link
                    to="featured-products"
                    className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                    activeClass="border-dark"
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                  >
                    Products
                  </Link>
                )}
                <Link
                  to="related"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Related case studies
                </Link>
              </nav>
            </div>

            {data?.gallery && (
              <Waypoint
                onEnter={() => setWaypointItem("gallery")}
                {...waypointOptions}
              >
                <section className="mb-4" id="gallery">
                  <h2 className={sectionClasses}>Gallery</h2>
                  <Gallery items={data?.gallery} />
                </section>
              </Waypoint>
            )}

            {data?.products && (
              <Waypoint
                onEnter={() => setWaypointItem("featured-products")}
                {...waypointOptions}
              >
                <section className="mb-4" id="featured-products">
                  <h2 className={sectionClasses}>Featured products</h2>
                  <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                    {data?.products &&
                      data?.products?.map((post, i) => (
                        <Tile
                          href={`/product/${post?.fields?.range}/${post?.fields?.slug}`}
                          title={post?.fields?.title}
                          size="compact"
                          border={false}
                          image={post?.fields?.thumbnail?.fields?.file?.url}
                          key={i}
                        />
                      ))}
                  </div>
                </section>
              </Waypoint>
            )}

            {caseStudies && (
              <section className="mb-4" id="related">
                <h2 className={sectionClasses}>Related case studies</h2>
                <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-4">
                  {caseStudies?.map((post, i) => (
                    <Card
                      href={`/case-study/${post?.slug}`}
                      title={post?.title}
                      border={false}
                      highlight={post?.area}
                      image={post?.thumbnail?.fields?.file?.url}
                      key={i}
                    />
                  ))}
                </div>
              </section>
            )}
          </Layout>
        </BrochureProvider>
      </SalesProvider>
    </PageProvider>
  );
}

export async function getStaticPaths() {
  const studies = await fetchCaseStudies();
  const paths = studies.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const res = await fetchCaseStudy(slug);
  const caseStudyData = await fetchCaseStudies(4);
  const sales = await fetchSalesTeam();
  const salesT = await sales.map((p) => {
    return p.fields;
  });

  const caseStudies = await caseStudyData.map((p) => {
    return p.fields;
  });

  const page = await res.map((p) => {
    return p.fields;
  });

  const b = await fetchBrochures();
  const brochures = await b.map((p) => {
    return p.fields;
  });

  return {
    props: {
      page,
      caseStudies,
      salesTeam: salesT,
      brochures,
    },
  };
}
