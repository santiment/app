import React from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'
import { Metric } from '../../dataHub/metrics'
import { GREEN, RED } from '../../Chart/colors'

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

const METRICS_COLOR = {
  [Metric.exchange_inflow.key]: GREEN,
  [Metric.exchange_outflow.key]: RED
}

const NetExchangeFlow = () => (
  <DashboardMetricChart
    metrics={METRICS}
    intervals={DEFAULT_INTERVAL_SELECTORS}
    metricsColor={METRICS_COLOR}
  />
)

export default NetExchangeFlow
