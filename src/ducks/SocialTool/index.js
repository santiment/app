import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import { Metric } from '../dataHub/metrics'
import withBoundaries from '../../pages/Studio/withBoundaries'
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
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [metrics, setMetrics] = useState(defaultMetrics)

  const defaultActiveMetrics = metrics.map(metric =>
    buildTextSelectorMetric({ metric, text: defaultSettings.text })
  )

  const [activeMetrics, setActiveMetrics] = useState(defaultActiveMetrics)
  const [data, loadings] = useTimeseries(activeMetrics, settings)
  const chartRef = useRef(null)

  useEffect(
    () => {
      const updatedMetrics = metrics.map(metric =>
        buildTextSelectorMetric({ metric, text: settings.text })
      )
      setActiveMetrics(updatedMetrics)
    },
    [metrics]
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

  useEffect(
    () => {
      const metricSet = new Set(metrics)
      const metric = Metric.social_dominance_total
      options.isShowSocialDominance
        ? metricSet.add(metric)
        : metricSet.delete(metric)

      setMetrics([...metricSet])
    },
    [options.isShowSocialDominance]
  )

  //   useEffect(
  //     () => {
  //       const queryString =
  //         '?' +
  //         generateShareLink(settings, options, metrics, activeEvents, comparables)
  //
  //       const { origin, pathname } = window.location
  //       setShareLink(origin + pathname + queryString)
  //       updateHistory(queryString)
  //     },
  //     [settings, options, metrics, activeEvents, comparables]
  //   )

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          className={styles.canvas}
          chartRef={chartRef}
          options={options}
          settings={settings}
          setOptions={setOptions}
          setSettings={setSettings}
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
