import { Metrics, tooltipSettings } from '../../../ducks/SANCharts/data'

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

function sortCategoryGroups (category) {
  const sortedCategory = {}
  const groups = Object.keys(category).sort(
    (leftGroup, rightGroup) =>
      category[leftGroup].length - category[rightGroup].length
  )

  groups.forEach(group => (sortedCategory[group] = category[group]))
  return sortedCategory
}

export const getCategoryGraph = (availableMetrics, hiddenMetrics) => {
  if (availableMetrics.length === 0) {
    return {}
  }

  const categories = {
    Financial: undefined
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

    addItemToGraph(categories, metricCategory, metrics)
  }

  Object.keys(categories).forEach(key => {
    categories[key] = sortCategoryGroups(
      categories[key].reduce(
        (acc, metric) => {
          const { group = NO_GROUP } = metric
          addItemToGraph(acc, group, [metric])
          return acc
        },
        { [NO_GROUP]: [] }
      )
    )
  })

  return categories
}

const TimeboundMetricCache = new Map()

export function getTimeboundMetrics (metrics) {
  const Timebound = Object.create(null)

  metrics.forEach(timeboundKey => {
    const lastIndex = timeboundKey.lastIndexOf('_')
    const key = timeboundKey.slice(0, lastIndex)
    const metric = Metrics[key]

    if (metric) {
      const timebounds = Timebound[key]
      let timeboundMetric = TimeboundMetricCache.get(timeboundKey)

      if (!timeboundMetric) {
        const label = metric.label + ` (${timeboundKey.slice(lastIndex + 1)})`
        timeboundMetric = {
          ...metric,
          label,
          key: timeboundKey
        }

        tooltipSettings[timeboundKey] = {
          label,
          formatter: tooltipSettings[key].formatter
        }

        TimeboundMetricCache.set(timeboundKey, timeboundMetric)
      }

      if (timebounds) {
        timebounds.push(timeboundMetric)
      } else {
        Timebound[key] = [timeboundMetric]
      }
    }
  })

  return Timebound
}
