import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher, OldAnomalyFetcher } from './anomalies'
import { MarketSegmentFetcher } from './marketSegments'
import { aliasTransform, extractTimeseries } from './utils'
import { MINERS_BALANCE_QUERY } from './queries/minersBalance'
import { GAS_USED_QUERY } from '../../GetTimeSeries/queries/gas_used'
import { HISTORICAL_BALANCE_QUERY } from '../../HistoricalBalance/common/queries'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from '../../GetTimeSeries/queries/top_holders_percent_of_total_supply'
import { ETH_SPENT_OVER_TIME_QUERY } from '../../GetTimeSeries/queries/eth_spent_over_time_query'
import { GET_SOURCE_METRIC } from '../../GetTimeSeries/queries/GET_SOURCE_METRIC'
import {
  SOCIAL_ACTIVE_USERS_TELEGRAM,
  SOCIAL_ACTIVE_USERS_TWITTER
} from '../../dataHub/submetrics'
import { client } from '../../../apollo'

export const preTransform = ({
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
  historicalBalance: {
    query: HISTORICAL_BALANCE_QUERY,
    preTransform: aliasTransform('historicalBalance')
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
  minersBalance: {
    query: MINERS_BALANCE_QUERY,
    preTransform: extractTimeseries('minersBalance')
  },
  social_active_users_telegram: {
    query: GET_SOURCE_METRIC(SOCIAL_ACTIVE_USERS_TELEGRAM),
    preTransform
  },
  social_active_users_twitter: {
    query: GET_SOURCE_METRIC(SOCIAL_ACTIVE_USERS_TWITTER),
    preTransform
  }
})

// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
const transformAliases = [
  'gasUsed',
  'topHoldersPercentOfTotalSupply',
  'ethSpentOverTime'
]

export const getQuery = (metric, metricSettings) => {
  const { key, queryKey = key, withoutRoot } = metric

  const metricFetcher =
    withoutRoot && Fetcher[key] ? Fetcher[key] : Fetcher[queryKey]

  if (!metricFetcher) return

  const { query } = metricFetcher

  if (typeof query === 'function') {
    return query(metric, metricSettings)
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

export const getData = (query, variables, signal) =>
  client.query({
    query,
    variables,
    context: {
      fetchOptions: {
        signal
      }
    }
  })
