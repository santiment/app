// all percent metrics exists as a part of base metric.
// base metric: price_usd
// percent metric: price_usd_change_1d

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
    aggregation: 'avg',
    showTimeRange: true
  },
  daily_active_addresses: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    aggregation: 'avg',
    showTimeRange: true
  }
}

export const metrics = [
  Metric.price_usd,
  Metric.marketcap_usd,
  Metric.volume_usd,
  Metric.dev_activity_1d,
  Metric.daily_active_addresses
]

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})
