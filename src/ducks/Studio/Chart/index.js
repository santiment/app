import React from 'react'
import Button from '@santiment-network/ui/Button'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartPaywallInfo from './PaywallInfo'
import ChartActiveMetrics from './ActiveMetrics'
import Chart from '../../SANCharts/Chart'
import Synchronizer from '../../SANCharts/Chart/Synchronizer'
import styles from './index.module.scss'

const checkHasBoundaries = ({ leftBoundaryDate: a, rightBoundaryDate: b }) =>
  a || b

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

        <div className={styles.meta}>
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
          {checkHasBoundaries(boundaries) && <ChartPaywallInfo />}
        </div>
      </div>

      <Synchronizer
        isMultiChartsActive={isMultiChartsActive}
        metrics={activeMetrics}
        events={events}
      >
        <Chart
          {...options}
          {...settings}
          metrics={activeMetrics}
          data={data}
          chartRef={chartRef}
          scale={isLogScale ? logScale : linearScale}
          isAdvancedView={!!advancedView}
          onPointHover={advancedView ? changeHoveredDate : undefined}
        />
      </Synchronizer>
    </>
  )
}
