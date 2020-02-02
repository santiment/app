import React from 'react'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import { mapDatetimeToNumber } from '../../../ducks/SANCharts/utils'
import Canvas from '../../../ducks/SANCharts/Chart'
import Synchronizer from '../../../ducks/SANCharts/Chart/Synchronizer'
import MetricsActiveMetrics from '../Metrics/ActiveList'
import { useMetricsData } from './hooks'
import styles from './index.module.scss'

const boundaries = {
  leftBoundaryDate: false,
  rightBoundaryDate: false
}

const Chart = ({ data, settings, options, activeMetrics, chartRef }) => {
  const { isLogScale, isMultiChartsActive } = options

  return (
    <Synchronizer
      isMultiChartsActive={isMultiChartsActive}
      metrics={activeMetrics}
      events={[]}
    >
      <Canvas
        {...options}
        {...settings}
        metrics={activeMetrics}
        data={mapDatetimeToNumber(data)}
        chartRef={chartRef}
        scale={isLogScale ? logScale : linearScale}
        {...boundaries}
        // // isIntervalSmallerThanDay={isIntervalSmallerThanDay}
        // isLoading={isParentLoading || isLoading}
        // isWideChart={isWideChart}
        // onPointHover={this.getSocialContext}
        // hasPremium={hasPremium}
      />
    </Synchronizer>
  )
}

export default ({ settings, activeMetrics, toggleMetric, ...rest }) => {
  const [data, loadings, ErrorMsg] = useMetricsData(activeMetrics, settings)
  return (
    <>
      <Chart
        data={data}
        settings={settings}
        activeMetrics={activeMetrics}
        {...rest}
      />
      <div className={styles.bottom}>
        <MetricsActiveMetrics
          activeMetrics={activeMetrics}
          toggleMetric={toggleMetric}
          loadings={loadings}
        />
      </div>
    </>
  )
}
