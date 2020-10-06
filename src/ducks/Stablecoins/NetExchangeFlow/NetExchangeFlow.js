import React, { useMemo } from 'react'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { DEFAULT_INTERVAL_SELECTORS } from '../../../components/DashboardMetricChart/utils'
import { Metric } from '../../dataHub/metrics'

const NetExchangeFlow = ({}) => {
  const metrics = useMemo(() => {
    return [
      {
        ...Metric.exchange_inflow,
        reqMeta: { market_segments: 'Stablecoin USD' },
        domainGroup: 'stablecoins'
      },
      {
        ...Metric.exchange_outflow,
        reqMeta: { market_segments: 'Stablecoin USD' },
        domainGroup: 'stablecoins'
      }
    ]
  }, [])

  return (
    <DashboardMetricChart
      metrics={metrics}
      intervals={DEFAULT_INTERVAL_SELECTORS}
    />
  )
}

export default NetExchangeFlow
