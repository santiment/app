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

export const COMMON_SETTINGS = {
  pageSize: 20,
  sorting: { id: COLUMNS_NAMES.marketcapUsd, desc: false }
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
