import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import Card from '@components/Card';
import { fetchOffices } from '../utils/contentfulPosts'
import { PageProvider } from '@utils/contexts.js';
import { options } from '@utils/contentfulOptions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { sectionClasses } from "@utils/helpers";
export default function ContactUs({ offices }) {

    return (
        <PageProvider value="about-us">
            <Layout
            title="Contact us"
            sidebarType="brochure">
                <section className="mb-2">
                    <p className="font-body mb-1">For technical and sales support, please contact our sales department.</p>
                    <h3 className="text-xl font-heading">Tel 01621 818155</h3>
                    <h3 className="text-xl font-heading mb-1">sales@mumfordwood.com</h3>
                    <p>For any after sale maintenance queries please contact:</p>
                    <p><a href="mailto:customerservices@mumfordwood.com">customerservices@mumfordwood.com</a></p>
                </section>

                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-1">
                    {offices && offices?.map((office,i) =>
                        <Card
                            image={office?.thumbnail?.fields?.file?.url}
                            title={office?.title}
                            summary={office?.summary}
                            border={false}
                            key={i}>
                                <div>{documentToReactComponents(office?.content,options)}</div>
                                {office?.email}
                                {office?.phone}
                                <div>{documentToReactComponents(office?.openingTimes,options)}</div>
                            </Card>
                    )}
                </div>
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticProps() {
    const res = await fetchOffices();
    const offices = await res.map((p) => {
      return p.fields
    });

    return {
      props: {
        offices,
      },
    }
  }



