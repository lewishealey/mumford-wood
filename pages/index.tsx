import React from 'react';
import { fetchEntries } from '../utils/contentfulPosts'
import Post from '../components/Post'
import LoggedIn from '@components/LoggedIn';
import Download from '@components/Download';
import fire from '@lib/firebase';
import Layout from '@layouts/Layout';
import HomepageBanner from '../images/banner-front.jpg';


export default function Home({posts}) {
    return (
      <Layout image={HomepageBanner}>
        <div className="posts bg-gray-200 m-2">
            {posts && <div>Contentful is connected</div>}
        </div>
        <LoggedIn location="Homepage" entity="CAD profiles">
            <p>HELLO THERE</p>

            <div className="flex column w-full">
                <Download
                    title="Head, Cill & Jambs"
                    entity="Homepage"
                    user={fire.auth()}
                    dwg="https://mumfordandwood.worldsecuresystems.com/LiteratureRetrieve.aspx?ID=126410"
                    pdf="https://mumfordandwood.worldsecuresystems.com/LiteratureRetrieve.aspx?ID=126409"
                />
            </div>

        </LoggedIn>
      </Layout>
    );
  }

export async function getStaticProps() {
    const res = await fetchEntries()
    const posts = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        posts,
      },
    }
  }

