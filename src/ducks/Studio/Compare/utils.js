import { Metric } from '../../dataHub/metrics'
import { TooltipSetting } from '../../dataHub/tooltipSettings'

const comparedMetricsCache = new Map()

export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key

export const buildCompareKey = (metric, project) =>
  `${metric.key}_${project.slug.replace(/-/g, '')}`

export const makeComparableObject = ({ metric, project }) => ({
  key: buildCompareKey(metric, project),
  metric: metric,
  project: project
})

export function buildComparedMetric (Comparable) {
  const hash = hashComparable(Comparable)
  const cached = comparedMetricsCache.get(hash)

  if (cached) {
    return cached
  }

  const { metric, project } = Comparable
  const { ticker, slug } = project
  const {
    key: metricKey,
    queryKey = metricKey,
    label,
    formatter,
    reqMeta
  } = metric

  const key = buildCompareKey(metric, project)

  const comparedMetric = {
    ...metric,
    key,
    queryKey,
    comparedTicker: ticker,
    domainGroup: metricKey,
    reqMeta: {
      slug,
      ...reqMeta
    }
  }

  TooltipSetting[key] = {
    label: `${label} (${ticker})`,
    formatter: formatter
  }

  comparedMetricsCache.set(hash, comparedMetric)

  return comparedMetric
}

export function getProjectHiddenMetrics (map, project) {
  if (!project) return

  return map.get(project.slug) || [Metric.balance]
}

export function buildHiddenMetrics (comparables) {
  const hiddenMetricsMap = new Map()
  const { length } = comparables

  for (let i = 0; i < length; i++) {
    const {
      project: { slug },
      metric
    } = comparables[i]
    const hiddens = hiddenMetricsMap.get(slug)

    if (hiddens) {
      hiddens.push(metric)
      continue
    }

    hiddenMetricsMap.set(slug, [Metric.balance, metric])
  }

  return hiddenMetricsMap
}
