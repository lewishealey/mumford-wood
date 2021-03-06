import React, { useState } from "react";
import Layout from "src/layouts/Layout";
import Card from "@components/Card";
import Map from "@components/Map";
import { fetchOffices } from "../utils/contentfulPosts";
import { PageProvider } from "@utils/contexts.js";
import { options } from "@utils/contentfulOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { sectionClasses } from "@utils/helpers";
export default function ContactUs({ offices }) {
  return (
    <PageProvider value="contact-us">
      <Layout title="Contact us" sidebarType="brochure" video="https://videos.ctfassets.net/uefpddncbaai/2xZMFTE2NJYYrFVoxVZ9d8/473a198cb08607096d0cced5984f0847/Banner_Cut_Mould-MP4_1080_Low_Res__1_.mp4">
        <section className="mb-2">
          <Map height={400} />
        </section>

        <section>
          <h2 className={sectionClasses}>Our locations</h2>
          <div className="flex flex-col space-y-4 md:space-y-0 lg:grid lg:grid-cols-2 lg:gap-3">
            {offices &&
              offices?.map((office, i) => (
                <Card
                  image={office?.thumbnail?.fields?.file?.url}
                  title={office?.title}
                  summary={office?.summary}
                  border={false}
                  key={i}
                >
                  <div className="mt-0.5">
                    {documentToReactComponents(office?.content, options)}
                  </div>
                  <div className="mt-0.5 flex flex-col space-y-0.5 mb-2 md:mb-1">
                      <label>Address</label>
                    {documentToReactComponents(office?.address, options)}
                  </div>
                  {office?.email && <div className="mt-0.5 md:mt-0 flex flex-col space-y-0.5">{office?.email}</div>}
                  {office?.phone && <div className="mt-0.5 md:mt-0 flex flex-col space-y-0.5 font-heading text-lg text-gray-800">{office?.phone}</div>}
                  <div>
                    {documentToReactComponents(office?.openingTimes, options)}
                  </div>
                </Card>
              ))}
          </div>
        </section>
      </Layout>
    </PageProvider>
  );
}

export async function getStaticProps() {
  const res = await fetchOffices();
  const offices = await res.map((p) => {
    return p.fields;
  });

  return {
    props: {
      offices,
    },
  };
}
