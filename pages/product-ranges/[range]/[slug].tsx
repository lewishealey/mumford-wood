import React, { useState, useEffect } from 'react';
import { fetchProduct, fetchProducts } from '@utils/contentfulPosts'
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
    }
};

export default function Product({product}) {
    const data = product[0];
    console.log(data);

    const [glassItems, setGlassItems] = useState(data?.glazing);
    const [ironItems, setIronItems] = useState(data?.ironmongery);
    const [isChecked, setIsChecked] = useState(true);

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

    const onGlazingFilter = (checklistItems) => {
        console.log(checklistItems)
        // let optionsArray = Object.values(checklistItems);
        // let glazingItems = data?.glazing.filter( function (glass) {
        //     const glassTags = getTags(glass); // get all tags in the glass item
        //     const isInArray = isSelectionInTags(glassTags, optionsArray);
        //     return isInArray;
        // });

        // setGlassItems(glazingItems);
    }

    const onIronFilter = (checklistItems) => {
        console.log(checklistItems)
        // let optionsArray = Object.values(checklistItems);
        // let ironmongeryItems = data?.ironmongery.filter( function (iron) {
        //     const ironsTags = getTags(iron); // get all tags in the glass item
        //     const isInArray = isSelectionInTags(ironsTags, optionsArray);
        //     return isInArray;
        // });

        // setIronItems(ironmongeryItems);
    }

    return (
        <PageProvider value="product-ranges">
            <Layout
            title={data?.title}
            image={data?.hero?.fields?.file?.url}
            breadcrumbs={breadcrumbs}
            border>
                <section className="mb-4">
                    <h2 className={sectionClasses}>Introduction</h2>
                    {documentToReactComponents(data?.content,options)}
                </section>

                {data?.gallery && <section className="mb-4">
                    <h2 className={sectionClasses}>Gallery</h2>
                    <Gallery items={data?.gallery} />
                </section> }

                {data?.profiles && <section className="mb-4">
                    <h2 className={sectionClasses}>Profiles</h2>
                    <LoggedIn location="Homepage" entity="CAD profiles">

                        <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                            {data?.profiles.map((profile, i) =>
                                <Download
                                title={profile?.fields?.title}
                                entity="Product Page"
                                user={fire.auth()}
                                files={profile?.fields?.files}
                            />)}
                        </div>

                    </LoggedIn>
                </section>}

                {data?.finishContent &&
                    <section className="mb-4">
                        <h2 className={sectionClasses}>Finish</h2>
                        <div className="mb-2">{documentToReactComponents(data?.finishContent,options)}</div>

                        <div className="grid grid-cols-4 gap-1">
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
                }

                {glassItems &&
                    <section className="mb-4">
                        <h2 className={sectionClasses}>Glass</h2>
                        <div className="mb-1">
                            <Checklist items={checkboxes} onChecked={onGlazingFilter} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-1 gap-y-2">
                            {glassItems && glassItems.map((glass, i) =>
                                <Card
                                image={glass?.fields?.thumbnail?.fields?.file?.url}
                                title={glass?.fields?.title}
                                highlight={glass?.fields?.thickness}
                                summary={glass?.fields?.content}
                                border={true}
                                key={i} />
                            )}
                        </div>
                    </section>
                }

                {ironItems &&
                    <section className="mb-4">
                        <h2 className={sectionClasses}>Ironmongery</h2>
                        <div className="mb-1">
                            <Checklist items={ironCheckboxes} onChecked={onIronFilter} />
                        </div>
                        <div className="grid grid-cols-3 gap-x-1 gap-y-2">
                            {ironItems && ironItems.map((iron, i) =>
                                <Card
                                image={iron?.fields?.thumbnail?.fields?.file?.url}
                                title={iron?.fields?.title}
                                highlight={iron?.fields?.highlight}
                                summary={iron?.fields?.content}
                                border={true}
                                height="h-10"
                                key={i} />
                            )}
                        </div>
                    </section>
                }

                {data?.technicalSpecs &&
                    <section className="mb-4">
                        <h2 className={sectionClasses}>Specifications</h2>
                        <div className="mb-2">{documentToReactComponents(data?.technicalSpecs,options)}</div>
                    </section>
                }

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
    // Query Contentful for all products in the space
    const products = await fetchProducts();

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    const paths = products.map(({ fields: { slug, range } }) => ({ params: { slug, range } }))
    //const paths = [];
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
    glass.metadata.tags.map(tag => {
        tags.push(tag.sys.id);
    })
    return tags;
  }

  function isSelectionInTags(itemTags, selectedTags) {
    let result = false;
    itemTags.map(item => {
        console.info(item, selectedTags, selectedTags.includes(item));
        if(selectedTags.includes(item)){
            result = true;
        }
    })
    return result;
  }
