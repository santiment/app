import React from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'

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
    key: 'dex_' + dex.replace('.', '_'),
    queryKey: 'total_trade_amount_by_dex',
    node: 'bar',
    label: dex,
    fill: true,
    domainGroup: 'decentralized_exchanges',
    reqMeta: {
      owner: dex,
      slug: 'multi-collateral-dai'
    }
  }
})

const NumberOfTradesPerDex = () => {
  return <DashboardMetricChart metrics={DEX_METRICS} />
}

export default NumberOfTradesPerDex
