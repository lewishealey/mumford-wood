import React from 'react';
import Layout from 'src/layouts/Layout';
import Card from '@components/Card';
import { fetchCaseStudies } from '../utils/contentfulPosts';
import Truncate from 'react-truncate';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';

export default function CaseStudies({ posts }) {
    // console.log(posts)
    return (
      <Layout
        title="Case Studies"
        sidebarType="none"
        >
            {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}

            <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-2 lg:gap-y-4">
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

