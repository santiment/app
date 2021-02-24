import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher, OldAnomalyFetcher } from './anomalies'
import { aliasTransform, normalizeInterval } from './utils'
import { HISTORICAL_BALANCE_QUERY } from './queries/historicaBalance'
import { GAS_USED_QUERY } from './queries/gasUsed'
import { ETH_SPENT_OVER_TIME_QUERY } from './queries/ethSpentOverTime'
import { TOP_HOLDERS_PERCENT_OF_TOTAL_SUPPLY } from './queries/topHoldersPercentOfTotalSupply'
import {
  SOCIAL_ACTIVE_USERS_TELEGRAM,
  SOCIAL_ACTIVE_USERS_TWITTER
} from '../../dataHub/submetrics'
import { getMetricMinInterval } from '../../dataHub/metrics/restrictions'
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

  // TODO: Think how to do it better [@vanguard | Dec  9, 2020]
  if (metric.includes('mvrv_usd')) {
    acc[metric].preTransform = res => {
      const data = preTransform(res)
      const key = data[0] ? Object.keys(data[0])[1] : metric

      return data.map(item => ({
        datetime: item.datetime,
        [key]: item[key] - 1
      }))
    }
  }

  return acc
}, Object.create(null))

Object.assign(Fetcher, {
  anomalies: OldAnomalyFetcher,
  anomaly: AnomalyFetcher,
  gasUsed: {
    query: GAS_USED_QUERY,
    preTransform: aliasTransform('gasUsed')
  },
  historicalBalance: {
    query: HISTORICAL_BALANCE_QUERY,
    preTransform: aliasTransform('historicalBalance', 'balance')
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
  social_active_users_telegram: {
    query: GET_METRIC(SOCIAL_ACTIVE_USERS_TELEGRAM),
    preTransform
  },
  social_active_users_twitter: {
    query: GET_METRIC(SOCIAL_ACTIVE_USERS_TWITTER),
    preTransform
  }
})

// TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]
const transformAliases = new Set([
  'gasUsed',
  'historicalBalance',
  'topHoldersPercentOfTotalSupply',
  'ethSpentOverTime',
  'minersBalance'
])

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
  } else if (transformAliases.has(queryKey)) {
    return preTransform(key)
  }

  return preTransform
}

export const fetchData = (query, variables, signal) =>
  client.query({
    query,
    variables,
    context: {
      fetchOptions: {
        signal
      }
    }
  })

export function getData (query, variables, signal) {
  const { metric, queryKey = metric, interval } = variables

  return getMetricMinInterval(queryKey).then(minInterval => {
    if (minInterval) {
      variables.interval = normalizeInterval(interval, minInterval)
    }

    return fetchData(query, variables, signal)
  })
}
