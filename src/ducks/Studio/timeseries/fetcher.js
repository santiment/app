import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher, OldAnomalyFetcher } from './anomalies'
import { MarketSegmentFetcher } from './marketSegments'
import { SOCIAL_VOLUME_QUERY } from '../../GetTimeSeries/queries/social_volume_query'
import { GAS_USED_QUERY } from '../../GetTimeSeries/queries/gas_used'
import { HISTORY_TWITTER_DATA_QUERY } from '../../GetTimeSeries/queries/history_twitter_data_query'
import { BURN_RATE_QUERY } from '../../GetTimeSeries/queries/burn_rate_query'
import { HISTORICAL_BALANCE_QUERY } from '../../HistoricalBalance/common/queries'
import { SOCIAL_DOMINANCE_QUERY } from '../../GetTimeSeries/queries/social_dominance_query'
import { DAILY_ACTIVE_DEPOSITS_QUERY } from '../../GetTimeSeries/queries/daily_active_deposits_query'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from '../../GetTimeSeries/queries/top_holders_percent_of_total_supply'
import { ETH_SPENT_OVER_TIME_QUERY } from '../../GetTimeSeries/queries/eth_spent_over_time_query'
import { PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES } from '../../GetTimeSeries/queries/percent_of_token_supply_on_exchanges_query'
import { DEV_ACTIVITY_QUERY } from '../../GetTimeSeries/queries/dev_activity_query'
import { aliasTransform } from './utils'
import { mergeTimeseriesByKey } from '../../../utils/utils'

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
  socialVolume: {
    query: SOCIAL_VOLUME_QUERY,
    preTransform: key => ({ data }) =>
      mergeTimeseriesByKey({
        key: 'datetime',
        timeseries: Object.values(data),
        mergeData: (longestTSData, timeserieData) => ({
          socialVolume: longestTSData.socialVolume + timeserieData.socialVolume,
          datetime: longestTSData.datetime
        })
      }).map(({ datetime, socialVolume }) => ({
        datetime,
        [key]: socialVolume
      }))
  },
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
  socialDominance: {
    query: SOCIAL_DOMINANCE_QUERY,
    preTransform: aliasTransform('socialDominance', 'dominance')
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
    preTransform: ({
      data: {
        ethSpentOverTime: { ethSpentOverTime }
      }
    }) => ethSpentOverTime
  },
  percentOfTokenSupplyOnExchanges: {
    query: PERCENT_OF_TOKEN_SUPPLY_ON_EXCHANGES,
    preTransform: aliasTransform('percentOnExchanges')
  }
})

// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
const transformAliases = [
  'socialVolume',
  'gasUsed',
  'historyTwitterData',
  'burnRate',
  'socialDominance',
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
