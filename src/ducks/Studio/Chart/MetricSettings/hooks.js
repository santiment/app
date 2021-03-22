import { useState, useEffect, useMemo } from 'react'
import { getMetricMinInterval } from '../../../dataHub/metrics/restrictions'
import { dateDifference, DAY } from '../../../../utils/dates'

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

export function useMetricMinInterval (
  { key, queryKey = key },
  getCustomMetricMinInterval = getMetricMinInterval
) {
  const [minInterval, setMinInterval] = useState()

  useEffect(
    () => {
      getCustomMetricMinInterval(queryKey)
        .then(setMinInterval)
        .catch(console.warn)
    },
    [queryKey, getCustomMetricMinInterval]
  )

  return minInterval
}

export const isAvailableInterval = (interval, intervals) =>
  intervals.some(({ key }) => key === interval)

export const getValidInterval = (interval, intervals) =>
  isAvailableInterval(interval, intervals) ? interval : intervals[0].key

export function getIntervals (minInterval) {
  const index = intervalIndices.indexOf(minInterval)
  return index === -1 ? INTERVALS : INTERVALS.slice(index)
}

export function useMetricIntervals (metric, getCustomMetricMinInterval) {
  const minInterval = useMetricMinInterval(metric, getCustomMetricMinInterval)
  return useMemo(() => getIntervals(minInterval), [minInterval])
}

export function getCandlesMinInterval (from, to) {
  const { diff } = dateDifference({
    from: new Date(from),
    to: new Date(to),
    format: DAY
  })

  if (diff < 2) {
    return '15m'
  }
  if (diff < 8) {
    return '30m'
  }
  if (diff < 33) {
    return '2h'
  }
  if (diff < 185) {
    return '12h'
  }
  if (diff < 366) {
    return '1d'
  }

  return '7d'
}

export function useCandlesMinIntervalGetter (from, to) {
  return useMemo(
    () => {
      const minInterval = getCandlesMinInterval(from, to)
      return () => Promise.resolve(minInterval)
    },
    [from, to]
  )
}
