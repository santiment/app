import React from 'react'
import Chart from '../Chart'
import styles from '../index.module.scss'

const TOTAL_CLAIMED_METRIC = {
  key: 'uniswap_claims_count',
  label: 'Uniswap Total Claimed',
  node: 'line'
}

const metrics = [TOTAL_CLAIMED_METRIC]

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
