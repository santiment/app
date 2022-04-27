import React from 'react'
import { AGGREGATION_TYPES, useMetric } from '../get_metric'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { BTC_RELATED_SELECTOR } from './utils'

const TotalBtcCard = ({ settings }) => {
  const { data, loading } = useMetric(
    {
      ...settings,
      selector: BTC_RELATED_SELECTOR,
      aggregation: AGGREGATION_TYPES.SUM,
    },
    'total_supply',
  )

  return (
    <DashboardCounter value={data} loadings={loading} title='Bitcoin on Ethereum Total Supply' />
  )
}

export default TotalBtcCard
