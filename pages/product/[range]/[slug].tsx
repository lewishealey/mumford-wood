import React, { useState, useEffect } from 'react';
import { fetchProduct, fetchProducts } from '@utils/contentfulPosts';
import { Waypoint } from 'react-waypoint';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';
import Gallery from '@components/Gallery';
import LoggedIn from '@components/LoggedIn';
import fire from '@lib/firebase';
import Download from '@components/Download';
import Card from '@components/Card';
import Checklist from '@components/Checklist';
import File from '@components/File';
import { sectionClasses } from '@utils/helpers';

const checkboxes = {
    "24mmDgu": {
        id: '24mmDgu',
        label: '24mm DGU',
        checked: true
    },
    "14mmDgu": {
        id: '14mmDgu',
        label: '14mm DGU',
        checked: true
    },
    "4mmDgu": {
        id: '4mmDgu',
        label: '4mm DGU',
        checked: true
    },
    "toughened": {
        id: 'toughened',
        label: 'Toughened',
        checked: true
    },
    "laminated": {
        id: 'laminated',
        label: 'Laminated',
        checked: true
    },
    "acoustic": {
        id: 'acoustic',
        label: 'Acoustic',
        checked: true
    },
    "obscure": {
        id: 'obscure',
        label: 'Obscure',
        checked: true
    }
};

const ironCheckboxes = {
    "chrome": {
        id: 'chrome',
        label: 'Chrome',
        checked: true
    },
    "brass": {
        id: 'brass',
        label: 'Brass',
        checked: true
    },
    "bronze": {
        id: 'bronze',
        label: 'Bronze',
        checked: true
    },
    "nickel": {
        id: 'nickel',
        label: 'Nickel',
        checked: true
    },
    "black": {
        id: 'black',
        label: 'Black',
        checked: true
    },
    "pewter": {
        id: 'pewter',
        label: 'Pewter',
        checked: true
    }
};

