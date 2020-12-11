import React from 'react'
import Chart from './Chart'
import { Metric } from '../../../../ducks/dataHub/metrics'

export const insights = [
  {
    title: 'Are Bitcoin ‘millionaire addresses’ accumulating or dumping? ',
    metrics: [Metric.price_usd],
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
    metrics: [Metric.price_usd],
    settings: {
      slug: 'bitcoin',
      ticker: 'BTC',
      from: '2020-06-08T22:00:00.000Z',
      to: '2020-12-09T22:59:59.999Z'
    },
    body () {
      return <Chart metrics={this.metrics} settings={this.settings} />
    }
  }
]
