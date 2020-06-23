import React, { useEffect, useState } from 'react'
import Widget from './Widget'
import { newWidget } from './utils'
import { useWidgetMessageDispatcher } from '../widgetMessageContext'
import { Metric } from '../../dataHub/metrics'
import { useClosestValueData } from '../../Chart/hooks'
import StudioChart from '../../Studio/Chart'
import { useTimeseries } from '../../Studio/timeseries/hooks'

export const Chart = ({
  settings,
  widget,
  isSingleWidget,
  toggleWidgetMetric,
  deleteWidget,
  ...props
}) => {
  const { metrics, chartRef } = widget
  const dispatch = useWidgetMessageDispatcher()
  const [options, setOptions] = useState({})
  const [rawData, loadings, ErrorMsg] = useTimeseries(metrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
  const data = useClosestValueData(
    rawData,
    metrics,
    options.isClosestDataActive,
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
      dispatch(widget, phase)
    },
    [loadings.length],
  )

  return (
    <StudioChart
      {...props}
      data={data}
      chartRef={chartRef}
      metrics={metrics}
      activeEvents={[]}
      activeMetrics={metrics}
      ErrorMsg={ErrorMsg}
      settings={settings}
      loadings={loadings}
      options={options}
      setIsICOPriceDisabled={() => {}}
      setOptions={setOptions}
      isSingleWidget={isSingleWidget}
      toggleMetric={(metric) => toggleWidgetMetric(widget, metric)}
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
    ...props,
  })

export default ChartWidget
