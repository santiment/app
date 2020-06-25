import React, { useMemo, useEffect, useState } from 'react'
import Widget from './Widget'
import { newWidget } from './utils'
import { dispatchWidgetMessage } from '../widgetMessage'
import { Metric } from '../../dataHub/metrics'
import { useClosestValueData } from '../../Chart/hooks'
import StudioChart from '../../Studio/Chart'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { DEFAULT_OPTIONS } from '../../Studio/defaults'
import { buildComparedMetric } from '../../Studio/Compare/utils'
import { buildChartShareLink } from '../url/generate'

export const Chart = ({
  settings,
  widget,
  isSingleWidget,
  toggleWidgetMetric,
  deleteWidget,
  rerenderWidgets,
  ...props
}) => {
  const { metrics, chartRef } = widget
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [comparables, setComparables] = useState(widget.comparables)
  const [activeMetrics, setActiveMetrics] = useState(metrics)
  const [rawData, loadings, ErrorMsg] = useTimeseries(activeMetrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
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
      widget.comparables = comparables
      setActiveMetrics(metrics.concat(comparables.map(buildComparedMetric)))
      rerenderWidgets()
    },
    [metrics, comparables],
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
      const phase = loadings.length ? 'loading' : 'loaded'
      dispatchWidgetMessage(widget, phase)
    },
    [loadings.length],
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
      activeEvents={[]}
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
