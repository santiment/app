import React from 'react'
import { useAggregatedMetric } from '../hooks'
import { BTC_RELATED_ASSETS } from '../DistributionBtcOnEth/DistributionBtcOnEth'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'

const SELECTOR = {
  slugs: BTC_RELATED_ASSETS
}

const TotalBtcCard = ({ settings }) => {
  const { data, loading } = useAggregatedMetric(
    { ...settings, selector: SELECTOR },
    'total_supply'
  )

  return (
    <DashboardCounter
      value={data}
      loadings={loading}
      title='Bitcoin on Ethereum total supply'
    />
  )
}

export default TotalBtcCard
