import React, { useState, useCallback } from 'react'
import { DEX_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'
import { useDexMeasurement } from '../PriceMeasurement/DexPriceMeasurement'
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart'
import { Metric } from '../../dataHub/metrics'

export const DEXs = [
  'UniswapV2',
  'Sushiswap',
  'Balancer',
  'dYdX',
  '0x_v2',
  'Curve',
  '0x_v3',
  'KyberNetwork',
  'Uniswap',
  'Etherdelta',
  'Bancor',
  'Airswap',
  'Gnosis',
  'OasisDEX',
  'IDEX',
  'DDEX',
  '0x_v1',
  'TokenStore',
  'DEX.Top',
  'Synthetix'
]

const NumberOfTradesPerDex = ({ metrics, measurement: strictMeasurement }) => {
  const { measurement, setMeasurement } = useDexMeasurement(strictMeasurement)
  const [rootMetric, setRootMetric] = useState(metrics[0])

  const metricsBuilder = useCallback(
    ({ slug }) => {
      const measurementSlug = measurement.slug.replace(/-/g, '_')

      const result = DEXs.map(dex => {
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

      if (slug) {
        result.push({
          ...Metric.price_usd,
          label: `Price ${slug}`,
          reqMeta: { slug: slug }
        })
      }

      return result
    },
    [rootMetric, measurement]
  )

  return (
    <DashboardProjectChart
      metricsBuilder={metricsBuilder}
      metricSelectors={metrics}
      setRootMetric={setRootMetric}
      rootMetric={rootMetric}
      intervals={DEX_INTERVAL_SELECTORS}
      setMeasurement={strictMeasurement ? null : setMeasurement}
      measurement={measurement}
      canvasSettings={{
        height: 500
      }}
    />
  )
}

export default NumberOfTradesPerDex
