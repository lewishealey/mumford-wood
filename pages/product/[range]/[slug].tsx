import React, { useState } from "react";
import {
  fetchProduct,
  fetchProducts,
  fetchRangeProducts,
  fetchBrochures,
  fetchSalesTeam,
  fetchRelatedProducts,
} from "@utils/contentfulPosts";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Waypoint } from "react-waypoint";
import Layout from "src/layouts/Layout";
import { PageProvider } from "@utils/contexts.js";
import { SalesProvider } from "@utils/salesContexts";
import { BrochureProvider } from "@utils/brochureContexts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import Gallery from "@components/Gallery";
import Tile from "@components/Tile";
import LoggedIn from "@components/LoggedIn";
import fire from "@lib/firebase";
import Download from "@components/Download";
import Card from "@components/Card";
import Checklist from "@components/Checklist";
import {
  sectionClasses,
  subSectionClasses,
  getTags,
  isSelectionInTags,
} from "@utils/helpers";
import { Link, animateScroll as scroll } from "react-scroll";
import { renderTechTable } from "@utils/renderers/renderTechTable";

const waypointOptions = {
  fireOnRapidScroll: false,
};

export default function Product({
  product,
  relatedProducts,
  salesTeam,
  brochures,
}) {
  const data = product[0];
  const router = useRouter();

  const [glassItems, setGlassItems] = useState(data?.glazing);
  const [ironItems, setIronItems] = useState(data?.ironmongery);
  const [waypointItem, setWaypointItem] = useState("gallery");

  const downloadPageDefinition = `Product / ${data?.range.replace(
    "-",
    " "
  )}™ / ${data?.title}`;

  const checkboxes = {
    "24mmDgu": {
      id: "24mmDgu",
      label: "24mm DGU",
      checked: true,
    },
    "14mmDgu": {
      id: "14mmDgu",
      label: "14mm DGU",
      checked: true,
    },
    "4mmDgu": {
      id: "4mmDgu",
      label: "4mm DGU",
      checked: true,
    },
    toughened: {
      id: "toughened",
      label: "Toughened",
      checked: true,
    },
    laminated: {
      id: "laminated",
      label: "Laminated",
      checked: true,
    },
    acoustic: {
      id: "acoustic",
      label: "Acoustic",
      checked: true,
    },
    obscure: {
      id: "obscure",
      label: "Obscure",
      checked: true,
    },
  };

  const ironCheckboxes = {
    chrome: {
      id: "chrome",
      label: "Chrome",
      checked: true,
    },
    brass: {
      id: "brass",
      label: "Brass",
      checked: true,
    },
    bronze: {
      id: "bronze",
      label: "Bronze",
      checked: true,
    },
    nickel: {
      id: "nickel",
      label: "Nickel",
      checked: true,
    },
    white: {
      id: "white",
      label: "White",
      checked: true,
    },
  };

  if (data?.slug === "casement-windows") {
    ironCheckboxes["black"] = {
      id: "black",
      label: "Black",
      checked: true,
    };
    ironCheckboxes["pewter"] = {
      id: "pewter",
      label: "Pewter",
      checked: true,
    };
  }

  if (
    data?.slug === "french-single-and-balcony-doors" ||
    data?.slug === "entrance-doors"
  ) {
    ironCheckboxes["steel"] = {
      id: "steel",
      label: "Steel",
      checked: true,
    };
  }

  const breadcrumbs = [
    {
      label: "Product Ranges",
      link: "/product-ranges",
    },
    {
      label: `${data?.range.replace("-", " ")}™`,
      link: `/product-ranges/${data?.range}`,
    },
    {
      label: data?.title,
    },
  ];

  const onGlazingFilter = (checklistItems) => {
    let optionsArray = Object.values(checklistItems);
    let glazingItems = data?.glazing.filter(function (glass) {
      const glassTags = getTags(glass); // get all tags in the glass item
      const isInArray = isSelectionInTags(glassTags, optionsArray);
      return isInArray;
    });

    setGlassItems(glazingItems);
  };

  const onIronFilter = (checklistItems) => {
    let optionsArray = Object.values(checklistItems);
    let ironmongeryItems = data?.ironmongery.filter(function (iron) {
      const ironsTags = getTags(iron); // get all tags in the glass item
      const isInArray = isSelectionInTags(ironsTags, optionsArray);
      return isInArray;
    });

    setIronItems(ironmongeryItems);
  };

  return (
    <PageProvider value="product-ranges">
      <SalesProvider value={salesTeam}>
        <BrochureProvider value={brochures}>
          <Layout
            title={data?.title}
            image={data?.hero?.fields?.file?.url}
            imagePosition="center"
            breadcrumbs={breadcrumbs}
            gallery={data?.gallery}
            border
          >
            <NextSeo
              title={`${data?.title} | Mumford & Wood`}
              description="Mumford & Wood windows and doors product ranges"
              canonical="https://www.canonical.ie/"
              openGraph={{
                url: `https://mumfordwood.com/product-ranges/${data?.range}${router.asPath}`,
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
            <section className="mb-4 md:mb-2">
              <h2 className={sectionClasses}>Introduction</h2>
              {documentToReactComponents(data?.content, options)}
            </section>

            <div className="sticky z-20 bg-white flex w-full top-mobile md:top-desktop pt-1 mb-2 md:mb-0">
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
                <Link
                  to="finish"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Finish
                </Link>
                <Link
                  to="profiles"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Profile
                </Link>
                <Link
                  to="glazing"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Glazing
                </Link>
                <Link
                  to="ironmongery"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Ironmongery
                </Link>
                <Link
                  to="specs"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Specs
                </Link>
                <Link
                  to="drawings"
                  className={`list-none border-b-4 h-4 border-white py-1 cursor-pointer hover:opacity-70 font-heading`}
                  activeClass="border-dark"
                  spy={true}
                  smooth={true}
                  offset={-200}
                  duration={500}
                >
                  Drawings
                </Link>
              </nav>
            </div>

            {data?.gallery && (
              <Waypoint
                onEnter={() => setWaypointItem("gallery")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6 md:pt-2" id="gallery">
                  <h2 className={sectionClasses}>Gallery</h2>
                  <Gallery items={data?.gallery} />
                </section>
              </Waypoint>
            )}

            {(data?.finishContent || data?.finishes) && (
              <Waypoint
                onEnter={() => setWaypointItem("finish")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="finish">
                  <h2 className={sectionClasses}>Finish</h2>
                  <div className="mb-2">
                    {documentToReactComponents(data?.finishContent, options)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                    {data?.finishes &&
                      data?.finishes.map((finish, i) => (
                        <Card
                          image={finish?.fields?.thumbnail?.fields?.file?.url}
                          title={finish?.fields?.title}
                          summary={finish?.fields?.content}
                          border={true}
                          height="h-10"
                          key={i}
                        />
                      ))}
                  </div>
                </section>
              </Waypoint>
            )}

            {data?.profiles && (
              <Waypoint
                onEnter={() => setWaypointItem("profiles")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="profiles">
                  <h2 className={sectionClasses}>Profiles</h2>
                  {data?.glazingThumbnails && (
                    <Gallery
                      columns={data?.glazingThumbnails.length}
                      items={data?.glazingThumbnails}
                    />
                  )}
                </section>
              </Waypoint>
            )}

            {glassItems && (
              <Waypoint
                onEnter={() => setWaypointItem("glazing")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="glazing">
                  <h2 className={sectionClasses}>Glazing</h2>
                  {/* <div className="mb-1">
                                <Checklist items={checkboxes} onChecked={onGlazingFilter} />
                            </div> */}
                  <div className="grid md:grid-cols-2 gap-y-0.5">
                    {glassItems &&
                      glassItems.map(
                        (glass, i) =>
                          glass?.fields && (
                            <Card
                              title={glass?.fields?.title}
                              highlight={glass?.fields?.thickness}
                              summary={glass?.fields?.content}
                              border={true}
                              thumbnail="cover"
                              key={i}
                            />
                          )
                      )}
                  </div>
                </section>
              </Waypoint>
            )}

            {ironItems && (
              <Waypoint
                onEnter={() => setWaypointItem("ironmongery")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="ironmongery">
                  <h2 className={sectionClasses}>Ironmongery</h2>
                  <div className="mb-1">
                    <Checklist
                      items={ironCheckboxes}
                      onChecked={onIronFilter}
                    />
                  </div>
                  <div className="flex flex-col md:space-y-0 md:grid lg:grid-cols-3 gap-x-1 gap-y-1 md:gap-y-2">
                    {ironItems &&
                      ironItems.map((iron, i) => (
                        <>
                          {i > 0 &&
                            iron?.fields?.highlight.toLowerCase() !==
                              ironItems[
                                i - 1
                              ]?.fields?.highlight.toLowerCase() && (
                              <div className="col-span-3">
                                <h3 className={subSectionClasses}>
                                  {iron?.fields?.highlight}
                                </h3>
                              </div>
                            )}
                          <Card
                            image={iron?.fields?.thumbnail?.fields?.file?.url}
                            title={iron?.fields?.title}
                            highlight={iron?.fields?.highlight}
                            summary={iron?.fields?.content}
                            border={true}
                            height="h-10"
                            objectFit="contain"
                            key={i}
                          />
                        </>
                      ))}
                  </div>
                </section>
              </Waypoint>
            )}

            {data?.techTable && (
              <Waypoint
                onEnter={() => setWaypointItem("specs")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="specs">
                  <h2 className={sectionClasses}>Technical Specifications</h2>
                  <div className="mb-2">{renderTechTable(data?.techTable)}</div>
                </section>
              </Waypoint>
            )}

            {data?.profiles && (
              <Waypoint
                onEnter={() => setWaypointItem("drawings")}
                {...waypointOptions}
              >
                <section className="b-2 pb-4 md:pb-6" id="drawings">
                  <h2 className={sectionClasses}>CAD Drawings</h2>
                  <LoggedIn location="Homepage" entity="CAD profiles">
                    <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                      {data?.profiles.map((profile, i) => (
                        <Download
                          key={i}
                          title={profile?.fields?.title}
                          entity={downloadPageDefinition}
                          user={fire.auth()}
                          files={[
                            {
                              fields: {
                                title: "PDF",
                                file: {
                                  details: {
                                    size:
                                      profile?.fields?.pdf?.fields?.file
                                        ?.details?.size,
                                  },
                                  contentType:
                                    profile?.fields?.pdf?.fields?.file
                                      ?.contentType,
                                  url: profile?.fields?.pdf?.fields?.file?.url,
                                },
                              },
                            },
                            {
                              fields: {
                                title: "DWG",
                                file: {
                                  details: {
                                    size:
                                      profile?.fields?.dwg?.fields?.file
                                        ?.details?.size,
                                  },
                                  contentType:
                                    profile?.fields?.dwg?.fields?.file
                                      ?.contentType,
                                  url: profile?.fields?.dwg?.fields?.file?.url,
                                },
                              },
                            },
                          ]}
                        />
                      ))}
                    </div>
                  </LoggedIn>
                </section>
              </Waypoint>
            )}

            <h2 className={sectionClasses}>Related products</h2>

            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-1 m-auto">
              {relatedProducts &&
                relatedProducts?.map(
                  (post, i) =>
                    post.slug !== data.slug && (
                      <Tile
                        href={`/product/${post?.range}/${post?.slug}`}
                        title={post?.title}
                        size="default"
                        style={post?.range.replace("-range", "")}
                        border={false}
                        highlight={post?.range.replace("-", " ")}
                        image={post?.thumbnail?.fields?.file?.url}
                        key={i}
                      />
                    )
                )}
            </div>
          </Layout>
        </BrochureProvider>
      </SalesProvider>
    </PageProvider>
  );
}

export async function getStaticPaths() {
  const products = await fetchProducts();
  const paths = products.map(({ fields: { slug, range } }) => ({
    params: { slug, range },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { range, slug } = context.params;
  const res = await fetchProduct(range, slug);
  const resP = await fetchRangeProducts(range);
  const resRel = await fetchRelatedProducts(range);
  const sales = await fetchSalesTeam();
  const salesT = await sales.map((p) => {
    return p.fields;
  });

  const product = await res.map((p) => {
    return p.fields;
  });

  const ranges = await resP.map((p) => {
    return p.fields;
  });

  const b = await fetchBrochures();
  const brochures = await b.map((p) => {
    return p.fields;
  });

  const relatedProducts = await resRel.map((p) => {
    return p.fields;
  });

  return {
    props: {
      product,
      ranges,
      salesTeam: salesT,
      brochures,
      relatedProducts,
    },
  };
}
