import { WidgetToKeyMap } from './widgets'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'

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

function shareChartWidget (widget) {
  const shared = {}
  shared.widget = WidgetToKeyMap.get(widget.Widget)

  if (
    widget.Widget === FeesDistribution ||
    widget.Widget === HoldersDistributionTable
  ) {
    return shared
  }

  shared.metrics = shareMetrics(widget.metrics)
  shared.axesMetrics = shareAxesMetrics(widget.axesMetrics)
  shared.colors = widget.colors
  shared.settings = shareMetricSettings(widget.metricSettings)
  shared.indicators = shareIndicators(widget.metricIndicators)
  shared.drawings = shareDrawings(widget.drawings)
  shared.connectedWidgets = shareSubwidgets(widget.subwidgets)

  return shared
}

export function shareWidgets (widgets) {
  return widgets.map(shareChartWidget)
}

export function shareSettings ({ slug, ticker, from, to }) {
  return { slug, ticker, from, to }
}
