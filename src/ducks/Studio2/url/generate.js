import { stringify } from 'query-string'
import { shareComparable } from '../../Studio/url'

export const normalizeWidget = ({ Widget, metrics, comparables }) => ({
  widget: Widget.name,
  metrics: metrics.map(({ key }) => key),
  comparables: comparables.map(shareComparable),
})

export const normalizeWidgets = (widgets) => widgets.map(normalizeWidget)

export function buildShareConfig({ settings, widgets, sidepanel }) {
  return {
    settings: JSON.stringify(settings),
    widgets: JSON.stringify(normalizeWidgets(widgets)),
    sidepanel: sidepanel ? JSON.stringify({ type: sidepanel }) : undefined,
  }
}

export const generateUrlV2 = (config) => stringify(buildShareConfig(config))

export function buildChartShareLink(config) {
  const { origin, pathname } = window.location
  return origin + pathname + '?' + generateUrlV2(config)
}
