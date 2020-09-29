import React from 'react'
import DashboardMetricChart, {
  INTERVAL_30_DAYS
} from '../../../components/DashboardMetricChart/DashboardMetricChart'

const METRICS = [
  'total_trade_volume_by_dex',
  'eth_based_trade_volume_by_dex',
  'stablecoin_trade_volume_by_dex',
  'other_trade_volume_by_dex'
]

const DEX_METRICS = METRICS.map(metric => {
  return {
    key: metric,
    queryKey: metric,
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
