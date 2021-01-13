import { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  SHORT_WATCHLIST_GENERAL_FRAGMENT,
  SHORT_LIST_ITEMS_FRAGMENT
} from '../../WatchlistAddressesTable/gql/queries'
import { useUser } from '../../../stores/user'
import { isStage } from '../../../utils/utils'

const noop = _ => _
const ARRAY = []

export const newWatchlistsQuery = (
  type,
  generalFragment,
  listItemsFragment
) => gql`
  query fetchWatchlists {
    fetchWatchlists(type: ${type}) {
      ...generalFragment
      ...listItemsFragment
    }
  }
  ${generalFragment}
  ${listItemsFragment}
`

export const ADDRESS_WATCHLISTS_QUERY = newWatchlistsQuery(
  'BLOCKCHAIN_ADDRESS',
  SHORT_WATCHLIST_GENERAL_FRAGMENT,
  SHORT_LIST_ITEMS_FRAGMENT
)

export const FEATURED_WATCHLISTS_QUERY = gql`
  query featuredWatchlists {
    watchlists: featuredWatchlists {
      id
      name
    }
  }
`

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists {
      id
      name
      function
      insertedAt
      isPublic
    }
  }
`

function useWatchlists (query) {
  const { data, loading } = useQuery(query)
  return {
    watchlists: data ? data.fetchWatchlists : ARRAY,
    isLoading: loading
  }
}

export const useAddressWatchlists = () =>
  useWatchlists(ADDRESS_WATCHLISTS_QUERY)

function useShortWatchlists (query, options) {
  const { data, loading, error } = useQuery(query, options)
  return [data ? data.watchlists : ARRAY, loading, error]
}

const WatchlistIdOrder = {}
const WATCHLIST_IDS_ORDER = [5496, 5497, 2046, 86, 749, 127, 272]
WATCHLIST_IDS_ORDER.forEach((id, i) => {
  WatchlistIdOrder[id] = i
})

const sortFeaturedWatchlists = ({ id: a }, { id: b }) =>
  WatchlistIdOrder[a] - WatchlistIdOrder[b]

export function useFeaturedWatchlists () {
  const data = useShortWatchlists(FEATURED_WATCHLISTS_QUERY)
  return useMemo(
    () => {
      data[0] = data[0].slice().sort(sortFeaturedWatchlists)
      return data
    },
    [data[0]]
  )
}

const checkIsScreener = ({ function: fn }) => fn.name !== 'empty'
const checkIsNotScreener = ({ function: fn }) => fn.name === 'empty'
function useUserShortWatchlists (filter, reduce = noop) {
  const { isLoggedIn } = useUser()
  const data = useShortWatchlists(USER_WATCHLISTS_QUERY, { skip: !isLoggedIn })

  return useMemo(
    () => {
      data[0] = reduce(data[0].filter(filter))
      return data
    },
    [data[0]]
  )
}

export const useUserWatchlists = () =>
  useUserShortWatchlists(checkIsNotScreener)

const DEFAULT_SCREENERS = [
  {
    name: 'My screener',
    href: '/screener/new',
    id:
      process.env.REACT_APP_BACKEND_URL.indexOf('stage') > -1 || isStage
        ? 1183
        : 5496
  }
]
export const useUserScreeners = () =>
  useUserShortWatchlists(checkIsScreener, watchlists =>
    watchlists.length > 0 ? watchlists : DEFAULT_SCREENERS
  )
