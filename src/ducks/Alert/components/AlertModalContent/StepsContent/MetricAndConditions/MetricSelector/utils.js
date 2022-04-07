import { METRIC } from '../../../../../../Studio/Sidebar/Button/types'
import { DEFAULT_METRICS } from '../../../../../../Studio/withMetrics'
import { SIGNAL_SUPPORTED_METRICS } from './constants'

export function filterOnlyMetrics(submetrics) {
  const result = {}

  Object.keys(submetrics).forEach((key) => {
    result[key] = submetrics[key].filter(({ type }) => !type || type === METRIC)
  })

  return result
}

export function getByAvailable(availableMetrics = DEFAULT_METRICS, target) {
  const { watchlist_id } = target

  if (watchlist_id) {
    return SIGNAL_SUPPORTED_METRICS
  } else {
    return SIGNAL_SUPPORTED_METRICS.filter(({ key }) => {
      return availableMetrics.indexOf(key) !== -1
    })
  }
}
