import gql from 'graphql-tag'
import { generalData, project } from '../pages/Projects/allProjectsGQL'

export const ALL_WATCHLISTS_QUERY = gql`
  query fetchUserLists {
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
  query fetchAllPublicUserLists {
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
