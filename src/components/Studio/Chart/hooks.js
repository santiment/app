import { useState, useEffect } from 'react'
import { client } from '../../../index'
import {
  getMetricQUERY,
  getPreTransform
} from '../../../ducks/GetTimeSeries/timeseries'
import { mergeTimeseriesByKey } from '../../../utils/utils'

const DEFAULT_STATE = {
  data: [],
  Error: {},
  loadings: []
}

const hashMetrics = metrics => metrics.reduce((acc, { key }) => acc + key, '')

const subtractMaps = (a, b) =>
  b.forEach(metric => {
    a.delete(metric)
  })

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

const DEFAULT_TS = []
const DEFAULT_LOADINGS = []
const DEFAULT_ERROR_MSG = {}
const DEFAULT_ABORTABLES = new Map()

export const useMetricsData = (metrics, settings) => {
  const [timeseries, setTimeseries] = useState(DEFAULT_TS)
  const [loadings, setLoadings] = useState(DEFAULT_LOADINGS)
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)
  const [abortables, setAbortables] = useState(DEFAULT_ABORTABLES)

  const metricsHash = hashMetrics(metrics)

  useEffect(
    () => {
      console.log(
        '[metricsHash]: aborting removed metrics',
        new Map(abortables)
      )

      setAbortables(abortRemovedMetrics(abortables, metrics))
    },
    [metricsHash]
  )

  useEffect(
    () => {
      console.log('[settings]: Aborting every request', new Map(abortables))

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
      console.log('useMetrics call ->')

      metrics.forEach(metric => {
        const { key } = metric

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
            query: getMetricQUERY(key),
            variables: {
              metric: key,
              interval,
              to,
              from,
              slug
            },
            context: {
              fetchOptions: {
                signal: abortController.signal
              }
            }
          })
          .then(getPreTransform(key))
          .then(({ data }) => {
            console.log({ raceCondition })
            if (raceCondition) return

            setTimeseries(state => {
              mergedData = mergeTimeseriesByKey({
                timeseries: [mergedData, data[key]]
              })
              return [...mergedData]
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
