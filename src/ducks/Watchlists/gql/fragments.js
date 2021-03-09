import gql from 'graphql-tag'
import { BLOCKCHAIN_ADDRESS } from '../detector'

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
    type
    slug
    function
    isPublic
    insertedAt
    description
    isMonitored
    user {
      id
    }
  }
`

export const ADDRESSES_SHORT_LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    listItems {
      blockchainAddress {
        address
        infrastructure
      }
    }
  }
`

export const PROJECTS_SHORT_LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    listItems {
      project {
        id
        slug
        name
        ticker
        logoUrl
        darkLogoUrl
      }
    }
  }
`

export const getStats = type =>
  type !== BLOCKCHAIN_ADDRESS
    ? ''
    : `
  stats {
    blockchainAddressesCount
  }`
