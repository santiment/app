import { stringify } from 'query-string'
import { shareComparable } from '../../Studio/url'

export function generateUrlV2({ settings, widgets, sidepanel }) {
  const normalizedWidgets = widgets.map(({ Widget, metrics, comparables }) => ({
    widget: Widget.name,
    metrics: metrics.map(({ key }) => key),
    comparables: comparables.map(shareComparable),
  }))

  return stringify({
    settings: JSON.stringify(settings),
    widgets: JSON.stringify(normalizedWidgets),
    sidepanel: sidepanel ? JSON.stringify({ type: sidepanel }) : undefined,
  })
}

export function buildChartShareLink(config) {
  const { origin, pathname } = window.location
  return origin + pathname + '?' + generateUrlV2(config)
}
