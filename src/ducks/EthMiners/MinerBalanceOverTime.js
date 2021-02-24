import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_3_MONTHS
} from '../../components/DashboardMetricChart/utils'
import React from 'react'
import { Metric } from '../dataHub/metrics'

const METRICS = [
  {
    key: `price_usd`,
    label: 'ETH Price',
    node: 'area',
    reqMeta: {
      slug: 'ethereum'
    }
  },
  {
    ...Metric.miners_balance,
    reqMeta: {
      slug: 'ethereum'
    }
  }
]

const MinerBalanceOverTime = () => {
  return (
    <DashboardMetricChart
      intervals={DEFAULT_INTERVAL_SELECTORS}
      metrics={METRICS}
      defaultInterval={INTERVAL_3_MONTHS}
    />
  )
}

export default MinerBalanceOverTime
