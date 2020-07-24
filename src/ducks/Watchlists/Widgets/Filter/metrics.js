export const Metric = {
  price_usd: {
    label: 'Price',
    category: 'Financial',
    badge: '$'
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
  }
}

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})

export const metrics = [
  Metric.price_usd,
  Metric.marketcap_usd,
  Metric.volume_usd,
  Metric.dev_activity_1d,
  Metric.daily_active_addresses
]

export const MetricAlias = {
  active_addresses_24h: Metric.daily_active_addresses,
  dev_activity: Metric.dev_activity
}
