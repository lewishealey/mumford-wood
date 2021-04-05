import React from 'react';
import { fetchRanges, fetchProducts, fetchCaseStudies } from '../utils/contentfulPosts'
import Tile from '@components/Tile';
import Card from '@components/Card';
import Layout from '@layouts/Layout';

export default function Home({posts, ranges, caseStudies}) {
    // console.log(posts)
    return (
      <Layout
      image="http://www.mumfordwood.com/images/banners/Nov%202020/Brook-Bond-London1.jpg"
        border={false}
        sidebar="none">

            <section className="mb-4">
                <div className={`container m-auto max-w-4xl z-10 relative p-2 -mt-2 bg-white border-t-4 border-primary-base border-solid`}>
                    <p className="text-center font-heading text-xl mb-1">Established in 1954 Mumford & Wood has since become the UK’s premier manufacturer of high quality timber windows and doors.</p>
                    <p className="text-center font-heading text-xl mb-1">Recognised within the industry as market leaders, Mumford & Wood has built a well-earned reputation amongst architects, developers and aspirational home owners for products of outstanding quality. All our wooden windows and doors are proudly made in our Tiptree factory using time-served craftsmanship and state of the art technology, using the finest quality wood.</p>
                    <p className="text-center font-heading text-xl">Learn more about our Our Conservation™ timber windows and timber doors and see why we're the UK's leading manufacturers and suppliers of wooden windows and doors.</p>
                </div>
            </section>

            <section className="mb-4">
                    <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-1">
                    {ranges && ranges?.map((post,i) =>
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
            </section>

            <section className="mb-4">
                <h2 className="text-2xl mb-1 md:mb-2 md:text-3xl font-heading text-center">Recent Case Studies</h2>
                    <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-1">
                    {caseStudies && caseStudies?.map((post,i) =>
                        <Card
                            href={`/case-study/${post?.slug}`}
                            title={post?.title}
                            border={false}
                            highlight={post?.area}
                            image={post?.thumbnail?.fields?.file?.url}
                            key={i} />
                    )}
                </div>
            </section>
      </Layout>
    );
  }



export async function getStaticProps() {
    const res = await fetchProducts();
    const rangeData = await fetchRanges();
    const csData = await fetchCaseStudies();

    const ranges = await rangeData.map((p) => {
      return p.fields
    })

    const caseStudies = await csData.map((p) => {
        return p.fields
    })

    const posts = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        posts,
        ranges,
        caseStudies
      },
    }
  }

