import React, { useState } from "react";
import Layout from "src/layouts/Layout";
import Card from "@components/Card";
import LoggedIn from "@components/LoggedIn";
import { fetchTechSpecs, fetchProducts } from "../utils/contentfulPosts";
import { sectionClasses } from "@utils/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import Download from "@components/Download";
import fire from "@lib/firebase";

export default function TechnicalSpecifications({ page, products }) {
  const data = page[0];
  const [downloadSearch, setDownloadSearch] = useState("");

  return (
    <Layout
      title="Technical specifications"
      image={data?.thumbnail?.fields?.file?.url}
      sidebarType="none"
    >
      <div className="container m-auto mt-1 md:mt-2 flex-col px-1 md:flex-row md:gap-2 md:px-0">
        <section>
          <LoggedIn
            location="Technical Specifications"
            entity="Technical Specifications"
          >
            <div className="TextField__group w-full">
              <input
                type="hidden"
                className="relative w-full flex rounded font-heading text-md items-center h-2.5 px-1 mb-1"
                value={downloadSearch}
                placeholder="Search for certain products"
                onChange={(e) => setDownloadSearch(e.target.value)}
                required
              />
            </div>
            {products &&
              products?.map((product, i) => (
                <div className="flex column w-full flex-wrap border-gray-300 border rounded mb-1">
                  <div className="text-xl font-heading p-1 font-bold pb-0">
                    {product.title}{" "}
                    <span
                      className={`font-heading
                            ${
                              product?.range.includes("conservation") &&
                              "text-primary-base"
                            }
                            ${
                              product?.range.includes("classic") &&
                              "text-royal-base"
                            }
                            ${
                              product?.range.includes("heritage") &&
                              "text-blood-base"
                            }
                            text-base uppercase font-bold tracking-widest mt-1 mb-0.5`}
                    >
                      {product?.range.replace("-", " ")}
                    </span>
                  </div>
                  {product?.technicalSpecifications &&
                    product?.technicalSpecifications.map(
                      (spec, i) =>
                        (downloadSearch.length == 0 ||
                          spec?.fields?.name.includes(downloadSearch)) && (
                          <>
                            {spec?.fields?.thermal && (
                              <Download
                                key={i}
                                title="Thermal"
                                entity={"Technical Specifications"}
                                user={fire.auth()}
                                files={[
                                  {
                                    fields: {
                                      title: "PDF",
                                      file: {
                                        details: {
                                          size:
                                            spec?.fields?.thermal?.fields?.file
                                              ?.details?.size,
                                        },
                                        contentType:
                                          spec?.fields?.thermal?.fields?.file
                                            ?.contentType,
                                        url:
                                          spec?.fields?.thermal?.fields?.file
                                            ?.url,
                                      },
                                    },
                                  },
                                ]}
                              />
                            )}
                            {spec?.fields?.enhancedSecurity && (
                              <Download
                                key={i}
                                title="PAS24 Enhanced Security"
                                entity={"Technical Specifications"}
                                user={fire.auth()}
                                files={[
                                  {
                                    fields: {
                                      title: "PDF",
                                      file: {
                                        details: {
                                          size:
                                            spec?.fields?.enhancedSecurity
                                              ?.fields?.file?.details?.size,
                                        },
                                        contentType:
                                          spec?.fields?.enhancedSecurity?.fields
                                            ?.file?.contentType,
                                        url:
                                          spec?.fields?.enhancedSecurity?.fields
                                            ?.file?.url,
                                      },
                                    },
                                  },
                                ]}
                              />
                            )}
                            {spec?.fields?.declaration && (
                              <Download
                                key={i}
                                title="Declaration of Performance"
                                entity={"Technical Specifications"}
                                user={fire.auth()}
                                files={[
                                  {
                                    fields: {
                                      title: "PDF",
                                      file: {
                                        details: {
                                          size:
                                            spec?.fields?.declaration
                                              ?.fields?.file?.details?.size,
                                        },
                                        contentType:
                                          spec?.fields?.declaration?.fields
                                            ?.file?.contentType,
                                        url:
                                          spec?.fields?.declaration?.fields
                                            ?.file?.url,
                                      },
                                    },
                                  },
                                ]}
                              />
                            )}
                          </>
                        )
                    )}
                </div>
              ))}
          </LoggedIn>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetchTechSpecs();
  const prod = await fetchProducts();

  const page = await res.map((p) => {
    return p.fields;
  });

  const products = await prod.map((p) => {
    return p.fields;
  });

  return {
    props: {
      page,
      products,
    },
  };
}
