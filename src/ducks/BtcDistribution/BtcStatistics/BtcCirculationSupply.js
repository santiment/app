import React from 'react'
import { useAggregatedMetric } from '../hooks'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { percentageFormatter } from '../../dataHub/metrics/formatters'
import { Metric } from '../../dataHub/metrics'
import { BTC_RELATED_SELECTOR, BTC_SELECTOR } from './utils'

const BtcCirculationSupply = ({ settings }) => {
  const { data: totalData, loading: totalLoading } = useAggregatedMetric(
    { ...settings, selector: BTC_RELATED_SELECTOR },
    'total_supply'
  )

  const { data: btcData, loading: btcLoading } = useAggregatedMetric(
    { ...settings, selector: BTC_SELECTOR, aggregation: 'MAX' },
    Metric.circulation.key
  )

  const percent = (100 * btcData) / totalData

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
