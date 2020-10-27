import React from 'react'
import { useAggregatedMetric } from '../hooks'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import { percentageFormatter } from '../../dataHub/metrics/formatters'
import { BTC_RELATED_SELECTOR, BTC_SELECTOR, ETH_SELECTOR } from './utils'

const PercentOfEthMarketcap = ({ settings }) => {
  const { data: totalData, loading: totalLoading } = useAggregatedMetric(
    { ...settings, selector: BTC_RELATED_SELECTOR },
    'total_supply'
  )
  const { data: avgPriceData, loading: avgPriceLoading } = useAggregatedMetric(
    { ...settings, selector: BTC_SELECTOR, aggregation: 'LAST' },
    'daily_avg_price_usd'
  )
  const {
    data: marketCapData,
    loading: marketCapLoading
  } = useAggregatedMetric(
    { ...settings, selector: ETH_SELECTOR, aggregation: 'LAST' },
    'daily_avg_marketcap_usd'
  )

  console.log(marketCapData, avgPriceData)

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
