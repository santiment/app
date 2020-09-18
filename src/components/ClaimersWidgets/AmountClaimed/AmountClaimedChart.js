import React from 'react'
import { DATA } from './data'
import Chart from '../Chart'
import styles from '../index.module.scss'

const TOTAL_CLAIMED_METRIC = {
  key: 'uniswap_total_claimed',
  label: 'Uniswap Total Claimed',
  node: 'line'
}

const metrics = [TOTAL_CLAIMED_METRIC]

const settings = {
  slug: 'uniswap',
  interval: '1h',
  from: '2020-09-15T00:00:00Z',
  to: '2020-09-20T00:00:00Z'
}

const eventsData = []

const axesMetricKeys = [TOTAL_CLAIMED_METRIC.key]
const MetricColor = {
  [TOTAL_CLAIMED_METRIC.key]: 'green'
}

const AmountClaimedChart = ({ className }) => {
  return (
    <Chart
      metrics={metrics}
      MetricColor={MetricColor}
      axesMetricKeys={axesMetricKeys}
    />
  )
}

export default AmountClaimedChart
