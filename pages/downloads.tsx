import React from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import LoggedIn from '@components/LoggedIn';
import Download from '@components/Download';
import fire from '@lib/firebase';
import { fetchBrochures, fetchProducts } from '@utils/contentfulPosts';
import { sectionClasses } from '@utils/helpers';

export default function Downloads({ brochures, products }) {

    console.log(products)

    const breadcrumbs = [{
        label: 'Professional',
        link: '/professional'
    },{
        label: 'Downloads'
    }];

    return (
        <PageProvider value="about-us">
            <Layout
            title="Downloads"
            sidebarType="none"
            breadcrumbs={breadcrumbs}>
                <LoggedIn location="Downloads" entity="Downloads">
                    <section className="mb-4">
                        <h2 className={sectionClasses}>Product brochures</h2>
                        <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                            {brochures?.map((brochure, i) =>
                                <Download
                                key={i}
                                title={brochure?.name}
                                entity={"Downloads"}
                                user={fire.auth()}
                                files={brochure?.files}
                            />)}
                        </div>
                    </section>

                    <section className="mb-4">
                        <h2 className={sectionClasses}>CAD Drawings</h2>
                        {products && products?.map((product, i) =>
                            <div className="flex column w-full flex-wrap border-gray-300 border rounded mb-1">
                            <div className="text-xl font-heading p-1 font-bold pb-0">{product.title} <span className="font-heading text-primary-base text-base uppercase font-bold tracking-widest mt-1 mb-0.5">{product?.range.replace("-"," ")}</span></div>
                            {product?.profiles.map((profile, i) =>
                                <Download
                                key={i}
                                title={profile?.fields?.title}
                                entity={"Downloads"}
                                user={fire.auth()}
                                files={profile?.fields?.files}
                            />)}
                        </div>)}
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
      return p.fields
    })

    const products = await prod.map((p) => {
        return p.fields
    })

    return {
      props: {
        brochures,
        products
      },
    }
  }
