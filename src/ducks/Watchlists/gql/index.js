import gql from 'graphql-tag'
import {
  generalData,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../../../pages/Projects/allProjectsGQL'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalListData on UserList {
    id
    isPublic
    name
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
      }
    }
  }
`

export const WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
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

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchUserLists {
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
