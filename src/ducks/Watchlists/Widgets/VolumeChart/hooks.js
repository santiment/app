import { useEffect, useState } from 'react'
import { useProjectPriceChanges } from '../../../../hooks/project'
import { getSorter, mapToColors } from './utils'

export const useWithColors = (data, key) => {
  const [result, setResult] = useState([])

  useEffect(
    () => {
      const sorted = data.sort(getSorter(key))
      setResult(mapToColors(sorted, key))
    },
    [data.length, key]
  )

  return result
}

export const useProjectRanges = ({
  assets,
  ranges,
  limit,
  sortByKey = 'marketcapUsd',
  desc = true
}) => {
  const [mapAssets, setMapAssets] = useState({})
  const [intervalIndex, setIntervalIndex] = useState(
    Math.min(ranges.length - 1, 1)
  )

  useEffect(
    () => {
      const newMap = {}

      assets.forEach(({ slug }) => {
        newMap[slug] = true
      })

      setMapAssets(newMap)
    },
    [assets]
  )

  const { label, key } = ranges[intervalIndex]

  const sortKey = sortByKey || key
  const sorter = getSorter({ sortKey, desc })

  const [data, loading] = useProjectPriceChanges({
    mapAssets,
    key,
    limit,
    sorter
  })

  return [data, loading, { intervalIndex, setIntervalIndex, label, key }]
}
