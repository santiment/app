import React from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartActiveMetrics from './ActiveMetrics'
import Chart from '../../SANCharts/Chart'
import Synchronizer from '../../SANCharts/Chart/Synchronizer'
import { mapDatetimeToNumber } from '../../SANCharts/utils'
import { useMetricsData } from './hooks'
import styles from './index.module.scss'

const boundaries = {
  leftBoundaryDate: false,
  rightBoundaryDate: false
}

const Canvas = ({
  data,
  events,
  settings,
  options,
  activeMetrics,
  chartRef,
  advancedView,
  changeHoveredDate
  /* boundaries, */
}) => {
  const { isLogScale, isMultiChartsActive } = options

  return (
    <Synchronizer
      isMultiChartsActive={isMultiChartsActive}
      metrics={activeMetrics}
      events={events}
    >
      <Chart
        {...options}
        {...settings}
        {...boundaries}
        metrics={activeMetrics}
        data={mapDatetimeToNumber(data)}
        chartRef={chartRef}
        scale={isLogScale ? logScale : linearScale}
        isAdvancedView={!!advancedView}
        onPointHover={advancedView ? changeHoveredDate : undefined}
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
  const [events, eventLoadings] = useMetricsData(activeEvents, settings)
  return (
    <>
      <Canvas
        data={data}
        events={events}
        settings={settings}
        activeMetrics={activeMetrics}
        {...rest}
      />
      <div className={styles.bottom}>
        <ChartActiveMetrics
          activeMetrics={activeMetrics}
          activeEvents={activeEvents}
          toggleMetric={toggleMetric}
          loadings={loadings}
          eventLoadings={eventLoadings}
        />
      </div>
    </>
  )
}
