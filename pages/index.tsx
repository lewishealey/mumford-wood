import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { fetchEntries } from '../utils/contentfulPosts'
import Post from '../components/Post'
import { Header } from '../components/Header';
import LoggedIn from '@components/LoggedIn';


export default function Home({posts}) {


    return (
      <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <h1>My App</h1>
        <div className="posts bg-gray-200 m-2">
            {posts && <div>Contentful is connected</div>}
        </div>
        <LoggedIn entity="CAD profiles">
            HELLO THERE
        </LoggedIn>
      </div>
    );
  }

export async function getStaticProps() {
    const res = await fetchEntries()
    const posts = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        posts,
      },
    }
  }

