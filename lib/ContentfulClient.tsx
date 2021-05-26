export function createContentfulClient() {
    const client = require('contentful').createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    });
    return client;
  }
