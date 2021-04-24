import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import { fetchTeam } from '../utils/contentfulPosts'
import Card from '@components/Card';
import Filter from '@components/Filter';
import Checklist from '@components/Checklist';
import { PageProvider } from '@utils/contexts.js';
import { getTags, isSelectionInTags } from '@utils/helpers.js';
import { options } from '@utils/contentfulOptions';

const checkboxes = {
    "main-office": {
        id: 'main-office',
        label: 'Main Office',
        checked: true
    },
    "factory": {
        id: 'factory',
        label: 'Factory',
        checked: true
    }
};

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

    return (
        <PageProvider value="about-us">
            <Layout
            title="Meet the team"
            sidebarType="none">
                <div className="mb-1">
                    <Checklist items={checkboxes} onChecked={onGlazingFilter} />
                </div>
                <div className="flex space-y-1 flex-col lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-1">
                    {memberItems && memberItems?.map((member,i) =>
                        <Card
                            image={member?.thumbnail?.fields?.file?.url}
                            title={member?.name}
                            border={false}
                            key={i} />
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



