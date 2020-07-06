import { stringify } from 'query-string'
import { COMPARE_CONNECTOR } from './parse'
import { WidgetToTypeMap } from '../Widget/types'

const getMetricsKeys = metrics => metrics.map(({ key }) => key)

export function shareComparable (Comparable) {
  const { project, metric } = Comparable
  const { slug, ticker } = project
  const { key } = metric

  return `${slug}${COMPARE_CONNECTOR}${ticker}${COMPARE_CONNECTOR}${key}`
}

const normalizeConnectedWidget = ({ Widget, datesRange }) => ({
  widget: WidgetToTypeMap.get(Widget),
  from: datesRange[0].toISOString(),
  to: datesRange[1].toISOString()
})

export const normalizeWidget = ({
  Widget,
  metrics,
  comparables,
  connectedWidgets
}) => ({
  widget: WidgetToTypeMap.get(Widget),
  metrics: metrics.map(({ key }) => key),
  comparables: comparables.map(shareComparable),
  connectedWidgets: connectedWidgets
    ? connectedWidgets.map(normalizeConnectedWidget)
    : undefined
})

export const normalizeWidgets = widgets => widgets.map(normalizeWidget)

export function buildShareConfig ({ settings, widgets, sidepanel }) {
  return {
    settings: JSON.stringify(settings),
    widgets: JSON.stringify(normalizeWidgets(widgets)),
    sidepanel: sidepanel ? JSON.stringify({ type: sidepanel }) : undefined
  }
}

export function generateShareLink (
  settings,
  options,
  metrics = [],
  events = [],
  comparables = []
) {
  const Shareable = {
    ...settings,
    ...options,
    metrics: getMetricsKeys(metrics),
    comparables: comparables.map(shareComparable)
  }

  return stringify(Shareable, {
    arrayFormat: 'comma'
  })
}

export const generateUrlV2 = config => stringify(buildShareConfig(config))

export function buildChartShareLink (config) {
  const { origin } = window.location
  return `${origin}/studio?${generateUrlV2(config)}`
}
