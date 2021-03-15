import React from 'react'
import {
  DEX_INTERVAL_SELECTORS,
  makeMetric
} from '../../../components/DashboardMetricChart/utils'
import { useDexMeasurement } from '../PriceMeasurement/DexPriceMeasurement'
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart'
import { DEFAULT_DEX_PROJECT, useProjectMetricBuilder } from '../utils'

export const DEX_VOLUME_METRICS = [
  makeMetric('total_trade_volume_by_dex', 'Total Trade Volume'),
  makeMetric('eth_based_trade_volume_by_dex', 'ETH Based Tokens'),
  makeMetric('stablecoin_trade_volume_by_dex', 'Stablecoins'),
  makeMetric('other_trade_volume_by_dex', 'Other')
]

const DexTradesSegmentedByDEX = () => {
  const { measurement, setMeasurement } = useDexMeasurement()
  const metricsBuilder = useProjectMetricBuilder({
    measurement,
    baseMetrics: DEX_VOLUME_METRICS
  })

  return (
    <DashboardProjectChart
      project={DEFAULT_DEX_PROJECT}
      metricsBuilder={metricsBuilder}
      intervals={DEX_INTERVAL_SELECTORS}
      measurement={measurement}
      setMeasurement={setMeasurement}
    />
  )
}

export default DexTradesSegmentedByDEX
