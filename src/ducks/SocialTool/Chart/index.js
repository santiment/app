import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import Chart from '../../Chart'
import Synchronizer from '../../Chart/Synchronizer'
import { useChartColors } from '../../Chart/colors'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'

const Canvas = ({
  index,
  className,
  chartRef,
  settings,
  options,
  loadings,
  metrics,
  boundaries,
  advancedView,
  toggleMetric,
  changeHoveredDate,
  isMultiChartsActive,
  syncedTooltipDate,
  isAnon,
  isSidebarClosed,
  ...props
}) => {
  const MetricColor = useChartColors(metrics)
  const scale = options.isLogScale ? logScale : linearScale

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        <div className={styles.metrics} />

        <div className={styles.meta}>
          <PaywallInfo boundaries={boundaries} metrics={metrics} />
        </div>
      </div>
      <Chart
        {...options}
        {...settings}
        {...props}
        scale={scale}
        chartRef={chartRef}
        className={styles.chart}
        metrics={metrics}
        MetricColor={MetricColor}
        isMultiChartsActive={isMultiChartsActive}
        syncedTooltipDate={syncedTooltipDate}
        resizeDependencies={[isMultiChartsActive]}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  isAnon: !checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(
  ({ options, activeMetrics, ...rest }) => {
    return (
      <Synchronizer {...options} metrics={activeMetrics}>
        <Canvas options={options} activeMetrics={activeMetrics} {...rest} />
      </Synchronizer>
    )
  }
)
