import React, { useState } from 'react'
import cx from 'classnames'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import Chart from '../../Chart'
import { useChartColors } from './colors'
import Signals from '../../Chart/Signals'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import ChartActiveMetrics from '../../Studio/Chart/ActiveMetrics'
import SocialDominanceToggle from './SocialDominanceToggle'
import ChartHeader from './Header'
import DetailedBlock from './Detailed'
import styles from './index.module.scss'

const CHART_HEIGHT = 420

const Canvas = ({
  className,
  settings,
  options,
  setOptions,
  loadings,
  metrics,
  boundaries,
  setSettings,
  categories,
  linkedAssets,
  allDetectedAssets,
  ...props
}) => {
  const [FocusedMetric, setFocusedMetric] = useState()
  const MetricColor = useChartColors(metrics, FocusedMetric)
  const scale = options.isLogScale ? logScale : linearScale

  function onMetricHover (metric) {
    setFocusedMetric(metric)
  }

  function onMetricHoverEnd () {
    setFocusedMetric()
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <ChartHeader
        {...props}
        allDetectedAssets={allDetectedAssets}
        activeMetrics={metrics}
        options={options}
        settings={settings}
        setOptions={setOptions}
        setSettings={setSettings}
        className={styles.top}
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
        <PaywallInfo boundaries={boundaries} metrics={metrics} />
        <SocialDominanceToggle
          className={styles.dominance}
          options={options}
          setOptions={setOptions}
        />
      </div>
      <Chart
        {...options}
        {...settings}
        {...categories}
        {...props}
        scale={scale}
        chartHeight={CHART_HEIGHT}
        className={styles.chart}
        metrics={metrics}
        MetricColor={MetricColor}
        setSettings={setSettings}
        resizeDependencies={[]}
      >
        <Signals {...settings} metrics={metrics} selector='text' />
      </Chart>
      <DetailedBlock
        {...options}
        {...props}
        scale={scale}
        type='general'
        MetricColor={MetricColor}
        settings={settings}
        linkedAssets={linkedAssets}
      />
      <DetailedBlock
        {...options}
        {...props}
        scale={scale}
        type='community'
        MetricColor={MetricColor}
        settings={settings}
        linkedAssets={linkedAssets}
      />
    </div>
  )
}

export default ({ options, activeMetrics, ...rest }) => {
  const categories = metricsToPlotCategories(activeMetrics)

  return (
    <Canvas
      tooltipKey={activeMetrics[0].key}
      options={options}
      metrics={activeMetrics}
      categories={categories}
      {...rest}
    />
  )
}
