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
    updatedAt
    description
    isMonitored
    votes {
      userVotes: currentUserVotes
      totalVotes
    }
    votedAt
    commentsCount
    user {
      id
    }
  }
`

const ADDRESSES_SHORT_LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    listItems {
      blockchainAddress {
        address
        infrastructure
      }
    }
  }
`

const PROJECTS_SHORT_LIST_ITEMS_FRAGMENT = gql`
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

export const PROJECTS_LIST_ITEMS_FRAGMENT = gql`
  fragment listItemsFragment on UserList {
    listItems {
      project {
        id
        name
        description
        slug
        ticker
        rank
        logoUrl
        darkLogoUrl
        priceUsd
        percentChange7d
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

export const getListItemsShortFragment = type =>
  type === BLOCKCHAIN_ADDRESS
    ? ADDRESSES_SHORT_LIST_ITEMS_FRAGMENT
    : PROJECTS_SHORT_LIST_ITEMS_FRAGMENT

export const getListItemsFragment = type =>
  type === BLOCKCHAIN_ADDRESS
    ? ADDRESSES_SHORT_LIST_ITEMS_FRAGMENT
    : PROJECTS_LIST_ITEMS_FRAGMENT
