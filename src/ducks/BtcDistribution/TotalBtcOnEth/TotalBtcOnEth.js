import React from 'react'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'
import { BTC_METRICS } from '../DistributionBtcOnEth/DistributionBtcOnEth'
import { Metric } from '../../dataHub/metrics'

const METRICS = [
  {
    key: `total_supply`,
    label: 'Total supply',
    node: 'area',
    domainGroup: 'btc_locked',
    reqMeta: {
      slugs: BTC_METRICS
    }
  },
  {
    ...Metric.price_usd,
    label: 'Price ETH',
    reqMeta: {
      slug: 'ethereum',
      interval: '1d'
    }
  }
]

const TotalBtcOnEth = () => (
  <DashboardMetricChart
    metrics={METRICS}
    intervals={DEFAULT_INTERVAL_SELECTORS}
  />
)

export default TotalBtcOnEth
