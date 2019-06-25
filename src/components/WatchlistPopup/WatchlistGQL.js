import gql from 'graphql-tag'
import { generalData, project } from '../../pages/Projects/allProjectsGQL'

export const WatchlistGQL = gql`
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

export const publicWatchlistGQL = gql`
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

export const projectsByFunctionGQL = gql`
  query allProjectsByFunction($function: json!) {
    allProjectsByFunction(function: $function) {
      id
      slug
    }
  }
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
