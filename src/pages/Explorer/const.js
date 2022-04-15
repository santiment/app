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
    key: 'USER_TRIGGER',
    label: 'Alerts',
    icon: 'alert',
    color: 'var(--red)',
  },
  ADDRESS: {
    key: 'ADDRESS_WATCHLIST',
    label: 'Addresses',
    icon: 'wallet',
    color: 'var(--purple)',
  },
  CHART: {
    key: 'CHART_CONFIGURATION',
    label: 'Charts',
    icon: 'chart',
    color: 'var(--green)',
  },
  SCREENER: {
    key: 'SCREENER',
    label: 'Screeners',
    icon: 'screener',
    color: 'var(--blue)',
  },
  WATCHLIST: {
    key: 'PROJECT_WATCHLIST',
    label: 'Watchlists',
    icon: 'watchlist',
    color: 'var(--orange)',
  },
}

export const RANGES = {
  '12h': '12h',
  '24h': '1d',
  '7d': '7d',
  '30d': '30d',
  'All time': '',
}
