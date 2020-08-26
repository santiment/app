import { GET_METRIC } from '../timeseries/metrics'
import { preTransform } from '../timeseries/fetcher'
import { client } from '../../../apollo'

export const MERGED_DIVIDER = '__MM__'

const immutate = v => Object.assign({}, v)

export function fetch (metric, { slug, interval, from, to }) {
  const { key, mergedMetrics } = metric

  const queries = mergedMetrics.map(
    ({ key: metricKey, queryKey = metricKey }) => GET_METRIC({ key, queryKey })
  )

  return Promise.all(
    queries.map(query =>
      client
        .query({
          query,
          variables: {
            slug,
            interval,
            from,
            to
          }
        })
        .then(preTransform)
    )
  ).then(allData => {
    const result = allData[0].map(immutate)

    for (let i = 1; i < allData.length; i++) {
      const array = allData[i]
      const { length } = array
      for (let y = 0; y < length; y++) {
        result[y][key] += array[y][key]
      }
    }

    return result
  })
}
