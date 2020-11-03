import { HolderDistributionMetric } from './Chart/Sidepanel/HolderDistribution/metrics'
import { tryMapToTimeboundMetric } from '../dataHub/timebounds'
import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { Metric, deriveMetric } from '../dataHub/metrics'
import { Submetrics } from '../dataHub/submetrics'
import { CompatibleMetric } from '../dataHub/metrics/compatibility'

const ProjectMetricCache = new Map()
export const METRIC_CONNECTOR = '_MC_'

function searchFromSubmetrics (key) {
  for (let list of Object.values(Submetrics)) {
    const found = list.find(({ key: subMetricKey }) => subMetricKey === key)
    if (found) return found
  }
}

export const getMetricByKey = key =>
  Metric[key] ||
  CompatibleMetric[key] ||
  searchFromSubmetrics(key) ||
  tryMapToTimeboundMetric(key) ||
  HolderDistributionMetric[key]

export function buildProjectMetricKey (project, metric) {
  const { slug, ticker } = project
  const { key } = metric

  return `${slug}${METRIC_CONNECTOR}${ticker}${METRIC_CONNECTOR}${key}`
}

export function newProjectMetric (project, baseMetric, projectMetricKey) {
  const key = projectMetricKey || buildProjectMetricKey(project, baseMetric)
  const cached = ProjectMetricCache.get(key)

  if (cached) return cached

  const { ticker, slug } = project
  const metric = deriveMetric(baseMetric, {
    key,
    label: `${baseMetric.label} (${ticker})`,
    reqMeta: {
      slug
    }
  })

  updateTooltipSetting(metric)
  ProjectMetricCache.set(key, metric)

  return metric
}

export function getProjectMetricByKey (key, connector = METRIC_CONNECTOR) {
  const [slug, ticker, metricKey] = key.split(connector)
  const metric = getMetricByKey(metricKey)

  return newProjectMetric({ slug, ticker }, metric, key)
}
