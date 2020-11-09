import { Metric, deriveMetric } from '../../dataHub/metrics'
import { updateTooltipSetting } from '../../dataHub/tooltipSettings'

const comparedMetricsCache = new Map()

export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key

export const normalizeQueryAlias = queryKey => queryKey.replace(/-/g, '')

export const buildCompareKey = (metric, project) =>
  `${metric.key}_${normalizeQueryAlias(project.slug)}`
export const COMPARE_CONNECTOR = '-CC-'

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
  const { key: metricKey, label: baseLabel } = metric

  const comparedMetric = deriveMetric(metric, {
    key: buildCompareKey(metric, project),
    label: `${baseLabel} (${ticker})`,
    comparedTicker: ticker,
    domainGroup: metricKey,
    reqMeta: {
      slug
    }
  })

  updateTooltipSetting(comparedMetric)
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
