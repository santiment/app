import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'
import { useEthPieChart } from '../utils'

const ETH2_STAKED_PER_LABEL_QUERY = gql`
  query {
    getMetric(metric: "eth2_staked_amount_per_label") {
      histogramData(
        selector: { slug: "ethereum" }
        from: "utc_now-70d"
        to: "utc_now"
      ) {
        values {
          __typename
          ... on StringLabelFloatValueList {
            data {
              label
              value
            }
          }
        }
      }
    }
  }
`

const EthStakedAmountByLabel = () => {
  const { data, loading } = useEthPieChart(ETH2_STAKED_PER_LABEL_QUERY)

  return <DashPieChart rawData={data} loading={loading} />
}

export default EthStakedAmountByLabel
