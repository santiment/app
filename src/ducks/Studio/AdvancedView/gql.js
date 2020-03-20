import gql from 'graphql-tag'

export const HISTOGRAM_DATA_QUERY = gql`
  query getMetric($slug: String!, $from: DateTime!, $to: DateTime!) {
    getMetric(metric: "age_distribution") {
      histogramData(
        slug: $slug
        from: $from
        to: $to
        limit: 10
        interval: "1d"
      ) {
        labels
        values {
          ... on FloatList {
            data
          }
        }
      }
    }
  }
`
