import { get } from 'svelte/store'
import { WidgetToKeyMap } from './widgets'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'

const shareStore = clb => store => clb(get(store))
const isEmptyObject = obj => Object.keys(obj).length === 0
const keyAccessor = ({ key }) => key

const shareMetricSettings = shareStore(MetricSettings => {
  let result
  Object.entries(MetricSettings).forEach(([key, value]) => {
    if (isEmptyObject(value)) return
    if (!result) result = {}
    result[key] = value
  })
  return result
})

const shareMetrics = shareStore(metrics => metrics.map(keyAccessor))

const shareIndicators = shareStore(MetricIndicators => {
  let result
  Object.entries(MetricIndicators).forEach(([key, value]) => {
    if (value.size === 0) return
    if (!result) result = {}
    result[key] = Array.from(value).map(keyAccessor)
  })
  return result
})

const shareAxesMetrics = shareStore(axesMetrics =>
  Array.from(axesMetrics).map(keyAccessor)
)

const shareDrawings = shareStore(({ drawings }) => {
  if (drawings.length === 0) return
  return drawings.map(({ color, relCoor }) => ({ color, relCoor }))
})

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

  shared.metrics = shareMetrics(widget.Metrics)
  shared.axesMetrics = shareAxesMetrics(widget.ChartAxes)
  shared.colors = get(widget.ChartColors)
  shared.settings = shareMetricSettings(widget.MetricSettings)
  shared.indicators = shareIndicators(widget.MetricIndicators)
  shared.drawings = shareDrawings(widget.ChartDrawer)
  shared.connectedWidgets = shareSubwidgets(widget.subwidgets)

  return shared
}
export function shareWidgets (widgets) {
  return widgets.map(({ widget }) => {
    return shareChartWidget(widget)
  })

  /* console.log(config) */
  // return queryString
}

export function shareSettings ({ slug, ticker, from, to }) {
  return { slug, ticker, from, to }
}
