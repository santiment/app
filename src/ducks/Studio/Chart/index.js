import React from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartActiveMetrics from './ActiveMetrics'
import Chart from '../../SANCharts/Chart'
import Synchronizer from '../../SANCharts/Chart/Synchronizer'
import { mapDatetimeToNumber } from '../../SANCharts/utils'
import styles from './index.module.scss'

export default ({
  chartRef,
  settings,
  options,
  data,
  loadings,
  events,
  eventLoadings,
  activeMetrics,
  activeEvents,
  boundaries,
  advancedView,
  toggleMetric,
  changeHoveredDate
}) => {
  const { isLogScale, isMultiChartsActive } = options

  return (
    <>
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
        />
      </Synchronizer>

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
