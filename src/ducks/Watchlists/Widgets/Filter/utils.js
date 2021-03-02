import { DEFAULT_SCREENER_FN } from '../../../Screener/utils'

export function getNewFunction (filter, baseProjects = []) {
  const args = { filters: filter }

  if (baseProjects.length > 0) {
    args.baseProjects = baseProjects
  }

  return filter.length > 0 || baseProjects.length > 0
    ? { args, name: 'selector' }
    : DEFAULT_SCREENER_FN
}

// for screeners that created with old way
function reconstructFilters (filters) {
  return filters.map(filter => ({ args: filter, name: 'metric' }))
}

export function extractFilters ({ filters = [] }) {
  if (filters.length === 0) {
    return filters
  }

  if (!filters[0].name && !filters[0].args) {
    return reconstructFilters(filters)
  } else {
    return filters
  }
}

export function filterMetricsBySearch (value = '', metrics) {
  if (!value) {
    return metrics
  }

  const chars = value.toLowerCase().split('')
  const passedMetrics = []

  metrics.forEach(metric => {
    const str = metric.label.toLowerCase()

    const foundChars = chars.filter(char => str.includes(char))
    if (foundChars.length === chars.length) {
      passedMetrics.push(metric)
    }
  })

  return passedMetrics
}

export function buildFunction ({ fn, pagination, orderBy }) {
  if (fn.name === DEFAULT_SCREENER_FN.name) {
    return { args: { pagination, orderBy, filters: [] }, name: 'selector' }
  } else {
    return {
      ...fn,
      args: { pagination, orderBy, ...fn.args }
    }
  }
}
