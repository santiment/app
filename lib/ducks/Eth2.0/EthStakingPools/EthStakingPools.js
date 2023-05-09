import React from 'react';
import gql from 'graphql-tag';
import DashPieChart from '../../../components/DashPieChart/DashPieChart';
const ETH_STAKING_POOLS_QUERY = gql`
  query getMetric($from: DateTime!, $metric: String = "eth2_staking_pools") {
    getMetric(metric: $metric) {
      histogramData(selector: { slug: "ethereum" }, from: $from, to: "utc_now", limit: 10) {
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
`;

const EthStakingPools = ({
  metric
}) => /*#__PURE__*/React.createElement(DashPieChart, {
  query: ETH_STAKING_POOLS_QUERY,
  metric: metric
});

export default EthStakingPools;