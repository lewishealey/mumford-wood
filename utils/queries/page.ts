import gql from 'graphql-tag';

export const GET_SIMPLE_PAGE = gql`
  query pageData($slug: String!, $preview: Boolean!) {
    pageCollection(limit: 1, where: { slug: $slug}, preview: $preview) {
        items {
            title
            slug
            sidebarType
            parent
            subtitle
            border
            summary
            content {
                json
                links {
                    __typename
                    entries {
                        block {
                          sys {
                            id
                          }
                          __typename
                          ... on Download {
                            name
                            category
                            filesCollection {
                                items {
                                    url
                                    size
                                    description
                                    contentType
                                    fileName
                                }
                            }
                          }
                        }
                    }
                    assets {
                      block {
                        sys {
                            id
                        }
                        ... on Asset {
                          url
                          title
                          fileName
                          description
                          contentType
                        }
                      }
                    }
                }
            }
            sectionsCollection {
                items {
                  ...on Tile {
                    title
                    size
                    link
                    image {
                      fileName
                      url
                    }
                  }
                }
              }
            videoBackground {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
            thumbnail {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
          }
    }
    factoryVideoCollection {
        items {
          title
          order
          youtubeId
          thumbnail {
            url
          }
        }
      }
    salesRepCollection {
        items {
          title
          phone
          email
          id
          thumbnail {
            url
          }
        }
      }
      timelineCollection {
        items {
          year
          thumbnail {
            url
          }
          description {
            json
        }
        }
      }
  }
`;
