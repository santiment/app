import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import SocialToolChart from './Chart'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { buildTextSelectorMetric } from './utils'
import { useTimeseries } from '../Studio/timeseries/hooks'
import styles from './index.module.scss'

const SocialTool = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  classes = {},
  ...props
}) => {
  const test = defaultMetrics.map(metric =>
    buildTextSelectorMetric({ metric, text: defaultSettings.text })
  )

  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [metrics, setMetrics] = useState(test)
  const [activeMetrics, setActiveMetrics] = useState(test)
  const [data, loadings] = useTimeseries(activeMetrics, settings)
  const chartRef = useRef(null)

  useEffect(
    () => {
      setActiveMetrics(metrics)
    },
    [metrics]
  )

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          className={styles.canvas}
          chartRef={chartRef}
          settings={settings}
          options={options}
          activeMetrics={activeMetrics}
          data={data}
          loadings={loadings}
        />
      </div>
    </div>
  )
}

export default ({ settings, options, metrics, ...props }) => (
  <SocialTool
    {...props}
    defaultSettings={{
      ...DEFAULT_SETTINGS,
      ...settings
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
  />
)
