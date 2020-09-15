import { useEffect, useState } from 'react'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../../Studio/withMetrics'
import { getData } from '../../../../Studio/timeseries/fetcher'
import { cancelQuery } from '../../../../Studio/timeseries/hooks'
import { MAX_METRICS_AMOUNT } from '../../../../Studio/constraints'

const hashAssets = assets => assets.reduce((acc, { slug }) => acc + slug, '')

function abortRemovedAssets (abortables, newAssets) {
  const toAbort = new Map(abortables)
  newAssets.forEach(metric => {
    const abortable = abortables.get(metric)
    if (abortable) {
      toAbort.delete(metric)
    }
  })

  const abortableEntries = [...toAbort.entries()]
  const reducedAbortables = new Map(abortables)

  abortableEntries.forEach(([asset, query]) => {
    cancelQuery(query)
    reducedAbortables.delete(asset)
  })

  return reducedAbortables
}

const DEFAULT_ABORTABLES = new Map()

const getIntersection = (source, target) =>
  source.length > 0 ? source.filter(value => target.includes(value)) : target

export function useAvailableMetrics (assets) {
  const [availableMetrics, setAvailableMetrics] = useState([])
  const [loadings, setLoadings] = useState([])
  const [abortables, setAbortables] = useState(DEFAULT_ABORTABLES)

  const assetsHash = hashAssets(assets)

  useEffect(
    () => {
      if (!assetsHash) {
        setAvailableMetrics([])
      }

      setAbortables(abortRemovedAssets(abortables, assets))
    },
    [assetsHash]
  )

  useEffect(
    () => {
      let raceCondition = false

      assets.slice(0, MAX_METRICS_AMOUNT).forEach(asset => {
        const { slug } = asset
        const abortController = new AbortController()

        setLoadings(state => {
          const loadingsSet = new Set(state)
          loadingsSet.add(asset)
          return [...loadingsSet]
        })

        const request = getData(
          PROJECT_METRICS_BY_SLUG_QUERY,
          { slug },
          abortController.signal
        )

        request
          .then(({ data: { project: { availableMetrics } } }) => {
            if (raceCondition) return

            if (!availableMetrics.length) {
              throw new Error('No Data')
            }

            setAvailableMetrics(source => {
              return getIntersection(source, availableMetrics)
            })

            return availableMetrics
          })
          .catch(({ message }) => {
            if (raceCondition) return
          })
          .finally(() => {
            if (raceCondition) return

            setAbortables(state => {
              const newState = new Map(state)
              newState.delete(asset)
              return newState
            })

            setLoadings(state => state.filter(loadable => loadable !== asset))
          })
      })

      return () => {
        raceCondition = true
      }
    },
    [assetsHash]
  )

  return { availableMetrics, loadings }
}
