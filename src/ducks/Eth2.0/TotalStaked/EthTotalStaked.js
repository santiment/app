import React from 'react'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_3_MONTHS,
} from '../../../components/DashboardMetricChart/utils'

const METRICS = [
  {
    key: `balance_per_owner`,
    label: 'Total Staked',
    node: 'area',
    reqMeta: {
      slug: 'ethereum',
      label: 'eth2stakingcontract',
    },
  },
  {
    key: `eth2_stakers_count`,
    label: 'Staker Addresses',
    node: 'area',
    reqMeta: {
      slug: 'ethereum',
    },
  },
]

const EthTotalStaked = () => {
  return (
    <DashboardMetricChart
      intervals={DEFAULT_INTERVAL_SELECTORS}
      metrics={METRICS}
      defaultInterval={INTERVAL_3_MONTHS}
    />
  )
}

export default EthTotalStaked
