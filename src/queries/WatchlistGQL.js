import gql from 'graphql-tag'
import {
  generalData,
  project,
  PROJECT_RECENT_DATA_FRAGMENT
} from '../ducks/Watchlists/gql/allProjectsGQL'
import { WATCHLIST_GENERAL_FRAGMENT } from '../ducks/Watchlists/gql/fragments'

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

export const PROJECTS_WATCHLIST_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      ...generalFragment
      listItems {
        project {
          ...generalData
          ...recentProjectData
        }
      }
      tableConfiguration {
        id
        title
        columns
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
      ...generalFragment
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
