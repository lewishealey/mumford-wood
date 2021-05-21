import React from "react";
import Layout from "src/layouts/Layout";
import { motion } from "framer-motion";
import {
  fetchPage,
  fetchPages,
  fetchSalesTeam,
  fetchBrochures,
} from "@utils/contentfulPosts";
import { BrochureProvider } from "@utils/brochureContexts";
import Tile from "@components/Tile";
import classNames from "classnames";
import { PageProvider } from "@utils/contexts.js";
import { SalesProvider } from "@utils/salesContexts";
import { sectionClasses } from "@utils/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";

export default function Page({ page, salesTeam, brochures }) {
  const data = page[0];
  let breadcrumbs = null;
  const summaryClasses = classNames(
    `font-body`,
    `text-base`,
    `md:text-xl`,
    `mb-3`,
    {
      "text-center": data?.sidebarType == "none",
    }
  );

  console.log(data);
  if (data?.parent) {
    breadcrumbs = [
      {
        label: data?.parent,
        link: `/${data?.parent}`,
      },
      {
        label: data?.title,
      },
    ];
  }

  return (
      <PageProvider value={data?.parent}>
        <SalesProvider value={salesTeam}>
          <BrochureProvider value={brochures}>
            <Layout
              title={data?.title}
              breadcrumbs={breadcrumbs}
              border={data?.border}
              image={data?.thumbnail?.fields?.file?.url}
              video={data?.videoBackground?.fields?.file?.url}
              sidebarType={data?.sidebarType}
            >
              {data?.subtitle && (
                <h2 className={sectionClasses}>{data?.subtitle}</h2>
              )}
              {data?.summary && (
                <div className={summaryClasses}>{data?.summary}</div>
              )}
              {data?.content && (
                <div>{documentToReactComponents(data?.content, options)}</div>
              )}

              {data && data?.sections && (
                <div className="flex space-y-2 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-1">
                  {data?.sections?.map((section, i) => (
                    <Tile
                      key={i}
                      href={section?.fields?.link}
                      title={section?.fields?.title}
                      size="compact"
                      image={section?.fields?.image?.fields?.file?.url}
                    />
                  ))}
                </div>
              )}
            </Layout>
          </BrochureProvider>
        </SalesProvider>
      </PageProvider>
  );
}

export async function getStaticPaths() {
  const pages = await fetchPages();
  const paths = pages.map(({ fields: { slug } }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const res = await fetchPage(slug);
  const sales = await fetchSalesTeam();
  const salesT = await sales.map((p) => {
    return p.fields;
  });

  const page = await res.map((p) => {
    return p.fields;
  });

  const b = await fetchBrochures();
  const brochures = await b.map((p) => {
    return p.fields;
  });

  return {
    props: {
      page,
      salesTeam: salesT,
      brochures,
    },
  };
}
