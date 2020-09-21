import gql from 'graphql-tag'
import { METRICS } from './matrix'
import { getTimeIntervalFromToday, DAY } from '../../../../utils/dates'

export const DAYS_AMOUNT = 30
const { from, to } = getTimeIntervalFromToday(-DAYS_AMOUNT + 1, DAY)

const DATA_CHUNK = `{timeseriesData(
				slug: $slug
        from: "${from.toISOString()}"
        to: "${to.toISOString()}"
        interval: "1d"
      ) {
        value
      }}`

const METRICS_CHUNK = METRICS.map((metric, i) =>
  metric ? `_${i}: getMetric(metric: "${metric}")${DATA_CHUNK}` : ''
).join('')

export const FLOW_QUERY = gql`
  query getMetric($slug: String!) {
    ${METRICS_CHUNK}
  }
`
