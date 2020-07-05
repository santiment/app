import gql from 'graphql-tag'
import {
  generalData,
  project,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../pages/Projects/allProjectsGQL'

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

export const ALL_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchUserLists {
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
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${PROJECT_RECENT_DATA_FRAGMENT}
`

export const WATCHLIST_WITH_TRENDING_ASSETS_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalListData
      stats {
        trendingProjects {
          ...generalData
          ...project
        }
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

export const WATCHLISTS_SETTINGS_QUERY = gql`
  query fetchWatchlists {
    fetchUserLists {
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
