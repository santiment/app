import gql from 'graphql-tag'
import { generalData, project } from '../pages/Projects/allProjectsGQL'

export const generalListData = gql`
  fragment generalListData on UserList {
    id
    color
    isPublic
    name
    insertedAt
    updatedAt
    user {
      id
    }
  }
`

export const listShortItems = gql`
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
  ${generalListData}
  ${listShortItems}
`

export const PUBLIC_WATCHLIST_QUERY = gql`
  query fetchAllWatchlists {
    fetchAllPublicUserLists {
      ...generalListData
      ...listShortItems
    }
  }
  ${generalListData}
  ${listShortItems}
`

export const PROJECTS_BY_FUNCTION_SHORT_QUERY = gql`
  query allProjectsByFunction($function: json!) {
    allProjectsByFunction(function: $function) {
      slug
    }
  }
`

export const PROJECTS_BY_FUNCTION_BIG_QUERY = gql`
  query allProjectsByFunction($function: json!) {
    allProjectsByFunction(function: $function) {
      ...generalData
      ...project
    }
  }
  ${generalData}
  ${project}
`

export const FEATURED_WATCHLIST_QUERY = gql`
  query featuredWatchlists {
    featuredWatchlists {
      ...generalListData
      ...listShortItems
    }
  }
  ${generalListData}
  ${listShortItems}
`

export const WATCHLIST_QUERY = gql`
  query watchlist($id: Int!) {
    watchlist(id: $id) {
      ...generalListData
      listItems {
        project {
          ...generalData
          ...project
        }
      }
    }
  }
  ${generalListData}
  ${generalData}
  ${project}
`

export const WATCHLIST_WITH_TRENDING_ASSETS_QUERY = gql`
  query watchlist($id: Int!) {
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
  ${generalListData}
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
