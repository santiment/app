import React, { useState, useEffect, useMemo } from 'react'
import { graphql } from 'react-apollo'
import Chart from './Chart'
import { Metric } from '../../../dataHub/metrics'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../SANCharts/gql'
import { DetailedMetric } from './metrics'
import styles from './index.module.scss'

const GENERAL_CHARTS = [
  DetailedMetric.social_volume_telegram,
  DetailedMetric.social_volume_reddit,
  DetailedMetric.social_volume_professional_traders_chat,
  DetailedMetric.social_volume_discord,
  DetailedMetric.social_volume_twitter
]
const COMMUNITY_CHARTS = [DetailedMetric.community_messages_count_telegram]

const Colors = {}

GENERAL_CHARTS.forEach(({ key, color }) => (Colors[key] = color))
COMMUNITY_CHARTS.forEach(({ key, color }) => (Colors[key] = color))

const DefaultCharts = {
  general: GENERAL_CHARTS,
  community: []
}

const DetailedBlock = ({
  linkedAssets,
  allDetectedAssets,
  MetricColor,
  priceAsset,
  settings,
  type,
  availableMetrics,
  children,
  ...props
}) => {
  const [MetricSettingMap, setMetricSettingMap] = useState(new Map())

  const charts = useMemo(
    () => {
      if (!availableMetrics) {
        return DefaultCharts[type]
      }

      return COMMUNITY_CHARTS.filter(({ key }) =>
        availableMetrics.includes(key)
      )
    },
    [availableMetrics],
    type
  )

  const detectedAsset =
    type === 'community'
      ? allDetectedAssets.get(settings.slug)
      : linkedAssets.get(settings.slug)

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = {
        selector: detectedAsset ? 'slug' : 'text',
        slug: detectedAsset ? detectedAsset.slug : settings.slug
      }

      if (charts.length > 0) {
        charts.forEach(metric => newMetricSettingMap.set(metric, metricSetting))
        setMetricSettingMap(newMetricSettingMap)
      }
    },
    [charts, settings.slug]
  )

  if (charts.length === 0) {
    return null
  }

  const shouldShowChart = type !== 'community' || Boolean(detectedAsset)

  return !shouldShowChart ||
    MetricSettingMap.size === 0 ||
    !priceAsset ? null : (
    <>
      {charts.length > 0 && children}
      <div className={styles.charts}>
        {charts.map(chart => (
          <div className={styles.chart} key={chart.key}>
            <span className={styles.label} style={{ '--color': chart.color }}>
              {chart.name}
            </span>
            <Chart
              {...props}
              settings={settings}
              charts={[
                chart,
                { ...Metric.price_usd, reqMeta: { slug: priceAsset.slug } }
              ]}
              MetricSettingMap={MetricSettingMap}
              MetricColor={{ ...MetricColor, ...Colors }}
              tooltipKey={chart.key}
            />
          </div>
        ))}
      </div>
    </>
    )
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  skip: ({ allDetectedAssets, settings, type }) => {
    const detectedAsset = allDetectedAssets.get(settings.slug)

    return (
      !detectedAsset || type !== 'community' || settings.addedTopics.length > 0
    )
  },
  options: ({ allDetectedAssets, settings }) => {
    const detectedAsset = allDetectedAssets.get(settings.slug)
    return { variables: { slug: detectedAsset.slug } }
  },
  props: ({ data: { project: { availableMetrics = [] } = {} } }) => {
    return { availableMetrics }
  }
})(DetailedBlock)
