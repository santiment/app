import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Search from '../../../../../Studio/Sidebar/Search'
import MetricsList from './MetricsList'
import { DEFAULT_METRICS } from '../../../../../Studio/withMetrics'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { Metric } from '../../../../../dataHub/metrics'
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../../../SANCharts/gql'
import { useProject } from '../../../../../../hooks/project'
import metricStyles from './TriggerFormMetricTypes.module.scss'

const makeSignalMetric = (key, label, category, node = 'line', group) => {
  return {
    key,
    label,
    category,
    node,
    group
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
  Metric.age_consumed,
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
  makeSignalMetric(
    'exchange_inflow',
    'Exchange Inflow',
    'On-chain',
    'bar',
    'Exchanges'
  ),
  makeSignalMetric(
    'exchange_outflow',
    'Exchange Outflow',
    'On-chain',
    'bar',
    'Exchanges'
  ),
  Metric.dev_activity,
  makeSignalMetric('github_activity', 'Github Activity', 'Development'),
  makeSignalMetric(
    'mvrv_usd_intraday',
    'MVRV (intraday)',
    'On-chain',
    'line',
    'Network Value'
  )
]

const getByAvailable = (availableMetrics = DEFAULT_METRICS) =>
  SIGNAL_SUPPORTED_METRICS.filter(({ key }) => {
    return availableMetrics.indexOf(key) !== -1
  })

export function useAvailableMetrics (slug) {
  const { data, loading, error } = useQuery(PROJECT_METRICS_BY_SLUG_QUERY, {
    skip: !slug,
    variables: {
      slug
    }
  })

  return [data ? data.project : DEFAULT_METRICS, loading, error]
}

const SupportedMetricsList = ({ onSelectMetric, availableMetrics, slug }) => {
  const [categories, setCategories] = useState({})

  useEffect(
    () => {
      const metrics = getByAvailable(availableMetrics)
      const newCategories = getCategoryGraph(metrics, [])
      setCategories(newCategories)
    },
    [slug, availableMetrics]
  )

  const [project] = useProject(slug)
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
              project={project}
            />
          ))}
        </div>
      </>
    )
  )
}

export default SupportedMetricsList
