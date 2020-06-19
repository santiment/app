import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import StudioChart from '../Studio/Chart'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { useWidgetDispatcher } from './Manager/hooks'

import styles from './index.module.scss'

export const Widget = ({ className, children }) => (
  <div className={cx(styles.widget, className)}>{children}</div>
)

export const Chart = ({
  settings,
  widget,
  isSingleWidget,
  toggleWidgetMetric,
  ...props
}) => {
  const { metrics, chartRef } = widget
  const dispatch = useWidgetDispatcher(widget)
  const [options, setOptions] = useState({})
  const [data, loadings, ErrorMsg] = useTimeseries(metrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
  /* const data = useClosestValueData(rawData, activeMetrics, false) */

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
      dispatch(phase)
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
      settings={settings}
      loadings={loadings}
      options={options}
      setIsICOPriceDisabled={() => {}}
      setOptions={setOptions}
      isSingleWidget={isSingleWidget}
      toggleMetric={(metric) => toggleWidgetMetric(widget, metric)}
    />
  )
}

const ChartWidget = (props) => (
  <Widget>
    <Chart {...props} />
  </Widget>
)

export default ChartWidget
