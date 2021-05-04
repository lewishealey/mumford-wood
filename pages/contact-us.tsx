import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import Card from '@components/Card';
import Map from '@components/Map';
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
                    <Map height={400}/>
                    <h3 className="text-xl font-heading mb-0.5">Postal address</h3>
                    <p>Mumford & Wood<br />
                        Tower Business Park, Kelvedon Road<br />
                        Tiptree<br />
                        Essex<br />
                        CO5 0LX
                    </p>
                    <hr className="my-1"/>
                    <h3 className="text-xl font-heading">Tel 01621 818155</h3>
                    <h3 className="text-xl font-heading mb-1">sales@mumfordwood.com</h3>
                    <p>For any after sale maintenance queries please contact:</p>
                    <p><a href="mailto:customerservices@mumfordwood.com" className="text-xl font-heading mb-0.5">customerservices@mumfordwood.com</a></p>
                </section>

                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-3">
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



