import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher, OldAnomalyFetcher } from './anomalies'
import { MarketSegmentFetcher } from './marketSegments'
import { GAS_USED_QUERY } from '../../GetTimeSeries/queries/gas_used'
import { HISTORICAL_BALANCE_QUERY } from '../../HistoricalBalance/common/queries'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from '../../GetTimeSeries/queries/top_holders_percent_of_total_supply'
import { ETH_SPENT_OVER_TIME_QUERY } from '../../GetTimeSeries/queries/eth_spent_over_time_query'
import { MINERS_BALANCE_QUERY } from './queries/minersBalance'
import { aliasTransform, extractTimeseries } from './utils'

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
  }
})

// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
const transformAliases = [
  'gasUsed',
  'topHoldersPercentOfTotalSupply',
  'ethSpentOverTime'
]

export const getQuery = (metric, metricSettings) => {
  const { key, queryKey = key } = metric

  const metricFetcher = Fetcher[queryKey]

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
