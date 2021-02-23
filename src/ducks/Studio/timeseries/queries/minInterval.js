import gql from 'graphql-tag'
import { client } from '../../../../apollo'

const METRICS_MIN_INTERVAL_QUERY = gql`
  query {
    getAccessRestrictions {
      name
      minInterval
    }
  }
`

let CACHE
const queryParams = {
  query: METRICS_MIN_INTERVAL_QUERY
}

function metricsMinIntervalAccessor ({ data: { getAccessRestrictions } }) {
  if (CACHE) return CACHE

  CACHE = {}
  const { length } = getAccessRestrictions

  for (let i = 0; i < length; i++) {
    const { name, minInterval } = getAccessRestrictions[i]
    CACHE[name] = minInterval
  }

  return CACHE
}

export const getMetricMinInterval = metric =>
  client.query(queryParams).then(metricsMinIntervalAccessor)
