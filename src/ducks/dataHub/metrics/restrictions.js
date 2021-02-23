import gql from 'graphql-tag'
import { client } from '../../../apollo'

const newQuery = data => ({
  query: gql`
    query {
      getAccessRestrictions {
        name
        ${data}
      }
    }
  `
})

function metricRestrictionsAccessor (data, cache) {
  const cacheValue = {}
  const { length } = data

  for (let i = 0; i < length; i++) {
    const metricRestrictions = data[i]
    cacheValue[metricRestrictions.name] = metricRestrictions
  }

  cache.value = cacheValue
  return cacheValue
}

function newMetricRestrictions (query, accessor) {
  const cache = { value: undefined }
  const getMetricRestrictions = ({ data }) =>
    metricRestrictionsAccessor(data.getAccessRestrictions, cache)

  return metricKey => {
    const { value } = cache
    const promise = value
      ? Promise.resolve(value)
      : client.query(query).then(getMetricRestrictions)

    return metricKey
      ? promise.then(MetricsRestrictions => {
        const MetricRestrictions = MetricsRestrictions[metricKey]
        return accessor ? accessor(MetricRestrictions) : MetricRestrictions
      })
      : promise
  }
}

export const getMetricMinInterval = newMetricRestrictions(
  newQuery('minInterval'),
  ({ minInterval }) => minInterval
)

export const getMetricBoundaries = newMetricRestrictions(
  newQuery('restrictedFrom restrictedTo')
)
