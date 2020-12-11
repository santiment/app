import React from 'react'
import Chart from './Chart'
import { Metric } from '../../../../ducks/dataHub/metrics'
import { buildMergedMetric } from '../../../../ducks/Studio/Widget/HolderDistributionWidget/utils'
import { HolderDistributionMetric } from '../../../../ducks/Studio/Chart/Sidepanel/HolderDistribution/metrics'

export const insights = [
  {
    title: 'Are Bitcoin ‘millionaire addresses’ accumulating or dumping? ',
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
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  },
  {
    title: 'How big is ETH’s sell-side pressure?',
    metrics: [Metric.price_usd, Metric.active_deposits, Metric.exchange_inflow],
    settings: {
      slug: 'ethereum',
      ticker: 'ETH',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  },

  {
    title: 'Holder sentiment - taking profits or selling at a loss?',
    metrics: [Metric.price_usd, Metric.network_profit_loss],
    settings: {
      slug: 'yearn-finance',
      ticker: 'YFI',
      from: '2020-10-22T16:00:00.000Z',
      to: '2020-12-12T04:00:00.000Z'
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  },

  {
    title:
      'Is the crowd high or low on your favorite coin? (hint: the lower the better)',
    metrics: [Metric.price_usd, Metric.social_volume_total],
    settings: {
      slug: 'chainlink',
      ticker: 'LINK',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  },

  {
    title: 'Long-term HODLers - sitting idly or starting to move?',
    metrics: [Metric.price_usd, Metric.age_consumed],
    settings: {
      slug: 'uniswap',
      ticker: 'UNI',
      from: '2020-10-22T16:00:00.000Z',
      to: '2020-12-12T04:00:00.000Z'
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  }
]
