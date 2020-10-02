import React, { useMemo, useState } from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEX_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'

export const DEXs = [
  'Uniswap',
  'UniswapV2',
  'IDEX',
  'Balancer',
  '0x_v1',
  '0x_v2',
  '0x_v3',
  'Curve',
  'KyberNetwork',
  'OasisDEX',
  'dYdX',
  'Bancor',
  'Airswap',
  'TokenStore',
  'Etherdelta',
  'DDEX',
  'Gnosis',
  'DEX.Top'
]

const NumberOfTradesPerDex = ({ metrics, measurement }) => {
  const [rootMetric, setRootMetric] = useState(metrics[0])

  const dexMetrics = useMemo(
    () => {
      const measurementSlug = measurement.slug.replace(/-/g, '_')
      return DEXs.map(dex => {
        return {
          key: `${rootMetric.key}_${measurementSlug}_${dex.replace('.', '_')}`,
          queryKey: rootMetric.key,
          node: 'bar',
          label: dex,
          fill: true,
          domainGroup: 'decentralized_exchanges',
          reqMeta: {
            owner: dex,
            slug: measurement.slug
          }
        }
      })
    },
    [rootMetric, measurement]
  )

  return (
    <DashboardMetricChart
      metrics={dexMetrics}
      metricSelectors={metrics}
      setRootMetric={setRootMetric}
      rootMetric={rootMetric}
      intervals={DEX_INTERVAL_SELECTORS}
    />
  )
}

export default NumberOfTradesPerDex
