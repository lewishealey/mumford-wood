import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import Map from '@components/Map';
import TextField from '@components/TextField';
import Card from '@components/Card'
import { headOffice, alexFlokkas, benGreenwood, matthewBlaylock, scottMartin } from "@utils/salesAreas";
import { fetchSalesTeam } from '../utils/contentfulPosts';

export default function SalesMap({posts}) {

    console.log(posts);

    const [postcodeSearch, setPostcodeSearch] = useState("");
    const [salesRep, setSalesRep] = useState("");

    console.log(postcodeSearch, headOffice);

    const breadcrumbs = [{
        label: 'Contact Us',
        link: '/contact-us'
    },{
        label: 'Sales Map'
    }];

    const handlePostcode = (value) => {
        let rep: any;
        switch(value) {
            case headOffice.includes(value):
                rep = "headOffice";
                break;
            case alexFlokkas.includes(value):
                rep = "alexFlokkas";
                break;
            case benGreenwood.includes(value):
                rep = "benGreenwood";
                break;
            case matthewBlaylock.includes(value):
                rep = "matthewBlaylock";
                break;
            case scottMartin.includes(value):
                rep = "scottMartin";
                break;
        }
        alert(rep)
        setPostcodeSearch(value);
        setSalesRep(rep);
    }

    return (
        <PageProvider value="contact-us">
            <Layout
            title="Sales Map"
            sidebarType="none"
            border={false}
            breadcrumbs={breadcrumbs}>
                <input className="input border border-gray-400 appearance-none rounded w-full px-1 py-0.5 focus focus:border-primary focus:outline-none active:outline-none active:border-primary" placeholder="First name" type="text" required onChange={(e) => handlePostcode(e.target.value)} onKeyUp={(e) => handlePostcode((e.target as HTMLTextAreaElement).value)} value={postcodeSearch}/>

                <Map height={800}/>

                {salesRep && salesRep.length > 0 && <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                    {posts && posts?.map((post,i) =>
                        post.id == salesRep && <Card
                            title={post?.title}
                            border={false}
                            highlight={post?.area}
                            image={post?.thumbnail?.fields?.file?.url}
                            key={i} />
                    )}
                </div>
                }

                    <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                        {posts && posts?.map((post,i) =>
                            <Card
                                title={post?.title}
                                border={false}
                                highlight={post?.area}
                                image={post?.thumbnail?.fields?.file?.url}
                                key={i}>
                                    <p>{post?.phone}</p>
                                    <p>{post?.email}</p>
                            </Card>
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
