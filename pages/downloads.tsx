import React from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import LoggedIn from '@components/LoggedIn';
import Download from '@components/Download';
import fire from '@lib/firebase';
import { fetchBrochures } from '@utils/contentfulPosts';
import { sectionClasses } from '@utils/helpers';

export default function Downloads({ brochures }) {

    console.log(brochures)

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
                    <h2 className={sectionClasses}>Product brochures</h2>
                    <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                        {brochures?.map((brochure, i) =>
                            <Download
                            key={i}
                            title={brochure?.name}
                            entity={"About / Downloads"}
                            user={fire.auth()}
                            files={brochure?.fields?.files}
                        />)}
                    </div>
                </LoggedIn>
            </Layout>
        </PageProvider>
    );
  }


  export async function getStaticProps() {
    const res = await fetchBrochures()
    const brochures = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        brochures,
      },
    }
  }
