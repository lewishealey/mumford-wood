import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '../src/components/Tile/'
import { fetchCaseStudies } from '../utils/contentfulPosts'

export default function CaseStudies({ posts }) {
    // console.log(posts)
    return (
      <Layout
        title="Case Studies">
            {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}

            <div className="grid grid-cols-3">
                {posts && posts?.map((post,i) =>
                    <Tile
                        href={`/case-study/${post?.slug}`}
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

