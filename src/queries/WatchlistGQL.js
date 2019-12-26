import gql from 'graphql-tag'
import { generalData, project } from '../pages/Projects/allProjectsGQL'

export const WATHCLIST_GENERAL_FRAGMENT = gql`
  fragment generalListData on UserList {
    id
    color
    isPublic
    name
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
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const PUBLIC_WATCHLIST_QUERY = gql`
  query fetchAllWatchlists {
    fetchAllPublicUserLists {
      ...generalListData
      ...listShortItems
    }
  }
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
`

export const WATCHLIST_BY_SLUG_SHORT_QUERY = gql`
  query watchlistBySlug($slug: String!) {
    watchlistBySlug(slug: $slug) {
      ...generalListData
      listItems {
        project {
          ...generalData
          ...project
        }
      }
    }
  }
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${project}
`

export const WATCHLIST_BY_SLUG_BIG_QUERY = gql`
  query watchlistBySlug($slug: String!) {
    watchlistBySlug(slug: $slug) {
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
  ${WATHCLIST_GENERAL_FRAGMENT}
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
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${PROJECT_ITEM_FRAGMENT}
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
  ${WATHCLIST_GENERAL_FRAGMENT}
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
  ${WATHCLIST_GENERAL_FRAGMENT}
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
  query watchlist($id: Int!) {
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
  ${WATHCLIST_GENERAL_FRAGMENT}
  ${generalData}
  ${project}
`
