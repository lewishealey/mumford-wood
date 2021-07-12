const path = require("path");
const withImages = require("next-images");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(withImages({
    images: {
      domains: ["images.ctfassets.net"],
    },
    env: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
      contentfulGraphQLUrl: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      contentfulPreviewGraphQLUrl: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
    target: "serverless",
    publicRuntimeConfig: {
      MAP_TOKEN: process.env.GOOGLE_KEY,
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_PREVIEW_ACCESS_TOKEN:
        process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    },
    webpack(config) {
      config.resolve.alias["@components"] = path.join(
        __dirname,
        "./src/components"
      );
      config.resolve.alias["@layouts"] = path.join(__dirname, "./src/layouts");
      config.resolve.alias["@images"] = path.join(__dirname, "./src/images");
      config.resolve.alias["@lib"] = path.join(__dirname, "lib");
      config.resolve.alias["@forms"] = path.join(__dirname, "./src/forms");
      config.resolve.alias["@utils"] = path.join(__dirname, "utils");
      return config;
    },
  }));
