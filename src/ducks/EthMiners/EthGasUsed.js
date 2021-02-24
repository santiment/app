import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_3_MONTHS
} from '../../components/DashboardMetricChart/utils'
import React from 'react'

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
    key: `avg_gas_used`,
    label: 'Gas Used',
    node: 'area',
    reqMeta: {
      slug: 'ethereum'
    }
  }
]

const EthGasUsed = () => {
  return (
    <DashboardMetricChart
      intervals={DEFAULT_INTERVAL_SELECTORS}
      metrics={METRICS}
      defaultInterval={INTERVAL_3_MONTHS}
    />
  )
}

export default EthGasUsed
