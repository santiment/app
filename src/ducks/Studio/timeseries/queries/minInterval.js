import gql from 'graphql-tag'
import { client } from '../../../../apollo'

let CACHE
const queryParams = {
  query: gql`
    query {
      getAccessRestrictions {
        name
        minInterval
      }
    }
  `
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
export const getMetricMinInterval = () =>
  client.query(queryParams).then(metricsMinIntervalAccessor)
