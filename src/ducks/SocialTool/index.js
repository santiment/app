import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import { Metric } from '../dataHub/metrics'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { updateHistory, generateShareLink } from '../Studio/url'
import SocialToolChart from './Chart'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import styles from './index.module.scss'

const SocialTool = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  detectedAsset,
  classes = {},
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [MetricSettingMap, setMetricSettingMap] = useState()
  const [priceAsset, setPriceAsset] = useState()
  const [data, loadings] = useTimeseries(metrics, settings, MetricSettingMap)
  const [shareLink, setShareLink] = useState('')
  const chartRef = useRef(null)

  const selector = detectedAsset ? 'slug' : 'text'

  useEffect(
    () => {
      if (priceAsset) {
        const newPriceMetric = { ...Metric.price_usd, label: priceAsset.label }
        const newMetricSettingMap = new Map(MetricSettingMap)

        newMetricSettingMap.set(newPriceMetric, { slug: priceAsset.slug })
        metrics[1] = newPriceMetric

        setMetrics([...metrics])
        setMetricSettingMap(newMetricSettingMap)
      }
    },
    [priceAsset]
  )

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = { selector: detectedAsset ? 'slug' : 'text' }

      newMetricSettingMap.set(Metric.social_volume_total, metricSetting)
      newMetricSettingMap.set(Metric.social_dominance_total, metricSetting)

      setMetricSettingMap(newMetricSettingMap)
    },
    [detectedAsset]
  )

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings(state => ({ ...state, slug }))
      }
    },
    [defaultSettings.slug]
  )

  useEffect(
    () => {
      const metricSet = new Set(metrics)
      const metric = Metric.social_dominance_total

      if (options.isSocialDominanceActive) {
        metricSet.add(metric)
      } else {
        metricSet.delete(metric)
      }

      setMetrics([...metricSet])
    },
    [options.isSocialDominanceActive]
  )

  useEffect(
    () => {
      const queryString = '?' + generateShareLink(settings, options)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
      updateHistory(queryString)
    },
    [settings, options]
  )

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          detectedAsset={detectedAsset}
          className={styles.canvas}
          chartRef={chartRef}
          options={options}
          settings={settings}
          shareLink={shareLink}
          activeMetrics={metrics}
          priceAsset={priceAsset}
          data={data}
          loadings={loadings}
          setOptions={setOptions}
          setSettings={setSettings}
          setPriceAsset={setPriceAsset}
          selector={selector}
        />
      </div>
    </div>
  )
}

export default ({ settings, options, metrics, ...props }) => (
  <SocialTool
    {...props}
    defaultSettings={{ ...DEFAULT_SETTINGS, ...settings }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
  />
)
