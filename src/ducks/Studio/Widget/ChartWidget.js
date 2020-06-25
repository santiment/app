import React, { useMemo, useEffect, useState } from 'react'
import Widget from './Widget'
import { newWidget } from './utils'
import StudioChart from '../Chart'
import { dispatchWidgetMessage } from '../widgetMessage'
import { DEFAULT_OPTIONS } from '../defaults'
import { useTimeseries } from '../timeseries/hooks'
import { buildAnomalies } from '../timeseries/anomalies'
import { buildComparedMetric } from '../Compare/utils'
import { buildChartShareLink } from '../url/generate'
import { useClosestValueData } from '../../Chart/hooks'
import { Metric } from '../../dataHub/metrics'
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
  const { metrics, chartRef, MetricSettingMap } = widget
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [comparables, setComparables] = useState(widget.comparables)
  const [activeMetrics, setActiveMetrics] = useState(metrics)
  const [activeEvents, setActiveEvents] = useState([])
  const [MetricTransformer, setMetricTransformer] = useState({})
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
    MetricSettingMap: new Map(),
    ...props,
  })

export default ChartWidget
