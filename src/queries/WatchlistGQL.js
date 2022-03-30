import gql from 'graphql-tag'
import { generalData } from '../ducks/Watchlists/gql/allProjectsGQL'
import {
  PROJECTS_LIST_ITEMS_FRAGMENT,
  WATCHLIST_GENERAL_FRAGMENT
} from '../ducks/Watchlists/gql/fragments'

export const PROJECTS_WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      ...listItemsFragment
      tableConfiguration {
        id
        type
        title
        columns
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${PROJECTS_LIST_ITEMS_FRAGMENT}
`

export const WATHLIST_ITEMS_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      listItems {
        project {
          slug
        }
      }
    }
  }
`

export const WATCHLIST_VOTES_MUTATION = gql`
  mutation vote($id: Int!) {
    vote(watchlistId: $id) {
      votes {
        userVotes: currentUserVotes
        totalVotes
      }
      votedAt
    }
  }
`

export const WATCHLIST_WITH_TRENDS_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      stats {
        projectsCount
        trendingProjects {
          ...generalData
        }
      }
      listItems {
        project {
          priceUsd
          percentChange24h
          percentChange7d
          marketcapUsd
          ...generalData
        }
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${generalData}
`
