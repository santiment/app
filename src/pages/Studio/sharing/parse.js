import { useMemo } from 'react'
import { parse } from 'query-string'
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
import { getWidgetByKey, parseSubwidgets } from './widgets'
import { ExternalWidgetCreator } from '../Widget'
import { parseSharedSidepanel } from '../../../ducks/Studio/url/parse'
import {
  getProjectMetricByKey,
  checkIsProjectMetricKey
} from '../../../ducks/Studio/metrics'
import { COMPARE_CONNECTOR } from '../../../ducks/Studio/url/utils'

const CONTROLLER = {
  newProjectMetric,
  getMetricByKey: key => Metric[key]
}
function getMetric (metricKey) {
  const isLegacyCompareMetric = metricKey.includes(COMPARE_CONNECTOR)
  if (checkIsProjectMetricKey(metricKey) || isLegacyCompareMetric) {
    const controller = Object.assign(
      { parseSlug: metricKey[0] === '_' },
      CONTROLLER
    )

    const connector = isLegacyCompareMetric ? COMPARE_CONNECTOR : undefined
    return getProjectMetricByKey(metricKey, connector, controller)
  }

  return Metric[metricKey]
}

function parseMetric (metricKey, KnownMetric) {
  const metric = KnownMetric[metricKey] || getMetric(metricKey)
  KnownMetric[metricKey] = metric
  return metric
}

function parseAxesMetrics (metrics, KnownMetric) {
  if (!metrics) return

  const disabledAxesMetrics = new Set(Object.values(KnownMetric))
  const axesMetrics = new Set()
  metrics.forEach(metricKey => {
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
  const mergedMetrics = []
  metrics.forEach(metricKey => {
    const mergedMetricKeys = metricKey.split(MERGED_DIVIDER)
    if (mergedMetricKeys.length < 2) return

    const mergedMetric = buildMergedMetric(
      mergedMetricKeys.map(key => HolderDistributionMetric[key])
    )
    mergedMetrics.push(mergedMetric)
    KnownMetric[metricKey] = mergedMetric
  })
  return mergedMetrics
}

function parseMetrics (metrics, comparables = [], KnownMetric) {
  return metrics
    .concat(comparables)
    .map(key => parseMetric(key, KnownMetric))
    .filter(Boolean)
}

export function parseWidget (widget) {
  const newExternalWidget = ExternalWidgetCreator[widget.widget]
  if (newExternalWidget) return newExternalWidget()

  const Widget = getWidgetByKey(widget.widget)
  const KnownMetric = {}

  Widget.mergedMetrics = parseMergedMetrics(widget.metrics, KnownMetric)
  Widget.metricIndicators = parseIndicators(widget.indicators, KnownMetric)
  Widget.metrics = parseMetrics(widget.metrics, widget.comparables, KnownMetric)
  Widget.metricSettings = parseMetricGraphValue(widget.settings, KnownMetric)
  Widget.colors = parseMetricGraphValue(widget.colors, KnownMetric)
  Object.assign(Widget, parseAxesMetrics(widget.axesMetrics, KnownMetric))
  Object.assign(Widget, parseSubwidgets(widget.connectedWidgets))
  Widget.drawings = widget.drawings

  return Widget
}

export function parseWidgets (widgets) {
  return widgets.map(parseWidget)
}

function tryParseWidgets (widgets) {
  try {
    return parseWidgets(JSON.parse(widgets))
  } catch (e) {
    console.error(e)
  }
}

export function parseUrl (url) {
  const { settings, widgets, sidepanel } = parse(url)

  return {
    settings: settings && JSON.parse(settings),
    widgets: widgets && tryParseWidgets(widgets),
    sidewidget: sidepanel && parseSharedSidepanel(sidepanel)
  }
}

export function useUrlParse (parsedUrl) {
  return useMemo(() => {
    if (parsedUrl) return parsedUrl
    const { widgets, settings, sidewidget } = parseUrl(window.location.search)

    return {
      settings,
      widgets,
      sidewidget
    }
  }, [])
}
