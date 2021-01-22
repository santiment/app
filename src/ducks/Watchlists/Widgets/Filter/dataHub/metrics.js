import React from 'react'
import { Filter } from './types'
import MarketSegments from '../Metric/MarketSegments'
import {
  percentValueFormatter,
  percentServerValueFormatter
} from '../formatters'
import { DEFAULT_TIMERANGES } from './timeranges'
import { AGGREGATIONS_LOWER } from './aggregations'
import { formatNumber } from '../../../../../utils/formatting'
import {
  ETH_SPENT_CELL,
  MARKET_SEGMENTS_CELL,
  RANK_CELL
} from '../../Table/Columns/columns'

export const METRIC_PERCENT_SUFFIX = '_change_'
const EMPTY_STR = ''
const CATEGORIES = {
  FINANCIAL: 'Financial',
  DEVELOPMENT: 'Development',
  ON_CHAIN: 'On-chain',
  DERIVATIVES: 'Derivatives',
  SOCIAL: 'Social',
  FLOW_METRICS: 'Flow metrics'
}
const GROUPS = {
  NETWORK_ACTIVITY: 'Network Activity',
  NETWORK_VALUE: 'Network Value',
  EXCHANGES: 'Exchanges',
  DEX_TRADERS: 'Dex Traders',
  DEXES: 'Dexes',
  CEXES: 'Cexes',
  DEFI: 'DeFi',
  WHALES: 'Whales',
  OTHERS: 'Others',
  TRADERS: 'Traders'
}

