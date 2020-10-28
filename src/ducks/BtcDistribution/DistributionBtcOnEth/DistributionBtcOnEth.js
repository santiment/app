import React from 'react'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../components/DashboardMetricChart/DashboardMetricChart'
import {
  DEFAULT_INTERVAL_SELECTORS,
  INTERVAL_6_MONTHS
} from '../../../components/DashboardMetricChart/utils'
import { Metric } from '../../dataHub/metrics'

function makeMetric (slug) {
  return {
    key: `total_supply_${slug.replace('-', '_')}`,
    queryKey: 'total_supply',
    label: slug,
    node: 'area',
    domainGroup: 'btc_locked',
    reqMeta: {
      slugs: [slug]
    }
  }
}

export const BTC_RELATED_ASSETS = [
  'wrapped-bitcoin',
  'renbtc',
  'imBTC',
  'sBTC',
  'tBTC',
  'hBTC',
  'pBTC'
]

export const BTC_SUPPORTED_METRICS = [
  ...BTC_RELATED_ASSETS.map(makeMetric),
  {
    ...Metric.price_usd,
    label: 'Price ETH',
    reqMeta: {
      slug: 'ethereum',
      interval: '1d'
    }
  }
]

const DistributionBtcOnEth = () => (
  <DashboardMetricChart
    metrics={BTC_SUPPORTED_METRICS}
    intervals={DEFAULT_INTERVAL_SELECTORS}
    defaultInterval={INTERVAL_6_MONTHS}
  />
)

export default DistributionBtcOnEth
