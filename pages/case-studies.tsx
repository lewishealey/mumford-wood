import React, { useState } from "react";
import Layout from "src/layouts/Layout";
import Card from "@components/Card";
import { fetchCaseStudies } from "../utils/contentfulPosts";
import Truncate from "react-truncate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import Select from "react-select";

function flatten(obj) {
    let arr = [];
    obj.forEach(o => {
        arr.push(o.value);
    });
    return arr;
}

export default function CaseStudies({ posts }) {
  // console.log(posts)

  const [postList, setPosts] = useState(posts);

  // Usable locations
  let locations = [];
  posts.forEach((post) => {
    // If doesn't already exist
    if(flatten(locations).includes(post.location) === false) {
        locations.push({
            value: post.location,
            label: post.location,
        });
    }
  });

  return (
    <Layout title="Case Studies" sidebarType="none">
      {/* <div className="posts bg-gray-200 m-2">
                {posts && <div>Contentful is connected</div>}
            </div> */}
      <div className="flex mb-1.5 w-full space-x-1 items-center">
        <span className="flex-shrink-0">Filter by</span>
        <Select
          options={locations}
          placeholder="Select an multiple areas"
          className="w-full md:w-1/3"
          onChange={(selected) => {
            const flat = flatten(selected);
            if(flat.length > 0) {
                setPosts(posts.filter((item) => flat.includes(item.location)))
            } else {
                setPosts(posts);
            }
          }}
          isMulti
        />
      </div>

      <div className="flex space-y-2 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-2 lg:gap-y-4">
        {postList &&
          postList?.map((post, i) => (
            <Card
              href={`/case-study/${post?.slug}`}
              title={post?.title}
              border={false}
              highlight={post?.area}
              image={post?.thumbnail?.fields?.file?.url}
              key={i}
            />
          ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetchCaseStudies();
  const posts = await res.map((p) => {
    return p.fields;
  });
  return {
    props: {
      posts,
    },
  };
}
