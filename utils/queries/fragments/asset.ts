import gql from 'graphql-tag';

export const ASSET_FRAGMENT = gql`
  fragment Asset on Asset {
    __typename
    sys {
      id
    }
  }
`;
