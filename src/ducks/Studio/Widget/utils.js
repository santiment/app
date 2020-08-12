import { useMemo } from 'react'

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
