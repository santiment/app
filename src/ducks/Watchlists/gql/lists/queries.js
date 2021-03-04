import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { SHORT_WATCHLIST_FRAGMENT } from '../fragments'
import { useUser } from '../../../../stores/user'

export const USER_SHORT_WATCHLISTS_QUERY = gql`
  query fetchWatchlists($type: WatchlistTypeEnum) {
    fetchWatchlists(type: $type) {
      ...generalFragment
    }
  }
  ${SHORT_WATCHLIST_FRAGMENT}
`

export const FEATURED_WATCHLISTS_QUERY = gql`
  query featuredWatchlists {
    fetchWatchlists: featuredWatchlists {
      id
      name
    }
  }
`

export const FEATURED_SCREENERS_QUERY = gql`
  query featuredScreeners {
    fetchWatchlists: featuredScreeners {
      id
      name
    }
  }
`

const ARRAY = []
const CB = _ => _

export function useWatchlistsLoader (query, options, cb = CB) {
  const { data, loading } = useQuery(query, options)
  return useMemo(() => [data ? cb(data.fetchWatchlists) : ARRAY, loading], [
    data
  ])
}

export function useUserWatchlistsLoader (
  cb = CB,
  options,
  query = USER_SHORT_WATCHLISTS_QUERY
) {
  const { isLoggedIn } = useUser()
  return useWatchlistsLoader(query, { skip: !isLoggedIn, ...options })
}
