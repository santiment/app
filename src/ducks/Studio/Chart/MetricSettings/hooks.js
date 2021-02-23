import { useState, useEffect, useMemo } from 'react'
import { getMetricMinInterval } from '../../../dataHub/metrics/restrictions'

function makeInterval (key, label) {
  intervalIndices.push(key)
  return { key, label }
}

const intervalIndices = []
export const INTERVALS = [
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

export function useMetricMinInterval ({ key, queryKey = key }) {
  const [minInterval, setMinInterval] = useState()

  useEffect(
    () => {
      getMetricMinInterval(queryKey)
        .then(setMinInterval)
        .catch(console.warn)
    },
    [queryKey]
  )

  return minInterval
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
