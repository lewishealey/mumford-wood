import React from 'react';
import Layout from 'src/layouts/Layout';
import { fetchPage, fetchPages } from '@utils/contentfulPosts';
import Tile from '@components/Tile';
import classNames from 'classnames';
import { PageProvider } from '@utils/contexts.js';
import { sectionClasses } from '@utils/helpers';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '@utils/contentfulOptions';

export default function Page({ page }) {
    const data = page[0];
    let breadcrumbs = null;
    const summaryClasses = classNames(`font-body`, `text-base`, `md:text-lg`, `mb-3`, {
        "text-left" : data?.sidebarType == "none"
    });

    console.log(data);
    if(data?.parent) {
        breadcrumbs = [{
            label: data?.parent,
            link: `/${data?.parent}`
        },{
            label: data?.title
        }];
    }

    return (
        <PageProvider value={data?.parent}>
        <Layout
        title={data?.title}
        breadcrumbs={breadcrumbs}
        border={data?.border}
        image={data?.thumbnail?.fields?.file?.url}
        sidebar={data?.sidebarType}>
            {data?.subtitle && <h2 className={sectionClasses}>{data?.subtitle}</h2>}
            {data?.content && <div className={summaryClasses}>{documentToReactComponents(data?.content,options)}</div>}

            {data && data?.sections &&
                <div className="flex space-y-1 flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-1">
                    {data?.sections?.map((section, i) =>
                        <Tile key={i} href={section?.fields?.link} title={section?.fields?.title} size="default" image={section?.fields?.image?.fields?.file?.url}/>
                    )}
                </div>
            }

        </Layout>
        </PageProvider>
    );
  }

  export async function getStaticPaths() {
    const pages = await fetchPages();
    const paths = pages.map(({ fields: { slug } }) => ({ params: { slug } }));
    return {
        paths,
      fallback: false,
    }
  }


  export async function getStaticProps(context) {
    const { slug } = context.params;
    const res = await fetchPage(slug);

    const page = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        page,
      },
    }
  }

