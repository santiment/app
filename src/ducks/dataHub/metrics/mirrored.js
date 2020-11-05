import { Metric } from './index'
import { TooltipSetting, FORMATTER } from '../tooltipSettings'

export const MirroredMetric = {
  // [bottom metric key]   :   [top metric]
  [Metric.exchange_outflow.key]: Metric.exchange_inflow,
  [Metric.sentiment_negative_total.key]: Metric.sentiment_positive_total,
  [Metric.sentiment_negative_telegram.key]: Metric.sentiment_positive_telegram,
  [Metric.sentiment_negative_reddit.key]: Metric.sentiment_positive_reddit,
  [Metric.sentiment_negative_twitter.key]: Metric.sentiment_positive_twitter
}

export const mirroredMetrics = [] // populated below
export const checkIfAreMirrored = (metricA, metricB) =>
  MirroredMetric[metricA.key] === metricB ||
  MirroredMetric[metricB.key] === metricA

const mirrorTransformer = metricKey => data =>
  data.map(item => ({
    datetime: item.datetime,
    [metricKey]: -item[metricKey]
  }))

Object.keys(MirroredMetric).forEach((key, i) => {
  const metric = Metric[key]
  const mirrorOfMetric = MirroredMetric[key]
  const { formatter = FORMATTER } = metric
  const mirrorFormatter = value => formatter(value && Math.abs(value))

  metric.domainGroup = mirrorOfMetric.key
  metric.preTransformer = mirrorTransformer(key)
  metric.formatter = mirrorFormatter
  TooltipSetting[key].formatter = mirrorFormatter

  const index = i * 2
  mirroredMetrics[index] = key
  mirroredMetrics[index + 1] = mirrorOfMetric.key
})
