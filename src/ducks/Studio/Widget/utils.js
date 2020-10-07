import { useEffect, useMemo, useState } from 'react'
import { MirroredMetric } from '../../dataHub/metrics/mirrored'

let widgetId = -1

export const newId = () => ++widgetId

export const newWidget = (Widget, props) =>
  Object.assign(
    {
      Widget,
      id: newId(),
      chartRef: { current: null }
    },
    props
  )

export const useMetricNodeOverwrite = MetricSettingMap =>
  useMemo(
    () => {
      const metricNode = {}
      MetricSettingMap.forEach(({ interval }, { key, node }) => {
        if (interval && node === 'bar') {
          metricNode[key] = 'autoWidthBar'
        }
      })
      return metricNode
    },
    [MetricSettingMap]
  )

export const useMirroredTransformer = metrics => {
  const [MetricTransformer, setMetricTransformer] = useState({})

  useEffect(
    () => {
      const metricTransformer = Object.assign({}, MetricTransformer)

      metrics.forEach(metric => {
        const mirrorOf = MirroredMetric[metric.key]
        if (mirrorOf) {
          const { key, preTransformer } = metric
          const hasMirror = metrics.some(
            ({ key: mirrorKey }) => mirrorKey === key
          )

          if (hasMirror) {
            metricTransformer[key] = preTransformer
          } else {
            metricTransformer[key] = undefined
          }
        }
      })

      setMetricTransformer(metricTransformer)
    },
    [metrics]
  )

  return MetricTransformer
}
