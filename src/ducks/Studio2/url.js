import { stringify, parse } from 'query-string'
import { newChartWidget, newHolderDistributionWidget } from './Widget/creators'
import {
  convertKeyToMetric,
  shareComparable,
  parseComparable,
} from '../Studio/url'

const WidgetCreator = {
  ChartWidget: newChartWidget,
  HolderDistributionWidget: newHolderDistributionWidget,
}

function parseUrlWidgets(urlWidgets) {
  try {
    const parsedWidgets = JSON.parse(urlWidgets)

    return parsedWidgets.map(({ widget, metrics, comparables }) =>
      WidgetCreator[widget]({
        metrics: metrics.map((key) => convertKeyToMetric(key)).filter(Boolean),
        comparables: comparables.map(parseComparable),
      }),
    )
  } catch (e) {
    return []
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
