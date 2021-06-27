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

  const [postList, setPosts] = useState(posts);
  const sortedPosts = postList.sort((a,b) => {
      if(a.date > b.date) {
          return -1;
      }
  });

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

  const newLocations = [
      {
          value: "london",
          label: "London"
      },
      {
        value: "north",
        label: "North"
    },
    {
        value: "east",
        label: "East"
    },
    {
        value: "midlands",
        label: "Midlands"
    },
    {
        value: "west",
        label: "West"
    },
    {
        value: "south",
        label: "South"
    }
  ];

  return (
    <Layout title="Case Studies" sidebarType="none">
      <div className="flex mb-1.5 w-full space-x-1 items-center">
        <span className="flex-shrink-0">Filter by</span>
        <Select
          options={newLocations}
          placeholder="Select multiple areas"
          className="w-full md:w-1/3"
          onChange={(selected) => {
            const flat = flatten(selected);
            if(flat.length > 0) {
                setPosts(posts.filter((item) => flat.includes(item?.region?.toLowerCase())))
            } else {
                setPosts(posts);
            }
          }}
          isMulti
        />
      </div>

      <div className="flex space-y-2 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:gap-2 lg:gap-y-4">
        {sortedPosts &&
          sortedPosts?.map((post, i) => (
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
