import { METRICS, GET_METRIC } from './metrics'
import { AnomalyFetcher } from './anomalies'
import { GET_MARKET_SEGMENT_QUERY } from './marketSegments'
import gql from 'graphql-tag'

const normalizeDatetimes = data => ({
  ...data,
  datetime: +new Date(data.datetime)
})

const preTransform = ({
  data: {
    getMetric: { timeseriesData }
  }
}) => timeseriesData.map(normalizeDatetimes)

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
    preTransform: ({ data: { devActivity } }) =>
      devActivity.map(normalizeDatetimes)
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

export { Fetcher }
