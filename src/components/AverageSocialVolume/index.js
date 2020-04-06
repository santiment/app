import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Metric } from '../../ducks/dataHub/metrics'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import HelpPopup from '../HelpPopup/HelpPopup'
import { SETTINGS } from './settings'
import {
  DEFAULT_METRIC_SETTING_MAP,
  buildExploredMetric,
  calcAverage,
  calcPercentage
} from './utils'
import DetailsItem from './DetailsItem'
import Column from './Column'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'

// NOTE(haritonasty): refactor after comparing

const AverageSocialVolume = ({ text, hasPremium, detectedAsset }) => {
  const defaultMetrics = [Metric.social_volume_total, buildExploredMetric(text)]
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [avg, setAvg] = useState([])

  DEFAULT_METRIC_SETTING_MAP.set(metrics[1], {
    selector: detectedAsset ? 'slug' : 'text',
    slug: detectedAsset ? detectedAsset.slug : text
  })

  const [MetricSettingMap, setMetricSettingMap] = useState(
    DEFAULT_METRIC_SETTING_MAP
  )

  const [data] = useTimeseries(metrics, SETTINGS, MetricSettingMap)

  const newAvg = calcAverage(metrics, data)
  if (JSON.stringify(newAvg) !== JSON.stringify(avg)) {
    setAvg(newAvg)
  }

  useEffect(
    () => {
      const newMetrics = [Metric.social_volume_total, buildExploredMetric(text)]

      setMetrics(newMetrics)
      setAvg([])
    },
    [text]
  )

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = {
        selector: detectedAsset ? 'slug' : 'text',
        slug: detectedAsset ? detectedAsset.slug : text
      }

      newMetricSettingMap.set(metrics[1], metricSetting)
      setMetricSettingMap(newMetricSettingMap)
    },
    [metrics, detectedAsset]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Average</h3>
        <HelpPopup>
          The average number of daily mentions in the past 30 days
        </HelpPopup>
      </div>
      {hasPremium && (
        <div className={styles.content}>
          {avg.length === 2 ? (
            <>
              <div className={styles.chart}>
                <Column percent={100} className={styles.column} />
                <Column
                  percent={calcPercentage(avg[0], avg[1])}
                  className={styles.column}
                />
              </div>
              <div className={styles.details}>
                <DetailsItem value={avg[0]} className={styles.item} />
                <DetailsItem
                  value={avg[1]}
                  percentage={calcPercentage(avg[0], avg[1])}
                  title={text}
                  className={styles.item}
                />
              </div>
            </>
          ) : (
            <Loader className={styles.loader} />
          )}
        </div>
      )}
      {hasPremium === false && <PaywallBanner />}
    </div>
  )
}

export default AverageSocialVolume
