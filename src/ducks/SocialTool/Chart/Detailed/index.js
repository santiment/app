import React, { useState, useEffect } from 'react'
import Chart from './Chart'
import Trigger from './Trigger'
import { Metric } from '../../../dataHub/metrics'
import { DetailedMetric } from './metrics'
import styles from './index.module.scss'

const GENERAL_CHARTS = [
  DetailedMetric.social_volume_telegram,
  DetailedMetric.social_volume_reddit,
  DetailedMetric.social_volume_professional_traders_chat,
  DetailedMetric.social_volume_discord
]

const Colors = {}

GENERAL_CHARTS.forEach(({ key, color }) => (Colors[key] = color))

let priceMetric = Metric.price_usd

const DetailedBlock = ({
  setSettings,
  settings,
  detectedAsset,
  MetricColor,
  priceAsset,
  ...props
}) => {
  let defaultCharts = []

  if (typeof settings.detailed_charts === 'string') {
    defaultCharts.push(DetailedMetric[settings.detailed_charts])
  } else {
    defaultCharts = settings.detailed_charts.map(key => DetailedMetric[key])
  }

  const [activeCharts, setActiveCharts] = useState(defaultCharts)
  const [MetricSettingMap, setMetricSettingMap] = useState()

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = { selector: detectedAsset ? 'slug' : 'text' }

      GENERAL_CHARTS.forEach(metric =>
        newMetricSettingMap.set(metric, metricSetting)
      )

      setMetricSettingMap(newMetricSettingMap)
    },
    [detectedAsset]
  )

  useEffect(
    () => {
      if (priceAsset) {
        const newMetricSettingMap = new Map(MetricSettingMap)
        priceMetric = { ...Metric.price_usd, label: priceAsset.label }
        newMetricSettingMap.set(priceMetric, { slug: priceAsset.slug })
        setMetricSettingMap(newMetricSettingMap)
      }
    },
    [priceAsset]
  )

  function toggleChart (chart) {
    const newActiveCharts = new Set(activeCharts)
    if (!newActiveCharts.delete(chart)) {
      newActiveCharts.add(chart)
    }

    const activeKeys = [...newActiveCharts].map(({ key }) => key)
    setActiveCharts([...newActiveCharts])
    setSettings(state => ({
      ...state,
      detailed_charts: activeKeys
    }))
  }

  return (
    <div className={styles.row}>
      <h3 className={styles.heading}>Detailed charts</h3>
      {GENERAL_CHARTS.map((chart, idx) => (
        <Trigger
          key={idx}
          isActive={activeCharts.includes(chart)}
          className={styles.button}
          {...chart}
          toggleActive={() => toggleChart(chart)}
        />
      ))}
      {activeCharts.map(chart => (
        <Chart
          key={chart.key}
          {...props}
          settings={settings}
          charts={[chart, priceMetric]}
          MetricSettingMap={MetricSettingMap}
          className={styles.chart}
          MetricColor={{ ...MetricColor, ...Colors }}
          tooltipKey={chart.key}
          setSettings={setSettings}
        />
      ))}
    </div>
  )
}

export default DetailedBlock
