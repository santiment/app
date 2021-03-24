import React, { useCallback } from 'react'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_3_MONTHS
} from '../../../components/DashboardMetricChart/utils'
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart'

const DEXs = [
  'Balancer',
  'KyberNetwork',

  'UniswapV2',

  'Sushiswap',

  '0x_v1',
  '0x_v2'
]

const BUILDER = ({ metric, slug }) => {
  const measurementSlug = slug.replace(/-/g, '_')
  return DEXs.map(dex => {
    return {
      key: `${metric}_${measurementSlug}_${dex.replace('.', '_')}`,
      queryKey: metric,
      node: 'bar',
      fill: true,
      label: dex,
      domainGroup: 'decentralized_exchanges',
      reqMeta: {
        owner: dex,
        label: 'decentralized_exchange',
        slug
      }
    }
  })
}

const VolumeOfEthTrades = ({ metric }) => {
  const metricsBuilder = useCallback(({ slug }) => BUILDER({ metric, slug }), [
    metric
  ])

  return (
    <DashboardProjectChart
      intervals={DEFAULT_INTERVAL_SELECTORS}
      defaultInterval={INTERVAL_3_MONTHS}
      metricsBuilder={metricsBuilder}
      type={'ERC20'}
    />
  )
}

export default VolumeOfEthTrades
