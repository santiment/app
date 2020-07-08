import { Metric } from './index'
import { TopTransactionsTableMetric } from '../submetrics'

const NEW_METRICS = [
  Metric.price_btc,
  Metric.price_eth,
  TopTransactionsTableMetric
]

const NewMetric = {}
const CategoryWithNews = {}
const GroupWithNews = {}

const incrementProperty = (obj, prop) => (obj[prop] = (obj[prop] || 0) + 1)

NEW_METRICS.forEach(({ key, category, group }) => {
  if (localStorage.getItem(key)) return

  NewMetric[key] = true
  incrementProperty(CategoryWithNews, category)
  if (group) {
    incrementProperty(GroupWithNews, group)
  }
})

export const seeMetric = ({ key, category, group }) => {
  delete NewMetric[key]
  CategoryWithNews[category] -= 1
  if (group) {
    GroupWithNews[group] -= 1
  }

  localStorage.setItem(key, '+')
}

export { NewMetric, CategoryWithNews, GroupWithNews }
