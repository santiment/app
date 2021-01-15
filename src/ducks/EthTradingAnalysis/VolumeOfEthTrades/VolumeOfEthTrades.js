import React, { useMemo } from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_3_MONTHS
} from '../../../components/DashboardMetricChart/utils'
import { DEXs } from '../../Dexs/NumberOfTradesPerDex/NumberOfTradesPerDex'

const VolumeOfEthTrades = ({ measurement, metric }) => {
  const dexMetrics = useMemo(
    () => {
      const measurementSlug = measurement.slug.replace(/-/g, '_')
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
            slug: measurement.slug,
            label: 'decentralized_exchange'
          }
        }
      })
    },
    [measurement]
  )

  return (
    <DashboardMetricChart
      intervals={DEFAULT_INTERVAL_SELECTORS}
      metrics={dexMetrics}
      defaultInterval={INTERVAL_3_MONTHS}
    />
  )
}

export default VolumeOfEthTrades
