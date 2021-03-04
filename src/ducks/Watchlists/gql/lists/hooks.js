import { BLOCKCHAIN_ADDRESS } from '../../detector'
import {
  FEATURED_SCREENERS_QUERY,
  FEATURED_WATCHLISTS_QUERY,
  useUserWatchlistsLoader,
  useWatchlistsLoader
} from './queries'
import {
  filterIfNotScreener,
  filterIfScreener,
  getScreenersList,
  sortFeaturedWatchlists
} from './helpers'

const OBJ = {}

export const useUserProjectWatchlists = () =>
  useUserWatchlistsLoader(filterIfNotScreener)

export const useUserAddressWatchlists = () =>
  useUserWatchlistsLoader(filterIfNotScreener, {
    variables: { type: BLOCKCHAIN_ADDRESS }
  })

const screenersCB = lists => getScreenersList(filterIfScreener(lists))
export const useUserScreeners = () => useUserWatchlistsLoader(screenersCB)

export const useFeaturedWatchlists = () =>
  useWatchlistsLoader(FEATURED_WATCHLISTS_QUERY, OBJ, sortFeaturedWatchlists)
export const useFeaturedScreeners = () =>
  useWatchlistsLoader(FEATURED_SCREENERS_QUERY)
