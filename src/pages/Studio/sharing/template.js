import { parseWidget, parseWidgets } from './parse'

export function parseTemplate (template) {
  const { options, metrics } = template

  if (options) {
    const { widgets } = options
    if (widgets) return parseWidgets(widgets)
    // if (multi_chart) return getWidgetByKey('ChartWidget')
  }

  return [
    parseWidget({
      widget: 'ChartWidget',
      metrics
    })
  ]
}
