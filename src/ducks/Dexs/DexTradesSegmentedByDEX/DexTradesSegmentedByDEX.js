import React from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { makeMetric } from '../../../components/DashboardMetricChart/utils'

export const DEX_VOLUME_METRICS = [
  makeMetric('total_trade_volume_by_dex', 'Total Trade Volume'),
  makeMetric('eth_based_trade_volume_by_dex', 'ETH Based Tokens'),
  makeMetric('stablecoin_trade_volume_by_dex', 'Stable coins'),
  makeMetric('other_trade_volume_by_dex', 'Other')
]

const DEX_METRICS = DEX_VOLUME_METRICS.map(({ key, label }) => {
  return {
    key,
    queryKey: key,
    label,
    node: 'bar',
    fill: true,
    domainGroup: 'decentralized_exchanges',
    reqMeta: { slug: 'multi-collateral-dai' }
  }
})

const DexTradesSegmentedByDEX = () => {
  return <DashboardMetricChart metrics={DEX_METRICS} />
}

export default DexTradesSegmentedByDEX
