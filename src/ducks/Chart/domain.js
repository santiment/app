import { prepareDomain } from '@santiment-network/chart/bars/greenRedBars'
import { Node } from './nodes'
import { Metric } from '../dataHub/metrics'

const DEFAULT_DOMAIN_METRIC_KEYS = [
  Metric.twitter_followers.key,
  Metric.minersBalance.key
]

export function domainModifier (metricKey, minMax) {
  if (DEFAULT_DOMAIN_METRIC_KEYS.some(key => metricKey.startsWith(key))) {
    return
  }

  let { min, max } = minMax

  const metric = Metric[metricKey]
  if (metric) {
    const { node } = metric

    if (node === Node.GREEN_RED_BAR) {
      return prepareDomain(minMax)
    } else if (node === Node.BAR) {
      max *= 1.01
      min = 0
    } else {
      max *= 1.01
      min *= min > 0 ? 0.99 : 1.01
    }
  }

  if (min === max) {
    max *= 1.1
    min *= 0.9
  }

  minMax.max = max
  minMax.min = min
}
