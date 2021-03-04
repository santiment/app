import gql from 'graphql-tag'

export const SHORT_WATCHLIST_FRAGMENT = gql`
  fragment generalFragment on UserList {
    id
    name
    type
    slug
    function
    isPublic
    insertedAt
  }
`
