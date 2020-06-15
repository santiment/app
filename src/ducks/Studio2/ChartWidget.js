import React, { useRef, useState } from 'react'
import StudioChart from '../Studio/Chart'
import { useTimeseries } from '../Studio/timeseries/hooks'

const ChartWidget = ({ settings, activeMetrics, chartRef, ...props }) => {
  const [options, setOptions] = useState({})
  const [data, loadings, ErrorMsg] = useTimeseries(activeMetrics, settings)
  /* const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings) */
  /* const data = useClosestValueData(rawData, activeMetrics, false) */

  return (
    <StudioChart
      data={data}
      chartRef={chartRef}
      activeMetrics={activeMetrics}
      settings={settings}
      loadings={loadings}
      options={options}
      setIsICOPriceDisabled={() => {}}
    />
  )
}

export default ChartWidget
