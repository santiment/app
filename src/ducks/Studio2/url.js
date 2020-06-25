import { parse } from 'query-string'
import { newChartWidget, newHolderDistributionWidget } from './Widget/creators'
import { parseUrl, convertKeyToMetric, parseComparable } from '../Studio/url'

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
    return
  }
}

function parseSharedSidepanel(sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function parseUrlV2(url) {
  const { settings, widgets, sidepanel } = parse(url)

  if (!widgets) {
    const parsedV1Config = parseUrl(url)
    console.log(parsedV1Config)
    return parsedV1Config
  }

  return {
    settings: settings && JSON.parse(settings),
    widgets: widgets && parseWidgets(widgets),
    sidepanel: sidepanel && parseSharedSidepanel(sidepanel),
  }
}
