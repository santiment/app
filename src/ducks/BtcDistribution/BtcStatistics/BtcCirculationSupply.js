import React from 'react'
import { useAggregatedMetric } from '../hooks'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { percentageFormatter } from '../../dataHub/metrics/formatters'
import { BTC_RELATED_ASSETS } from '../DistributionBtcOnEth/DistributionBtcOnEth'

const SELECTOR = {
  slug: 'bitcoin'
}
const ALL_SELECTOR = {
  slugs: BTC_RELATED_ASSETS
}

const BtcCirculationSupply = ({ settings }) => {
  const { data: totalData, loading: totalLoading } = useAggregatedMetric(
    { ...settings, selector: ALL_SELECTOR },
    'total_supply'
  )

  const { data: btcData, loading: btcLoading } = useAggregatedMetric(
    { ...settings, selector: SELECTOR },
    'total_supply'
  )

  console.log(totalData, btcData, btcData / totalData)

  return (
    <DashboardCounter
      value={btcData / totalData}
      formatter={percentageFormatter}
      loadings={btcLoading || totalLoading}
      title="Percent of Bitcoin\'s Circulating Supply"
    />
  )
}

export default BtcCirculationSupply
