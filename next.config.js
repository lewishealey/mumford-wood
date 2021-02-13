const path = require('path');
const withImages = require('next-images');

module.exports = withImages({
    target: 'serverless',
    publicRuntimeConfig: {
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    },
    webpack(config) {
      config.resolve.alias['@components'] = path.join(__dirname, 'components');
      config.resolve.alias['@images'] = path.join(__dirname, 'images');
      return config;
    },
  });
