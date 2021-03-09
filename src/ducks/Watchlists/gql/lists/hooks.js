import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../detector'
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
  getWatchlistsShortQuery,
  sortFeaturedWatchlists
} from './helpers'

const OBJ = {}

const screenersCB = lists => getScreenersList(filterIfScreener(lists))
export const useUserScreeners = () =>
  useUserWatchlistsLoader(getWatchlistsShortQuery(SCREENER), screenersCB)
export const useUserProjectWatchlists = () =>
  useUserWatchlistsLoader(getWatchlistsShortQuery(PROJECT), filterIfNotScreener)
export const useUserAddressWatchlists = () =>
  useUserWatchlistsLoader(getWatchlistsShortQuery(BLOCKCHAIN_ADDRESS))

export const useFeaturedWatchlists = () =>
  useWatchlistsLoader(FEATURED_WATCHLISTS_QUERY, OBJ, sortFeaturedWatchlists)
export const useFeaturedScreeners = () =>
  useWatchlistsLoader(FEATURED_SCREENERS_QUERY)

export const useUserWatchlists = type => {
  switch (type) {
    case SCREENER:
      return useUserScreeners()
    case BLOCKCHAIN_ADDRESS:
      return useUserAddressWatchlists()
    case PROJECT:
    default:
      return useUserProjectWatchlists()
  }
}
