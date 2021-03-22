import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '../src/components/Tile/'
import { fetchArticles } from '../utils/contentfulPosts'

export default function News({ posts }) {
    return (
      <Layout
        title="News">

            <div className="grid grid-cols-3">
                {posts && posts?.map((post,i) =>
                    <Tile
                        href={`/news/${post?.slug}`}
                        title={post?.title}
                        size="compact"
                        border={false}
                        highlight={post?.area}
                        image={post?.thumbnail?.fields?.file?.url}
                        key={i} />
                )}
            </div>
      </Layout>
    );
  }


  export async function getStaticProps() {
    const res = await fetchArticles()
    const posts = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        posts,
      },
    }
  }

