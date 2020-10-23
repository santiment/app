import React from 'react'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'

function makeMetric (slug) {
  return {
    key: 'total_supply',
    label: slug,
    reqMeta: {
      slug
    }
  }
}

const SUPPORTED_METRICS = [
  makeMetric('imBTC'),
  makeMetric('sBTC'),
  makeMetric('tBTC'),
  makeMetric('hBTC'),
  makeMetric('pBTC'),
  makeMetric('wrapped-bitcoin'),
  makeMetric('renbtc')
]

const METRICS = SUPPORTED_METRICS.map(m => ({
  ...m,
  node: 'area'
}))

const DistributionBtcOnEth = () => {
  return (
    <DashboardMetricChart
      metrics={METRICS}
      intervals={DEFAULT_INTERVAL_SELECTORS}
    />
  )
}

export default DistributionBtcOnEth
