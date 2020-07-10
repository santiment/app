import qs from 'query-string'
import { store } from '../../index'

export function getWatchlistLink ({ name, id }) {
  return `/assets/list?name=${encodeURIComponent(name)}@${id}`
}

export function isStaticWatchlist (watchlist) {
  const { name } = watchlist.function || {}
  return name === 'empty'
}

export function isDynamicWatchlist (watchlist) {
  const { name } = watchlist.function || {}
  return name !== 'empty'
}

export function isUserDynamicWatchlist ({ user = {}, ...props }) {
  const userId = store.getState().user.data.id
  const { name } = props.function || {}
  return name !== 'empty' && userId === user.id
}

export function getSharedWatchlistLink (watchlist) {
  return getWatchlistLink(watchlist) + '#shared'
}

export function getWatchlistId (search) {
  const { name: str } = qs.parse(search) || {}

  if (str) {
    const [, id] = str.split('@')
    return id
  }
}

export function isDefaultScreenerPath (pathname) {
  return pathname === DEFAULT_SCREENER.to
}

export const DEFAULT_SCREENER = {
  name: 'My screener',
  to: '/assets/screener',
  slug: 'TOTAL_MARKET',
  assetType: 'screener'
}

export const DEFAULT_SCREENER_FUNCTION = {
  args: { size: 10000 },
  name: 'top_all_projects'
}

// NOTE (haritonasty): remove it after migration on dynamic watchlists
// (need to integrate server-side pagination for tables before)
// July 5, 2020

export const BASIC_CATEGORIES = [
  {
    name: 'All assets',
    to: '/assets/all',
    slug: 'TOTAL_MARKET',
    assetType: 'all'
  },
  {
    name: 'ERC20',
    to: '/assets/erc20',
    slug: 'TOTAL_ERC20',
    assetType: 'erc20'
  }
]
