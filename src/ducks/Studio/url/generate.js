import { stringify } from 'query-string'
import { WidgetToTypeMap } from '../Widget/types'

const keyExtractor = ({ key }) => key
const getMetricsKeys = metrics => metrics.map(keyExtractor)

function shareMetricSettings (MetricSettingMap) {
  const sharedMetricSettings = {}

  MetricSettingMap.forEach(({ node, interval }, { key }) => {
    sharedMetricSettings[key] = { node, interval }
  })

  return sharedMetricSettings
}

function shareMetricIndicators (MetricIndicators) {
  const sharedMetricIndicators = {}

  Object.keys(MetricIndicators).forEach(metricKey => {
    sharedMetricIndicators[metricKey] = getMetricsKeys([
      ...MetricIndicators[metricKey]
    ])
  })

  return sharedMetricIndicators
}

const normalizeConnectedWidget = ({ Widget, datesRange }) => ({
  widget: WidgetToTypeMap.get(Widget),
  from: datesRange[0].toISOString(),
  to: datesRange[1].toISOString()
})

const normalizeDrawing = ({ color, relCoor }) => ({
  color,
  relCoor
})

function shareDrawings (drawings, chart) {
  if (!chart || !chart.drawer || !chart.minMaxes) {
    return drawings && drawings.map(normalizeDrawing)
  }

  return chart.drawer.drawings.map(normalizeDrawing)
}

export const normalizeWidget = ({
  Widget,
  metrics,
  connectedWidgets,
  MetricColor,
  MetricSettingMap,
  MetricIndicators,
  drawings,
  axesMetricSet,
  chartRef
}) => ({
  widget: WidgetToTypeMap.get(Widget),
  metrics: metrics.map(({ key }) => key),
  connectedWidgets: connectedWidgets
    ? connectedWidgets.map(normalizeConnectedWidget)
    : undefined,
  colors: MetricColor,
  settings: shareMetricSettings(MetricSettingMap),
  indicators: shareMetricIndicators(MetricIndicators),
  drawings: shareDrawings(drawings, chartRef.current),
  axesMetrics:
    axesMetricSet && getMetricsKeys([...axesMetricSet].filter(Boolean))
})

export const normalizeWidgets = widgets => widgets.map(normalizeWidget)
const normalizeSettings = ({ projectId, ticker, title, name, ...settings }) =>
  settings

export function buildShareConfig ({ settings, widgets, sidepanel }) {
  return {
    settings: JSON.stringify(normalizeSettings(settings)),
    widgets: JSON.stringify(normalizeWidgets(widgets)),
    sidepanel: sidepanel ? JSON.stringify({ type: sidepanel }) : undefined
  }
}

export function generateShareLink (
  settings,
  options,
  metrics = [],
  events = []
) {
  const Shareable = {
    ...settings,
    ...options,
    metrics: getMetricsKeys(metrics)
  }

  return stringify(Shareable, {
    arrayFormat: 'comma'
  })
}

export const generateUrlV2 = config => stringify(buildShareConfig(config))
