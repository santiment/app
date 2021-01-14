import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'
import { useEthPieChart } from '../utils'

const ETH2_UNLABELED_STAKER_INFLOW_QUERY = gql`
  query {
    getMetric(metric: "eth2_unlabeled_staker_inflow_sources") {
      histogramData(
        selector: { slug: "ethereum" }
        from: "utc_now-70d"
        to: "utc_now"
      ) {
        values {
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

const EthUnlabeledStackerInflow = () => {
  const { data, loading } = useEthPieChart(ETH2_UNLABELED_STAKER_INFLOW_QUERY)

  return <DashPieChart rawData={data} loading={loading} />
}

export default EthUnlabeledStackerInflow
