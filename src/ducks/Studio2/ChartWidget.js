import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import StudioChart from '../Studio/Chart'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { useWidgetDispatcher } from './Manager/hooks'

import styles from './index.module.scss'

export const Widget = ({ className, children }) => (
  <div className={cx(styles.widget, className)}>{children}</div>
)

export const Chart = ({ settings, widget, ...props }) => {
  const { metrics, chartRef } = widget
  const dispatch = useWidgetDispatcher(widget)
  const [options, setOptions] = useState({})
  const [data, loadings, ErrorMsg] = useTimeseries(metrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
  /* const data = useClosestValueData(rawData, activeMetrics, false) */

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
      activeMetrics={metrics}
      settings={settings}
      loadings={loadings}
      options={options}
      setIsICOPriceDisabled={() => {}}
    />
  )
}

const ChartWidget = (props) => (
  <Widget>
    <Chart {...props} />
  </Widget>
)

export default ChartWidget
