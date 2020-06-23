import { stringify, parse } from 'query-string'
import { newChartWidget } from './Widget/ChartWidget'
import { newHolderDistributionWidget } from './Widget/HolderDistributionWidget'
import { convertKeyToMetric } from '../Studio/url'

const WidgetCreator = {
  ChartWidget: newChartWidget,
  HolderDistributionWidget: newHolderDistributionWidget,
}

function parseUrlWidgets(urlWidgets) {
  try {
    const parsedWidgets = JSON.parse(urlWidgets)

    return parsedWidgets.map(({ widget, metrics }) =>
      WidgetCreator[widget]({
        metrics: metrics.map((key) => convertKeyToMetric(key)).filter(Boolean),
      }),
    )
  } catch (e) {
    return
  }
}

export function generateUrlV2({ settings, widgets }) {
  const normalizedWidgets = widgets.map(({ Widget, metrics }) => ({
    widget: Widget.name,
    metrics: metrics.map(({ key }) => key),
  }))

  /* console.log(settings, normalizedWidgets) */

  return stringify({
    settings: JSON.stringify(settings),
    widgets: JSON.stringify(normalizedWidgets),
  })
}

export function parseUrlV2(url) {
  const { settings, widgets } = parse(window.location.search)

  return {
    settings: JSON.parse(settings),
    widgets: parseUrlWidgets(widgets),
  }
}
