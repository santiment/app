import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher } from './anomalies'
import { GET_MARKET_SEGMENT_QUERY } from './marketSegments'
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
import { mergeTimeseriesByKey } from '../../../utils/utils'

const extractTimeseries = name => ({ data }) => data[name]

export const normalizeDatetimes = data => ({
  ...data,
  datetime: +new Date(data.datetime)
})

const preTransform = ({
  data: {
    getMetric: { timeseriesData }
  }
}) => timeseriesData

const Fetcher = METRICS.reduce((acc, metric) => {
  acc[metric] = {
    query: GET_METRIC(metric),
    preTransform
  }
  return acc
}, Object.create(null))

Object.assign(Fetcher, {
  anomaly: AnomalyFetcher,
  marketSegment: {
    query: GET_MARKET_SEGMENT_QUERY,
    preTransform: extractTimeseries('devActivity')
  },
  socialVolume: {
    query: SOCIAL_VOLUME_QUERY,
    preTransform: ({ data }) =>
      mergeTimeseriesByKey({
        key: 'datetime',
        timeseries: Object.values(data),
        mergeData: (longestTSData, timeserieData) => ({
          socialVolume: longestTSData.socialVolume + timeserieData.socialVolume,
          datetime: longestTSData.datetime
        })
      })
  },
  gasUsed: {
    query: GAS_USED_QUERY,
    preTransform: extractTimeseries('gasUsed')
  },
  historyTwitterData: {
    query: HISTORY_TWITTER_DATA_QUERY,
    preTransform: extractTimeseries('historyTwitterData')
  },
  burnRate: {
    query: BURN_RATE_QUERY,
    preTransform: extractTimeseries('burnRate')
  },
  historicalBalance: {
    query: HISTORICAL_BALANCE_QUERY,
    preTransform: extractTimeseries('historicalBalance')
  },
  socialDominance: {
    query: SOCIAL_DOMINANCE_QUERY,
    preTransform: extractTimeseries('socialDominance')
  },
  dailyActiveDeposits: {
    query: DAILY_ACTIVE_DEPOSITS_QUERY,
    preTransform: extractTimeseries('dailyActiveDeposits')
  },
  topHoldersPercentOfTotalSupply: {
    query: TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY,
    preTransform: extractTimeseries('topHoldersPercentOfTotalSupply')
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
    preTransform: extractTimeseries('percentOnExchanges')
  },
  devActivity: {
    query: DEV_ACTIVITY_QUERY,
    preTransform: extractTimeseries('devActivity')
  }
})

export const getQuery = ({ key, queryKey = key }) => {
  const { query } = Fetcher[queryKey]

  if (typeof query === 'function') {
    return query(key)
  }

  return query
}

export const getPreTransform = ({ key, queryKey = key }) => {
  const { preTransform } = Fetcher[queryKey]

  if (queryKey === 'anomaly') {
    return preTransform(key)
  }

  return preTransform
}
