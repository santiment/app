import { useState, useEffect } from 'react'
import { Metric } from './metrics'
import { Submetrics } from './submetrics'
import { TooltipSetting } from './tooltipSettings'
import { parseIntervalString } from '../../utils/dates'

const AvailableTimeboundMetric = {
  [Metric.mvrv_usd.key]: true,
  [Metric.realized_value_usd.key]: true,
  [Metric.circulation.key]: true
}

const TimerangeCoeficient = {
  d: 1,
  y: 365
}

const TimeboundMetricCache = new Map()

const EMPTY_OBJECT = Object.create(null)
const EMPTY_ARRAY = []

export const tryMapToTimeboundMetric = key => {
  const metrics = getTimeboundMetrics({ metricKeys: [key] })

  if (metrics) {
    const firstKey = Object.keys(metrics)[0]

    if (firstKey) {
      return metrics[firstKey][0]
    }
  }
}

export const getTimeboundMetrics = ({ metricKeys }) => {
  const NewTimebounds = Object.create(null)
  const { length } = metricKeys

  for (let i = 0; i < length; i++) {
    const timeboundKey = metricKeys[i]
    const timeRangeIndex = timeboundKey.lastIndexOf('_')
    const key = timeboundKey.slice(0, timeRangeIndex)
    const metric = Metric[key]

    if (metric && AvailableTimeboundMetric[key]) {
      const timebounds = NewTimebounds[key]
      let timeboundMetric = TimeboundMetricCache.get(timeboundKey)

      if (!timeboundMetric) {
        const label =
          metric.label + ` (${timeboundKey.slice(timeRangeIndex + 1)})`
        timeboundMetric = {
          ...metric,
          label,
          key: timeboundKey
        }

        TooltipSetting[timeboundKey] = {
          label,
          formatter: Metric[key].formatter
        }

        TimeboundMetricCache.set(timeboundKey, timeboundMetric)
      }

      if (timebounds) {
        timebounds.push(timeboundMetric)
      } else {
        NewTimebounds[key] = [timeboundMetric]
      }
    }
  }

  Object.values(NewTimebounds).forEach(sortTimebounds)

  return NewTimebounds
}

export function useTimebounds (metricKeys) {
  const [Timebounds, setTimebounds] = useState(EMPTY_OBJECT)

  useEffect(
    () => {
      const newTimebounds = getTimeboundMetrics({ metricKeys })
      setTimebounds(newTimebounds)
    },
    [metricKeys]
  )

  return Timebounds
}

export function useMergedTimeboundSubmetrics (metricKeys) {
  const [Merged, setMerged] = useState(EMPTY_OBJECT)
  const Timebounds = useTimebounds(metricKeys)

  useEffect(
    () => {
      const NewMerged = Object.create(null)

      const setOfKeys = new Set(
        Object.keys(Timebounds).concat(Object.keys(Submetrics))
      )

      setOfKeys.forEach(key => {
        const timebounds = Timebounds[key] || EMPTY_ARRAY
        const submetrics = Submetrics[key] || EMPTY_ARRAY

        NewMerged[key] = submetrics.concat(timebounds)
      })

      setMerged(NewMerged)
    },
    [Timebounds]
  )

  return Merged
}

function getTimerange (timeboundKey) {
  const timeRangeIndex = timeboundKey.lastIndexOf('_') + 1
  return timeboundKey.slice(timeRangeIndex)
}

function sortTimebounds (timebounds) {
  return timebounds.sort(timeboundsSorter)
}

function timeboundsSorter ({ key: aKey }, { key: bKey }) {
  const { amount: aAmount, format: aFormat } = parseIntervalString(
    getTimerange(aKey)
  )
  const { amount: bAmount, format: bFormat } = parseIntervalString(
    getTimerange(bKey)
  )

  return (
    aAmount * TimerangeCoeficient[aFormat] -
    bAmount * TimerangeCoeficient[bFormat]
  )
}
