import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../Chart'
import { useChartColors } from '../../Chart/colors'
import Synchronizer from '../../Chart/Synchronizer'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import Settings from '../Settings'
import styles from './index.module.scss'

const Canvas = ({
  index,
  className,
  chartRef,
  settings,
  setSettings,
  options,
  loadings,
  metrics,
  boundaries,
  advancedView,
  toggleMetric,
  isMultiChartsActive,
  ...props
}) => {
  const MetricColor = useChartColors(metrics)
  const scale = options.isLogScale ? logScale : linearScale

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        <h3 className={styles.title}>Social volume score</h3>
        <div className={styles.meta}>
          <PaywallInfo boundaries={boundaries} metrics={metrics} />
        </div>
        <Settings
          settings={settings}
          setSettings={setSettings}
          chartRef={chartRef}
          className={styles.settings}
        />
      </div>
      <Chart
        {...options}
        {...settings}
        {...props}
        setSettings={setSettings}
        scale={scale}
        chartRef={chartRef}
        className={styles.chart}
        metrics={metrics}
        MetricColor={MetricColor}
        isMultiChartsActive={isMultiChartsActive}
        resizeDependencies={[isMultiChartsActive]}
      />
    </div>
  )
}

export default ({ options, activeMetrics, ...rest }) => {
  return (
    <Synchronizer {...options} metrics={activeMetrics}>
      <Canvas options={options} activeMetrics={activeMetrics} {...rest} />
    </Synchronizer>
  )
}
