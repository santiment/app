import React, { useState } from 'react'
import cx from 'classnames'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../Chart'
import { useChartColors } from '../../Chart/colors'
import Synchronizer from '../../Chart/Synchronizer'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import Settings from '../../Studio/Header/Settings'
import ChartActiveMetrics from '../../Studio/Chart/ActiveMetrics'
import SocialDominanceToggle from './SocialDominanceToggle'
import styles from './index.module.scss'

const Canvas = ({
  className,
  settings,
  options,
  setOptions,
  loadings,
  metrics,
  boundaries,
  toggleMetric,
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
          {...props}
          options={options}
          setOptions={setOptions}
          settings={settings}
          className={styles.settings}
        />
      </div>
      <Chart
        {...options}
        {...settings}
        {...props}
        scale={scale}
        className={styles.chart}
        metrics={metrics}
        MetricColor={MetricColor}
        resizeDependencies={[]}
      />
      <div className={styles.bottom}>
        <SocialDominanceToggle
          className={styles.dominance}
          options={options}
          setOptions={setOptions}
          toggleDominance={() => {}}
        />
        <div className={styles.metrics}>
          <ChartActiveMetrics
            hideExplanation
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

export default ({ options, activeMetrics, ...rest }) => (
  <Synchronizer {...options} metrics={activeMetrics}>
    <Canvas options={options} activeMetrics={activeMetrics} {...rest} />
  </Synchronizer>
)
