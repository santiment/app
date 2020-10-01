import React, { useMemo } from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEX_INTERVAL_SELECTORS,
  makeMetric
} from '../../../components/DashboardMetricChart/utils'
import { mapDEXMetrics } from '../DexTradesSegmentedByDEX/DexTradesSegmentedByDEX'

export const DEX_AMOUNT_METRICS = [
  makeMetric('total_trade_amount_by_dex', 'Total Trade Amount'),
  makeMetric('eth_based_trade_amount_by_dex', 'ETH Based Tokens'),
  makeMetric('stablecoin_trade_amount_by_dex', 'Stablecoins'),
  makeMetric('other_trade_amount_by_dex', 'Other')
]

const DexTradesTotalNumber = ({ measurement }) => {
  const metrics = useMemo(
    () => {
      return mapDEXMetrics(DEX_AMOUNT_METRICS, measurement)
    },
    [measurement]
  )

  return (
    <DashboardMetricChart
      metrics={metrics}
      intervals={DEX_INTERVAL_SELECTORS}
    />
  )
}

export default DexTradesTotalNumber
