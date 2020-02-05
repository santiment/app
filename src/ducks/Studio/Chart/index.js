import React from 'react'
import Button from '@santiment-network/ui/Button'
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
      <div className={styles.top}>
        <div className={styles.metrics}>
          <ChartActiveMetrics
            activeMetrics={activeMetrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
            loadings={loadings}
            eventLoadings={eventLoadings}
          />
        </div>

        <Button
          border
          as='a'
          accent='positive'
          href='https://forms.gle/Suz8FVDsKtFiKhBs9'
          target='_blank'
          rel='noopener noreferrer'
        >
          Feedback
        </Button>
      </div>

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
    </>
  )
}
