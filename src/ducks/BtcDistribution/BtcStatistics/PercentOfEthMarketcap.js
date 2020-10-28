import React from 'react'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { percentageFormatter } from '../../dataHub/metrics/formatters'
import { BTC_RELATED_SELECTOR, BTC_SELECTOR, ETH_SELECTOR } from './utils'
import {
  AGGREGATION_TYPES,
  useMetric
} from '../../GetTimeSeries/queries/get_metric'

const PercentOfEthMarketcap = ({ settings }) => {
  const { data: totalData, loading: totalLoading } = useMetric(
    {
      ...settings,
      selector: BTC_RELATED_SELECTOR,
      aggregation: AGGREGATION_TYPES.SUM
    },
    'total_supply'
  )
  const { data: avgPriceData, loading: avgPriceLoading } = useMetric(
    {
      ...settings,
      selector: BTC_SELECTOR,
      aggregation: AGGREGATION_TYPES.LAST
    },
    'daily_avg_price_usd'
  )
  const { data: marketCapData, loading: marketCapLoading } = useMetric(
    {
      ...settings,
      selector: ETH_SELECTOR,
      aggregation: AGGREGATION_TYPES.LAST
    },
    'daily_avg_marketcap_usd'
  )

  const percent = (100 * avgPriceData * totalData) / marketCapData

  return (
    <DashboardCounter
      value={percent}
      loadings={totalLoading || marketCapLoading || avgPriceLoading}
      formatter={percentageFormatter}
      title="Percent of Ethereum's Market Cap"
    />
  )
}

export default PercentOfEthMarketcap
