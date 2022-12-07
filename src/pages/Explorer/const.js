import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
import { VoteTypeFeature } from 'webkit/ui/LikeButton/index.svelte'
import { VoteType } from 'webkit/api/vote'

export const MenuItem = {
  FAVORITES: 'Favorites',
  SANTIMENT: 'Santiment',
  NEW: 'New',
  LIKES: 'Likes',
  MY_CREATIONS: 'My creations',
  TRENDING: 'Trending',
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
  INSIGHT: {
    key: EntityKeys.INSIGHT,
    voteKey: 'insightId',
    deleteKey: 'INSIGHT',
    label: 'Insights',
    singular: 'insight',
    icon: 'insight',
    color: 'var(--blue)',
    backgroundColor: 'var(--blue-light-1)',
    url: (id, title) => `/insights/read/${getSEOLinkFromIdAndTitle(id, title)}`,
    filterable: true,
    feature: VoteTypeFeature[VoteType.Insight],
  },
  CHART: {
    key: EntityKeys.CHART_CONFIGURATION,
    voteKey: 'chartConfigurationId',
    deleteKey: 'CHART',
    label: 'Charts',
    singular: 'chart',
    icon: 'chart',
    color: 'var(--green)',
    backgroundColor: 'var(--green-light-1)',
    url: (id, title) => `/charts/${getSEOLinkFromIdAndTitle(id, title)}`,
    filterable: true,
    feature: VoteTypeFeature[VoteType.Layout],
  },
  WATCHLIST: {
    key: EntityKeys.PROJECT_WATCHLIST,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Watchlists',
    singular: 'watchlist',
    icon: 'watchlist',
    color: 'var(--orange)',
    backgroundColor: 'var(--orange-light-1)',
    url: (id) => `/watchlist/projects/${id}`,
    filterable: true,

    feature: VoteTypeFeature[VoteType.Watchlist],
  },
  ADDRESS: {
    key: EntityKeys.ADDRESS_WATCHLIST,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Addresses',
    singular: 'watchlist',
    icon: 'wallet',
    color: 'var(--purple)',
    backgroundColor: 'var(--purple-light-1)',
    url: (id) => `/watchlist/addresses/${id}`,

    feature: VoteTypeFeature[VoteType.Watchlist],
  },
  SCREENER: {
    key: EntityKeys.SCREENER,
    voteKey: 'watchlistId',
    deleteKey: 'WATCHLIST',
    label: 'Screeners',
    singular: 'screener',
    icon: 'screener',
    color: 'var(--blue)',
    backgroundColor: 'var(--blue-light-1)',
    url: (id) => `/screener/${id}`,
    filterable: true,
    feature: 'screener',
  },
  // ALERT: {
  //   key: EntityKeys.USER_TRIGGER,
  //   voteKey: 'userTriggerId',
  //   deleteKey: 'TRIGGER',
  //   label: 'Alerts',
  //   singular: 'alert',
  //   icon: 'alert',
  //   color: 'var(--red)',
  //   backgroundColor: 'var(--red-light-1)',
  //   url: (id) => `/alerts/${id}`,
  // },
}

export const FILTERABLE_TABS = Object.values(EntityType).filter((entity) => entity.filterable)

export const FeatureEvent = {
  [EntityType.CHART.key]: 'chart_layouts',
  [EntityType.INSIGHT.key]: 'insights',
  [EntityType.WATCHLIST.key]: 'watchlists',
  [EntityType.SCREENER.key]: 'screeners',
}

export const RANGES = {
  'Last 12h': '12h',
  'Last 24h': '1d',
  'Last 7d': '7d',
  'Last 30d': '30d',
  'All time': '',
}

export function getItemRoute(item, type, withComments = false) {
  const { id, title } = item.trigger || item
  let route = EntityType[type].url(id, title)
  if (withComments) {
    route = type === EntityKeys.INSIGHT ? `${route}?_wc=1#comments` : `${route}?comment=${id}`
  }
  return route
}

export function getItemUrl(item, type) {
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
  if (item.insight) data = item.insight
  return data
}
