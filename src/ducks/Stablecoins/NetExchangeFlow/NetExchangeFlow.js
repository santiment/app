import React from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'
import { Metric } from '../../dataHub/metrics'

const METRICS = [
  {
    ...Metric.exchange_inflow,
    reqMeta: { market_segments: 'Stablecoin USD' },
    domainGroup: 'stablecoins'
  },
  {
    ...Metric.exchange_outflow,
    reqMeta: { market_segments: 'Stablecoin USD' },
    domainGroup: 'stablecoins'
  }
]

const NetExchangeFlow = () => (
  <DashboardMetricChart
    metrics={METRICS}
    intervals={DEFAULT_INTERVAL_SELECTORS}
  />
)

export default NetExchangeFlow
