import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Metric } from '../../ducks/dataHub/metrics'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { SOCIAL_VOLUME_COLORS } from '../../ducks/SocialTool/Chart/colors'
import HelpPopup from '../HelpPopup/HelpPopup'
import { SETTINGS } from './settings'
import { buildExploredMetric, calcAverage, calcPercentage } from './utils'
import DetailsItem from './DetailsItem'
import Column from './Column'
import PaywallBanner from './PaywallBanner'
import styles from './index.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const DEFAULT_MAP = new Map()

const AverageSocialVolume = ({ topics, linkedAssets, hasPremium }) => {
  const defaultMetrics = topics.map(topic => buildExploredMetric(topic))
  const [metrics, setMetrics] = useState([
    Metric.social_volume_total,
    defaultMetrics
  ])
  const [avg, setAvg] = useState([])

  metrics.forEach(metric => {
    const topic = metric.text || '*'
    const detectedAsset = linkedAssets.get(topic)
    DEFAULT_MAP.set(metric, {
      selector: detectedAsset ? 'slug' : 'text',
      slug: detectedAsset ? detectedAsset.slug : topic
    })
  })

  const [MetricSettingMap, setMetricSettingMap] = useState(DEFAULT_MAP)

  const [data] = useTimeseries(metrics, SETTINGS, MetricSettingMap)

  const newAvg = calcAverage(metrics, data)
  if (JSON.stringify(newAvg) !== JSON.stringify(avg)) {
    setAvg(newAvg)
  }

  useEffect(
    () => {
      let newMetrics = topics.map(topic => buildExploredMetric(topic))
      newMetrics = [Metric.social_volume_total, ...newMetrics]
      setMetrics(newMetrics)
      setAvg([])
    },
    [topics]
  )

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      metrics.forEach(metric => {
        const topic = metric.text || '*'
        const detectedAsset = linkedAssets.get(topic)
        newMetricSettingMap.set(metric, {
          selector: detectedAsset ? 'slug' : 'text',
          slug: detectedAsset ? detectedAsset.slug : topic
        })
      })

      setMetricSettingMap(newMetricSettingMap)
    },
    [metrics, linkedAssets]
  )

  const totalAvg = avg[0]
  const remainingAvg = avg.slice(1)
  const max = remainingAvg.length > 1 ? Math.max(...remainingAvg) : totalAvg

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Average, 30d</h3>
        <HelpPopup>
          <h4 className={stylesTooltip.title}>Average Social Volume</h4>
          The average number of daily mentions in the past 30 days
        </HelpPopup>
      </div>
      {hasPremium && (
        <div className={styles.content}>
          <div className={styles.chart}>
            {avg.length === 2 && (
              <Column percent={100} className={styles.column} />
            )}
            {remainingAvg.map((item, idx) => (
              <Column
                key={idx}
                color={SOCIAL_VOLUME_COLORS[idx]}
                percent={calcPercentage(max, item)}
                className={styles.column}
              />
            ))}
          </div>
          <div className={styles.details}>
            <DetailsItem value={totalAvg} className={styles.item} />
            {remainingAvg.map((item, idx) => (
              <DetailsItem
                key={idx}
                value={item}
                color={SOCIAL_VOLUME_COLORS[idx]}
                percent={calcPercentage(totalAvg, item)}
                title={topics[idx]}
                className={styles.item}
              />
            ))}
          </div>
          {avg.length !== metrics.length && (
            <Loader className={styles.loader} />
          )}
        </div>
      )}
      {hasPremium === false && <PaywallBanner />}
    </div>
  )
}

export default AverageSocialVolume
