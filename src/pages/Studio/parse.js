import { useMemo } from 'react'
import { parse } from 'query-string'
import { parseUrlV2, parseSharedSidepanel } from '../../ducks/Studio/url/parse'
import { studio } from 'studio/stores/studio'
import { Metric } from 'studio/metrics'
import { newProjectMetric } from 'studio/metrics/utils'
import {
  cacheIndicator,
  Indicator
} from 'studio/ChartWidget/MetricSettings/IndicatorSetting/utils'
import {
  getProjectMetricByKey,
  checkIsProjectMetricKey
} from '../../ducks/Studio/metrics'
import { getWidgetByKey, parseSubwidgets } from './parse/widgets'

const CONTROLLER = {
  newProjectMetric,
  getMetricByKey: key => Metric[key]
}
function getMetric (metricKey) {
  if (checkIsProjectMetricKey(metricKey)) {
    return getProjectMetricByKey(metricKey, undefined, CONTROLLER)
  }
  return Metric[metricKey]
}

function parseMetric (metricKey, KnownMetric) {
  if (KnownMetric[metricKey]) return KnownMetric[metricKey]
  return getMetric(metricKey)
}

function parseIndicators (indicators) {
  const MetricIndicators = {}
  const IndicatorMetric = {}

  Object.keys(indicators || {}).forEach(metricKey => {
    const metric = getMetric(metricKey)

    const indicatorMetrics = indicators[metricKey].slice()
    indicators[metricKey].forEach((indicatorKey, i) => {
      const indicator = Indicator[indicatorKey]
      if (metric) {
        const indicatorMetric = cacheIndicator(metric, indicator)
        IndicatorMetric[`${indicatorKey}_${metricKey}`] = indicatorMetric
      }
      indicatorMetrics[i] = indicator
      MetricIndicators[metric.key] = new Set(indicatorMetrics)
    })
  })

  return { MetricIndicators, IndicatorMetric }
}

function parseWidgets (widgets) {
  return widgets.map(widget => {
    const Widget = getWidgetByKey(widget.widget)
    const ParsedIndicators = parseIndicators(widget.indicators)
    const { MetricIndicators, IndicatorMetric } = ParsedIndicators
    const metrics = widget.metrics.map(key => parseMetric(key, IndicatorMetric))
    const ParsedSubwidgets = parseSubwidgets(widget.connectedWidgets)

    Widget.metrics = metrics
    Widget.indicators = MetricIndicators
    Object.assign(Widget, ParsedSubwidgets)

    console.log(widget, Widget, ParsedIndicators)
    return Widget
  })
}

function tryParseWidgets (widgets) {
  try {
    return parseWidgets(JSON.parse(widgets))
  } catch (e) {
    console.error(e)
  }
}

function parseUrl (url) {
  const { settings, widgets, sidepanel } = parse(url)

  return {
    settings: settings && JSON.parse(settings),
    widgets: widgets && tryParseWidgets(widgets),
    sidewidget: sidepanel && parseSharedSidepanel(sidepanel)
  }
}

export function useUrlParse (parsedUrl) {
  return useMemo(() => {
    const { widgets, settings, sidewidget } = parseUrl(window.location.search)
    studio.setProject(settings)
    /* studio.setPeriod(settings) */

    return {
      defaultSettings: settings,
      defaultWidgets: widgets,
      defaultSidewidget: sidewidget
    }
  }, [])
}
