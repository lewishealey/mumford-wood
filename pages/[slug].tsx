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
import { GET_SIMPLE_PAGE } from "@utils/queries/page";
import GetApolloState from "@lib/GetApolloState";
import GetPaths from "@lib/GetPaths";
import Link from "next/link";
import RichText from "@utils/renderers/RichText";

export default function Page(props) {
  const { data, loading, error, preview } = props;
  if (!data || !data.pageCollection || data.pageCollection.items.length < 1) {
    // if (typeof window !== "undefined") {
    //   window.location.replace("/404");
    // }
    return (
      <div className="w-full p-1 text-default bg-primary-fade">
        No data received -{" "}
        <Link href="/api/exit-preview/">
          <a className="underline hover:opacity-60">Exit preview</a>
        </Link>
      </div>
    );
  }

  const {
    title,
    slug,
    summary,
    thumbnail,
    videoBackground,
    sidebarType,
    border,
    subtitle,
    content,
    sections,
    parent,
    sectionsCollection,
  } = data.pageCollection.items[0];

  let breadcrumbs = null;
  const summaryClasses = classNames(
    `font-body`,
    `text-base`,
    `md:text-xl`,
    `mb-3`,
    {
      "text-center": sidebarType == "none",
    }
  );

  if (parent) {
    breadcrumbs = [
      {
        label: parent,
        link: `/${parent}`,
      },
      {
        label: title,
      },
    ];
  }

  return (
    <PageProvider value={parent}>
        <SalesProvider value={data?.salesRepCollection?.items}>
      <Layout
        title={title}
        breadcrumbs={breadcrumbs}
        border={border}
        image={thumbnail?.url}
        video={videoBackground?.url}
        sidebarType={sidebarType}
        preview={preview}
      >
        {subtitle && <h2 className={sectionClasses}>{subtitle}</h2>}
        {summary && <div className={summaryClasses}>{summary}</div>}

        {content && <RichText content={content} />}

        {data && sectionsCollection && (
          <div className="flex space-y-2 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-1">
            {sectionsCollection.items?.map((section, i) => (
              <Tile
                key={i}
                style="default"
                href={section?.link}
                title={section?.title}
                size="compact"
                image={section?.image?.url}
              />
            ))}
          </div>
        )}
      </Layout>
      </SalesProvider>
    </PageProvider>
  );
}

export async function getStaticPaths() {
  //   return GetPaths("page", true);
  const pages = await fetchPages();
  const paths = pages.map(({ fields: { slug } }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  console.log(slug, context);
  return GetApolloState(GET_SIMPLE_PAGE, slug, context.preview);
  // const { slug } = context.params;
  // const res = await fetchPage(slug);
  // const sales = await fetchSalesTeam();
  // const salesT = await sales.map((p) => {
  //   return p.fields;
  // });

  // const page = await res.map((p) => {
  //   return p.fields;
  // });

  // const b = await fetchBrochures();
  // const brochures = await b.map((p) => {
  //   return p.fields;
  // });

  // return {
  //   props: {
  //     page,
  //     salesTeam: salesT,
  //     brochures,
  //   },
  // };
}
