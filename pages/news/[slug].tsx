import React from "react";
import { useRouter } from "next/router";
import Layout from "src/layouts/Layout";
import Card from "@components/Card";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { options } from "@utils/contentfulOptions";
import {
  fetchArticle,
  fetchArticles,
  fetchSalesTeam,
  fetchBrochures,
} from "@utils/contentfulPosts";
import { PageProvider } from "@utils/contexts.js";
import { SalesProvider } from "@utils/salesContexts";
import { BrochureProvider } from "@utils/brochureContexts";
import { sectionClasses } from "@utils/helpers";

export default function Article({
  page,
  newsArticles,
  paths,
  salesTeam,
  brochures,
  otherNews,
}) {
  const data = page[0];
  const breadcrumbs = [
    {
      label: "News",
      link: "/news",
    },
    {
      label: data?.title,
    },
  ];

  return (
    <PageProvider value="news">
      <SalesProvider value={salesTeam}>
        <BrochureProvider value={brochures}>
          <Layout title={data?.title} breadcrumbs={breadcrumbs}>
            <section className="mb-4">
              <article>
                {documentToReactComponents(data?.content, options)}
              </article>
            </section>

            {otherNews && (
              <section className="mb-4">
                <h2 className={sectionClasses}>More news</h2>
                <div className="flex space-y-1 md:space-y-0 flex-col lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-4">
                  {otherNews?.map((post, i) => (
                    post?.slug !== data?.slug && <Card
                      href={`/news/${post?.slug}`}
                      title={post?.title}
                      border={false}
                      highlight={post?.area}
                      image={post?.thumbnail?.fields?.file?.url}
                      key={i}
                    />
                  ))}
                </div>
              </section>
            )}
          </Layout>
        </BrochureProvider>
      </SalesProvider>
    </PageProvider>
  );
}

export async function getStaticPaths() {
  const products = await fetchArticles();
  const paths = products.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const res = await fetchArticle(slug);

  const newsArticles = await fetchArticles();
  const paths = newsArticles.map(({ fields: { slug } }) => ({
    params: { slug },
  }));

  const otherNews = newsArticles.map((p) => {
    return p.fields;
  });

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
      newsArticles,
      otherNews,
      paths,
      salesTeam: salesT,
      brochures,
    },
  };
}
