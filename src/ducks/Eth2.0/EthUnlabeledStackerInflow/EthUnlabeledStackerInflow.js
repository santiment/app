import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'

const ETH2_UNLABELED_STAKER_INFLOW_QUERY = gql`
  query getMetric($from: DateTime!) {
    getMetric(metric: "eth2_unlabeled_staker_inflow_sources") {
      histogramData(
        selector: { slug: "ethereum" }
        from: $from
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

const EthUnlabeledStackerInflow = () => (
  <DashPieChart query={ETH2_UNLABELED_STAKER_INFLOW_QUERY} />
)

export default EthUnlabeledStackerInflow
