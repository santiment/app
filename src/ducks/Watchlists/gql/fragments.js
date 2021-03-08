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
    description
  }
`

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalFragment on UserList {
    id
    name
    slug
    description
    function
    isPublic
    insertedAt
    isMonitored
    type
    user {
      id
    }
  }
`
