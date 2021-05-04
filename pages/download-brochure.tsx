import React from 'react';
import Layout from 'src/layouts/Layout';
import DownloadBrochure from '@components/Form/download-brochure';
import { fetchBrochures } from '@utils/contentfulPosts';
import { BrochureProvider } from '@utils/brochureContexts';

export default function Downloads({ brochures }) {

    return (
        <BrochureProvider value={brochures}>
            <Layout
            title="Download Brochure"
            sidebarType="none">
                <DownloadBrochure inputs/>
            </Layout>
        </BrochureProvider>
        );
  }


  export async function getStaticProps(context) {
    const b = await fetchBrochures();
    const brochures = await b.map((p) => {
        return p.fields
    });

    return {
      props: {
        brochures
      },
    }
  }

