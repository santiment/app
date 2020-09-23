import gql from 'graphql-tag'
import { METRICS } from './matrix'

const DATA_CHUNK = `{timeseriesData(
				slug: $slug
        from: $from
        to: $to
        interval: "1d"
      ) {
        value
      }}`

const METRICS_CHUNK = METRICS.map((metric, i) =>
  metric ? `_${i}: getMetric(metric: "${metric}")${DATA_CHUNK}` : ''
).join('')

export const FLOW_QUERY = gql`
  query getMetric($slug: String!, $from: DateTime!, $to: DateTime!) {
    ${METRICS_CHUNK}
  }
`
