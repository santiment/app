import { Metric } from '../../../dataHub/metrics'

export const metrics = [Metric.price_usd, Metric.marketcap_usd]

export const Operator = {
  above: 'greater_than_or_equal_to',
  below: 'greater_than_or_equal_to'
}

export const Interval = {}

export const Thresholds = {
  marketcap_usd: 100000000,
  price_usd: 10
}
