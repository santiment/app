import gql from 'graphql-tag'
import {
  generalData,
  project,
  PROJECT_RECENT_DATA_FRAGMENT
} from './allProjectsGQL'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalListData on UserList {
    id
    isPublic
    name
    description
    function
    insertedAt
    isMonitored
    updatedAt
    user {
      id
    }
  }
`

export const PROJECT_ITEM_FRAGMENT = gql`
  fragment listShortItems on UserList {
    listItems {
      project {
        id
        slug
        name
        ticker
        priceUsd
        percentChange7d
        logoUrl
        darkLogoUrl
      }
    }
  }
`

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchWatchlists {
      ...generalListData
      ...listShortItems
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const FEATURED_WATCHLISTS_QUERY = gql`
  query featuredWatchlists {
    featuredWatchlists {
      ...generalListData
      ...listShortItems
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const AVAILABLE_METRICS_QUERY = gql`
  query getAvailableMetrics {
    getAvailableMetrics
  }
`

export const AVAILABLE_SEGMENTS_QUERY = gql`
  query allMarketSegments {
    allMarketSegments {
      count
      name
    }
  }
`

export const CREATE_WATCHLIST_MUTATION = gql`
  mutation createWatchlist(
    $isPublic: Boolean
    $name: String!
    $description: String
    $function: json
  ) {
    createWatchlist(
      isPublic: $isPublic
      name: $name
      description: $description
      function: $function
    ) {
      ...generalListData
      ...listShortItems
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const UPDATE_WATCHLIST_MUTATION = gql`
  mutation updateWatchlist(
    $id: Int!
    $isPublic: Boolean
    $name: String
    $description: String
    $function: json
  ) {
    updateWatchlist(
      id: $id
      isPublic: $isPublic
      name: $name
      description: $description
      function: $function
    ) {
      ...generalListData
      listItems {
        project {
          ...generalData
          ...recentProjectData
        }
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${PROJECT_RECENT_DATA_FRAGMENT}
`

export const PROJECTS_BY_FUNCTION_QUERY = gql`
  query allProjectsByFunction($fn: json) {
    allProjectsByFunction(function: $fn) {
      projects {
        ...generalData
        ...project
      }
      stats {
        projectsCount
      }
    }
  }
  ${generalData}
  ${project}
`
