import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styles from './BtcStatistics.module.scss'

export const GET_AGGREGATED_METRIC = gql`
  query($metric: String!, $from: DateTime!, $to: DateTime!, $slug: String) {
    getMetric(metric: $metric) {
      aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: SUM
      )
    }
  }
`

const useAggregatedMetric = ({ from, to, slug }, metric) => {
  const { data = {}, loading } = useQuery(GET_AGGREGATED_METRIC, {
    variables: { from, to, metric }
  })

  return {
    data: data.getMetric ? data.getMetric.aggregatedTimeseriesData : [],
    loading
  }
}

const BtcStatistics = ({ settings }) => {
  return <div>Btc</div>
  /*
  const [ethData, loadingEth] = useAggregatedMetric({...settings, slug: 'ethereum'}, 'daily_avg_marketcap_usd')
  const [btcData, loadingBtc] = useAggregatedMetric({...settings, slug: 'bitcoin'}, 'daily_avg_marketcap_usd')

  return <div className={styles.container}>
    BTC
  </div> */
}

export default BtcStatistics
