import React from 'react';
import { fetchEntries, fetchProducts } from '../utils/contentfulPosts'
import LoggedIn from '@components/LoggedIn';
import Download from '@components/Download';
import fire from '@lib/firebase';
import Layout from '@layouts/Layout';


export default function Home({posts}) {
    // console.log(posts)
    return (
      <Layout>
        Homepage
      </Layout>
    );
  }



export async function getStaticProps() {
    const res = await fetchProducts()
    const posts = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        posts,
      },
    }
  }

