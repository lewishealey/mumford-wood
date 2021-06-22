import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import { fetchTeam } from '../utils/contentfulPosts'
import Card from '@components/Card';
import Filter from '@components/Filter';
import Checklist from '@components/Checklist';
import { PageProvider } from '@utils/contexts.js';
import { getTags, isSelectionInTags } from '@utils/helpers.js';
import { options } from '@utils/contentfulOptions';
import Select from "react-select";

const checkboxes = [
    {
        value: 'management',
        label: 'Management',
        checked: true
    },
    {
        value: 'sales',
        label: 'Sales',
        checked: true
    },
    {
        value: 'project-managers',
        label: 'Project Management',
        checked: true
    },
    {
        value: 'surveyors',
        label: 'Surveyors',
        checked: true
    },
    {
        value: 'product-technical-support',
        label: 'Product Technical Support',
        checked: true
    },
    {
        value: 'factory-team-leaders',
        label: 'Factory Team Leadership',
        checked: true
    },
    {
        value: 'logistics',
        label: 'Logistics',
        checked: true
    },
    {
        value: 'compliance-officers',
        label: 'Compliance Officers',
        checked: true
    }
];

export default function MeetTheTeam({ members }) {
    const [memberItems, setMemberItems] = useState(members);
    const onGlazingFilter = (checklistItems) => {
        //console.log(checklistItems)
        let optionsArray = Object.values(checklistItems);
        let items = members.filter( function (member) {
            return optionsArray.includes(member.type);
        });

        setMemberItems(items);
    }
    //posts.filter((item) => flat.includes(item?.region?.toLowerCase()))
    let sortedMemberItems = memberItems.sort((a, b) =>
{
    if(a.type === "management") {
        return -1;
    }
    if(a.type === "sales") {
        return -1;
    }
    if(a.type === b.type) {
        return 1;
    }
    return 0;
});


console.log(sortedMemberItems)
    return (
        <PageProvider value="about-us">
            <Layout
            title="Meet the team"
            sidebarType="none">
                <div className="flex mb-1.5 w-full space-x-1 items-center">
                <span className="flex-shrink-0">Filter by</span>
                    <Select
                    options={checkboxes}
                    placeholder="Select multiple job titles"
                    className="w-full md:w-1/3"
                    onChange={(selected) => {
                        const flat = flatten(selected);
                        if(flat.length > 0) {
                            setMemberItems(memberItems.filter((item) => flat.includes(item?.type?.toLowerCase())))
                        } else {
                            setMemberItems(memberItems);
                        }
                    }}
                    isMulti
                    />
                </div>

                <div className="flex space-y-1 flex-col lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-1 lg:gap-y-3">
                    {sortedMemberItems && sortedMemberItems?.map((member,i) =>
                        <Card
                            image={member?.thumbnail?.fields?.file?.url}
                            title={member?.name}
                            border={false}
                            height="h-20"
                            width={400}
                            key={i}>
                                {member.jobTitle}
                            </Card>
                    )}

                </div>
            </Layout>
        </PageProvider>
    );
  }

  export async function getStaticProps() {
    const res = await fetchTeam();
    const members = await res.map((p) => {
      return p.fields
    });

    return {
      props: {
        members,
      },
    }
  }


function flatten(obj) {
    let arr = [];
    obj.forEach(o => {
        arr.push(o.value);
    });
    return arr;
}

