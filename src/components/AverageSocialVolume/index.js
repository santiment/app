import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Metric } from '../../ducks/dataHub/metrics'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import HelpPopup from '../HelpPopup/HelpPopup'
import { SETTINGS } from './settings'
import DetailsItem from './DetailsItem'
import Column from './Column'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'

export const buildKey = (metric, suffix) =>
  `${metric.key}_${suffix.replace(/- /g, '')}`

const DEFAULT_METRIC_SETTING_MAP = new Map().set(Metric.social_volume_total, {
  selector: 'text',
  slug: '*'
})

function buildExploredMetric (text) {
  const key = buildKey(Metric.social_volume_total, text)
  return {
    ...Metric.social_volume_total,
    queryKey: Metric.social_volume_total.key,
    key
  }
}

function calcAverage (metrics, data) {
  const initialValue = {}
  const avg = {}
  const { length } = data

  metrics.forEach(({ key }) => (initialValue[key] = 0))

  const sum = data.reduce(function (acc, val) {
    const res = {}
    metrics.forEach(({ key }) => (res[key] = acc[key] + (val[key] || 0)))
    return res
  }, initialValue)

  metrics.forEach(({ key }) => (avg[key] = parseInt(sum[key] / length)))

  return avg
}

function calcPercentage (total, number) {
  return ((number * 100) / total).toFixed(2)
}

const AverageSocialVolume = ({ text, hasPremium, detectedAsset }) => {
  const [metrics, setMetrics] = useState([
    Metric.social_volume_total,
    buildExploredMetric(text)
  ])

  DEFAULT_METRIC_SETTING_MAP.set(metrics[1], {
    selector: detectedAsset ? 'slug' : 'text',
    slug: text
  })

  const [MetricSettingMap, setMetricSettingMap] = useState(
    DEFAULT_METRIC_SETTING_MAP
  )

  const [data, loadings] = useTimeseries(metrics, SETTINGS, MetricSettingMap)
  const [avg, setAvg] = useState()

  const hasData = loadings.length === 0 && data.length !== 0

  if (hasData && !avg) {
    setAvg(calcAverage(metrics, data))
  }

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = {
        selector: detectedAsset ? 'slug' : 'text',
        slug: text
      }

      newMetricSettingMap.set(metrics[1], metricSetting)

      setMetricSettingMap(newMetricSettingMap)
    },
    [detectedAsset, text]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Average</h3>
        <HelpPopup>
          The average number of daily mentions in the past 30 days
        </HelpPopup>
      </div>
      {hasPremium ? (
        <div className={styles.content}>
          {hasData && avg ? (
            <>
              <div className={styles.chart}>
                <Column percent={100} className={styles.column} />
                <Column
                  percent={calcPercentage(
                    avg[metrics[0].key],
                    avg[metrics[1].key]
                  )}
                  className={styles.column}
                />
              </div>
              <div className={styles.details}>
                <DetailsItem
                  value={avg[metrics[0].key]}
                  className={styles.item}
                />
                <DetailsItem
                  value={avg[metrics[1].key]}
                  percentage={calcPercentage(
                    avg[metrics[0].key],
                    avg[metrics[1].key]
                  )}
                  title={text}
                  className={styles.item}
                />
              </div>
            </>
          ) : (
            <Loader className={styles.loader} />
          )}
        </div>
      ) : (
        <PaywallBanner />
      )}
    </div>
  )
}

export default AverageSocialVolume
