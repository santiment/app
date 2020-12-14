import React from 'react'
import Chart from './Chart'
import { Metric } from '../../../../ducks/dataHub/metrics'
import { MetricColor } from '../../../../ducks/Chart/colors'
import { newProjectMetric } from '../../../../ducks/Studio/metrics'
import { buildMergedMetric } from '../../../../ducks/Studio/Widget/HolderDistributionWidget/utils'
import { HolderDistributionMetric } from '../../../../ducks/Studio/Chart/Sidepanel/HolderDistribution/metrics'

export const insights = [
  {
    title: 'Are Bitcoin ‘millionaire addresses’ accumulating or dumping? ',
    url: 'https://app.santiment.net/s/Fkz61jyr',
    metrics: [
      Metric.price_usd,
      buildMergedMetric([
        HolderDistributionMetric.holders_distribution_combined_balance_100_to_1k,
        HolderDistributionMetric.holders_distribution_combined_balance_1k_to_10k
      ])
    ],
    settings: {
      slug: 'bitcoin',
      ticker: 'BTC',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    }
  },
  {
    title: 'How big is ETH’s sell-side pressure?',
    url: 'https://app.santiment.net/s/NWWtW_x3',
    metrics: [Metric.price_usd, Metric.active_deposits, Metric.exchange_inflow],
    settings: {
      slug: 'ethereum',
      ticker: 'ETH',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    }
  },

  {
    title: 'Holder sentiment - taking profits or selling at a loss?',
    url: 'https://app.santiment.net/s/X9osqpNk',
    metrics: [Metric.price_usd, Metric.network_profit_loss],
    settings: {
      slug: 'yearn-finance',
      ticker: 'YFI',
      from: '2020-10-22T16:00:00.000Z',
      to: '2020-12-12T04:00:00.000Z'
    }
  },

  {
    title:
      'Is the crowd high or low on your favorite coin? (hint: the lower the better)',
    url: 'https://app.santiment.net/s/Q5iF3k1_',
    metrics: [Metric.price_usd, Metric.social_volume_total],
    settings: {
      slug: 'chainlink',
      ticker: 'LINK',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    }
  },

  {
    title: 'Long-term HODLers - sitting idly or starting to move?',
    url: 'https://app.santiment.net/s/3fSoYCrg',
    metrics: [Metric.price_usd, Metric.age_consumed],
    settings: {
      slug: 'uniswap',
      ticker: 'UNI',
      from: '2020-10-22T16:00:00.000Z',
      to: '2020-12-12T04:00:00.000Z'
    }
  }
]

const mapProjectMetrics = (project, metrics) =>
  metrics.map(metric => newProjectMetric(project, metric))

function setupMetricColors (metrics) {
  const colors = {}

  metrics.forEach(({ key, base }) => {
    colors[key] = MetricColor[base.key]
  })

  return colors
}

insights.forEach(insight => {
  let { settings, metrics } = insight

  insight.metrics = mapProjectMetrics(settings, metrics)
  metrics = insight.metrics

  const MetricColor = setupMetricColors(metrics)

  insight.widget = () => (
    <Chart metrics={metrics} settings={settings} MetricColor={MetricColor} />
  )
})
