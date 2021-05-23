import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "src/layouts/Layout";
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
  const [waypointItem, setWaypointItem] = useState("about");
  // console.log(data, caseStudies);

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
            <nav
              className="sticky z-10 bg-white flex m-0 space-x-1.5 mb-2"
              style={{ top: 122 }}
            >
              <Link
                to="about"
                className={`list-none border-b-4 py-1 ${
                  waypointItem === "about" ? "border-black" : "border-white"
                } py-1`}
                activeClass="border-black"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                About
              </Link>
              <Link
                to="gallery"
                className={`list-none border-b-4 py-1 ${
                  waypointItem === "gallery" ? "border-black" : "border-white"
                } py-1`}
                activeClass="border-black"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                Gallery
              </Link>
              <Link
                to="featured-products"
                className={`list-none border-b-4 py-1 ${
                  waypointItem === "feature-products" ? "border-black" : "border-white"
                } py-1`}
                activeClass="border-black"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                Featured products
              </Link>{" "}
            </nav>

            {data?.content && (
                <Waypoint
                onLeave={() => setWaypointItem("about")}
                {...waypointOptions}
              >
              <section className="mb-4">
                <h2 className={sectionClasses}>About</h2>
                {documentToReactComponents(data?.content, options)}
              </section>
              </Waypoint>
            )}

            {data?.gallery && (
              <Waypoint
                onLeave={() => setWaypointItem("gallery")}
                {...waypointOptions}
              >
                <section className="mb-4">
                  <h2 className={sectionClasses}>Gallery</h2>
                  <Gallery items={data?.gallery} />
                </section>
              </Waypoint>
            )}

            {data?.products && (
                <Waypoint
                onLeave={() => setWaypointItem("featured-products")}
                {...waypointOptions}
              >
              <section className="mb-4">
                <h2 className={sectionClasses}>Featured products</h2>
                <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                  {data?.products &&
                    data?.products?.map((post, i) => (
                      <Tile
                        href={`/product-ranges/${post?.fields?.slug}`}
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
              <section className="mb-4">
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
  const caseStudyData = await fetchCaseStudies();
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
