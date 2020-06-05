import React, { useState, useEffect } from 'react'
import Search from '../../../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList'
import {
  DEFAULT_METRICS,
  withSignalMetrics
} from '../../../../../Studio/withMetrics'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { Metric } from '../../../../../dataHub/metrics'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const makeSignalMetric = (key, label, category, node = 'line') => {
  return {
    key,
    label,
    category,
    node
  }
}

export const SIGNAL_SUPPORTED_METRICS = [
  Metric.social_volume_total,
  makeSignalMetric(
    'social_volume_discord',
    'Social volume (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_professional_traders_chat',
    'Social volume (pro traders chat)',
    'Social'
  ),
  makeSignalMetric('social_volume_reddit', 'Social volume (reddit)', 'Social'),
  makeSignalMetric(
    'social_volume_telegram',
    'Social volume (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_volume_twitter',
    'Social volume (twitter)',
    'Social'
  ),

  Metric.volume_usd,
  Metric.age_destroyed,
  Metric.exchange_balance,
  makeSignalMetric('price_btc', 'Price BTC', 'Financial'),
  Metric.marketcap_usd,

  makeSignalMetric(
    'community_messages_count_total',
    'Community messages count(total)',
    'Social'
  ),
  makeSignalMetric(
    'community_messages_count_telegram',
    'Community messages count(telegram)',
    'Social'
  ),
  // makeSignalMetric('community_messages_count_discord', 'Community messages count(discord)', 'Social'),

  makeSignalMetric(
    'social_dominance_total',
    'Social dominance (total)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_discord',
    'Social dominance (discord)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_professional_traders_chat',
    'Social dominance (pro traders chat)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_reddit',
    'Social dominance (reddit)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_telegram',
    'Social dominance (telegram)',
    'Social'
  ),
  makeSignalMetric(
    'social_dominance_twitter',
    'Social dominance (twitter)',
    'Social'
  ),

  Metric.transaction_volume,
  makeSignalMetric('exchange_inflow', 'Exchange Inflow', 'On-chain', 'bar'),
  makeSignalMetric('exchange_outflow', 'Exchange Outflow', 'On-chain', 'bar'),
  Metric.dev_activity,
  makeSignalMetric('github_activity', 'Github Activity', 'Development')
]

const getByAvailable = (availableMetrics = DEFAULT_METRICS) =>
  SIGNAL_SUPPORTED_METRICS.filter(({ key }) => {
    return availableMetrics.indexOf(key) !== -1
  })

const SupportedMetricsList = ({ onSelectMetric, slug, availableMetrics }) => {
  const [categories, setCategories] = useState({})

  useEffect(
    () => {
      const metrics = getByAvailable(availableMetrics)
      const newCategories = getCategoryGraph(metrics, [])
      setCategories(newCategories)
    },
    [slug, availableMetrics]
  )

  const categoriesKeys = Object.keys(categories)

  return (
    categoriesKeys.length > 0 && (
      <>
        <div className={metricStyles.choose}>
          <div className={metricStyles.chooseText}>
            or choose from the group of metrics
          </div>
          <div className={metricStyles.divider} />
        </div>

        <Search
          iconPosition='left'
          inputProps={{
            placeholder: 'Search for a Metric'
          }}
          toggleMetric={onSelectMetric}
          className={metricStyles.search}
          categories={categories}
        />

        <div className={metricStyles.metrics}>
          {categoriesKeys.map(key => (
            <MetricsList
              key={key}
              metrikKey={key}
              list={categories[key]}
              onSelect={onSelectMetric}
            />
          ))}
        </div>
      </>
    )
  )
}

export default withSignalMetrics(SupportedMetricsList)
