import gql from 'graphql-tag'

export const HISTOGRAM_DATA_QUERY = gql`
  query getMetric($slug: String!, $from: DateTime!, $to: DateTime!) {
    histogramQuery: getMetric(metric: "price_histogram") {
      histogramData(slug: $slug, from: $from, to: $to, limit: 10) {
        values {
          __typename
          ... on FloatRangeFloatValueList {
            data {
              range
              value
            }
          }
        }
      }
    }

    priceQuery: getMetric(metric: "price_usd") {
      price: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: LAST
      )
    }
  }
`

export const HISTOGRAM_USER_PERIOD_RESTRICTIONS_QUERY = gql`
  query getMetric {
    getMetric(metric: "price_histogram") {
      metadata {
        restrictedFrom
        restrictedTo
      }
    }
  }
`
