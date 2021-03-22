import React from 'react';
import Layout from 'src/layouts/Layout';
import Tile from '../src/components/Tile/'
import { fetchProductRanges } from '../utils/contentfulPosts'

export default function ProductRanges({ posts }) {
    // console.log(posts)
    return (
      <Layout
        title="Product Ranges">
            {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}

            <div className="grid grid-cols-3 gap-1">
                {posts && posts?.map((post,i) =>
                    <Tile
                        href={`/product-ranges/${post?.slug}`}
                        title={post?.title}
                        summary={post?.summary}
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
    const res = await fetchProductRanges()
    const posts = await res.map((p) => {
      return p.fields
    })
    return {
      props: {
        posts,
      },
    }
  }

