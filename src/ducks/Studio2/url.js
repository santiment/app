import { parse } from 'query-string'
import { newChartWidget, newHolderDistributionWidget } from './Widget/creators'
import { convertKeyToMetric, parseComparable } from '../Studio/url'

const WidgetCreator = {
  ChartWidget: newChartWidget,
  HolderDistributionWidget: newHolderDistributionWidget,
}

export function parseSharedWidgets(sharedWidgets) {
  return sharedWidgets.map(({ widget, metrics, comparables }) =>
    WidgetCreator[widget]({
      metrics: metrics.map((key) => convertKeyToMetric(key)).filter(Boolean),
      comparables: comparables.map(parseComparable),
    }),
  )
}

export function parseWidgets(urlWidgets) {
  try {
    return parseSharedWidgets(JSON.parse(urlWidgets))
  } catch (e) {
    return [newChartWidget()]
  }
}

function parseSharedSidepanel(sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function parseUrlV2(url) {
  const { settings, widgets, sidepanel } = parse(url)
  console.log('parsing')

  return {
    settings: settings ? JSON.parse(settings) : {},
    widgets: widgets ? parseWidgets(widgets) : [],
    sidepanel: sidepanel ? parseSharedSidepanel(sidepanel) : {},
  }
}
