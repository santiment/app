import { useEffect, useState } from 'react'
import {
  useProjectPriceChanges,
  useProjectsSocialVolumeChanges
} from '../../../../hooks/project'
import { mapToColors } from './utils'

export const useWithColors = (data, key, sorter) => {
  const [result, setResult] = useState([])

  useEffect(
    () => {
      const sorted = data.sort(sorter)
      setResult(mapToColors(sorted, key))
    },
    [data.length, key, sorter]
  )

  return result
}

const useChartInterval = ({ settings, ranges, onChangeInterval }) => {
  const defaultSelectedIndex =
    settings && settings.interval
      ? ranges.findIndex(({ label }) => label === settings.interval)
      : 1

  const [intervalIndex, setIntervalIndex] = useState(() =>
    Math.min(ranges.length - 1, defaultSelectedIndex)
  )

  useEffect(
    () => {
      onChangeInterval(ranges[intervalIndex])
    },
    [intervalIndex]
  )

  return {
    intervalIndex,
    setIntervalIndex,
    rangeItem: ranges[intervalIndex]
  }
}

const buildOrder = ({ interval, metric = 'marketcap_usd', desc = false }) => ({
  metric,
  dynamic_from: interval,
  dynamic_to: 'now',
  aggregation: 'last',
  direction: desc ? 'desc' : 'asc'
})

export const useProjectRanges = ({
  listId,
  ranges,
  desc = true,
  isSocialVolume = false,
  settings,
  onChangeInterval,
  sortByMetric
}) => {
  const {
    setIntervalIndex,
    intervalIndex,
    rangeItem: { label, key, metric = key }
  } = useChartInterval({ settings, ranges, onChangeInterval })

  const hookProps = {
    listId,
    key,
    orderBy: buildOrder({
      interval: label,
      metric: sortByMetric || metric,
      desc
    })
  }

  console.log(sortByMetric, metric, desc, settings)

  const [data, loading] = isSocialVolume
    ? useProjectsSocialVolumeChanges(hookProps)
    : useProjectPriceChanges(hookProps)

  return { data, loading, intervalIndex, setIntervalIndex, label, key: metric }
}
