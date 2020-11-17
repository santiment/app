import { cacheIndicator } from './Chart/MetricSettings/IndicatorsSetting'
import { HolderDistributionMetric } from './Chart/Sidepanel/HolderDistribution/metrics'
import { tryMapToTimeboundMetric } from '../dataHub/timebounds'
import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { Metric, deriveMetric } from '../dataHub/metrics'
import { Submetrics } from '../dataHub/submetrics'
import { CompatibleMetric } from '../dataHub/metrics/compatibility'

const ProjectMetricCache = new Map()
const DASH_CONNECTOR = '_DS_'
const DASH_CONNECTOR_REGEX = new RegExp(DASH_CONNECTOR, 'g')
export const METRIC_CONNECTOR = '_MC_'
export const checkIsProjectMetricKey = key => key.includes(METRIC_CONNECTOR)

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

const normalizeSlug = slug => '_' + slug.replace(/-/g, DASH_CONNECTOR)
const parseNormalizedSlug = normalizedSlug =>
  normalizedSlug.slice(1).replace(DASH_CONNECTOR_REGEX, '-')
const buildKey = (slug, ticker, metricKey) =>
  `${normalizeSlug(
    slug
  )}${METRIC_CONNECTOR}${ticker}${METRIC_CONNECTOR}${metricKey}`

export function buildProjectMetricKey (project, metric) {
  const { slug, ticker } = project

  return buildKey(slug, ticker, metric.key)
}

export function newProjectMetric (project, baseMetric, projectMetricKey) {
  const key = projectMetricKey || buildProjectMetricKey(project, baseMetric)
  const cached = ProjectMetricCache.get(key)

  if (cached) return cached

  const { ticker, slug } = project
  const metric = deriveMetric(baseMetric, {
    key,
    project,
    base: baseMetric,
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
  let [slug, ticker, metricKey] = key.split(connector)
  const metric = getMetricByKey(metricKey)
  const isProjectMetricConnector = connector === METRIC_CONNECTOR

  if (isProjectMetricConnector) {
    slug = parseNormalizedSlug(slug)
  }

  return newProjectMetric(
    { slug, ticker },
    metric,
    isProjectMetricConnector ? key : buildKey(slug, ticker, metricKey)
  )
}

export function convertBaseProjectMetric (metric, project) {
  if (metric.project) {
    const { base } = metric
    return metric.indicator ? cacheIndicator(base.base, metric.indicator) : base
  }

  if (metric.indicator) {
    return cacheIndicator(
      newProjectMetric(project, metric.base),
      metric.indicator
    )
  }

  return newProjectMetric(project, metric)
}
