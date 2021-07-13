import React, { useState } from "react";
import Layout from "src/layouts/Layout";
import { fetchTeam } from "../utils/contentfulPosts";
import Card from "@components/Card";
import { NextSeo } from "next-seo";
import { PageProvider } from "@utils/contexts.js";
import Select from "react-select";

const checkboxes = [
  {
    value: "management",
    label: "Management",
    checked: true,
  },
  {
    value: "sales",
    label: "Sales",
    checked: true,
  },
  {
    value: "project-managers",
    label: "Project Management",
    checked: true,
  },
  {
    value: "surveyors",
    label: "Surveyors",
    checked: true,
  },
  {
    value: "product-technical-support",
    label: "Product Technical Support",
    checked: true,
  },
  {
    value: "factory-team-leaders",
    label: "Factory Team Leadership",
    checked: true,
  },
  {
    value: "logistics",
    label: "Logistics",
    checked: true,
  },
  {
    value: "compliance-officers",
    label: "Compliance Officers",
    checked: true,
  },
];

export default function MeetTheTeam({ members }) {
  const [memberItems, setMemberItems] = useState(members);
  //posts.filter((item) => flat.includes(item?.region?.toLowerCase()))
  let sortedMemberItems = memberItems.sort((a, b) => {
    if (a.type === "management") {
      return -1;
    }
    if (a.type === "sales") {
      return -1;
    }
    if (a.type === b.type) {
      return 1;
    }
    return 0;
  });

  return (
    <PageProvider value="about-us">
      <Layout title="Meet the team" sidebarType="none">
        <NextSeo
          title={`Meet The Team | Mumford & Wood`}
          description="Meet the team behind Mumford & Wood"
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: `https://mumfordwood.com/meet-the-team`,
            title: `Meet The Team | Mumford & Wood`,
            description: "Meet the team behind Mumford & Wood",
            site_name: "Mumford & Wood",
          }}
          twitter={{
            handle: "@MumfordWood",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <div className="flex mb-1.5 w-full space-x-1 items-center">
          <span className="flex-shrink-0">Filter by</span>
          <Select
            options={checkboxes}
            placeholder="Select multiple job titles"
            className="w-full md:w-1/3"
            onChange={(selected) => {
              const flat = flatten(selected);
              if (flat.length > 0) {
                setMemberItems(
                  members.filter((item) => isInArray(flat, item.type))
                );
              } else {
                setMemberItems(members);
              }
            }}
            isMulti
          />
        </div>

        <div className="flex space-y-3 flex-col sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-1 sm:gap-y-3">
          {sortedMemberItems &&
            sortedMemberItems?.map((member, i) => (
              <div key={i}>
                <Card
                  image={member?.thumbnail?.fields?.file?.url}
                  title={member?.name}
                  border={false}
                  height="h-28 md:h-20"
                  width={400}
                  key={member?.name}
                >
                  <p>{member.jobTitle}</p>
                </Card>
              </div>
            ))}
        </div>
      </Layout>
    </PageProvider>
  );
}

export async function getStaticProps() {
  const res = await fetchTeam();
  const members = await res.map((p) => {
    return p.fields;
  });

  return {
    props: {
      members,
    },
  };
}

function flatten(obj) {
  let arr = [];
  obj.forEach((o) => {
    arr.push(o.value);
  });
  return arr;
}

function isInArray(ids, string) {
  return ids.includes(string);
}
