import { WidgetToKeyMap } from './widgets'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'
import TopExchangesTable from '../Widget/TopExchangesTable'

const isEmptyObject = obj => Object.keys(obj).length === 0
const keyAccessor = ({ key }) => key

function shareMetricSettings (MetricSettings) {
  let result
  Object.entries(MetricSettings || {}).forEach(([key, _value]) => {
    const value = Object.assign({}, _value)
    delete value.getPreTransformValue
    delete value.preTransform
    if (isEmptyObject(value)) return
    if (!result) result = {}
    result[key] = value
  })
  return result
}

const shareMetrics = metrics => metrics.map(keyAccessor)

function shareIndicators (MetricIndicators) {
  let result
  Object.entries(MetricIndicators || {}).forEach(([key, value]) => {
    if (value.size === 0) return
    if (!result) result = {}
    result[key] = Array.from(value).map(keyAccessor)
  })
  return result
}

const shareAxesMetrics = axesMetrics =>
  Array.from(axesMetrics || []).map(keyAccessor)

function shareDrawings (drawings = []) {
  if (drawings.length === 0) return
  return drawings.map(({ color, relCoor }) => ({ color, relCoor }))
}

function shareSubwidgets (subwidgets) {
  if (subwidgets.length === 0) return

  return subwidgets.map(({ key, from, to }) => ({
    widget: key,
    from,
    to
  }))
}

function shareSignalMetrics (signalMetrics) {
  const metrics = signalMetrics || []
  return metrics.length ? shareMetrics(metrics) : undefined
}

function shareCombinedMetrics (metrics) {
  return metrics
    .filter(({ expression }) => expression)
    .map(({ key, expression, label, baseMetrics }) => ({
      k: key,
      exp: expression,
      l: label,
      bm: shareMetrics(baseMetrics)
    }))
}

function shareHolderLabels (holderLabels) {
  if (holderLabels && holderLabels.length) return holderLabels
}

function shareChartWidget (widget) {
  const shared = {}
  shared.widget = WidgetToKeyMap.get(widget.Widget)

  if (
    widget.Widget === FeesDistribution ||
    widget.Widget === HoldersDistributionTable ||
    widget.Widget === TopExchangesTable
  ) {
    return shared
  }

  if (widget.isSharedAxisEnabled) shared.wcsa = widget.isSharedAxisEnabled
  shared.metrics = shareMetrics(widget.metrics)
  shared.axesMetrics = shareAxesMetrics(widget.axesMetrics)
  shared.colors = widget.colors
  shared.settings = shareMetricSettings(widget.metricSettings)
  shared.indicators = shareIndicators(widget.metricIndicators)
  shared.drawings = shareDrawings(widget.drawings)
  shared.connectedWidgets = shareSubwidgets(widget.subwidgets)
  shared.signalMetrics = shareSignalMetrics(widget.signalMetrics)
  shared.combinedMetrics = shareCombinedMetrics(widget.metrics)
  shared.holderLabels = shareHolderLabels(widget.holderLabels)

  return shared
}

export function shareWidgets (widgets) {
  return widgets.map(shareChartWidget)
}

export function shareSettings ({ slug, ticker, from, to }) {
  return { slug, ticker, from, to }
}
