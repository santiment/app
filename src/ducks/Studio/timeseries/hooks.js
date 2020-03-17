import { useState, useEffect } from 'react'
import { client } from '../../../index'
import { getQuery, getPreTransform } from './fetcher'
import { normalizeDatetimes } from './utils'
import { mergeTimeseriesByKey } from '../../../utils/utils'

// NOTE: Polyfill for a PingdomBot 0.8.5 browser (/sentry/sanbase-frontend/issues/29459/) [@vanguard | Feb 6, 2020]
window.AbortController =
  window.AbortController ||
  function () {
    return { abort () {} }
  }

const DEFAULT_TS = []
const DEFAULT_LOADINGS = []
const DEFAULT_ERROR_MSG = {}
const DEFAULT_ABORTABLES = new Map()

const hashMetrics = metrics => metrics.reduce((acc, { key }) => acc + key, '')

const cancelQuery = ([controller, id]) => {
  const { queryManager } = client
  controller.abort()
  queryManager.inFlightLinkObservables.delete(
    queryManager.queries.get(id.toString()).document
  )
  queryManager.stopQuery(id)
}

function abortRemovedMetrics (abortables, newMetrics) {
  const toAbort = new Map(abortables)
  newMetrics.forEach(metric => {
    toAbort.delete(metric)
  })

  const abortableEntries = [...toAbort.entries()]
  const reducedAbortables = new Map(abortables)

  abortableEntries.forEach(([metric, query]) => {
    cancelQuery(query)
    reducedAbortables.delete(metric)
  })

  return reducedAbortables
}

function abortAllMetrics (abortables) {
  return [...abortables.values()].forEach(cancelQuery)
}

export const useTimeseries = (metrics, settings) => {
  const [timeseries, setTimeseries] = useState(DEFAULT_TS)
  const [loadings, setLoadings] = useState(DEFAULT_LOADINGS)
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)
  const [abortables, setAbortables] = useState(DEFAULT_ABORTABLES)

  const metricsHash = hashMetrics(metrics)

  useEffect(
    () => {
      if (!metricsHash) {
        setTimeseries([])
      }

      setAbortables(abortRemovedMetrics(abortables, metrics))
    },
    [metricsHash]
  )

  useEffect(
    () => {
      abortAllMetrics(abortables)
      setAbortables(new Map())
      setLoadings([...metrics])
      setErrorMsg({})
    },
    [settings]
  )

  useEffect(
    () => {
      const { slug, from, to, interval } = settings

      let raceCondition = false
      let mergedData = []

      metrics.forEach(metric => {
        const { key, queryKey = key, reqMeta } = metric

        const queryId = client.queryManager.idCounter
        const abortController = new AbortController()

        setAbortables(state => {
          const newState = new Map(state)
          newState.set(metric, [abortController, queryId])
          return newState
        })

        setLoadings(state => {
          const loadingsSet = new Set(state)
          loadingsSet.add(metric)
          return [...loadingsSet]
        })

        client
          .query({
            query: getQuery(metric),
            variables: {
              metric: queryKey,
              interval,
              to,
              from,
              slug,
              ...reqMeta
            },
            context: {
              fetchOptions: {
                signal: abortController.signal
              }
            }
          })
          .then(getPreTransform(metric))
          .then(data => {
            if (raceCondition) return

            setTimeseries(() => {
              mergedData = mergeTimeseriesByKey({
                timeseries: [mergedData, data]
              })
              return mergedData.map(normalizeDatetimes)
            })
          })
          .catch(({ message }) => {
            if (raceCondition) return
            setErrorMsg(state => {
              state[key] = message
              return { ...state }
            })
          })
          .finally(() => {
            if (raceCondition) return

            setAbortables(state => {
              const newState = new Map(state)
              newState.delete(metric)
              return newState
            })

            setLoadings(state => state.filter(loadable => loadable !== metric))
          })
      })

      return () => {
        raceCondition = true
      }
    },
    [metricsHash, settings]
  )

  return [timeseries, loadings, ErrorMsg]
}
