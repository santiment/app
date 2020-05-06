import { COMPARE_CONNECTOR, parseComparable, shareComparable } from '../url'
import { Metric } from '../../dataHub/metrics'
import { tryMapToTimeboundMetric } from '../../dataHub/timebounds'
import { getSavedMulticharts } from '../../../utils/localStorage'
import { capitalizeStr } from '../../../utils/utils'

const LAST_USED_TEMPLATE = 'LAST_USED_TEMPLATE'

export const getMetricKey = ({ key }) => key

export function parseTemplateMetrics (templateMetrics) {
  const { length } = templateMetrics
  const metrics = []
  const comparables = []

  for (let i = 0; i < length; i++) {
    const metricKey = templateMetrics[i]

    if (metricKey.includes(COMPARE_CONNECTOR)) {
      comparables.push(parseComparable(metricKey))
    } else {
      const metric = Metric[metricKey]

      if (metric) {
        metrics.push(metric)
      } else {
        const timeBoundMetric = tryMapToTimeboundMetric(metricKey)

        if (timeBoundMetric) {
          metrics.push(timeBoundMetric)
        }
      }
    }
  }

  return {
    metrics,
    comparables
  }
}

export function buildTemplateMetrics ({ metrics, comparables }) {
  if (!metrics && !comparables) {
    return
  }

  return metrics.map(getMetricKey).concat(comparables.map(shareComparable))
}

export function getLastTemplate () {
  const savedTemplate = localStorage.getItem(LAST_USED_TEMPLATE)

  return savedTemplate ? JSON.parse(savedTemplate) : undefined
}

export function saveLastTemplate (template) {
  if (!template) return

  localStorage.setItem(LAST_USED_TEMPLATE, JSON.stringify(template))
}

export const getMultiChartsValue = ({ options }) => {
  if (options && options.multi_chart !== undefined) {
    return options.multi_chart
  }

  return getSavedMulticharts()
}

export const getTemplateAssets = ({ metrics, project: { slug, name } }) => {
  const assets = [name || slug]

  metrics.forEach(item => {
    if (item.indexOf(COMPARE_CONNECTOR) !== -1) {
      const [slug] = item.split(COMPARE_CONNECTOR)

      if (slug) {
        assets.push(slug)
      }
    }
  })

  return assets.map(slug => capitalizeStr(slug))
}

export function getTemplateMetrics ({ metrics }) {
  const { metrics: parsedMetrics } = parseTemplateMetrics(metrics)
  return parsedMetrics.map(({ label }) => label)
}
