import React from 'react'
import { AGGREGATION_TYPES, useMetric } from '../get_metric'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { percentageFormatter } from '../../dataHub/metrics/formatters'
import { Metric } from '../../dataHub/metrics'
import { BTC_RELATED_SELECTOR, BTC_SELECTOR } from './utils'

const BtcCirculationSupply = ({ settings }) => {
  const { data: btcAssetsData, loading: totalLoading } = useMetric(
    {
      ...settings,
      selector: BTC_RELATED_SELECTOR,
      aggregation: AGGREGATION_TYPES.SUM
    },
    'total_supply'
  )

  const { data: totalData, loading: btcLoading } = useMetric(
    { ...settings, selector: BTC_SELECTOR, aggregation: AGGREGATION_TYPES.MAX },
    Metric.circulation.key
  )

  const percent = (100 * btcAssetsData) / totalData

  return (
    <DashboardCounter
      value={percent}
      formatter={percentageFormatter}
      loadings={btcLoading || totalLoading}
      title="Percent of Bitcoin's Circulating Supply"
    />
  )
}

export default BtcCirculationSupply
