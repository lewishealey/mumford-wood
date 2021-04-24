import React from 'react';
import Layout from 'src/layouts/Layout';
import DownloadBrochure from '@components/Form/download-brochure';

export default function Downloads() {

    return (
            <Layout
            title="Download Brochure"
            sidebarType="none">
                <DownloadBrochure inputs/>
            </Layout>
        );
  }


