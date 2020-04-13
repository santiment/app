import { Metric } from '../dataHub/metrics'

export function domainModifier (metricKey, minMax) {
  let { min, max } = minMax

  const metric = Metric[metricKey]
  if (metric && metric.node === 'bar') {
    max *= 1.03
    min = 0
  } else {
    return
  }

  minMax.max = max
  minMax.min = min
}
