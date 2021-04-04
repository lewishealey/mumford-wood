import React from 'react';
import Layout from 'src/layouts/Layout';
import Form from '@components/Form';

export default function Downloads() {

    return (
            <Layout
            title="Download Brochure"
            sidebar="none">
                <Form type="brochure" />
            </Layout>
        );
  }


