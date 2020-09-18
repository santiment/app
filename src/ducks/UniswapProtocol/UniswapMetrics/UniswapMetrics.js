import React from 'react'
import UniswapMetric from './UniswapMetric'
import styles from './UniswapMetrics.module.scss'

const UniswapMetricsList = [
  {
    human_readable_name: 'UNI Total  Claimed',
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
    human_readable_name: 'UNI Total  Claimed for Users',
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
    human_readable_name: 'UNI Total Claimed for Liquidity Providers',
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
    human_readable_name: 'Uniswap Percent Claimed',
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
    data_type: 'timeseries'
  }
]

const metrics = UniswapMetricsList.map(item => ({ ...item, key: item.name }))

const UniswapMetrics = () => {
  return (
    <div className={styles.container}>
      {metrics.map(m => {
        return <UniswapMetric key={m.key} metric={m} />
      })}
    </div>
  )
}

export default UniswapMetrics
