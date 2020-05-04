import React, { useState, useEffect } from 'react'
import { graphql } from 'react-apollo'
import Icon from '@santiment-network/ui/Icon/Icon'
import Chart from './Chart'
import { Metric } from '../../../dataHub/metrics'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../SANCharts/gql'
import { DetailedMetric } from './metrics'
import styles from './index.module.scss'

const GENERAL_CHARTS = [
  DetailedMetric.social_volume_telegram,
  DetailedMetric.social_volume_reddit,
  DetailedMetric.social_volume_professional_traders_chat,
  DetailedMetric.social_volume_discord
]
const COMMUNITY_CHARTS = [DetailedMetric.community_messages_count_telegram]

const Colors = {}

GENERAL_CHARTS.forEach(({ key, color }) => (Colors[key] = color))
COMMUNITY_CHARTS.forEach(({ key, color }) => (Colors[key] = color))

let priceMetric = Metric.price_usd

const DefaultCharts = {
  general: {
    charts: GENERAL_CHARTS,
    title: 'Detailed charts'
  },
  community: {
    charts: [],
    title: 'Community messages charts'
  }
}

const DetailedBlock = ({
  linkedAssets,
  MetricColor,
  priceAsset,
  settings,
  type,
  charts = DefaultCharts[type].charts,
  ...props
}) => {
  const [MetricSettingMap, setMetricSettingMap] = useState()

  const detectedAsset = linkedAssets.get(settings.slug)

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = {
        selector: detectedAsset ? 'slug' : 'text',
        slug: detectedAsset ? detectedAsset.slug : settings.slug
      }

      charts.forEach(metric => newMetricSettingMap.set(metric, metricSetting))

      setMetricSettingMap(newMetricSettingMap)
    },
    [linkedAssets, settings.slug]
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

  const isComparingMode = settings.addedTopics.length > 0
  const shouldShowChart = type !== 'community' || Boolean(detectedAsset)

  const defaultChart = priceAsset ? [priceMetric] : []

  return isComparingMode || !shouldShowChart ? null : (
    <>
      <div className={styles.top}>
        <h3 className={styles.heading}>{DefaultCharts[type].title}</h3>
        <div>
          {charts.map((chart, idx) => (
            <span className={styles.tab} key={idx}>
              <Icon
                type='ring'
                className={styles.icon}
                style={{ '--color': chart.color }}
              />
              {chart.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.charts}>
        {charts.map(chart => (
          <Chart
            key={chart.key}
            {...props}
            settings={settings}
            charts={[chart, ...defaultChart]}
            MetricSettingMap={MetricSettingMap}
            className={styles.chart}
            MetricColor={{ ...MetricColor, ...Colors }}
            tooltipKey={chart.key}
          />
        ))}
      </div>
    </>
  )
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  skip: ({ linkedAssets, settings, type }) => {
    const detectedAsset = linkedAssets.get(settings.slug)

    return (
      !detectedAsset || type !== 'community' || settings.addedTopics.length > 0
    )
  },
  options: ({ linkedAssets, settings }) => {
    const detectedAsset = linkedAssets.get(settings.slug)
    return { variables: { slug: detectedAsset.slug } }
  },
  props: ({ data: { project: { availableMetrics = [] } = {} } }) => {
    const availableCommunityCharts = COMMUNITY_CHARTS.filter(({ key }) =>
      availableMetrics.includes(key)
    )

    return { charts: availableCommunityCharts }
  }
})(DetailedBlock)
