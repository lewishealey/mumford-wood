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
  }
`;
