import React, { useCallback, useEffect, useState } from 'react'
import { query } from 'webkit/api'
import Header from '../Header/Header'
import { Block } from '../../../StablecoinsPage/StablecoinsPageStructure'
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools'
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport'
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../../../../components/DashboardMetricChart/DashboardMetricChart'
import dashboardsStyles from '../dashboards.module.scss'

const QUERY = `query getMetric($metric: String!, $from: DateTime!, $to: DateTime!) {
getMetric(metric:$metric) {
    histogramData(selector: {slug: "ethereum"}, from: $from, to: $to, interval: "1d", limit: 10) {
      values {
        ... on Eth2StakingPoolsValidatorsCountOverTimeList {
          data {
            d:datetime
            v:value {
              s:stakingPool
              v:valuation
            }
          }
        }
      }
    }
  }
}`

const metricsMapper = (key) => ({
  key,
  label: key,
  node: 'line',
  domainGroup: 'eth2',
})

const DistributionBtcOnEth = ({ metric }) => {
  const [metrics, setMetrics] = useState([])

  const useMetricsData = useCallback((_metrics, settings) => {
    const [data, setData] = useState([])
    const [loadings, setLoadings] = useState([{}])
    const { from, to } = settings

    useEffect(() => {
      const assets = new Set()

      query(QUERY, {
        variables: { metric, from, to },
      })
        .then(({ getMetric }) => getMetric.histogramData.values.data)
        .then((data) =>
          data.map(({ d, v }) => {
            const item = { datetime: Date.parse(d) }
            v.forEach(({ s, v }) => {
              if (assets.size < 10) assets.add(s)
              item[s] = v
            })
            setMetrics([...assets].map(metricsMapper))
            return item
          }),
        )
        .then((data) => {
          setData(data)
          setLoadings([])
        })
    }, [from, to])

    return [data, loadings]
  }, [])

  return (
    <DashboardMetricChart
      noBrush
      noIntervals
      isSharedAxisDefault
      metrics={metrics}
      useMetricsData={useMetricsData}
    />
  )
}

const EthStakingPoolsPage = ({ submenu, shareLinkText, description }) => (
  <div className='column fluid'>
    <Header shareLinkText={shareLinkText} description={description} />
    <div className={dashboardsStyles.content}>
      <Block className={dashboardsStyles.firstBlock} title={submenu[0].title} tag={submenu[0].key}>
        <EthStakingPools />
      </Block>
      <Block title={submenu[1].title} tag={submenu[1].key}>
        <EthStakingPools metric='eth2_staking_pools_usd' />
      </Block>

      <Block title={submenu[2].title} tag={submenu[2].key}>
        <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time' />
      </Block>

      <Block title={submenu[3].title} tag={submenu[3].key}>
        <DistributionBtcOnEth metric='eth2_staking_pools_validators_count_over_time_delta' />
      </Block>
    </div>
  </div>
)

export default withRenderQueueProvider(EthStakingPoolsPage)
