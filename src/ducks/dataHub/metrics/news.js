import { Metric } from './index'

const NEW_METRICS = [
  Metric.price_btc,
  Metric.price_eth,
  Metric.transaction_volume
]

const NewMetric = {}
const CategoryWithNews = {}
const GroupWithNews = {}

NEW_METRICS.forEach(({ key, category, group }) => {
  NewMetric[key] = true
  CategoryWithNews[category] = true
  if (group) {
    GroupWithNews[group] = true
  }
})

export { NewMetric, CategoryWithNews, GroupWithNews }
