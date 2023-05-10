import { Metric } from 'studio/metrics'
import { parseWidget } from './parse'

export const newChartWidget = (metrics) =>
  parseWidget({
    widget: 'ChartWidget',
    metrics,
  })

export function parseTemplate(template) {
  const { options, metrics, comparables } = template

  if (options) {
    const { widgets, multi_chart } = options
    if (widgets) return widgets.map(parseWidget)
    if (multi_chart) return translateMultiChartToWidgets(metrics, comparables)
  }

  return [newChartWidget(metrics)]
}

export function translateMultiChartToWidgets(metrics, comparables = []) {
  const allMetrics = metrics.concat(comparables)
  if (metrics.length + comparables.length < 2) {
    return [newChartWidget(allMetrics)]
  }

  let priceMetric
  const noPriceMetrics = allMetrics.filter((metric) => {
    if (metric !== Metric.price_usd.key) return true

    priceMetric = metric
    return false
  })

  return noPriceMetrics.map((metric) =>
    newChartWidget(priceMetric ? [priceMetric, metric] : [metric]),
  )
}
