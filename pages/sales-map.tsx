import React from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import Map from '@components/Map';

export default function Downloads() {

    const breadcrumbs = [{
        label: 'Contact Us',
        link: '/contact-us'
    },{
        label: 'Sales Map'
    }];

    return (
        <PageProvider value="contact-us">
            <Layout
            title="Sales Map"
            sidebar="none"
            border={false}
            breadcrumbs={breadcrumbs}>
                <Map height={800}/>
            </Layout>
        </PageProvider>
    );
  }


