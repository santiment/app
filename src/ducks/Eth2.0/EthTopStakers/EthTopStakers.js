import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'
import { useEthPieChart } from '../utils'

const ETH_TOP_STAKERS_QUERY = gql`
  query {
    getMetric(metric: "eth2_top_stakers") {
      histogramData(
        selector: { slug: "ethereum" }
        from: "utc_now-70d"
        to: "utc_now"
        limit: 10
      ) {
        values {
          ... on StringAddressStringLabelFloatValueList {
            data {
              address
              label
              value
            }
          }
        }
      }
    }
  }
`

const EthTopStakers = () => {
  const { data, loading } = useEthPieChart(ETH_TOP_STAKERS_QUERY)

  return <DashPieChart rawData={data} loading={loading} />
}

export default EthTopStakers
