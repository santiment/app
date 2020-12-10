export const COLUMNS_NAMES = {
  checkboxes: 'Checkboxes',
  index: 'Index',
  project: 'Project',
  marketcapUsd: 'Market capitalization',
  price: 'Price',
  price_change: 'Price (last 24h)',
  price_chart: 'Price chart, 7d',
  volume: 'Volume',
  volume_change: 'Volume (last 24h)',
  rank: 'Rank',
  eth_spent: 'ETH spent',
  devact: 'Development activity',
  daily_active_addresses: 'Daily active addresses',
  graph: 'Graph',
  marketSegments: 'Market Segments'
}

export const COLUMNS_SETTINGS = {
  [COLUMNS_NAMES.checkboxes]: { show: true, selectable: false },
  [COLUMNS_NAMES.index]: { show: true, selectable: false },
  [COLUMNS_NAMES.project]: { show: true, selectable: false },
  [COLUMNS_NAMES.price]: { show: true, selectable: true },
  [COLUMNS_NAMES.price_change]: { show: true, selectable: true },
  [COLUMNS_NAMES.price_chart]: { show: true, selectable: true },
  [COLUMNS_NAMES.volume]: { show: true, selectable: true },
  [COLUMNS_NAMES.volume_change]: { show: true, selectable: true },
  [COLUMNS_NAMES.marketcapUsd]: { show: true, selectable: true },
  [COLUMNS_NAMES.rank]: { show: true, selectable: true },
  [COLUMNS_NAMES.marketSegments]: { show: true, selectable: true },
  [COLUMNS_NAMES.eth_spent]: {
    show: true,
    selectable: true,
    key: 'ethSpentOverTime'
  },
  [COLUMNS_NAMES.devact]: {
    show: true,
    selectable: true,
    key: 'dev_activity'
  },
  [COLUMNS_NAMES.daily_active_addresses]: {
    show: true,
    selectable: true,
    key: 'daily_active_addresses'
  }
}

export const COMMON_SETTINGS = {
  pageSize: 20,
  hiddenColumns: [COLUMNS_NAMES.eth_spent, COLUMNS_NAMES.marketSegments],
  sorting: { id: COLUMNS_NAMES.marketcapUsd, desc: false }
}

export const CATEGORIES_SETTINGS = {
  'All Assets': {
    hiddenColumns: [COLUMNS_NAMES.eth_spent, COLUMNS_NAMES.marketSegments]
  },
  'ERC20 Assets': { hiddenColumns: [] },
  'Top 50 ERC20': {
    hiddenColumns: [],
    pageSize: 50
  }
}

export const ASSETS_TABLE_COLUMNS = [
  COLUMNS_NAMES.checkboxes,
  COLUMNS_NAMES.index,
  COLUMNS_NAMES.project,
  COLUMNS_NAMES.price,
  COLUMNS_NAMES.price_change,
  COLUMNS_NAMES.price_chart,
  COLUMNS_NAMES.volume,
  COLUMNS_NAMES.volume_change,
  COLUMNS_NAMES.marketcapUsd,
  COLUMNS_NAMES.rank,
  COLUMNS_NAMES.eth_spent,
  COLUMNS_NAMES.marketSegments,
  COLUMNS_NAMES.devact,
  COLUMNS_NAMES.daily_active_addresses
]
