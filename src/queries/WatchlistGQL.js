import gql from 'graphql-tag'
import { generalData, project } from '../pages/Projects/allProjectsGQL'

export const ALL_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchUserLists {
      id
      color
      isPublic
      name
      listItems {
        project {
          id
          slug
        }
      }
      insertedAt
      updatedAt
      user {
        id
      }
    }
  }
`

export const PUBLIC_WATCHLIST_QUERY = gql`
  query fetchAllWatchlists {
    fetchAllPublicUserLists {
      id
      color
      isPublic
      name
      listItems {
        project {
          id
          slug
        }
      }
      insertedAt
      updatedAt
      user {
        id
      }
    }
  }
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
      id
      color
      isPublic
      name
      listItems {
        project {
          id
          slug
        }
      }
      insertedAt
      updatedAt
    }
  }
`

export const WATCHLIST_QUERY = gql`
  query watchlist($id: Int!) {
    watchlist(id: $id) {
      id
      name
      user {
        id
      }
      isPublic
      listItems {
        project {
          ...generalData
          ...project
        }
      }
    }
  }
  ${generalData}
  ${project}
`

export const WATCHLIST_WITH_TRENDING_ASSETS_QUERY = gql`
  query watchlist($id: Int!) {
    watchlist(id: $id) {
      id
      name
      user {
        id
      }
      isPublic
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
