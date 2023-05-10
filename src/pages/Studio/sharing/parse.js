import 'studio/metrics/selector/subitems'
// import { useMemo } from 'react'
// import { parse } from 'query-string'
import { Metric } from 'studio/metrics'
import { parseWidget as parseChartWidget } from 'studio/sharing/widget'
import { HolderDistributionMetric } from 'studio/metrics/_onchain/holderDistributions'
import { newProjectMetric } from 'studio/metrics/utils'
import { MERGED_DIVIDER, buildMergedMetric } from 'studio/HolderDistributionWidget/utils'
import { cacheIndicator, Indicator } from 'studio/ChartWidget/MetricSettings/IndicatorSetting/utils'
import { newExpessionMetric } from 'studio/CombineDialog/utils'
import { parseMetricGraphValue } from './settings'
import { getWidgetByKey, parseSubwidgets } from './widgets'
import { parseDrawings } from 'studio/sharing/drawings'
import { parseChartAddons } from 'studio/sharing/addons'
import { ExternalWidgetCreator } from '../Widget'
// import { parseSharedSidepanel } from '../../../ducks/Studio/url/parse'
import { getProjectMetricByKey, checkIsProjectMetricKey } from '../../../ducks/Studio/metrics'
import { COMPARE_CONNECTOR } from '../../../ducks/Studio/url/utils'

const CONTROLLER = {
  newProjectMetric,
  getMetricByKey: (key) => Metric[key] || parseMergedMetric(key),
}
function getMetric(metricKey) {
  const isLegacyCompareMetric = metricKey.includes(COMPARE_CONNECTOR)
  if (checkIsProjectMetricKey(metricKey) || isLegacyCompareMetric) {
    const controller = Object.assign({ parseSlug: metricKey[0] === '_' }, CONTROLLER)

    const connector = isLegacyCompareMetric ? COMPARE_CONNECTOR : undefined
    return getProjectMetricByKey(metricKey, connector, controller)
  }

  return Metric[metricKey] || parseMergedMetric(metricKey)
}

function parseMetric(metricKey, KnownMetric) {
  const metric = KnownMetric[metricKey] || getMetric(metricKey)
  KnownMetric[metricKey] = metric
  return metric
}

function parseAxesMetrics(metrics, KnownMetric) {
  if (!metrics) return

  const disabledAxesMetrics = new Set(Object.values(KnownMetric))
  const axesMetrics = new Set()
  metrics.forEach((metricKey) => {
    const metric = KnownMetric[metricKey]
    if (metric) {
      axesMetrics.add(metric)
      disabledAxesMetrics.delete(metric)
    }
  })
  return { axesMetrics, disabledAxesMetrics }
}

function parseIndicators(indicators, KnownMetric, metrics) {
  const MetricIndicators = {}

  if (!indicators) return MetricIndicators

  metrics.forEach((metricKey) => {
    if (!indicators[metricKey]) {
      // HACK(vanguard): forcing indicator parse from metric key
      metricKey = metricKey.slice(metricKey.indexOf('_') + 1)
      if (!indicators[metricKey]) return
    }

    const metric = getMetric(metricKey)

    if (!metric) return

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

function parseMergedMetric(metricKey) {
  const mergedMetricKeys = metricKey.split(MERGED_DIVIDER)
  if (mergedMetricKeys.length < 2) return

  return buildMergedMetric(mergedMetricKeys.map((key) => HolderDistributionMetric[key]))
}

function parseMergedMetrics(metrics, KnownMetric) {
  const mergedMetrics = []
  metrics.forEach((metricKey) => {
    let metric
    try {
      metric = parseMergedMetric(metricKey)
    } catch (e) {
      return
    }

    if (metric) {
      mergedMetrics.push(metric)
      KnownMetric[metricKey] = metric
    }
  })
  return mergedMetrics
}

function parseMetrics(metrics, comparables = [], KnownMetric) {
  return metrics
    .concat(comparables)
    .map((key) => parseMetric(key, KnownMetric))
    .filter(Boolean)
}

function parseProjectCombinedMetrics(metric) {
  return getProjectMetricByKey(metric.key, undefined, {
    getMetricByKey: () => metric,
    parseSlug: false,
  })
}

function parseCombinedMetrics(metrics, KnownMetric) {
  return (metrics || []).map(({ k, exp, l, bm }) => {
    let metric = newExpessionMetric(bm.map(getMetric), exp, l)
    metric.key = k

    if (checkIsProjectMetricKey(k)) {
      metric = parseProjectCombinedMetrics(metric)
    }

    KnownMetric[k] = metric
    return metric
  })
}

export function parseWidget(widget) {
  const newExternalWidget = ExternalWidgetCreator[widget.widget]
  if (newExternalWidget) return newExternalWidget()

  const Widget = getWidgetByKey(widget.widget)
  const KnownMetric = {}

  if (widget.wm) {
    return Object.assign(
      Widget,
      parseChartWidget(widget, {
        parseSubwidgets,
      }),
    )
  }

  const { metrics, indicators, settings } = widget
  parseCombinedMetrics(widget.combinedMetrics, KnownMetric)
  Widget.metricIndicators = parseIndicators(indicators, KnownMetric, metrics)
  Widget.mergedMetrics = parseMergedMetrics(metrics, KnownMetric)
  Widget.metrics = parseMetrics(metrics, widget.comparables, KnownMetric)
  Widget.metricSettings = parseMetricGraphValue(settings, KnownMetric, metrics)
  Widget.colors = parseMetricGraphValue(widget.colors, KnownMetric, metrics)
  Object.assign(Widget, parseAxesMetrics(widget.axesMetrics, KnownMetric))
  Object.assign(Widget, parseSubwidgets(widget.connectedWidgets))
  Widget.drawings = parseDrawings(widget.drawings)
  const { signalMetrics = [] } = widget
  Widget.signalMetrics = parseMetrics(signalMetrics, undefined, KnownMetric)
  Widget.holderLabels = widget.holderLabels
  Widget.isSharedAxisEnabled = widget.wcsa
  Widget.chartAddons = parseChartAddons(widget.wcadon)

  return Widget
}

// export function parseWidgets(widgets) {
//   return widgets.map(parseWidget)
// }

// function tryParseWidgets(widgets) {
//   try {
//     return parseWidgets(JSON.parse(widgets))
//   } catch (e) {
//     console.error(e)
//   }
// }

// function tryParseSharedSidewidget(sidewidget) {
//   try {
//     return parseSharedSidepanel(sidewidget)
//   } catch (e) {
//     console.error(e)
//   }
// }

// function tryParseSettings(settings) {
//   try {
//     return JSON.parse(settings)
//   } catch (e) {
//     console.error(e)
//   }
// }

// export function parseUrl(url) {
//   const { settings, widgets, sidepanel, layout } = parse(url.slice(url.indexOf('?')))

//   return {
//     settings: settings && tryParseSettings(settings),
//     widgets: widgets && tryParseWidgets(widgets),
//     sidewidget: sidepanel && tryParseSharedSidewidget(sidepanel),
//     layout,
//   }
// }

// export function useUrlParse(parsedUrl) {
//   return useMemo(() => {
//     if (parsedUrl) return parsedUrl
//     const { widgets, settings, sidewidget } = parseUrl(window.location.search)

//     return {
//       settings,
//       widgets,
//       sidewidget,
//     }
//   }, [])
// }
