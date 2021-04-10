import React from 'react';
import Layout from 'src/layouts/Layout';
import { PageProvider } from '@utils/contexts.js';
import LoggedIn from '@components/LoggedIn';

export default function Downloads() {

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
            sidebar="none"
            breadcrumbs={breadcrumbs}>
                <LoggedIn location="Downloads" entity="Downloads">
                    Downloads
                </LoggedIn>
            </Layout>
        </PageProvider>
    );
  }


