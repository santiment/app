import { Metric } from '../../ducks/dataHub/metrics'

const buildKey = (metric, suffix) =>
  `${metric.key}_${suffix.replace(/[^a-zA-Z]+/g, '')}`

export function buildExploredMetric (text) {
  const key = buildKey(Metric.social_volume_total, text)
  return {
    ...Metric.social_volume_total,
    queryKey: Metric.social_volume_total.key,
    key,
    text
  }
}

export function calcAverage (metrics, data) {
  const initialValue = {}
  const avg = []

  metrics.forEach(({ key }) => (initialValue[key] = { sum: 0, amount: 0 }))

  const sum = data.reduce(function (acc, val) {
    metrics.forEach(({ key }) => {
      if (val[key] !== undefined) {
        acc[key].sum = acc[key].sum + val[key]
        acc[key].amount++
      }
    })

    return acc
  }, initialValue)

  metrics.forEach(({ key }) => {
    if (sum[key].amount !== 0) {
      avg.push(parseInt(sum[key].sum / sum[key].amount))
    }
  })

  return avg
}

export function calcPercentage (total, number) {
  return ((number * 100) / total).toFixed(2)
}
