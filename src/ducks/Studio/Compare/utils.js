import { tooltipSettings } from '../../SANCharts/data'

const comparedMetricsCache = new Map()

const preTransform = (key, alias) => ({
  data: {
    getMetric: { timeseriesData }
  }
}) =>
  timeseriesData.map(data => ({
    datetime: data.datetime,
    [alias]: data[key]
  }))

export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key

export const buildComparedMetric = Comparable => {
  const hash = hashComparable(Comparable)
  const cached = comparedMetricsCache.get(hash)

  if (cached) {
    return cached
  }

  const {
    metric,
    project: { ticker, slug }
  } = Comparable

  const { key: metricKey, label, formatter } = metric
  const key = metricKey + slug

  const ComparedMetric = Object.assign(Object.create(null), metric, {
    Comparable,
    key,
    queryKey: metricKey,
    comparedTicker: ticker,
    color: undefined,
    queryPreTransform: preTransform(metricKey, key),
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
