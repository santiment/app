import { Metric } from '../../dataHub/metrics'

export const NO_GROUP = '_'

const addItemToGraph = (graph, node, item) => {
  const items = graph[node]

  if (items) {
    items.push(item)
  } else {
    graph[node] = [item]
  }
}

function sortCategoryGroups (category, Submetrics) {
  const sortedCategory = {
    [NO_GROUP]: []
  }

  const GroupSubmetricsLength = Object.keys(Submetrics).reduce((acc, key) => {
    acc[Metric[key].group] = Submetrics[key].length

    return acc
  }, Object.create(null))

  const groups = Object.keys(category).sort(
    (leftGroup, rightGroup) =>
      (category[leftGroup].length + GroupSubmetricsLength[leftGroup] || 0) -
      (category[rightGroup].length + GroupSubmetricsLength[rightGroup] || 0)
  )

  groups.forEach(group => (sortedCategory[group] = category[group]))
  return sortedCategory
}

export const getCategoryGraph = (
  availableMetrics,
  hiddenMetrics = [],
  Submetrics = {}
) => {
  if (availableMetrics.length === 0) {
    return {}
  }

  const categories = {
    Financial: undefined,
    Social: undefined,
    Development: undefined,
    Derivatives: undefined
  }
  const { length } = availableMetrics

  for (let i = 0; i < length; i++) {
    const availableMetric = availableMetrics[i]
    const metric =
      typeof availableMetric === 'object'
        ? availableMetric
        : Metric[availableMetric]

    if (!metric) {
      continue
    }

    /*
    if (Array.isArray(metric)) {
      const metricCategory = metric[0].category
      addItemToGraph(categories, metricCategory, metric)
      continue
    }
    */

    /* const metricCategory = metric.category */
    /* const metrics = [] */

    if (!hiddenMetrics.includes(metric)) {
      /* metrics.push({ item: metric, subitems: Submetrics[metric.key] || [] }) */
      addItemToGraph(categories, metric.category, {
        item: metric,
        subitems: Submetrics[metric.key] || []
      })
    }

    /* addItemToGraph(categories, metricCategory, metrics) */
  }

  Object.keys(categories).forEach(key => {
    if (!categories[key]) {
      return delete categories[key]
    }

    const category = categories[key].reduce(
      (acc, value) => {
        const { group = NO_GROUP } = value.item
        addItemToGraph(acc, group, value)
        return acc
      },
      { [NO_GROUP]: [] }
    )

    categories[key] = sortCategoryGroups(category, Submetrics)
  })

  return categories
}
