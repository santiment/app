import { COMPARE_CONNECTOR, parseComparable, shareComparable } from '../url'
import { Metric } from '../../dataHub/metrics'
import {getTimeboundMetrics } from "../../dataHub/timebounds";

const LAST_USED_TEMPLATE = 'LAST_USED_TEMPLATE'

export const getMetricKey = ({ key }) => key

export function parseTemplateMetrics (templateMetrics) {
  const { length } = templateMetrics
  const metrics = []
  const comparables = []

  const timebounds = []

  for (let i = 0; i < length; i++) {
    const metricKey = templateMetrics[i]

    if (metricKey.includes(COMPARE_CONNECTOR)) {
      comparables.push(parseComparable(metricKey))
    } else {
      const metric = Metric[metricKey]

      if (metric) {
          metrics.push(metric)
      } else {
        timebounds.push(metricKey)
      }
    }
  }

  const timeboundMetrics = getTimeboundMetrics({
    metricKeys: timebounds
  })

  if(timeboundMetrics){
    for(let key in timeboundMetrics){
      const list = timeboundMetrics[key]

      if(list && list.length){
        metrics.push(...list)
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
