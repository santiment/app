export const MenuItem = {
  NEW: 'New',
  LIKES: 'Likes',
  MY_CREATIONS: 'My creations',
}

export const EntityKeys = {
  USER_TRIGGER: 'USER_TRIGGER',
  ADDRESS_WATCHLIST: 'ADDRESS_WATCHLIST',
  CHART_CONFIGURATION: 'CHART_CONFIGURATION',
  SCREENER: 'SCREENER',
  PROJECT_WATCHLIST: 'PROJECT_WATCHLIST',
  INSIGHT: 'INSIGHT',
}

export const EntityType = {
  ALERT: {
    key: EntityKeys.USER_TRIGGER,
    label: 'Alerts',
    icon: 'alert',
    color: 'var(--red)',
    url: (id) => `/alerts/${id}`,
  },
  ADDRESS: {
    key: EntityKeys.ADDRESS_WATCHLIST,
    label: 'Addresses',
    icon: 'wallet',
    color: 'var(--purple)',
    url: (id) => `/watchlist/addresses/${id}`,
  },
  CHART: {
    key: EntityKeys.CHART_CONFIGURATION,
    label: 'Charts',
    icon: 'chart',
    color: 'var(--green)',
    url: (id) => `/charts/${id}`,
  },
  SCREENER: {
    key: EntityKeys.SCREENER,
    label: 'Screeners',
    icon: 'screener',
    color: 'var(--blue)',
    url: (id) => `/screener/${id}`,
  },
  WATCHLIST: {
    key: EntityKeys.PROJECT_WATCHLIST,
    label: 'Watchlists',
    icon: 'watchlist',
    color: 'var(--orange)',
    url: (id) => `/watchlist/projects/${id}`,
  },
}

export const RANGES = {
  '12h': '12h',
  '24h': '1d',
  '7d': '7d',
  '30d': '30d',
  'All time': '',
}

export function getItemUrl(item, type) {
  if (type === EntityKeys.INSIGHT) {
    return `https://insights.santiment.net/read/${item.id}`
  }
  const route = EntityType[type].url(item.trigger ? item.trigger.id : item.id)
  return `${window.location.origin}${route}`
}
