import React from 'react'
import { Filter } from './types'
import MarketSegments from '../Metric/MarketSegments'
import {
  percentValueFormatter,
  percentServerValueFormatter
} from '../formatters'
import { DEFAULT_TIMERANGES } from './timeranges'

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
    defaultTimeRange: '30d',
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
  circulation_180d_usd: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Circulation 180d USD'
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
  exchange_inflow_usd: {
    label: 'Exchange Inflow USD',
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
  exchange_outflow_usd: {
    label: 'Exchange Outflow USD',
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
    category: 'Social',
    label: 'Social Volume',
    isOnlyPercentFilters: true
  },
  social_dominance_total: {
    category: 'Social',
    label: 'Social Dominance',
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter,
    isOnlyPercentFilters: true
  },
  sentiment_balance_total: {
    label: 'Sentiment Balance Total',
    category: 'Social',
    isOnlyPercentFilters: true
  },
  mean_dollar_invested_age: {
    category: 'On-chain',
    label: 'Mean Dollar Invested Age',
    group: 'Network Value',
    isOnlyPercentFilters: true
  },
  percent_of_total_supply_on_exchanges: {
    category: 'On-chain',
    group: 'Exchanges',
    label: 'Coin Supply on Exchanges (as % of total supply)'
  },
  dex_traders_to_cexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dex Traders',
    label: 'Dex Traders to Cexes'
  },
  dex_traders_to_dexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dex Traders',
    label: 'Dex Traders to Dexes'
  },
  dex_traders_to_defi_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dex Traders',
    label: 'Dex Traders to DeFi'
  },
  dex_traders_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dex Traders',
    label: 'Dex Traders to Whales'
  },
  dex_traders_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dex Traders',
    label: 'Dex Traders to Others'
  },
  dex_to_cexes_flow: {
    isOnlyPercentFilters: true,
    group: 'Dexes',
    category: 'Flow metrics',
    label: 'Dexes to Cexes'
  },
  dexes_to_defi_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dexes',
    label: 'Dexes to DeFi'
  },
  dexes_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dexes',
    label: 'Dexes to Whales'
  },
  dexes_to_dex_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dexes',
    label: 'Dexes to Dex Traders'
  },
  dexes_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Dexes',
    label: 'Dexes to Others'
  },
  cexes_to_dex_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Cexes',
    label: 'Cexes to Dexes'
  },
  cexes_to_defi_flow: {
    isOnlyPercentFilters: true,
    group: 'Cexes',
    category: 'Flow metrics',
    label: 'Cexes to DeFi'
  },
  cexes_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Cexes',
    label: 'Cexes to Whale'
  },
  cexes_to_dex_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Cexes',
    label: 'Cexes to Dex Traders'
  },
  cexes_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Cexes',
    label: 'Cexes to Others'
  },
  defi_to_cexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'DeFi',
    label: 'DeFi to Cexes'
  },
  defi_to_dexes_flow: {
    isOnlyPercentFilters: true,
    group: 'DeFi',
    category: 'Flow metrics',
    label: 'DeFi to Dexes'
  },
  defi_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'DeFi',
    label: 'DeFi to Whales'
  },
  defi_to_dex_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'DeFi',
    label: 'DeFi to Dex Trades'
  },
  defi_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'DeFi',
    label: 'DeFi to Others'
  },
  whale_to_cexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to Cexes'
  },
  whale_to_dexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to Dexes'
  },
  whale_to_defi_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to DeFi'
  },
  whale_to_dex_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'DeFi',
    label: 'DeFi to Dex Traders'
  },
  whale_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to Others'
  },
  other_to_dex_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to Dex Traders'
  },
  other_to_dexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Others',
    label: 'Others to Dexes'
  },
  other_to_cexes_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Others',
    label: 'Others to Cexes'
  },
  other_to_defi_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Others',
    label: 'Others to DeFi'
  },
  other_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Others',
    label: 'Others to Whales'
  },
  traders_to_other_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Traders',
    label: 'Traders To Others'
  },
  other_to_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Others',
    label: 'Others to Traders'
  },
  whale_to_traders_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Whales',
    label: 'Whales to Traders'
  },
  traders_to_whale_flow: {
    isOnlyPercentFilters: true,
    category: 'Flow metrics',
    group: 'Traders',
    label: 'Traders to Others'
  },
  age_consumed: {
    category: 'On-chain',
    group: 'Network Activity',
    label: 'Age Consumed',
    isOnlyPercentFilters: true,
    percentMetricKey: 'age_destroyed',
    hints: [
      {
        label: '> 400%',
        firstThreshold: 400,
        timeRange: '7d',
        type: Filter.percent_up.key
      }
    ]
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
  Metric.circulation_180d_usd,
  Metric.network_growth,
  Metric.exchange_inflow,
  Metric.exchange_inflow_usd,
  Metric.exchange_outflow,
  Metric.exchange_outflow_usd,
  Metric.exchange_balance,
  Metric.mvrv_usd,
  Metric.mvrv_usd_30d,
  Metric.mvrv_usd_180d,
  Metric.mvrv_usd_365d,
  Metric.dormant_circulation_365d,
  Metric.bitmex_perpetual_funding_rate,
  Metric.market_segments,
  Metric.social_volume_total,
  Metric.social_dominance_total,
  Metric.sentiment_balance_total,
  Metric.mean_dollar_invested_age,
  Metric.percent_of_total_supply_on_exchanges,
  Metric.dex_traders_to_cexes_flow,
  Metric.dex_traders_to_dexes_flow,
  Metric.dex_traders_to_defi_flow,
  Metric.dex_traders_to_whale_flow,
  Metric.dex_traders_to_other_flow,
  Metric.dex_to_cexes_flow,
  Metric.dexes_to_defi_flow,
  Metric.dexes_to_whale_flow,
  Metric.dexes_to_dex_traders_flow,
  Metric.dexes_to_other_flow,
  Metric.cexes_to_dex_flow,
  Metric.cexes_to_defi_flow,
  Metric.cexes_to_whale_flow,
  Metric.cexes_to_dex_traders_flow,
  Metric.cexes_to_other_flow,
  Metric.defi_to_cexes_flow,
  Metric.defi_to_dexes_flow,
  Metric.defi_to_whale_flow,
  Metric.defi_to_dex_traders_flow,
  Metric.defi_to_other_flow,
  Metric.whale_to_cexes_flow,
  Metric.whale_to_dexes_flow,
  Metric.whale_to_defi_flow,
  Metric.whale_to_dex_traders_flow,
  Metric.whale_to_traders_flow,
  Metric.whale_to_other_flow,
  Metric.other_to_cexes_flow,
  Metric.other_to_dexes_flow,
  Metric.other_to_defi_flow,
  Metric.other_to_whale_flow,
  Metric.other_to_dex_traders_flow,
  Metric.other_to_traders_flow,
  Metric.traders_to_whale_flow,
  Metric.traders_to_other_flow,
  Metric.age_consumed
]

export const MetricAlias = {
  active_addresses_24h: Metric.daily_active_addresses,
  dev_activity: Metric.dev_activity_1d,
  age_destroyed: Metric.age_consumed
}

export function getActiveBaseMetrics (filter) {
  const activeMetrics = new Set(
    filter.map(({ args: { metric }, name }) => {
      return metric ? getBaseMetric(metric) : Metric[name]
    })
  )

  return [...activeMetrics]
}

export function getBaseMetric (metric) {
  const transformedMetricIndex = metric.indexOf('_change_')
  const baseMetricKey =
    transformedMetricIndex === -1
      ? metric
      : metric.substring(0, transformedMetricIndex)

  return Metric[baseMetricKey] || MetricAlias[baseMetricKey]
}

export function getTimeRangesByMetric (baseMetric, availableMetrics = []) {
  const metrics = availableMetrics.filter(metric =>
    metric.includes(`${baseMetric.percentMetricKey || baseMetric.key}_change_`)
  )
  const timeRanges = metrics.map(metric =>
    metric.replace(
      `${baseMetric.percentMetricKey || baseMetric.key}_change_`,
      ''
    )
  )

  return DEFAULT_TIMERANGES.filter(({ type }) => timeRanges.includes(type))
}
