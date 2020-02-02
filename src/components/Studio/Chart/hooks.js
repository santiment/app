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

const controllersAborter = controller => controller.abort()

/*
   [metricKey]: data,
   Error: {
     [Metrics]: string
   },
   loadings: [Metrics]
*/

function abortRemovedMetrics (abortables, newMetrics) {
  const toAbort = new Map(abortables)
  newMetrics.forEach(metric => {
    toAbort.delete(metric)
  })

  const abortableEntries = [...toAbort.entries()]
  const reducedAbortables = new Map(abortables)

  abortableEntries.forEach(([metric, controller]) => {
    controller.abort()
    reducedAbortables.delete(metric)
  })

  return reducedAbortables
}

function abortAllMetrics (abortables) {
  return [...abortables.values()].forEach(controllersAborter)
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
      setLoadings([])
      setErrorMsg({})
    },
    [settings]
  )

  useEffect(
    () => {
      const { slug, from, to, interval } = settings

      let raceCondition = false
      let mergedData = []
      console.log('useMetrics call ->', {
        slug,
        metrics,
        abortables: new Map(abortables)
      })

      metrics.forEach(metric => {
        const { key } = metric

        const queryId = client.queryManager.idCounter
        const abortController = new AbortController()
        /* abortController.signal.onabort = () => { */
        /* console.log('aborted', queryId, client) */
        /* } */

        setAbortables(state => {
          const newState = new Map(state)
          newState.set(metric, abortController)
          console.log('New metric abortable', newState)
          return newState
        })

        setLoadings(state => {
          const loadingsSet = new Set(state.loadings)
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
            console.log('Received metric data ->', data)

            setAbortables(state => {
              const newState = new Map(state)
              state.delete(metric)
              return newState
            })
            setLoadings(state => {
              return state.filter(loadable => loadable !== metric)
            })
            setTimeseries(state => {
              mergedData = mergeTimeseriesByKey({
                timeseries: [mergedData, data[key]]
              })
              return [...mergedData]
            })
          })
          .catch(({ message }) => {
            if (raceCondition) return

            setAbortables(state => {
              const newState = new Map(state)
              state.delete(metric)
              return newState
            })

            setErrorMsg(state => {
              state[key] = message
              return { ...state }
            })
          })

        /*
      setTimeout(() => {
        abortController.abort()
      }, 200)
      */
      })

      return () => {
        raceCondition = true
      }
    },
    [metricsHash, settings]
  )

  return [timeseries, loadings, ErrorMsg]
}
