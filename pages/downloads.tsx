import React, { useState } from "react";
import Layout from "src/layouts/Layout";
import { PageProvider } from "@utils/contexts.js";
import fire from "@lib/firebase";
import dynamic from "next/dynamic";
import { fetchBrochures, fetchProducts } from "@utils/contentfulPosts";
import { sectionClasses } from "@utils/helpers";
const LoggedIn = dynamic(() => import("@components/LoggedIn"));
const Download = dynamic(() => import("@components/Download"));

export default function Downloads({ brochures, products }) {
  const [downloadSearch, setDownloadSearch] = useState("");

  const breadcrumbs = [
    {
      label: "Professional",
      link: "/professional",
    },
    {
      label: "Downloads",
    },
  ];

  return (
    <PageProvider value="professional">
      <Layout title="Downloads" sidebarType="none" breadcrumbs={breadcrumbs}>
        <LoggedIn location="Downloads" entity="Downloads">
          <section className="mb-4">
            <h2 className={sectionClasses}>Product literature</h2>
            <div className="flex column w-full flex-wrap border-gray-300 border rounded">
              {brochures?.map((brochure, i) => (
                <Download
                  key={i}
                  title={brochure?.name}
                  entity={"Downloads"}
                  user={fire.auth()}
                  files={brochure?.files}
                />
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h2 className={sectionClasses}>CAD Drawings</h2>
            <div className="TextField__group w-full">
              <input
                type="text"
                className="relative w-full flex rounded font-heading text-md items-center h-2.5 px-1 mb-1"
                value={downloadSearch}
                placeholder="Search for certain drawings"
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
                  {product?.profiles?.map(
                    (profile, i) =>
                      (downloadSearch.length == 0 ||
                        profile?.fields?.title.toLowerCase().includes(downloadSearch.toLowerCase())) && (
                        <>
                          <Download
                            key={i}
                            title={profile?.fields?.title}
                            entity={"Downloads"}
                            user={fire.auth()}
                            files={[
                              {
                                fields: {
                                  title: "PDF",
                                  file: {
                                    details: {
                                      size:
                                        profile?.fields?.pdf?.fields?.file?.details
                                          ?.size,
                                    },
                                    contentType:
                                      profile?.fields?.pdf?.fields?.file?.contentType,
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
                                        profile?.fields?.dwg?.fields?.file?.details
                                          ?.size,
                                    },
                                    contentType:
                                      profile?.fields?.dwg?.fields?.file?.contentType,
                                    url: profile?.fields?.dwg?.fields?.file?.url,
                                  },
                                },
                              },
                            ]}
                          />
                        </>
                      )
                  )}
                </div>
              ))}
          </section>
        </LoggedIn>
      </Layout>
    </PageProvider>
  );
}

export async function getStaticProps() {
  const res = await fetchBrochures();
  const prod = await fetchProducts();

  const brochures = await res.map((p) => {
    return p.fields;
  });

  const products = await prod.map((p) => {
    return p.fields;
  });

  return {
    props: {
      brochures,
      products,
    },
  };
}
