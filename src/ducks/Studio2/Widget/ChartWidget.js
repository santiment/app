import React, { useMemo, useEffect, useState } from 'react'
import Widget from './Widget'
import { newWidget } from './utils'
import { dispatchWidgetMessage } from '../widgetMessage'
import { Metric } from '../../dataHub/metrics'
import { useClosestValueData } from '../../Chart/hooks'
import StudioChart from '../../Studio/Chart'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { buildAnomalies } from '../../Studio/timeseries/anomalies'
import { DEFAULT_OPTIONS } from '../../Studio/defaults'
import { buildComparedMetric } from '../../Studio/Compare/utils'
import { buildChartShareLink } from '../url/generate'
import { MirroredMetric } from '../../dataHub/metrics/mirrored'

export const Chart = ({
  settings,
  widget,
  isSingleWidget,
  isAnomalyActive,
  toggleWidgetMetric,
  deleteWidget,
  rerenderWidgets,
  ...props
}) => {
  const { metrics, chartRef } = widget
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [comparables, setComparables] = useState(widget.comparables)
  const [activeMetrics, setActiveMetrics] = useState(metrics)
  const [activeEvents, setActiveEvents] = useState([])
  const [MetricTransformer, setMetricTransformer] = useState({})
  const [MetricSettingMap, setMetricSettingMap] = useState(new Map())
  const [rawData, loadings, ErrorMsg] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingMap,
    MetricTransformer,
  )
  const [eventsData] = useTimeseries(activeEvents, settings)
  const data = useClosestValueData(
    rawData,
    metrics,
    options.isClosestDataActive,
  )
  const shareLink = useMemo(
    () => buildChartShareLink({ settings, widgets: [widget] }),
    [settings, metrics, comparables],
  )

  useEffect(
    () => {
      const phase = loadings.length ? 'loading' : 'loaded'
      dispatchWidgetMessage(widget, phase)
    },
    [loadings.length],
  )

  useEffect(
    () => {
      if (!chartRef.current) return

      if (widget.scrollIntoViewOnMount) {
        chartRef.current.canvas.scrollIntoView()
        widget.scrollIntoViewOnMount = false
      }
    },
    [chartRef.current],
  )

  useEffect(
    () => {
      widget.comparables = comparables
      setActiveMetrics(metrics.concat(comparables.map(buildComparedMetric)))
      rerenderWidgets()
    },
    [metrics, comparables],
  )

  useEffect(
    () => {
      setActiveEvents(isAnomalyActive ? buildAnomalies(metrics) : [])
    },
    [metrics, isAnomalyActive],
  )

  useEffect(
    () => {
      const metricTransformer = Object.assign({}, MetricTransformer)

      metrics.forEach((metric) => {
        const mirrorOf = MirroredMetric[metric.key]
        if (mirrorOf) {
          const { key, preTransformer } = metric

          if (metrics.includes(mirrorOf)) {
            metricTransformer[key] = preTransformer
          } else {
            metricTransformer[key] = undefined
          }
        }
      })

      setMetricTransformer(metricTransformer)
    },
    [metrics],
  )

  function removeComparedMetric({ key }) {
    setComparables(comparables.filter((comp) => comp.key !== key))
  }

  function toggleMetric(metric) {
    if (metric.comparedTicker) {
      return removeComparedMetric(metric)
    }

    toggleWidgetMetric(widget, metric)
  }

  return (
    <StudioChart
      {...props}
      data={data}
      chartRef={chartRef}
      metrics={activeMetrics}
      eventsData={eventsData}
      activeEvents={activeEvents}
      ErrorMsg={ErrorMsg}
      settings={settings}
      loadings={loadings}
      options={options}
      comparables={comparables}
      shareLink={shareLink}
      isSingleWidget={isSingleWidget}
      setOptions={setOptions}
      setComparables={setComparables}
      toggleMetric={toggleMetric}
      onDeleteChartClick={() => deleteWidget(widget)}
    />
  )
}

const ChartWidget = (props) => (
  <Widget>
    <Chart {...props} />
  </Widget>
)

export const newChartWidget = (props) =>
  newWidget(ChartWidget, {
    metrics: [Metric.price_usd],
    comparables: [],
    ...props,
  })

export default ChartWidget
