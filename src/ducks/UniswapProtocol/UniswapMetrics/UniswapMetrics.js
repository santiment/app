import React from 'react'
import UniswapMetric from './UniswapMetric'
import styles from './UniswapMetrics.module.scss'
import { percentageFormatter } from '../../dataHub/metrics/formatters'

const UniswapMetricsList = [
  {
    human_readable_name: 'Total UNI claimed',
    name: 'uniswap_total_claims_amount',
    metric: 'uniswap_amount_claimed',
    version: '2019-12-22',
    access: 'restricted',
    selectors: ['slug'],
    min_plan: {
      SANAPI: 'pro',
      SANBASE: 'free'
    },
    aggregation: 'last',
    min_interval: '1h',
    table: 'intraday_metrics',
    has_incomplete_data: false,
    data_type: 'timeseries'
  },
  {
    human_readable_name: 'Total UNI claimed by historical users',
    name: 'uniswap_total_user_claims_amount',
    metric: 'uniswap_amount_user_claimed',
    version: '2019-12-22',
    access: 'restricted',
    selectors: ['slug'],
    min_plan: {
      SANAPI: 'pro',
      SANBASE: 'free'
    },
    aggregation: 'last',
    min_interval: '1h',
    table: 'intraday_metrics',
    has_incomplete_data: false,
    data_type: 'timeseries'
  },
  {
    human_readable_name: 'Total UNI claimed by liquidity providers',
    name: 'uniswap_total_lp_claims_amount',
    metric: 'uniswap_amount_lp_claimed',
    version: '2019-12-22',
    access: 'restricted',
    selectors: ['slug'],
    min_plan: {
      SANAPI: 'pro',
      SANBASE: 'free'
    },
    aggregation: 'last',
    min_interval: '1h',
    table: 'intraday_metrics',
    has_incomplete_data: false,
    data_type: 'timeseries'
  },
  {
    human_readable_name: 'Percent of UNI claimed',
    name: 'uniswap_total_claims_percent',
    metric: 'uniswap_percent_claimed',
    version: '2019-12-22',
    access: 'restricted',
    selectors: ['slug'],
    min_plan: {
      SANAPI: 'pro',
      SANBASE: 'free'
    },
    aggregation: 'last',
    min_interval: '5m',
    table: 'intraday_metrics',
    has_incomplete_data: false,
    data_type: 'timeseries',
    formatter: percentageFormatter
  }
]

const metrics = UniswapMetricsList.map(item => ({ ...item, key: item.name }))

const UniswapMetrics = () => (
  <div className={styles.container}>
    {metrics.map(m => {
      return <UniswapMetric key={m.key} metric={m} slug='uniswap' />
    })}
  </div>
)

export default UniswapMetrics
