import { Metrics, Events } from '../../../ducks/SANCharts/data'

export const NO_GROUP = '_'

const addItemToGraph = (categories, metricCategories, metrics) => {
  return (typeof metricCategories === 'string'
    ? [metricCategories]
    : metricCategories
  ).forEach(metricCategory => {
    const category = categories[metricCategory]
    if (category) {
      category.push(...metrics)
    } else {
      categories[metricCategory] = metrics
    }
  })
}

export const getCategoryGraph = (availableMetrics, hiddenMetrics) => {
  if (availableMetrics.length === 0) {
    return {}
  }

  const categories = {
    Financial: undefined,
    Social: [Events.trendPositionHistory]
  }
  const { length } = availableMetrics

  for (let i = 0; i < length; i++) {
    const availableMetric = availableMetrics[i]
    const metric =
      typeof availableMetric === 'object'
        ? availableMetric
        : Metrics[availableMetric]

    if (!metric) {
      continue
    }

    if (Array.isArray(metric)) {
      const metricCategory = metric[0].category
      addItemToGraph(categories, metricCategory, metric)
      continue
    }

    const metricCategory = metric.category
    const metrics = []

    if (!hiddenMetrics.includes(metric)) {
      metrics.push(metric)
    }

    if (metric.key === 'historyPrice') {
      metrics.push(Metrics.volume, Metrics.marketcap)
    }

    addItemToGraph(categories, metricCategory, metrics)
  }

  Object.keys(categories).forEach(key => {
    categories[key] = categories[key].reduce(
      (acc, metric) => {
        const { group = NO_GROUP } = metric
        addItemToGraph(acc, group, [metric])
        return acc
      },
      { [NO_GROUP]: [] }
    )
  })

  return categories
}
