export const QUERY = `query getMetric($metric: String!, $from: DateTime!, $to: DateTime!) {
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
}`;