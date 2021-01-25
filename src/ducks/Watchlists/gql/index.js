import gql from 'graphql-tag'
import { client } from '../../../apollo'
import { generalData, PROJECT_RECENT_DATA_FRAGMENT } from './allProjectsGQL'
import { AGGREGATIONS_UPPER } from '../Widgets/Filter/dataHub/aggregations'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalListData on UserList {
    id
    isPublic
    name
    slug
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

export const WATCHLIST_SHORT_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalListData
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
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

export const AVAILABLE_METRICS_QUERY = gql`
  query getAvailableMetrics {
    getAvailableMetrics
  }
`

export const ACCESS_RESTRICTIONS_QUERY = gql`
  query getAccessRestrictions {
    getAccessRestrictions {
      name
      type
      isRestricted
      restrictedFrom
      restrictedTo
    }
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
    $listItems: [InputListItem]
  ) {
    createWatchlist(
      isPublic: $isPublic
      name: $name
      description: $description
      function: $function
      listItems: $listItems
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

export const getRecentWatchlist = id =>
  client
    .query({
      query: WATCHLIST_SHORT_QUERY,
      variables: {
        id
      }
    })
    .then(({ data = {} }) => data.watchlist)

export function tableQuery (columns) {
  const staticColumns = []
  const dynamicColumns = columns.filter(
    ({ isStatic, accessor, isRestricted }) => {
      if (isStatic) {
        staticColumns.push(accessor)
      }
      return !isStatic && !isRestricted
    }
  )

  return gql`
  query allProjectsByFunction($fn: json) {
    allProjectsByFunction(function: $fn) {
      projects {
        name
        slug
        ticker
        logoUrl
        darkLogoUrl
        ${staticColumns}
        ${dynamicColumns.map(
    ({ accessor, timeRange, aggregation }) =>
      `${accessor}: aggregatedTimeseriesData(
            metric: "${accessor}"
            from: "utc_now-${timeRange}"
            to: "utc_now"
            aggregation: ${AGGREGATIONS_UPPER[aggregation.toUpperCase()]}
          )`
  )}
      }
      stats {
        projectsCount
      }
    }
  }
`
}
