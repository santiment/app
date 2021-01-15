import gql from 'graphql-tag'
import { client } from '../../../apollo'
import { generalData, PROJECT_RECENT_DATA_FRAGMENT } from './allProjectsGQL'
import { AGGREGATION_TYPES } from '../../GetTimeSeries/queries/get_metric'

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

export const PRICE_GRAPH_QUERY = gql`
  query getMetric(
    $selector: MetricTargetSelectorInputObject
    $from: DateTime
    $interval: interval
  ) {
    getMetric(metric: "price_usd") {
      timeseriesDataPerSlug(
        selector: $selector
        from: $from
        to: "utc_now"
        interval: $interval
      ) {
        datetime
        data {
          slug
          value
        }
      }
    }
  }
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

export function organizeTableQuery (columns, staticColumns) {
  return gql`
  query allProjectsByFunction($fn: json) {
    allProjectsByFunction(function: $fn) {
      projects {
        ...generalData
        ${staticColumns}
        ${columns.map(
    column =>
      `${column.key}: aggregatedTimeseriesData(
              metric: "${column.key}"
              from: "utc_now-${column.defaultTimeRange || '1d'}"
              to: "utc_now"
              aggregation: ${
  AGGREGATION_TYPES[(column.aggregation || 'last').toUpperCase()]
}
            )`
  )}
      }
      stats {
        projectsCount
      }
    }
  }
  ${generalData}
`
}
