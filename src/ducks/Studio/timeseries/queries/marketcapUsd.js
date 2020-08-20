import gql from 'graphql-tag'

export const MARKETCAP_USD_QUERY = gql`
  query getMetric(
    $from: DateTime!
    $to: DateTime!
    $slug: String
    $interval: interval
    $market_segments: [String]
    $ignored_slugs: [String]
  ) {
    getMetric(metric: "marketcap_usd") {
      timeseriesData(
        selector: {
          slug: $slug
          market_segments: $market_segments
          ignored_slugs: $ignored_slugs
        }
        from: $from
        to: $to
        interval: $interval
      ) {
        datetime
        marketcap_usd: value
      }
    }
  }
`
