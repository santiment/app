import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../Chart'
import { useChartColors } from '../../Chart/colors'
import Synchronizer from '../../Chart/Synchronizer'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import Settings from '../Settings'
import ChartActiveMetrics from './ActiveMetrics'
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
  const [FocusedMetric, setFocusedMetric] = useState()
  const MetricColor = useChartColors(metrics, FocusedMetric)
  const scale = options.isLogScale ? logScale : linearScale

  function onMetricHover (Metric) {
    setFocusedMetric(Metric)
  }

  function onMetricHoverEnd () {
    setFocusedMetric()
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.top}>
        <h3 className={styles.title}>Social volume score</h3>
        <PaywallInfo boundaries={boundaries} metrics={metrics} />
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
      <div className={styles.bottom}>
        <div className={styles.metrics}>
          <ChartActiveMetrics
            className={styles.metric}
            MetricColor={MetricColor}
            activeMetrics={metrics}
            loadings={loadings}
            onMetricHover={onMetricHover}
            onMetricHoverEnd={onMetricHoverEnd}
          />
        </div>
      </div>
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
