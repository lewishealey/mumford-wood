import React, { useEffect } from "react";
import Layout from "src/layouts/Layout";
import { fetchPages } from "@utils/contentfulPosts";
import Tile from "@components/Tile";
import Timeline from "@components/Timeline";
import classNames from "classnames";
import { PageProvider } from "@utils/contexts.js";
import { SalesProvider } from "@utils/salesContexts";
import { sectionClasses } from "@utils/helpers";
import { GET_SIMPLE_PAGE } from "@utils/queries/page";
import GetApolloState from "@lib/GetApolloState";
import Link from "next/link";
import RichText from "@utils/renderers/RichText";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import Image from "next/image";
import VideoThumbnail from "@components/VideoThumbnail";

export default function Page(props) {
  const { data, loading, error, preview } = props;
  const router = useRouter();

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
  const timeline = data.timelineCollection.items;
  const storyVideos = data.factoryVideoCollection.items;

  //const sortedTimeline = timeline.sort();
  const sortedTimeline = timeline
    .slice()
    .sort((a, b) => (a.year > b.year ? 1 : b.year > a.year ? -1 : 0));
  const sortedVideos = storyVideos.slice().sort((a, b) => {
    if(a.order > b.order) {
      return -1;
    }
  });

  console.log(storyVideos);
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
          <div>
            {subtitle && <h2 className={sectionClasses}>{subtitle}</h2>}
            {summary && <div className={summaryClasses}>{summary}</div>}
            {content && <RichText content={content} />}
          </div>

          {data && sectionsCollection && (
            <div className="flex space-y-2 md:space-y-0 flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-1 px-1">
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

          {router.asPath === "/our-story" && (
            <div className="relative wrap">
              <div className="absolute border-opacity-20 bg-primary-fade h-full w-0.25 rounded left-1 md:left-1/2"></div>

              {sortedTimeline &&
                sortedTimeline?.map((section, i) => (
                  <Timeline
                    year={section?.year}
                    thumbnail={section?.thumbnail?.url}
                    index={i}
                  >
                    {section?.description}
                  </Timeline>
                ))}
            </div>
          )}
          {router.asPath === "/the-factory" && (
            <div className="flex flex-col space-y-4">
              {sortedVideos &&
                sortedVideos.reverse()?.map((video, i) => (
                  <VideoThumbnail image={video?.thumbnail?.url} video={video?.youtubeId} title={video?.title} />
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
