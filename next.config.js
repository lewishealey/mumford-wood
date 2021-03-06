const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
    env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    },
    target: 'serverless',
    publicRuntimeConfig: {
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    },
    webpack(config) {
      config.resolve.alias['@components'] = path.join(__dirname, 'components');
      config.resolve.alias['@images'] = path.join(__dirname, 'images');
      config.resolve.alias['@lib'] = path.join(__dirname, 'lib');
      return config;
    },
  });
