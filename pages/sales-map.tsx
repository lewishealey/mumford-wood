import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import TextField from '@components/TextField';
import Card from '@components/Card'
import { headOffice, alexFlokkas, benGreenwood, matthewBlaylock, scottMartin } from "@utils/salesAreas";
import { fetchSalesTeam } from '@utils/contentfulPosts';

export default function SalesMap({posts}) {

    const [postcodeSearch, setPostcodeSearch] = useState("");
    const [salesRep, setSalesRep] = useState("");

    const breadcrumbs = [{
        label: 'Contact Us',
        link: '/contact-us'
    },{
        label: 'Sales Map'
    }];

    const handlePostcode = (value) => {
        let rep: any;
        let shortenedPostcode = value.slice(0,2).replace(/[0-9]/g, '').toUpperCase();

        if(headOffice.includes(shortenedPostcode)) {
            rep = "headOffice";
        }
        if(alexFlokkas.includes(shortenedPostcode)) {
            rep = "alexFlokkas";
        }
        if(benGreenwood.includes(shortenedPostcode)) {
            rep = "benGreenwood";
        }
        if(matthewBlaylock.includes(shortenedPostcode)) {
            rep = "matthewBlaylock";
        }
        if(scottMartin.includes(shortenedPostcode)) {
            rep = "scottMartin";
        }
        setPostcodeSearch(value);
        if(value.length > 4) { setSalesRep(rep); } else {
            setSalesRep("")
        }
    }

    return (
        <PageProvider value="contact-us">
            <Layout
            title="Sales Map"
            sidebarType="none"
            border={false}
            breadcrumbs={breadcrumbs}>

                <div className="lg:w-1/3 m-auto">
                    <label className="relative flex rounded font-heading text-md items-center mb-0.25">Enter postcode to find your local sales rep</label>
                    <input className="input border border-gray-400 appearance-none rounded w-full px-1 mb-3 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="E.g CO5 0LX" type="text" required onChange={(e) => handlePostcode(e.target.value)} onKeyUp={(e) => handlePostcode((e.target as HTMLTextAreaElement).value)} value={postcodeSearch}/>
                </div>

                    <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                        {posts && posts?.map((post,i) =>
                            post.id == salesRep && <div className={`border p-2 rounded shadow border-primary-base bg-primary-fade`}>
                                <Card
                                    title={post?.title}
                                    border={false}
                                    highlight={post?.area}
                                    image={post?.thumbnail?.fields?.file?.url}
                                    align="center"
                                    circle
                                    key={i}>
                                        <p>{post?.phone}</p>
                                        <p>{post?.email}</p>
                                </Card>
                            </div>
                        )}
                        {posts && posts?.map((post,i) =>
                            salesRep && post.id !== salesRep && <div className={`border p-2 rounded shadow opacity-50`}>
                                <Card
                                    title={post?.title}
                                    border={false}
                                    highlight={post?.area}
                                    image={post?.thumbnail?.fields?.file?.url}
                                    align="center"
                                    circle
                                    key={i}>
                                        <p>{post?.phone}</p>
                                        <p>{post?.email}</p>
                                </Card>
                            </div>
                        )}
                        {posts && posts?.map((post,i) =>
                            !salesRep && <div className={`border p-2 rounded shadow`}>
                                <Card
                                    title={post?.title}
                                    border={false}
                                    highlight={post?.area}
                                    image={post?.thumbnail?.fields?.file?.url}
                                    align="center"
                                    circle
                                    key={i}>
                                        <p>{post?.phone}</p>
                                        <p>{post?.email}</p>
                                </Card>
                            </div>
                        )}
                    </div>
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticProps() {
    const res = await fetchSalesTeam()
    const posts = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        posts,
      },
    }
  }
