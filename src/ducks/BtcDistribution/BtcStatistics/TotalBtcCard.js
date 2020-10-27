import React from 'react'
import { useAggregatedMetric } from '../hooks'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { BTC_RELATED_SELECTOR } from './utils'

const TotalBtcCard = ({ settings }) => {
  const { data, loading } = useAggregatedMetric(
    { ...settings, selector: BTC_RELATED_SELECTOR },
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
