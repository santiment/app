import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import { Metric } from '../dataHub/metrics'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { generateShareLink } from '../Studio/url'
import { updateHistory } from '../../utils/utils'
import SocialToolChart from './Chart'
import { buildMetrics } from './utils'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import styles from './index.module.scss'

const SocialTool = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  linkedAssets,
  allDetectedAssets,
  classes = {},
  ...props
}) => {
  const defaultTopics = [defaultSettings.slug, ...defaultSettings.addedTopics]
  const defaultActiveMetrics =
    defaultTopics.length > 1
      ? buildMetrics(defaultMetrics, defaultTopics)
      : defaultMetrics

  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [activeMetrics, setActiveMetrics] = useState(defaultActiveMetrics)
  const [MetricSettingMap, setMetricSettingMap] = useState()
  const [priceAsset, setPriceAsset] = useState()
  const [data, loadings] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingMap
  )
  const [shareLink, setShareLink] = useState('')
  const chartRef = useRef(null)

  useEffect(
    () => {
      if (priceAsset) {
        const newPriceMetric = { ...Metric.price_usd, label: priceAsset.label }
        metrics[1] = newPriceMetric
        setMetrics([...metrics])
      }
    },
    [priceAsset]
  )

  useEffect(
    () => {
      const { slug, addedTopics } = defaultSettings
      setSettings(state => ({ ...state, slug, addedTopics }))

      const topics = [slug, ...addedTopics]
      const newMetrics =
        topics.length > 1 ? buildMetrics(metrics, topics) : metrics

      setActiveMetrics(newMetrics)
      rebuildMetricSettingMap(newMetrics, slug)
    },
    [defaultSettings.slug, defaultSettings.addedTopics, metrics]
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

  function rebuildMetricSettingMap (metrics, slug) {
    const newMetricSettingMap = new Map(MetricSettingMap)
    metrics.forEach(metric => {
      const detectedAsset = linkedAssets.get(metric.text || slug)
      if (metric.key !== Metric.price_usd.key) {
        newMetricSettingMap.set(metric, {
          selector: detectedAsset ? 'slug' : 'text',
          slug: detectedAsset ? detectedAsset.slug : metric.text || slug
        })
      }
    })
    if (priceAsset) {
      newMetricSettingMap.set(metrics[1], { slug: priceAsset.slug })
    }

    setMetricSettingMap(newMetricSettingMap)
  }

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          className={styles.canvas}
          chartRef={chartRef}
          options={options}
          settings={settings}
          shareLink={shareLink}
          activeMetrics={activeMetrics}
          priceAsset={priceAsset}
          data={data}
          loadings={loadings}
          setOptions={setOptions}
          setSettings={setSettings}
          setPriceAsset={setPriceAsset}
          linkedAssets={linkedAssets}
          allDetectedAssets={allDetectedAssets}
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
