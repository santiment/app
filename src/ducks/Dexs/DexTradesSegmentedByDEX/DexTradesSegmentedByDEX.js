import React from 'react'
import DashboardMetricChart, {
  INTERVAL_30_DAYS,
  makeMetric
} from '../../../components/DashboardMetricChart/DashboardMetricChart'

const METRICS = [
  makeMetric('total_trade_volume_by_dex', 'Total Trade Volume'),
  makeMetric('eth_based_trade_volume_by_dex', 'ETH Based Tokens'),
  makeMetric('stablecoin_trade_volume_by_dex', 'Stable coins'),
  makeMetric('other_trade_volume_by_dex', 'Other')
]

const DEX_METRICS = METRICS.map(({ key, label }) => {
  return {
    key,
    queryKey: key,
    label,
    node: 'bar',
    fill: true,
    reqMeta: {
      selector: { slug: 'multi-collateral-dai' }
    }
  }
})

const DEFAULT_SETTINGS = {
  ...INTERVAL_30_DAYS.requestParams
}

const DexTradesSegmentedByDEX = () => {
  return (
    <DashboardMetricChart
      metrics={DEX_METRICS}
      defaultSettings={DEFAULT_SETTINGS}
    />
  )
}

export default DexTradesSegmentedByDEX
