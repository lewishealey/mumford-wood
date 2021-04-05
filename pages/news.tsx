import React from 'react';
import Layout from 'src/layouts/Layout';
import Card from '@components/Card'
import { fetchArticles } from '../utils/contentfulPosts'

export default function News({ posts }) {
    return (
      <Layout
        title="News"
        sidebar="none">

            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                {posts && posts?.map((post,i) =>
                    <Card
                        href={`/news/${post?.slug}`}
                        title={post?.title}
                        summary={post?.summary}
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

