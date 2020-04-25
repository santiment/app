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
  detectedAsset,
  MetricColor,
  priceAsset,
  settings,
  type,
  charts = DefaultCharts[type].charts,
  ...props
}) => {
  const [MetricSettingMap, setMetricSettingMap] = useState()

  useEffect(() => {
    const newMetricSettingMap = new Map(MetricSettingMap)
    const metricSetting = { selector: detectedAsset ? 'slug' : 'text' }

    charts.forEach(metric => newMetricSettingMap.set(metric, metricSetting))

    setMetricSettingMap(newMetricSettingMap)
  }, [detectedAsset])

  useEffect(() => {
    if (priceAsset) {
      const newMetricSettingMap = new Map(MetricSettingMap)
      priceMetric = { ...Metric.price_usd, label: priceAsset.label }
      newMetricSettingMap.set(priceMetric, { slug: priceAsset.slug })
      setMetricSettingMap(newMetricSettingMap)
    }
  }, [priceAsset])

  return (
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
          charts={[chart, priceMetric]}
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
  skip: ({ detectedAsset, type }) => !detectedAsset || type !== 'community',
  options: ({ detectedAsset }) => {
    return { variables: { slug: detectedAsset.slug } }
  },
  props: ({ data: { project: { availableMetrics = [] } = {} } }) => {
    const availableCommunityCharts = COMMUNITY_CHARTS.filter(({ key }) =>
      availableMetrics.includes(key)
    )

    return { charts: availableCommunityCharts }
  }
})(DetailedBlock)
