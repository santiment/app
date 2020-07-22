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
  dev_activity: {
    category: 'Development',
    label: 'Development Activity',
    aggregation: 'sum'
  },
  active_addresses_24h: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Daily Active Addresses',
    moreInfoLink:
      'https://academy.santiment.net/metrics/daily-active-addresses/'
  }
}

export const metrics = [
  Metric.price_usd,
  Metric.marketcap_usd,
  Metric.volume_usd,
  Metric.dev_activity,
  Metric.active_addresses_24h
]

Object.keys(Metric).forEach(key => {
  Metric[key].key = key
})