export const Metric = {
  price_usd: {
    category: CATEGORIES.FINANCIAL,
    label: 'Price',
    badge: '$',
    tableColumnFormatter: value => formatNumber(value, { currency: 'USD' })
  },
  price_btc: {
    category: CATEGORIES.FINANCIAL,
    label: 'Price BTC',
    badge: 'BTC'
  },
  marketcap_usd: {
    category: CATEGORIES.FINANCIAL,
    label: 'Marketcap',
    badge: '$'
  },
  rank: {
    category: CATEGORIES.FINANCIAL,
    label: 'Rank',
    isStatic: true,
    accessor: 'rank',
    Cell: RANK_CELL
  },
  eth_spent: {
    category: CATEGORIES.ON_CHAIN,
    label: 'ETH spent, 30d',
    accessor: 'ethSpent',
    isStatic: true,
    Cell: ETH_SPENT_CELL
  },
  volume_usd: {
    category: CATEGORIES.FINANCIAL,
    label: 'Volume',
    badge: '$'
  },
  dev_activity_1d: {
    category: CATEGORIES.DEVELOPMENT,
    label: 'Development Activity',
    shortLabel: 'Dev act.',
    descriptionKey: 'dev_activity',
    percentMetricKey: 'dev_activity',
    aggregation: AGGREGATIONS_LOWER.AVG,
    showTimeRange: true,
    defaultTimeRange: '30d'
  },
  daily_active_addresses: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Daily Active Addresses',
    shortLabel: 'DAA',
    percentMetricKey: 'active_addresses_24h',
    aggregation: AGGREGATIONS_LOWER.AVG,
    defaultTimeRange: '30d',
    showTimeRange: true
  },
  transaction_volume: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Transaction Volume',
    shortLabel: 'Trans. vol.',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  transaction_volume_usd: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Transaction Volume USD',
    shortLabel: 'Trans. vol. USD',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  mvrv_usd: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_VALUE,
    label: 'MVRV',
    aggregation: AGGREGATIONS_LOWER.AVG,
    showTimeRange: true,
    isDeprecated: true
  },
  mvrv_usd_30d: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_VALUE,
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
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_VALUE,
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
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_VALUE,
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
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Circulation',
    shortLabel: 'Circ.'
  },
  circulation_180d: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Circulation 180d',
    shortLabel: 'Circ. 180d'
  },
  circulation_180d_usd: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Circulation 180d $'
  },
  network_growth: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Network Growth',
    shortLabel: 'Netw. Gr.',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  exchange_inflow: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Exchange Inflow',
    shortLabel: 'Ex. inflow',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  exchange_inflow_usd: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Exchange Inflow $',
    shortLabel: 'Ex. Inflow $',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  exchange_outflow: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Exchange Outflow',
    shortLabel: 'Ex. Outflow',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  exchange_outflow_usd: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Exchange Outflow USD',
    shortLabel: 'Ex. Outflow $',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  exchange_balance: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Exchange Flow Balance',
    shortLabel: 'Ex. Flow Bal.',
    aggregation: AGGREGATIONS_LOWER.SUM,
    showTimeRange: true
  },
  dormant_circulation_365d: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Dormant Circulation 1y',
    shortLabel: 'Dorm. Circ. 1y',
    descriptionKey: 'dormant_circulation'
  },
  bitmex_perpetual_funding_rate: {
    category: CATEGORIES.DERIVATIVES,
    label: 'BitMEX Perpetual Contract Funding Rate',
    shortLabel: 'BitMEX P.C.F.R.',
    badge: '%',
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter
  },
  market_segments: {
    category: CATEGORIES.FINANCIAL,
    label: 'Market Segments',
    accessor: 'marketSegments',
    isStatic: true,
    Cell: MARKET_SEGMENTS_CELL,
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
    category: CATEGORIES.SOCIAL,
    label: 'Social Volume',
    shortLabel: 'Soc.Vol.',
    isOnlyPercentFilters: true
  },
  social_dominance_total: {
    category: CATEGORIES.SOCIAL,
    label: 'Social Dominance',
    shortLabel: 'Soc.Dom.',
    valueFormatter: percentValueFormatter,
    serverValueFormatter: percentServerValueFormatter,
    isOnlyPercentFilters: true
  },
  sentiment_balance_total: {
    category: CATEGORIES.SOCIAL,
    label: 'Sentiment Balance Total',
    shortLabel: 'Sent. Bal.',
    isOnlyPercentFilters: true
  },
  mean_dollar_invested_age: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_VALUE,
    label: 'Mean Dollar Invested Age',
    shortLabel: 'Mean D.I.A.',
    isOnlyPercentFilters: true
  },
  percent_of_total_supply_on_exchanges: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.EXCHANGES,
    label: 'Coin Supply on Exchanges (as % of total supply)',
    shortLabel: 'Coin Sup. on Ex.'
  },
  dex_traders_to_cexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEX_TRADERS,
    label: 'Dex Traders to Cexes',
    shortLabel: 'Dex Tr to Cex',
    isOnlyPercentFilters: true
  },
  dex_traders_to_dexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEX_TRADERS,
    label: 'Dex Traders to Dexes',
    shortLabel: 'Dex Tr to Dex',
    isOnlyPercentFilters: true
  },
  dex_traders_to_defi_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEX_TRADERS,
    label: 'Dex Traders to DeFi',
    shortLabel: 'Dex Tr to DeFi',
    isOnlyPercentFilters: true
  },
  dex_traders_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEX_TRADERS,
    label: 'Dex Traders to Whales',
    shortLabel: 'Dex Tr to Wh',
    isOnlyPercentFilters: true
  },
  dex_traders_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEX_TRADERS,
    label: 'Dex Traders to Others',
    shortLabel: 'Dex Tr to Oth',
    isOnlyPercentFilters: true
  },
  dex_to_cexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEXES,
    label: 'Dexes to Cexes',
    shortLabel: 'Dex to Cex',
    isOnlyPercentFilters: true
  },
  dexes_to_defi_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEXES,
    label: 'Dexes to DeFi',
    shortLabel: 'Dex to Defi',
    isOnlyPercentFilters: true
  },
  dexes_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEXES,
    label: 'Dexes to Whales',
    shortLabel: 'Dex to Wh',
    isOnlyPercentFilters: true
  },
  dexes_to_dex_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEXES,
    label: 'Dexes to Dex Traders',
    shortLabel: 'Dex to Dex Tr',
    isOnlyPercentFilters: true
  },
  dexes_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEXES,
    label: 'Dexes to Others',
    shortLabel: 'Dex to Oth',
    isOnlyPercentFilters: true
  },
  cexes_to_dex_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.CEXES,
    label: 'Cexes to Dexes',
    shortLabel: 'Cex to Dex',
    isOnlyPercentFilters: true
  },
  cexes_to_defi_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.CEXES,
    label: 'Cexes to DeFi',
    shortLabel: 'Cex to DeFi',
    isOnlyPercentFilters: true
  },
  cexes_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.CEXES,
    label: 'Cexes to Whale',
    shortLabel: 'Cex to Wh',
    isOnlyPercentFilters: true
  },
  cexes_to_dex_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.CEXES,
    label: 'Cexes to Dex Traders',
    shortLabel: 'Cex to Dex Tr',
    isOnlyPercentFilters: true
  },
  cexes_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.CEXES,
    label: 'Cexes to Others',
    shortLabel: 'Cex to Oth',
    isOnlyPercentFilters: true
  },
  defi_to_cexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Cexes',
    shortLabel: 'DeFi to Cex',
    isOnlyPercentFilters: true
  },
  defi_to_dexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Dexes',
    shortLabel: 'DeFi to Dex',
    isOnlyPercentFilters: true
  },
  defi_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Whales',
    shortLabel: 'DeFi to Wh',
    isOnlyPercentFilters: true
  },
  defi_to_dex_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Dex Trades',
    shortLabel: 'DeFi to Dex Tr',
    isOnlyPercentFilters: true
  },
  defi_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Others',
    shortLabel: 'DeFi to Oth',
    isOnlyPercentFilters: true
  },
  whale_to_cexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to Cexes',
    shortLabel: 'Wh to Cex',
    isOnlyPercentFilters: true
  },
  whale_to_dexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to Dexes',
    shortLabel: 'Wh to Dex',
    isOnlyPercentFilters: true
  },
  whale_to_defi_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to DeFi',
    shortLabel: 'Wh to DeFi',
    isOnlyPercentFilters: true
  },
  whale_to_dex_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.DEFI,
    label: 'DeFi to Dex Traders',
    shortLabel: 'DeFi to Dex Tr',
    isOnlyPercentFilters: true
  },
  whale_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to Others',
    shortLabel: 'Wh to Oth',
    isOnlyPercentFilters: true
  },
  other_to_dex_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to Dex Traders',
    shortLabel: 'Wh to Dex Tr',
    isOnlyPercentFilters: true
  },
  other_to_dexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.OTHERS,
    label: 'Others to Dexes',
    shortLabel: 'Oth to Dex',
    isOnlyPercentFilters: true
  },
  other_to_cexes_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.OTHERS,
    label: 'Others to Cexes',
    shortLabel: 'Oth to Cex',
    isOnlyPercentFilters: true
  },
  other_to_defi_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.OTHERS,
    label: 'Others to DeFi',
    shortLabel: 'Oth to DeFi',
    isOnlyPercentFilters: true
  },
  other_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.OTHERS,
    label: 'Others to Whales',
    shortLabel: 'Oth to Wh',
    isOnlyPercentFilters: true
  },
  traders_to_other_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.TRADERS,
    label: 'Traders To Others',
    shortLabel: 'Tr to Oth',
    isOnlyPercentFilters: true
  },
  other_to_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.OTHERS,
    label: 'Others to Traders',
    shortLabel: 'Oth to Tr',
    isOnlyPercentFilters: true
  },
  whale_to_traders_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.WHALES,
    label: 'Whales to Traders',
    shortLabel: 'Wh to Th',
    isOnlyPercentFilters: true
  },
  traders_to_whale_flow: {
    category: CATEGORIES.FLOW_METRICS,
    group: GROUPS.TRADERS,
    label: 'Traders to Others',
    shortLabel: 'Tr to Oth',
    isOnlyPercentFilters: true
  },
  age_consumed: {
    category: CATEGORIES.ON_CHAIN,
    group: GROUPS.NETWORK_ACTIVITY,
    label: 'Age Consumed',
    shortLabel: 'Age Cons.',
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
  Metric.rank,
  Metric.eth_spent,
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
  const transformedMetricIndex = metric.indexOf(METRIC_PERCENT_SUFFIX)
  const baseMetricKey =
    transformedMetricIndex === -1
      ? metric
      : metric.substring(0, transformedMetricIndex)

  return Metric[baseMetricKey] || MetricAlias[baseMetricKey]
}

export function getTimeRangesByMetric (baseMetric, availableMetrics = []) {
  const baseMetricKeyWithSuffix = `${baseMetric.percentMetricKey ||
    baseMetric.key}${METRIC_PERCENT_SUFFIX}`
  const percentMetrics = availableMetrics.filter(metric =>
    metric.includes(baseMetricKeyWithSuffix)
  )
  const timeRanges = percentMetrics.map(metric =>
    metric.replace(baseMetricKeyWithSuffix, EMPTY_STR)
  )
  return DEFAULT_TIMERANGES.filter(({ type }) => timeRanges.includes(type))
}
