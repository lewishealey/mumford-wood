import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '../src/components/Tile/'
import { fetchRanges } from '../utils/contentfulPosts'

export default function ProductRanges({ posts }) {
    // console.log(posts)
    return (
      <Layout
      sidebar="none"
        title="Product Ranges">
            {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}

            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                {posts && posts?.map((post,i) =>
                    <Tile
                        href={`/product-ranges/${post?.slug}`}
                        title={post?.title}
                        summary={post?.summary}
                        size="default"
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
    const res = await fetchRanges();
    const posts = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        posts,
      },
    }
  }

