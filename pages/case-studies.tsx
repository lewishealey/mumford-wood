import React from 'react';
import Layout from 'src/layouts/Layout';
import Card from '@components/Card'
import { fetchCaseStudies } from '../utils/contentfulPosts'

export default function CaseStudies({ posts }) {
    // console.log(posts)
    return (
      <Layout
        title="Case Studies"
        sidebar="none"
        >
            {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}

            <div className="flex space-y-1 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                {posts && posts?.map((post,i) =>
                    <Card
                        href={`/case-study/${post?.slug}`}
                        title={post?.title}
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
    const res = await fetchCaseStudies()
    const posts = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        posts,
      },
    }
  }

