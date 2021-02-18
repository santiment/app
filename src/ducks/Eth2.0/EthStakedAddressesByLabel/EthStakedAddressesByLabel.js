import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'

const ETH2_STAKED_ADDRESSES_PER_LABEL_QUERY = gql`
  query getMetric($from: DateTime!) {
    getMetric(metric: "eth2_staked_address_count_per_label") {
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

const EthStakedAddressesByLabel = () => (
  <DashPieChart query={ETH2_STAKED_ADDRESSES_PER_LABEL_QUERY} />
)

export default EthStakedAddressesByLabel
