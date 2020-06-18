import React, { useEffect, useState } from 'react'
import StudioChart from '../Studio/Chart'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { useWidgetDispatcher } from './Manager/hooks'

import styles from './index.module.scss'

const ChartWidget = ({ settings, widget, sendWidgetMessage, ...props }) => {
  const { metrics, chartRef } = widget
  const dispatch = useWidgetDispatcher(widget)
  const [options, setOptions] = useState({})
  const [data, loadings, ErrorMsg] = useTimeseries(metrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
  /* const data = useClosestValueData(rawData, activeMetrics, false) */

  useEffect(
    () => {
      /* console.log(loadings.length) */
      const phase = loadings.length ? 'loading' : 'loaded'
      /* sendWidgetMessage(widget, phase) */
      dispatch(phase)
    },
    [loadings.length],
  )

  return (
    <div className={styles.widget}>
      <StudioChart
        data={data}
        chartRef={chartRef}
        activeMetrics={metrics}
        settings={settings}
        loadings={loadings}
        options={options}
        setIsICOPriceDisabled={() => {}}
      />
    </div>
  )
}

export default ChartWidget
