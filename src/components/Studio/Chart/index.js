import React from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import { mapDatetimeToNumber } from '../../../ducks/SANCharts/utils'
import Canvas from '../../../ducks/SANCharts/Chart'
import Synchronizer from '../../../ducks/SANCharts/Chart/Synchronizer'
import MetricsActiveList from '../Metrics/ActiveList'
import { useMetricsData } from './hooks'
import styles from './index.module.scss'

const boundaries = {
  leftBoundaryDate: false,
  rightBoundaryDate: false
}

const Chart = ({
  data,
  events,
  settings,
  options,
  activeMetrics,
  chartRef
}) => {
  const { isLogScale, isMultiChartsActive } = options

  return (
    <Synchronizer
      isMultiChartsActive={isMultiChartsActive}
      metrics={activeMetrics}
      events={events}
    >
      <Canvas
        {...options}
        {...settings}
        {...boundaries}
        metrics={activeMetrics}
        data={mapDatetimeToNumber(data)}
        chartRef={chartRef}
        scale={isLogScale ? logScale : linearScale}
        // // isIntervalSmallerThanDay={isIntervalSmallerThanDay}
        // onPointHover={this.getSocialContext}
        // hasPremium={hasPremium}
      />
    </Synchronizer>
  )
}

export default ({
  settings,
  activeMetrics,
  activeEvents,
  toggleMetric,
  ...rest
}) => {
  const [data, loadings, ErrorMsg] = useMetricsData(activeMetrics, settings)
  const [events] = useMetricsData(activeEvents, settings)
  return (
    <>
      <Chart
        data={data}
        events={events}
        settings={settings}
        activeMetrics={activeMetrics}
        {...rest}
      />
      <div className={styles.bottom}>
        <MetricsActiveList
          activeMetrics={activeMetrics}
          activeEvents={activeEvents}
          toggleMetric={toggleMetric}
          loadings={loadings}
        />
      </div>
    </>
  )
}
