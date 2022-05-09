import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'

export const MenuItem = {
  NEW: 'New',
  LIKES: 'Likes',
  MY_CREATIONS: 'My creations',
}

export const EntityKeys = {
  // USER_TRIGGER: 'USER_TRIGGER',
  ADDRESS_WATCHLIST: 'ADDRESS_WATCHLIST',
  CHART_CONFIGURATION: 'CHART_CONFIGURATION',
  SCREENER: 'SCREENER',
  PROJECT_WATCHLIST: 'PROJECT_WATCHLIST',
  INSIGHT: 'INSIGHT',
}

export const EntityType = {
  CHART: {
    key: EntityKeys.CHART_CONFIGURATION,
    voteKey: 'chartConfigurationId',
    deleteKey: 'CHART',
    label: 'Chart layouts',
    singular: 'chart',
    icon: 'chart',
    color: 'var(--green)',
    url: (id, title) => `/charts/${getSEOLinkFromIdAndTitle(id, title)}`,
  },
  WATCHLIST: {
    key: EntityKeys.PROJECT_WATCHLIST,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Watchlists',
    singular: 'watchlist',
    icon: 'watchlist',
    color: 'var(--orange)',
    url: (id) => `/watchlist/projects/${id}`,
  },
  ADDRESS: {
    key: EntityKeys.ADDRESS_WATCHLIST,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Addresses',
    singular: 'watchlist',
    icon: 'wallet',
    color: 'var(--purple)',
    url: (id) => `/watchlist/addresses/${id}`,
  },
  SCREENER: {
    key: EntityKeys.SCREENER,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Screeners',
    singular: 'screener',
    icon: 'screener',
    color: 'var(--blue)',
    url: (id) => `/screener/${id}`,
  },
  // ALERT: {
  //   key: EntityKeys.USER_TRIGGER,
  //   voteKey: 'userTriggerId',
  //   deleteKey: 'TRIGGER',
  //   label: 'Alerts',
  //   singular: 'alert',
  //   icon: 'alert',
  //   color: 'var(--red)',
  //   url: (id) => `/alerts/${id}`,
  // },
}

export const RANGES = {
  '12h': '12h',
  '24h': '1d',
  '7d': '7d',
  '30d': '30d',
  'All time': '',
}

export function getItemRoute(item, type, withComments = false) {
  const { id, title } = item.trigger || item
  let route = EntityType[type].url(id, title)
  if (withComments) route = `${route}?comment=${id}`
  return route
}

export function getItemUrl(item, type) {
  if (type === EntityKeys.INSIGHT) {
    return `https://insights.santiment.net/read/${item.id}`
  }
  const route = getItemRoute(item, type)
  return `${window.location.origin}${route}`
}

export function getExplorerItem(item) {
  let data = {}
  if (item.addressWatchlist) data = item.addressWatchlist
  if (item.chartConfiguration) data = item.chartConfiguration
  if (item.projectWatchlist) data = item.projectWatchlist
  if (item.screener) data = item.screener
  if (item.userTrigger) data = item.userTrigger
  return data
}

export function getExplorerItemProperty(item) {
  if (item.addressWatchlist) return 'addressWatchlist'
  if (item.chartConfiguration) return 'chartConfiguration'
  if (item.projectWatchlist) return 'projectWatchlist'
  if (item.screener) return 'screener'
  if (item.userTrigger) return 'userTrigger'
  throw new Error('Invalid Item')
}
