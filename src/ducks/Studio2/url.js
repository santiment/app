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

function parseSidepanel(sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function parseUrlV2(url) {
  const { settings, widgets, sidepanel } = parse(url)
  console.log('parsing')

  return {
    settings: settings ? JSON.parse(settings) : {},
    widgets: widgets ? parseUrlWidgets(widgets) : [],
    sidepanel: sidepanel ? parseSidepanel(sidepanel) : {},
  }
}

export function generateUrlV2({ settings, widgets, sidepanel }) {
  const normalizedWidgets = widgets.map(({ Widget, metrics }) => ({
    widget: Widget.name,
    metrics: metrics.map(({ key }) => key),
  }))

  return stringify({
    settings: JSON.stringify(settings),
    widgets: JSON.stringify(normalizedWidgets),
    sidepanel: sidepanel ? JSON.stringify({ type: sidepanel }) : undefined,
  })
}
