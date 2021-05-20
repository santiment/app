import { useMemo } from 'react'
import { parse } from 'query-string'
import { studio } from 'studio/stores/studio'
import { Metric } from 'studio/metrics'
import { HolderDistributionMetric } from 'studio/metrics/_onchain/holderDistributions'
import { newProjectMetric } from 'studio/metrics/utils'
import {
  MERGED_DIVIDER,
  buildMergedMetric
} from 'studio/HolderDistributionWidget/utils'
import {
  cacheIndicator,
  Indicator
} from 'studio/ChartWidget/MetricSettings/IndicatorSetting/utils'
import { parseMetricGraphValue } from './settings'
import { parseSharedSidepanel } from '../../../ducks/Studio/url/parse'
import {
  getProjectMetricByKey,
  checkIsProjectMetricKey
} from '../../../ducks/Studio/metrics'
import { getWidgetByKey, parseSubwidgets } from '../parse/widgets'

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
  const metric = KnownMetric[metricKey] || getMetric(metricKey)
  KnownMetric[metricKey] = metric
  return metric
}

function parseAxesMetrics (metrics, KnownMetric) {
  const disabledAxesMetrics = new Set(Object.values(KnownMetric))
  const axesMetrics = new Set()
  ;(metrics || []).forEach(metricKey => {
    const metric = KnownMetric[metricKey]
    if (metric) {
      axesMetrics.add(metric)
      disabledAxesMetrics.delete(metric)
    }
  })
  return { axesMetrics, disabledAxesMetrics }
}

function parseIndicators (indicators, KnownMetric) {
  const MetricIndicators = {}

  Object.keys(indicators || {}).forEach(metricKey => {
    const metric = getMetric(metricKey)

    const indicatorMetrics = indicators[metricKey].slice()
    indicators[metricKey].forEach((indicatorKey, i) => {
      const indicator = Indicator[indicatorKey]
      if (metric) {
        const indicatorMetric = cacheIndicator(metric, indicator)
        KnownMetric[`${indicatorKey}_${metricKey}`] = indicatorMetric
      }
      indicatorMetrics[i] = indicator
      MetricIndicators[metric.key] = new Set(indicatorMetrics)
    })
  })

  return MetricIndicators
}

function parseMergedMetrics (metrics, KnownMetric) {
  metrics.forEach(metricKey => {
    const mergedMetricKeys = metricKey.split(MERGED_DIVIDER)
    if (mergedMetricKeys.length < 2) return

    const mergedMetric = buildMergedMetric(
      mergedMetricKeys.map(key => HolderDistributionMetric[key])
    )
    KnownMetric[metricKey] = mergedMetric
  })
}

function parseWidgets (widgets) {
  return widgets.map(widget => {
    const Widget = getWidgetByKey(widget.widget)
    const KnownMetric = {}

    parseMergedMetrics(widget.metrics, KnownMetric)
    Widget.metricIndicators = parseIndicators(widget.indicators, KnownMetric)
    Widget.metrics = widget.metrics
      .map(key => parseMetric(key, KnownMetric))
      .filter(Boolean)
    Widget.metricSettings = parseMetricGraphValue(widget.settings, KnownMetric)
    Widget.colors = parseMetricGraphValue(widget.colors, KnownMetric)
    Object.assign(Widget, parseAxesMetrics(widget.axesMetrics, KnownMetric))
    Object.assign(Widget, parseSubwidgets(widget.connectedWidgets))
    Widget.drawings = widget.drawings

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
