import { Metrics, tooltipSettings } from '../../SANCharts/metrics/data'

const comparedMetricsCache = new Map()

export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key

export const buildCompareKey = (metric, project) =>
  `${metric.key}_${project.slug.replace(/-/g, '')}`

export function buildComparedMetric (Comparable) {
  const hash = hashComparable(Comparable)
  const cached = comparedMetricsCache.get(hash)

  if (cached) {
    return cached
  }

  const { metric, project } = Comparable
  const { ticker, slug } = project
  const { key: metricKey, label, formatter } = metric

  const key = buildCompareKey(metric, project)

  const ComparedMetric = Object.assign(Object.create(null), metric, {
    key,
    queryKey: metricKey,
    comparedTicker: ticker,
    domainGroup: metricKey,
    color: undefined,
    reqMeta: {
      slug
    }
  })

  tooltipSettings[key] = {
    label: `${label} (${ticker})`,
    formatter: formatter
  }

  comparedMetricsCache.set(hash, ComparedMetric)

  return ComparedMetric
}

export function getProjectHiddenMetrics (map, project) {
  if (!project) return

  return map.get(project.slug) || [Metrics.historicalBalance]
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

    hiddenMetricsMap.set(slug, [Metrics.historicalBalance, metric])
  }

  return hiddenMetricsMap
}
