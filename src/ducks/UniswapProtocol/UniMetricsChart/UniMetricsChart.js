import React from 'react'
import { Metric } from '../../dataHub/metrics'
import DashboardMetricChart from '../../../components/DashboardMetricChart/DashboardMetricChart'
import { INTERVAL_30_DAYS } from '../../../components/DashboardMetricChart/utils'

const UNISWAP = 'uniswap'

export const SUPPORTED_METRICS = [
  {
    ...Metric.price_usd,
    reqMeta: {
      slug: UNISWAP
    }
  },
  {
    ...Metric.age_consumed,
    reqMeta: {
      slug: UNISWAP
    }
  },
  {
    ...Metric.active_addresses_24h,
    reqMeta: {
      slug: UNISWAP
    }
  }
]

const UniMetricsChart = () => (
  <DashboardMetricChart
    metrics={SUPPORTED_METRICS}
    defaultInterval={INTERVAL_30_DAYS}
  />
)

export default UniMetricsChart
