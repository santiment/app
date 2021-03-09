import gql from 'graphql-tag'
import { client } from '../../../apollo'
import { AGGREGATIONS_UPPER } from '../Widgets/Filter/dataHub/aggregations'
import { SHORT_WATCHLIST_FRAGMENT } from './fragments'

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
      ...generalFragment
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
`

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchWatchlists {
      ...generalFragment
      ...listShortItems
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
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
    ({ isStatic, accessor, isRestricted, isChart }) => {
      if (isStatic) {
        staticColumns.push(accessor)
      }
      return !isStatic && !isRestricted && !isChart
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
