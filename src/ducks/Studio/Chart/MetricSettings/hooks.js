import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function makeInterval (key, label) {
  intervalIndices.push(key)
  return { key, label }
}

const intervalIndices = []
const INTERVALS = [
  makeInterval('5m', '5 minutes'),
  makeInterval('15m', '15 minutes'),
  makeInterval('30m', '30 minutes'),
  makeInterval('1h', '1 hour'),
  makeInterval('2h', '2 hours'),
  makeInterval('3h', '3 hours'),
  makeInterval('4h', '4 hours'),
  makeInterval('8h', '8 hours'),
  makeInterval('12h', '12 hours'),
  makeInterval('1d', '1 day'),
  makeInterval('5d', '5 days'),
  makeInterval('7d', '7 days')
]

const METRIC_MIN_INTERVAL_QUERY = gql`
  query($metric: String!) {
    getMetric(metric: $metric) {
      metadata {
        minInterval
      }
    }
  }
`

export function useMetricMinInterval ({ key }) {
  const { data } = useQuery(METRIC_MIN_INTERVAL_QUERY, {
    variables: { metric: key }
  })

  return data && data.getMetric.metadata.minInterval
}

export function useMetricIntervals (metric) {
  const minInterval = useMetricMinInterval(metric)

  return useMemo(
    () => {
      const index = intervalIndices.indexOf(minInterval)
      return index === -1 ? INTERVALS : INTERVALS.slice(index)
    },
    [minInterval]
  )
}
