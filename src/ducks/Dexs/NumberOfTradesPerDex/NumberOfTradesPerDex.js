import React, { useMemo, useState } from 'react'
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

const NumberOfTradesPerDex = ({ metrics }) => {
  const [rootMetric, setRootMetric] = useState(metrics[0])

  const dexMetrics = useMemo(
    () => {
      return DEXs.map(dex => {
        return {
          key: rootMetric.key + '_' + dex.replace('.', '_'),
          queryKey: rootMetric.key,
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
    [rootMetric]
  )

  return (
    <DashboardMetricChart
      metrics={dexMetrics}
      metricSelectors={metrics}
      setRootMetric={setRootMetric}
      rootMetric={rootMetric}
    />
  )
}

export default NumberOfTradesPerDex
