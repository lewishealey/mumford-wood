import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { fetchEntries } from '../utils/contentfulPosts'
import Post from '../src/components/Post'
import { Header } from '../src/components/Header/';

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Hello"/>

    <div className="posts bg-gray-200 m-2">
        {posts && <div>Contentful is connected</div>}
    </div>

    </div>
  )
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

