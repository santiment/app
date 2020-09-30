import React, { useMemo } from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'

export const DEXs = [
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

const NumberOfTradesPerDex = ({ metric }) => {
  const DEX_METRICS = useMemo(
    () => {
      return DEXs.map(dex => {
        return {
          key: 'dex_' + dex.replace('.', '_'),
          queryKey: metric,
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
    },
    [metric]
  )

  return <DashboardMetricChart metrics={DEX_METRICS} />
}

export default NumberOfTradesPerDex
