import React from 'react'
import {
  DEX_INTERVAL_SELECTORS,
  makeMetric
} from '../../../components/DashboardMetricChart/utils'
import { DEX_VOLUME_METRICS } from '../DexTradesSegmentedByDEX/DexTradesSegmentedByDEX'
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart'
import { DEFAULT_DEX_PROJECT, useProjectMetricBuilder } from '../utils'

export const DEX_AMOUNT_METRICS = [
  makeMetric('total_trade_amount_by_dex', 'Total Trade Amount'),
  makeMetric('eth_based_trade_amount_by_dex', 'ETH Based Tokens'),
  makeMetric('stablecoin_trade_amount_by_dex', 'Stablecoins'),
  makeMetric('other_trade_amount_by_dex', 'Other')
]

const DexTradesTotalNumber = ({ measurement }) => {
  const metricsBuilder = useProjectMetricBuilder({
    measurement,
    baseMetrics: DEX_VOLUME_METRICS
  })

  return (
    <DashboardProjectChart
      project={DEFAULT_DEX_PROJECT}
      metricsBuilder={metricsBuilder}
      intervals={DEX_INTERVAL_SELECTORS}
    />
  )
}

export default DexTradesTotalNumber
