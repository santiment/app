import React from 'react'
import cx from 'classnames'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartPaywallInfo from './PaywallInfo'
import ChartActiveMetrics from './ActiveMetrics'
import Chart from '../../SANCharts/Chart'
import Synchronizer from '../../SANCharts/Chart/Synchronizer'
import styles from './index.module.scss'

const Canvas = ({
  className,
  chartRef,
  settings,
  options,
  loadings,
  eventLoadings,
  metrics,
  activeEvents,
  boundaries,
  advancedView,
  toggleMetric,
  changeHoveredDate,
  isMultiChartsActive,
  ...props
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        <div className={styles.metrics}>
          <ChartActiveMetrics
            activeMetrics={metrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
            loadings={loadings}
            eventLoadings={eventLoadings}
            isMultiChartsActive={isMultiChartsActive}
          />
        </div>

        <div className={styles.meta}>
          <ChartPaywallInfo boundaries={boundaries} />
        </div>
      </div>

      <Chart
        {...options}
        {...settings}
        {...props}
        isMultiChartsActive={isMultiChartsActive}
        metrics={metrics}
        chartRef={chartRef}
        scale={options.isLogScale ? logScale : linearScale}
        isAdvancedView={!!advancedView}
        onPointHover={advancedView ? changeHoveredDate : undefined}
      />
    </div>
  )
}

export default ({ options, events, activeMetrics, ...rest }) => {
  return (
    <Synchronizer
      isMultiChartsActive={options.isMultiChartsActive}
      metrics={activeMetrics}
      events={events}
    >
      <Canvas
        options={options}
        events={events}
        activeMetrics={activeMetrics}
        {...rest}
      />
    </Synchronizer>
  )
}
