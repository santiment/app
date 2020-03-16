import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher, OldAnomalyFetcher } from './anomalies'
import { MarketSegmentFetcher } from './marketSegments'
import { GAS_USED_QUERY } from '../../GetTimeSeries/queries/gas_used'
import { HISTORY_TWITTER_DATA_QUERY } from '../../GetTimeSeries/queries/history_twitter_data_query'
import { BURN_RATE_QUERY } from '../../GetTimeSeries/queries/burn_rate_query'
import { HISTORICAL_BALANCE_QUERY } from '../../HistoricalBalance/common/queries'
import { DAILY_ACTIVE_DEPOSITS_QUERY } from '../../GetTimeSeries/queries/daily_active_deposits_query'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from '../../GetTimeSeries/queries/top_holders_percent_of_total_supply'
import { ETH_SPENT_OVER_TIME_QUERY } from '../../GetTimeSeries/queries/eth_spent_over_time_query'
import { PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES } from '../../GetTimeSeries/queries/percent_of_token_supply_on_exchanges_query'
import { aliasTransform } from './utils'
import { GET_METRIC_CHANGES } from '../../GetTimeSeries/queries/get_metric'

const preTransform = ({
  data: {
    getMetric: { timeseriesData }
  }
}) => timeseriesData

const Fetcher = METRICS.reduce((acc, metric) => {
  acc[metric] = {
    query: GET_METRIC,
    preTransform
  }
  return acc
}, Object.create(null))

Object.assign(Fetcher, {
  anomalies: OldAnomalyFetcher,
  anomaly: AnomalyFetcher,
  marketSegment: MarketSegmentFetcher,
  gasUsed: {
    query: GAS_USED_QUERY,
    preTransform: aliasTransform('gasUsed')
  },
  historyTwitterData: {
    query: HISTORY_TWITTER_DATA_QUERY,
    preTransform: aliasTransform('historyTwitterData', 'followersCount')
  },
  burnRate: {
    query: BURN_RATE_QUERY,
    preTransform: aliasTransform('burnRate')
  },
  historicalBalance: {
    query: HISTORICAL_BALANCE_QUERY,
    preTransform: aliasTransform('historicalBalance')
  },
  dailyActiveDeposits: {
    query: DAILY_ACTIVE_DEPOSITS_QUERY,
    preTransform: aliasTransform('dailyActiveDeposits', 'activeDeposits')
  },
  topHoldersPercentOfTotalSupply: {
    query: TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY,
    preTransform: aliasTransform(
      'topHoldersPercentOfTotalSupply',
      'inTopHoldersTotal'
    )
  },
  ethSpentOverTime: {
    query: ETH_SPENT_OVER_TIME_QUERY,
    preTransform: key => ({
      data: {
        ethSpentOverTime: { ethSpentOverTime }
      }
    }) =>
      ethSpentOverTime.map(({ datetime, ethSpent }) => ({
        datetime,
        [key]: ethSpent
      }))
  },
  percentOfTokenSupplyOnExchanges: {
    query: PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES,
    preTransform: aliasTransform('percentOnExchanges')
  },
  twitter_followers_7d: {
    query: GET_METRIC_CHANGES('twitter_followers'),
    preTransform,
    strictVariables: {
      interval: '7d'
    }
  },
  twitter_followers_24h: {
    query: GET_METRIC_CHANGES('twitter_followers'),
    preTransform,
    strictVariables: {
      interval: '24h'
    }
  }
})

// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
const transformAliases = [
  'gasUsed',
  'historyTwitterData',
  'burnRate',
  'dailyActiveDeposits',
  'topHoldersPercentOfTotalSupply',
  'ethSpentOverTime',
  'percentOfTokenSupplyOnExchanges'
]

export const getQuery = metric => {
  const { key, queryKey = key } = metric

  const { query } = Fetcher[queryKey]

  if (typeof query === 'function') {
    return query(metric)
  }

  return query
}

export const getPreTransform = ({ key, queryKey = key, metricAnomaly }) => {
  const { preTransform } = Fetcher[queryKey]

  if (queryKey === 'anomaly') {
    return preTransform(key)
  } else if (queryKey === 'anomalies') {
    return preTransform(metricAnomaly)
  } else if (transformAliases.includes(queryKey)) {
    return preTransform(key)
  }

  return preTransform
}
