import { useEffect, useMemo, useState } from 'react'
import { MirroredMetric } from '../../dataHub/metrics/mirrored'
import { getMetricLabel } from '../../dataHub/metrics/labels'
import { TooltipSetting } from '../../dataHub/tooltipSettings'

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

      MetricSettingMap.forEach(({ interval, node: nodeOverwrite }, metric) => {
        const node = nodeOverwrite || metric.node

        if (interval && node === 'bar') {
          metricNode[metric.key] = 'autoWidthBar'
        } else {
          metricNode[metric.key] = node
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

export function useWidgetProjectSettings (widget, settings) {
  const { from, to } = settings

  return useMemo(
    () => {
      const { slug, ticker } = settings

      widget.project = widget.project || { slug, ticker }

      return Object.assign({}, settings, widget.project)
    },
    [from, to]
  )
}

export function useWidgetMetricLabeling (chartRef, metrics, settings) {
  useEffect(
    () => {
      const chart = chartRef.current
      if (!chart) return

      const freeMetrics = metrics.filter(m => !m.project)
      const oldLabels = new Array(freeMetrics.length)

      freeMetrics.forEach((metric, i) => {
        const { key, dataKey = key } = metric
        const tooltipSetting = TooltipSetting[dataKey]

        oldLabels[i] = [tooltipSetting, tooltipSetting.label, metric]

        if (metric.indicator) {
          const { base, indicator } = metric
          metric.label = `${base.label} (${settings.ticker}) ${indicator.label}`
          tooltipSetting.label = metric.label
        } else {
          tooltipSetting.label = getMetricLabel(metric, settings)
        }
      })

      return () =>
        oldLabels.forEach(([tooltipSetting, label, metric]) => {
          tooltipSetting.label = label
          if (metric.indicator) {
            metric.label = label
          }
        })
    },
    [metrics, settings.ticker]
  )
}
