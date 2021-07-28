import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useUser } from '../../../../stores/user'
import {
  getStats,
  SHORT_WATCHLIST_FRAGMENT,
  getListItemsShortFragment
} from '../fragments'
import { PROJECT } from '../../detector'

export const USER_SHORT_WATCHLISTS_QUERY = type => gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists(type: ${type}) {
      ...generalFragment
      ${getStats(type)}
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
`

export const USER_WATCHLISTS_QUERY = type => gql`
    query fetchWatchlists {
      watchlists: fetchWatchlists(type: ${type}) {
        ...generalFragment
        ...listItemsFragment
        ${getStats(type)}
      }
    }
    ${SHORT_WATCHLIST_FRAGMENT}
    ${getListItemsShortFragment(type)}
  `

export const FEATURED_WATCHLISTS_QUERY = (type = PROJECT) => gql`
  query featuredWatchlists {
    watchlists: featuredWatchlists(type: ${type}) {
      id
      name
      slug
    }
  }
`

export const FEATURED_SCREENERS_QUERY = gql`
  query featuredScreeners {
    watchlists: featuredScreeners {
      id
      name
    }
  }
`

const ARRAY = []
const CB = _ => _

export function useWatchlistsLoader (query, options, cb = CB, isUserLoading) {
  const { data, loading } = useQuery(query, options)
  return useMemo(
    () => [cb(data ? data.watchlists : ARRAY), loading || isUserLoading],
    [data, isUserLoading]
  )
}

export function useUserWatchlistsLoader (query, cb) {
  const { isLoggedIn, loading } = useUser()
  return useWatchlistsLoader(query, { skip: !isLoggedIn }, cb, loading)
}
