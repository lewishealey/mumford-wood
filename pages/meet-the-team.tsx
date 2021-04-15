import React, { useState } from 'react';
import Layout from 'src/layouts/Layout';
import { fetchTeam } from '../utils/contentfulPosts'
import Card from '@components/Card';
import Filter from '@components/Filter';
import { PageProvider } from '@utils/contexts.js';

const checkboxes = [
    {
        name: 'main-office',
        key: 'mainOffice',
        label: 'Main Office',
        checked: true,
    },
    {
        name: 'factory',
        key: 'factory',
        label: 'Factory',
        checked: true,
    }
];

export default function MeetTheTeam({ members }) {
    // const [memberData, setmemberData] = useState(members);

    // const filterOptions = (options) => {
    //     // TBC filter
    //     let data = members.filter( function (item) {
    //         console.log(item);
    //         return item.type === 'factory';
    //     });
    //     setmemberData(data);
    // }

    return (
        <PageProvider value="about-us">
            <Layout
            title="Meet the team"
            sidebarType="none">
                <Filter checkboxes={checkboxes} onFilter={() => console.log("Filter")} />
                <div className="flex space-y-1 flex-col lg:grid lg:grid-cols-2 lg:gap-1">
                    {/* {members && members?.map((member,i) =>
                        <Card
                            image={member?.thumbnail?.fields?.file?.url}
                            title={member?.name}
                            summary={member?.jobTitle}
                            border={false}
                            key={i} />
                    )} */}
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



