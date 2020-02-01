import { useState, useEffect } from 'react'
import { client } from '../../../index'
import {
  getMetricQUERY,
  getPreTransform
} from '../../../ducks/GetTimeSeries/timeseries'
import { mergeTimeseriesByKey } from '../../../utils/utils'

function hashMetrics (metrics) {
  return metrics.reduce((acc, { key }) => acc + key, '')
}

/*
   [metricKey]: data,
   Error: {
     [Metrics]: string
   },
   loadings: [Metrics]
*/

const DEFAULT_STATE = {
  data: [],
  Error: {},
  loadings: []
}

export const useMetricsData = (metrics, settings) => {
  const [result, setResult] = useState(DEFAULT_STATE)

  useEffect(
    () => {
      console.log('useMetrics call')
      const { slug, from, to, interval } = settings

      let mergedData = []

      metrics.forEach(metric => {
        const { key } = metric

        setResult(state => {
          const loadingsSet = new Set(state.loadings)
          loadingsSet.add(metric)
          state.loadings = [...loadingsSet]
          return { ...state }
        })

        client
          .query({
            query: getMetricQUERY(key),
            variables: {
              metric: key,
              interval: interval,
              to,
              from,
              slug
            }
          })
          .then(getPreTransform(key))
          .then(({ data }) => {
            setResult(state => {
              mergedData = mergeTimeseriesByKey({
                timeseries: [mergedData, data[key]]
              })
              state.data = mergedData
              state.loadings = state.loadings.filter(
                loadable => loadable !== metric
              )
              return { ...state }
            })
          })
          .catch(({ message }) => {
            setResult(state => {
              state.Error[key] = message
              return { ...state }
            })
          })
      })
    },
    [hashMetrics(metrics), settings]
  )

  console.log(result)

  return result
}
