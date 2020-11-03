import gql from 'graphql-tag'
import { client } from '../../../../apollo'

const MIN_INTERVAL_QUERY = gql`
  query getMetric($metric: String!) {
    getMetric(metric: $metric) {
      metadata {
        minInterval
      }
    }
  }
`

export const getMinInterval = metric =>
  client
    .query({
      query: MIN_INTERVAL_QUERY,
      errorPolicy: 'all',
      variables: {
        metric
      }
    })
    .then(({ data: { getMetric } }) => getMetric.metadata.minInterval)
