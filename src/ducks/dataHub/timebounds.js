import { useMemo } from 'react'
import { Metric } from './metrics'
import { Submetrics } from './submetrics'
import { updateTooltipSetting } from './tooltipSettings'
import { parseIntervalString } from '../../utils/dates'

const AvailableTimeboundMetric = {
  [Metric.mvrv_usd.key]: true,
  [Metric.mvrv_usd_intraday.key]: true,
  [Metric.realized_value_usd.key]: true,
  [Metric.circulation.key]: true,
  [Metric.dormant_circulation.key]: true
}

const TimerangeCoeficient = {
  d: 1,
  y: 365
}

const TimeboundMetricCache = new Map()

const EMPTY_ARRAY = []

export const tryMapToTimeboundMetric = key => {
  const metrics = getTimeboundMetrics([key])

  if (metrics) {
    const firstKey = Object.keys(metrics)[0]

    if (firstKey) {
      return metrics[firstKey][0]
    }
  }
}

function getTimeboundMetrics (metricKeys) {
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
        const timebound = timeboundKey.slice(timeRangeIndex + 1)
        const label = metric.label + ` (${timebound})`
        const { withoutRoot, queryKey } = metric
        timeboundMetric = {
          ...metric,
          queryKey: withoutRoot ? timeboundKey : queryKey,
          label,
          key: timeboundKey,
          replacements: {
            timebound
          }
        }

        updateTooltipSetting(timeboundMetric)

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

export function getMergedTimeboundSubmetrics (metricKeys) {
  const Timebounds = getTimeboundMetrics(metricKeys)
  const NewMerged = Object.create(null)

  const setOfKeys = new Set(
    Object.keys(Timebounds).concat(Object.keys(Submetrics))
  )

  setOfKeys.forEach(key => {
    const timebounds = Timebounds[key] || EMPTY_ARRAY
    const submetrics = Submetrics[key] || EMPTY_ARRAY

    NewMerged[key] = submetrics.concat(timebounds)
  })

  return NewMerged
}

export const useMergedTimeboundSubmetrics = metricKeys =>
  useMemo(() => getMergedTimeboundSubmetrics(metricKeys), [metricKeys])

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
