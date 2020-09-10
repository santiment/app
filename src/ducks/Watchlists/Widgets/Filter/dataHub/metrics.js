import React from 'react'
import { Filter } from './types'
import MarketSegments from '../Metric/MarketSegments'
import {
  percentValueFormatter,
  percentServerValueFormatter
} from '../formatters'

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
  transaction_volume_usd: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Transaction Volume USD',
    aggregation: 'sum',
    showTimeRange: true
  },
  mvrv_usd: {
    category: 'On-chain',
    group: 'Network Value',
    label: 'MVRV',
    aggregation: 'avg',
    showTimeRange: true,
    isDeprecated: true
  },
  mvrv_usd_30d: {
    category: 'On-chain',
    group: 'Network Value',
    label: 'MVRV 30d',
    hints: [
      {
        label: '< 1',
        firstThreshold: 1,
        type: Filter.below.key,
        description:
          'Average ROI is below 0% (breakeven) for addresses that acquired tokens in the past 30 days'
      },
      {
        label: '> 1.5',
        firstThreshold: 1.5,
        type: Filter.above.key,
        description:
          'Average ROI is above 50% for addresses that acquired tokens in the past 30 days'
      }
    ]
  },
  mvrv_usd_180d: {
    category: 'On-chain',
    group: 'Network Value',
    label: 'MVRV 180d',
    hints: [
      {
        label: '< 1',
        firstThreshold: 1,
        type: Filter.below.key,
        description:
          'Average ROI is below 0% (breakeven) for addresses that acquired tokens in the past 180 days'
      },
      {
        label: '> 1.5',
        firstThreshold: 1.5,
        type: Filter.above.key,
        description:
          'Average ROI is above 50% for addresses that acquired tokens in the past 180 days'
      }
    ]
  },
  mvrv_usd_365d: {
    category: 'On-chain',
    group: 'Network Value',
    label: 'MVRV 1y',
    hints: [
      {
        label: '< 1',
        firstThreshold: 1,
        type: Filter.below.key,
        description:
          'Average ROI is below 0% (breakeven) for addresses that acquired tokens in the past 1 year'
      },
      {
        label: '> 1.5',
        firstThreshold: 1.5,
        type: Filter.above.key,
        description:
          'Average ROI is above 50% for addresses that acquired tokens in the past 1 year'
      }
    ]
  },
  circulation: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Circulation'
  },
  circulation_180d: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Circulation 180d'
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
  },
  dormant_circulation_365d: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Dormant Circulation 1y',
    descriptionKey: 'dormant_circulation'
  },
  bitmex_perpetual_funding_rate: {
    label: 'BitMEX Perpetual Contract Funding Rate',
    category: 'Derivatives',
    badge: '%',
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter
  },
  market_segments: {
    category: 'Financial',
    label: 'Market Segments',
    hints: [
      {
        label: 'DeFi',
        market_segments: ['DeFi'],
        market_segments_combinator: 'and',
        description: 'Tokens related to Decentralized Finance solutions'
      }
    ],
    Widget: props => <MarketSegments {...props} />
  },
  social_volume_total: {
    percentMetricKey: 'social_volume',
    category: 'Social',
    label: 'Social Volume',
    isOnlyPercentFilters: true
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
  Metric.transaction_volume_usd,
  Metric.circulation,
  Metric.circulation_180d,
  Metric.network_growth,
  Metric.exchange_inflow,
  Metric.exchange_outflow,
  Metric.exchange_balance,
  Metric.mvrv_usd,
  Metric.mvrv_usd_30d,
  Metric.mvrv_usd_180d,
  Metric.mvrv_usd_365d,
  Metric.dormant_circulation_365d,
  Metric.bitmex_perpetual_funding_rate,
  Metric.market_segments,
  Metric.social_volume_total
]

export const MetricAlias = {
  active_addresses_24h: Metric.daily_active_addresses,
  dev_activity: Metric.dev_activity_1d,
  social_volume: Metric.social_volume_total
}
