import React from 'react'
import gql from 'graphql-tag'
import DashPieChart from '../../../components/DashPieChart/DashPieChart'

const ETH_TOP_STAKERS_QUERY = gql`
  query getMetric($from: DateTime!) {
    getMetric(metric: "eth2_top_stakers") {
      histogramData(
        selector: { slug: "ethereum" }
        from: $from
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

const EthTopStakers = () => <DashPieChart query={ETH_TOP_STAKERS_QUERY} />

export default EthTopStakers
