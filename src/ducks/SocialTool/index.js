import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import withBoundaries from '../../pages/Studio/withBoundaries'
import CtaJoinPopup from '../../components/CtaJoinPopup/CtaJoinPopup'
import { useTimeseries } from '../Studio/timeseries/hooks'
// import { parseUrl } from './url'
import SocialToolChart from './Chart'

import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { buildTextSelectorMetric } from './utils'
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
      const updatedMetrics = metrics.map(metric =>
        buildTextSelectorMetric({ metric, text: settings.text })
      )
      setActiveMetrics(updatedMetrics)
    },
    [metrics, settings.text]
  )

  useEffect(
    () => {
      const { text } = defaultSettings
      if (text && text !== settings.text) {
        setSettings(state => ({ ...state, text }))
      }
    },
    [defaultSettings.text]
  )

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          className={styles.canvas}
          chartRef={chartRef}
          settings={settings}
          setSettings={setSettings}
          options={options}
          activeMetrics={activeMetrics}
          data={data}
          loadings={loadings}
        />
      </div>
    </div>
  )
}

export default withBoundaries(({ settings, options, metrics, ...props }) => (
  <SocialTool
    {...props}
    defaultSettings={{
      ...DEFAULT_SETTINGS,
      ...settings
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
  />
))
