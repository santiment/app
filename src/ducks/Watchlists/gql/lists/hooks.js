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

export const useUserProjectWatchlists = () =>
  useUserWatchlistsLoader(filterIfNotScreener, getWatchlistsShortQuery(PROJECT))

export const useUserAddressWatchlists = () =>
  useUserWatchlistsLoader(
    filterIfNotScreener,
    getWatchlistsShortQuery(BLOCKCHAIN_ADDRESS)
  )

const screenersCB = lists => getScreenersList(filterIfScreener(lists))
export const useUserScreeners = () =>
  useUserWatchlistsLoader(screenersCB, getWatchlistsShortQuery(SCREENER))

export const useFeaturedWatchlists = () =>
  useWatchlistsLoader(FEATURED_WATCHLISTS_QUERY, OBJ, sortFeaturedWatchlists)
export const useFeaturedScreeners = () =>
  useWatchlistsLoader(FEATURED_SCREENERS_QUERY)
