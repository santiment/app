import React, { useState, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Metric } from '../../ducks/dataHub/metrics'
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks'
import { SOCIAL_VOLUME_COLORS } from '../../ducks/SocialTool/Chart/colors'
import { SETTINGS } from './settings'
import { buildExploredMetric, calcAverage, calcPercentage } from './utils'
import DetailsItem from './DetailsItem'
import Column from './Column'
import styles from './index.module.scss'

function useSocialTimeseries (metrics, settings, MetricSettingMap) {
  const [activeMetrics, setMetrics] = useState([])

  useEffect(
    () => {
      if (MetricSettingMap.size > 0) {
        setMetrics(metrics)
      }
    },
    [metrics]
  )

  useEffect(
    () => {
      if (
        activeMetrics.length === 0 &&
        metrics.length !== 0 &&
        MetricSettingMap.size > 0
      ) {
        setMetrics(metrics)
      }
    },
    [MetricSettingMap]
  )

  return useTimeseries(activeMetrics, settings, MetricSettingMap)
}

const Content = ({ topics: defaultTopics, linkedAssets }) => {
  const [metrics, setMetrics] = useState([])
  const [topics, setTopics] = useState()
  const [avg, setAvg] = useState([])
  const [MetricSettingMap, setMetricSettingMap] = useState(new Map())

  const [data] = useSocialTimeseries(metrics, SETTINGS, MetricSettingMap)

  useEffect(
    () => {
      const newAvg = calcAverage(metrics, data)
      if (JSON.stringify(newAvg) !== JSON.stringify(avg)) {
        setAvg(newAvg)
      }
    },
    [data]
  )

  useEffect(
    () => {
      if (defaultTopics !== topics) {
        if (JSON.stringify(defaultTopics) === JSON.stringify(topics)) {
          return
        }

        let newMetrics = defaultTopics.map(topic => buildExploredMetric(topic))
        newMetrics = [Metric.social_volume_total, ...newMetrics]
        setTopics(defaultTopics)
        setMetrics(newMetrics)
        setAvg([])
      }
    },
    [defaultTopics]
  )

  useEffect(
    () => {
      rebuildMetricsMap()
    },
    [metrics, linkedAssets]
  )

  function rebuildMetricsMap () {
    const newMetricSettingMap = new Map(new Map())
    metrics.forEach(metric => {
      const topic = metric.text || '*'
      const detectedAsset = linkedAssets.get(topic)
      newMetricSettingMap.set(metric, {
        selector: detectedAsset ? 'slug' : 'text',
        slug: detectedAsset ? detectedAsset.slug : topic
      })
    })

    setMetricSettingMap(newMetricSettingMap)
  }

  const totalAvg = avg[0]
  const remainingAvg = avg.slice(1)
  const max = remainingAvg.length > 1 ? Math.max(...remainingAvg) : totalAvg

  return MetricSettingMap.size > 0 ? (
    <div className={styles.content}>
      <div className={styles.chart}>
        {avg.length === 2 && <Column percent={100} className={styles.column} />}
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
      {avg.length !== metrics.length && <Loader className={styles.loader} />}
    </div>
  ) : null
}

export default Content
