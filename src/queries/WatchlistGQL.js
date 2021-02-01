import gql from 'graphql-tag'
import {
  generalData,
  project,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../ducks/Watchlists/gql/allProjectsGQL'

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
      }
    }
  }
`

export const ALL_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchWatchlists {
      ...generalListData
      ...listShortItems
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
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
      tableConfiguration {
        id
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${PROJECT_RECENT_DATA_FRAGMENT}
`

export const WATCHLISTS_SETTINGS_QUERY = gql`
  query fetchWatchlists {
    fetchWatchlists {
      id
      settings {
        pageSize
        tableColumns
      }
    }
  }
`

export const WATCHLIST_WITH_TRENDS_AND_SETTINGS_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalListData
      stats {
        projectsCount
        trendingProjects {
          ...generalData
          ...project
        }
      }
      settings {
        pageSize
        tableColumns
      }
      listItems {
        project {
          ...generalData
          ...project
        }
      }
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${project}
`
