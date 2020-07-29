export const Metric = {
  price_usd: {
    label: 'Price',
    category: 'Financial',
    badge: '$'
  },
  price_btc: {
    label: 'Price BTC',
    category: 'Financial',
    badge: 'BTC'
  },
  marketcap_usd: {
    category: 'Financial',
    label: 'Marketcap',
    badge: '$'
  },
  volume_usd: {
    category: 'Financial',
    label: 'Volume',
    badge: '$'
  },
  dev_activity_1d: {
    category: 'Development',
    label: 'Development Activity',
    descriptionKey: 'dev_activity',
    percentMetricKey: 'dev_activity',
    aggregation: 'avg',
    showTimeRange: true,
    defaultTimeRange: '30d'
  },
  daily_active_addresses: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    percentMetricKey: 'active_addresses_24h',
    aggregation: 'avg',
    showTimeRange: true
  },
  transaction_volume: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Transaction Volume',
    aggregation: 'sum',
    showTimeRange: true
  },
  mvrv_usd: {
    category: 'On-chain',
    group: 'Network Value',
    label: 'MVRV',
    aggregation: 'avg',
    showTimeRange: true
  },
  circulation: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Circulation'
  },
  network_growth: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Network Growth',
    aggregation: 'sum',
    showTimeRange: true
  },
  exchange_inflow: {
    label: 'Exchange Inflow',
    category: 'On-chain',
    group: 'Exchanges',
    aggregation: 'sum',
    showTimeRange: true
  },
  exchange_outflow: {
    label: 'Exchange Outflow',
    category: 'On-chain',
    group: 'Exchanges',
    aggregation: 'sum',
    showTimeRange: true
  },
  exchange_balance: {
    category: 'On-chain',
    group: 'Exchanges',
    label: 'Exchange Flow Balance',
    aggregation: 'sum',
    showTimeRange: true
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

export const metrics = [
  Metric.price_usd,
  Metric.price_btc,
  Metric.marketcap_usd,
  Metric.volume_usd,
  Metric.dev_activity_1d,
  Metric.daily_active_addresses,
  Metric.transaction_volume,
  Metric.mvrv_usd,
  Metric.circulation,
  Metric.network_growth,
  Metric.exchange_inflow,
  Metric.exchange_outflow,
  Metric.exchange_balance
]

export const MetricAlias = {
  active_addresses_24h: Metric.daily_active_addresses,
  dev_activity: Metric.dev_activity
}
