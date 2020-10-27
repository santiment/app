import React from 'react'
import { useMetric } from '../../GetTimeSeries/queries/get_metric'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { BTC_RELATED_SELECTOR } from './utils'

const TotalBtcCard = ({ settings }) => {
  const { data, loading } = useMetric(
    { ...settings, selector: BTC_RELATED_SELECTOR, aggregation: 'SUM' },
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
