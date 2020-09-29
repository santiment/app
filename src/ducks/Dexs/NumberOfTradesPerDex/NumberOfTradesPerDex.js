import React from 'react'
import DashboardMetricChart, {
  INTERVAL_30_DAYS
} from '../../../components/DashboardMetricChart/DashboardMetricChart'

const DEXs = [
  '0x',
  'Airswap',
  'Etherdelta',
  'Balancer',
  'Bancor',
  'Curve',
  'DDEX',
  'DEX.Top',
  'Gnosis',
  'IDEX',
  'KyberNetwork',
  'OasisDEX',
  'TokenStore',
  'Uniswap',
  'dYdX'
]

const DEX_METRICS = DEXs.map(dex => {
  return {
    key: 'total_trade_amount_by_dex',
    queryKey: 'total_trade_amount_by_dex',
    node: 'bar',
    label: dex,
    fill: true,
    reqMeta: {
      selector: { slug: 'multi-collateral-dai', owner: dex }
    }
  }
})

const DEFAULT_SETTINGS = {
  ...INTERVAL_30_DAYS.requestParams
}

const NumberOfTradesPerDex = () => {
  return (
    <DashboardMetricChart
      metrics={DEX_METRICS}
      defaultSettings={DEFAULT_SETTINGS}
    />
  )
}

export default NumberOfTradesPerDex
