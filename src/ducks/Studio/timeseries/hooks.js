import { useState, useEffect } from 'react'
import { getQuery, getPreTransform } from './fetcher'
import { normalizeDatetimes, mergeTimeseries } from './utils'
import { substituteErrorMsg } from './errors'
import { getAvailableInterval } from '../../dataHub/metrics/intervals'
import { getIntervalByTimeRange } from '../../../utils/dates'
import { client } from '../../../apollo'

// NOTE: Polyfill for a PingdomBot 0.8.5 browser (/sentry/sanbase-frontend/issues/29459/) [@vanguard | Feb 6, 2020]
window.AbortController =
  window.AbortController ||
  function () {
    return { abort () {} }
  }

const DEFAULT_TS = []
const DEFAULT_LOADINGS = []
const DEFAULT_ERROR_MSG = Object.create(null)
const DEFAULT_METRIC_TRANSFORMER = Object.create(null)
const DEFAULT_ABORTABLES = new Map()
const DEFAULT_METRIC_SETTINGS_MAP = new Map()
const ABORTABLE_METRIC_SETTINGS_INDEX = 2

const noop = v => v

const hashMetrics = metrics => metrics.reduce((acc, { key }) => acc + key, '')

export const getTransformerKey = ({ key, slug }) => {
  if (slug) {
    return `${key}_${slug}`
  }

  return key
}

const cancelQuery = ([controller, id]) => {
  const { queryManager } = client
  controller.abort()
  const query = queryManager.queries.get(id.toString())
  if (query) {
    queryManager.inFlightLinkObservables.delete(query.document)
  }
  queryManager.stopQuery(id)
}

function abortRemovedMetrics (abortables, newMetrics, MetricSettingMap) {
  const toAbort = new Map(abortables)
  newMetrics.forEach(metric => {
    const abortable = abortables.get(metric)
    if (
      abortable &&
      abortable[ABORTABLE_METRIC_SETTINGS_INDEX] ===
        MetricSettingMap.get(metric)
    ) {
      toAbort.delete(metric)
    }
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

const NO_DATA_MSG = 'No data for the requested period'

export function useTimeseries (
  metrics,
  settings,
  MetricSettingMap = DEFAULT_METRIC_SETTINGS_MAP,
  MetricTransformer = DEFAULT_METRIC_TRANSFORMER
) {
  const [timeseries, setTimeseries] = useState(DEFAULT_TS)
  const [loadings, setLoadings] = useState(DEFAULT_LOADINGS)
  const [ErrorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)
  const [abortables, setAbortables] = useState(DEFAULT_ABORTABLES)

  const metricsHash = hashMetrics(metrics)
  const { slug, from, to, interval } = settings

  useEffect(
    () => {
      if (!metricsHash) {
        setTimeseries([])
      }

      setAbortables(abortRemovedMetrics(abortables, metrics, MetricSettingMap))
    },
    [metricsHash, MetricSettingMap]
  )

  useEffect(
    () => {
      abortAllMetrics(abortables)
      setAbortables(new Map())
      setLoadings([...metrics])
      setErrorMsg({})
    },
    [slug, from, to, interval]
  )

  useEffect(
    () => {
      const { slug, from, to, interval } = settings

      let raceCondition = false
      let mergedData = []

      metrics.forEach(metric => {
        const { key, reqMeta } = metric
        const metricSettings = MetricSettingMap.get(metric)
        const queryId = client.queryManager.idCounter
        const abortController = new AbortController()

        const query = getQuery(metric, metricSettings)

        if (!query) {
          return setErrorMsg(state => {
            state[key] = NO_DATA_MSG
            return { ...state }
          })
        }

        setAbortables(state => {
          const newState = new Map(state)
          newState.set(metric, [abortController, queryId, metricSettings])
          return newState
        })

        setLoadings(state => {
          const loadingsSet = new Set(state)
          loadingsSet.add(metric)
          return [...loadingsSet]
        })

        client
          .query({
            query,
            variables: {
              metric: key,
              interval: getAvailableInterval(metric, interval),
              to,
              from,
              slug,
              ...reqMeta,
              ...metricSettings
            },
            context: {
              fetchOptions: {
                signal: abortController.signal
              }
            }
          })
          .then(getPreTransform(metric))
          .then(MetricTransformer[getTransformerKey(metric)] || noop)
          .then(data => {
            if (raceCondition) return
            if (!data.length) {
              throw new Error(NO_DATA_MSG)
            }

            setErrorMsg(state => {
              if (!state[key]) return state

              const newState = Object.assign({}, state)
              delete newState[key]
              return newState
            })
            setTimeseries(() => {
              mergedData = mergeTimeseries([mergedData, data])

              return mergedData.map(normalizeDatetimes)
            })
          })
          .catch(({ message }) => {
            if (raceCondition) return
            setErrorMsg(state => {
              state[key] = substituteErrorMsg(message)
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
    [metricsHash, settings, MetricSettingMap, MetricTransformer]
  )

  return [timeseries, loadings, ErrorMsg]
}

const DEFAULT_BRUSH_SETTINGS = {
  slug: 'bitcoin',
  interval: '4d',
  ...getIntervalByTimeRange('all')
}

export function useAllTimeData (metrics, settings, MetricSettingMap) {
  const [brushSettings, setBrushSettings] = useState(DEFAULT_BRUSH_SETTINGS)
  const [allTimeData] = useTimeseries(metrics, brushSettings, MetricSettingMap)

  useEffect(
    () => {
      setBrushSettings({
        ...brushSettings,
        slug: settings.slug
      })
    },
    [settings.slug]
  )

  return allTimeData
}