export default function Product({product}) {
    const data = product[0];
    // console.log(data);

    const [glassItems, setGlassItems] = useState(data?.glazing);
    const [ironItems, setIronItems] = useState(data?.ironmongery);
    const [waypointItem, setWaypointItem] = useState("introduction");

    const downloadPageDefinition = `Product / ${data?.range.replace("-"," ")}™ / ${data?.title}`;

    const breadcrumbs = [{
        label: 'Product Ranges',
        link: '/product-ranges'
    },{
        label: `${data?.range.replace("-"," ")}™`,
        link: `/product-ranges/${data?.range}`
    },
    {
        label: data?.title
    }];

    const handleWaypoint = (section: string) => {
        setWaypointItem(section);
    }

    const onGlazingFilter = (checklistItems) => {
        //console.log(checklistItems)
        let optionsArray = Object.values(checklistItems);
        let glazingItems = data?.glazing.filter( function (glass) {
            const glassTags = getTags(glass); // get all tags in the glass item
            const isInArray = isSelectionInTags(glassTags, optionsArray);
            return isInArray;
        });

        setGlassItems(glazingItems);
    }

    const onIronFilter = (checklistItems) => {
        //console.log(checklistItems)
        let optionsArray = Object.values(checklistItems);
        let ironmongeryItems = data?.ironmongery.filter( function (iron) {
            const ironsTags = getTags(iron); // get all tags in the glass item
            const isInArray = isSelectionInTags(ironsTags, optionsArray);
            return isInArray;
        });

        setIronItems(ironmongeryItems);
    }

    console.log(waypointItem)
    return (
        <PageProvider value="product-ranges">
            <Layout
            title={data?.title}
            image={data?.hero?.fields?.file?.url}
            breadcrumbs={breadcrumbs}
            gallery={data?.gallery}
            border>
                <section className="mb-4">
                    <h2 className={sectionClasses}>Introduction</h2>
                    {documentToReactComponents(data?.content,options)}
                </section>

                <nav className="top-0 sticky z-10 bg-white flex m-0 space-x-1.5 mb-2">
                    <a href="#gallery" className={`list-none border-b-4 py-1 ${waypointItem === 'gallery' ? 'border-black' : 'border-white'} py-1`}>Gallery</a>
                    <a href="#finish" className={`list-none border-b-4 py-1 ${waypointItem === 'finish' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Finish</a>
                    <a href="#profile" className={`list-none border-b-4 py-1 ${waypointItem === 'profile' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Profile</a>
                    <a href="#glazing" className={`list-none border-b-4 py-1 ${waypointItem === 'glazing' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Glazing</a>
                    <a href="#ironmongery" className={`list-none border-b-4 py-1 ${waypointItem === 'ironmongery' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Ironmongery</a>
                    <a href="#specs" className={`list-none border-b-4 py-1 ${waypointItem === 'specs' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Specs</a>
                    <a href="#drawings" className={`list-none border-b-4 py-1 ${waypointItem === 'drawings' ? 'border-black' : 'border-white'} hover:border-gray-500`}>Drawings</a>
                </nav>

                {data?.gallery && <Waypoint onEnter={() => setWaypointItem('gallery')}>
                                        <section className="mb-4">
                                            <h2 className={sectionClasses}>Gallery</h2>
                                            <Gallery items={data?.gallery} />
                                        </section>
                                </Waypoint>
                }

                {data?.finishContent &&
                <Waypoint onEnter={() => setWaypointItem('finish')}>
                    <section className="mb-4" id="finish">
                        <h2 className={sectionClasses}>Finish</h2>
                        <div className="mb-2">{documentToReactComponents(data?.finishContent,options)}</div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                            {data?.finishes && data?.finishes.map((finish, i) =>
                                <Card
                                image={finish?.fields?.thumbnail?.fields?.file?.url}
                                title={finish?.fields?.title}
                                summary={finish?.fields?.content}
                                border={true}
                                height="h-10"
                                key={i} />
                            )}
                        </div>
                    </section>
                </Waypoint>
                }

                {data?.profiles &&
                    <Waypoint onEnter={() => setWaypointItem('profiles')}>
                        <section className="mb-4" id="profiles">
                            <h2 className={sectionClasses}>Profiles</h2>
                            <p>4 types of profiles</p>
                        </section>
                    </Waypoint>
                }

                {glassItems &&
                    <Waypoint onEnter={() => setWaypointItem('glazing')}>
                        <section className="mb-4" id="glazing">
                            <h2 className={sectionClasses}>Glazing</h2>
                            <div className="mb-1">
                                <Checklist items={checkboxes} onChecked={onGlazingFilter} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2">
                                {glassItems && glassItems.map((glass, i) =>
                                    <>
                                    {i > 0 && glass?.fields?.thickness.toLowerCase() !== glassItems[i-1]?.fields?.thickness.toLowerCase() && <div className="col-span-3">&nbsp;</div>}
                                <Card
                                    image={glass?.fields?.thumbnail?.fields?.file?.url}
                                    title={glass?.fields?.title}
                                    highlight={glass?.fields?.thickness}
                                    summary={glass?.fields?.content}
                                    border={true}
                                    thumbnail="scale-down"
                                    key={i} /></>
                                )}
                            </div>
                        </section>
                    </Waypoint>
                }

                {ironItems &&
                    <Waypoint onEnter={() => setWaypointItem('ironmongery')}>
                    <section className="mb-4" id="ironmongery">
                        <h2 className={sectionClasses}>Ironmongery</h2>
                        <div className="mb-1">
                            <Checklist items={ironCheckboxes} onChecked={onIronFilter} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2">
                            {ironItems && ironItems.map((iron, i) =>
                                <>
                                {i > 0 && iron?.fields?.highlight.toLowerCase() !== ironItems[i-1]?.fields?.highlight.toLowerCase() && <div className="col-span-3">&nbsp;</div>}
                                <Card
                                image={iron?.fields?.thumbnail?.fields?.file?.url}
                                title={iron?.fields?.title}
                                highlight={iron?.fields?.highlight}
                                summary={iron?.fields?.content}
                                border={true}
                                height="h-10"
                                thumbnail="scale-down"
                                key={i} />
                                </>
                            )}
                        </div>
                    </section>
                    </Waypoint>
                }

                {data?.technicalSpecs &&
                    <Waypoint onEnter={() => setWaypointItem('specs')}>
                    <section className="mb-4" id="specs">
                        <h2 className={sectionClasses}>Specifications</h2>
                        <div className="mb-2">{documentToReactComponents(data?.technicalSpecs,options)}</div>
                    </section>
                    </Waypoint>
                }

                {data?.profiles && <Waypoint onEnter={() => setWaypointItem('drawings')}>
                    <section className="mb-4" id="drawings">
                    <h2 className={sectionClasses}>CAD Drawings</h2>
                    <LoggedIn location="Homepage" entity="CAD profiles">

                        <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                            {data?.profiles.map((profile, i) =>
                                <Download
                                key={i}
                                title={profile?.fields?.title}
                                entity={downloadPageDefinition}
                                user={fire.auth()}
                                files={profile?.fields?.files}
                            />)}
                        </div>

                    </LoggedIn>
                </section>
                </Waypoint>}

                {data?.cadComplianceContent &&
                    <section className="mb-4">
                        <h2 className={sectionClasses}>CAD Compliance</h2>
                        <div className="mb-1">{documentToReactComponents(data?.cadComplianceContent,options)}</div>

                        {data?.cadFiles &&
                            <div className="flex space-y-0.5 flex-col">
                                {data?.cadFiles && data?.cadFiles.map((file, i) =>
                                    <File
                                        name={file?.fields?.file?.fileName}
                                        size={file?.fields?.file?.details?.size}
                                        href={file?.fields?.file?.url}
                                        title={file?.fields?.title}
                                        key={`file_${i}`}
                                    />
                                )}
                            </div>
                        }
                    </section>
                }
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticPaths() {
    const products = await fetchProducts();
    const paths = products.map(({ fields: { slug, range } }) => ({ params: { slug, range } }))

    return {
        paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { range, slug } = context.params;
    const res = await fetchProduct(range, slug);

    const product = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        product,
      },
    }
  }



  function getTags(glass) {
    let tags = [];
    glass.metadata.tags.forEach(tag => {
        tags.push(tag.sys.id);
    })
    return tags;
  }

  function isSelectionInTags(itemTags, selectedTags) {
    let result = false;
    itemTags.forEach(item => {
        // console.info(item, selectedTags, selectedTags.includes(item));
        if(selectedTags.includes(item)){
            result = true;
        }
    })
    return result;
  }
