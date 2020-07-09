import { Metric } from './index'
import { TopTransactionsTableMetric } from '../submetrics'

const NEW_METRICS = [
  Metric.price_btc,
  Metric.price_eth,
  Metric.bitmex_perpetual_basis_ratio,
  TopTransactionsTableMetric
]
export const NEW_METRIC_KEY_SET = new Set(NEW_METRICS.map(({ key }) => key))

const NewSubmetricsByMetric = {}
NEW_METRICS.forEach(metric => {
  const { parentMetric } = metric
  if (parentMetric) {
    const { key, category, group } = parentMetric
    metric.category = category
    metric.group = group
    const submetrics = NewSubmetricsByMetric[key]
    if (submetrics) {
      submetrics.push(metric)
    } else {
      NewSubmetricsByMetric[key] = [metric]
    }
  }
})

function appendIfVisible (arr, metric, conditionProps) {
  if (localStorage.getItem(metric.key)) return

  const { checkIsVisible } = metric
  if (checkIsVisible ? checkIsVisible(conditionProps) : true) {
    arr.push(metric)
  }
}

export function getAssetNewMetrics (metricKeys, conditionProps) {
  const { length } = metricKeys
  const newMetrics = []

  for (let i = 0; i < length; i++) {
    const key = metricKeys[i]
    if (NEW_METRIC_KEY_SET.has(key)) {
      const metric = Metric[key]
      appendIfVisible(newMetrics, metric, conditionProps)
    } else {
      const submetrics = NewSubmetricsByMetric[key]
      if (submetrics) {
        submetrics.forEach(submetric =>
          appendIfVisible(newMetrics, submetric, conditionProps)
        )
      }
    }
  }

  const NewMetric = {}
  const NewMetricsCategory = {}
  const NewMetricsGroup = {}
  newMetrics.forEach(({ key, category, group }) => {
    NewMetric[key] = true
    NewMetricsCategory[category] = true
    if (group) {
      NewMetricsGroup[group] = true
    }
  })

  return {
    NewMetric,
    NewMetricsCategory,
    NewMetricsGroup
  }
}

export const seeMetric = ({ key }) => localStorage.setItem(key, '+')
