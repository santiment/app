import { parse } from 'query-string'
import { COMPARE_CONNECTOR, toArray } from './utils'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from '../defaults'
import ChartWidget from '../Widget/ChartWidget'
import {
  buildMergedMetric,
  MERGED_DIVIDER
} from '../Widget/HolderDistributionWidget/utils'
import { TypeToWidget } from '../Widget/types'
import { buildComparedMetric, buildCompareKey } from '../Compare/utils'
import {
  Indicator,
  cacheIndicator
} from '../Chart/MetricSettings/IndicatorsSetting'
import { HolderDistributionMetric } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { Metric } from '../../dataHub/metrics'
import { Submetrics } from '../../dataHub/submetrics'
import { tryMapToTimeboundMetric } from '../../dataHub/timebounds'
import { CompatibleMetric } from '../../dataHub/metrics/compatibility'

function sanitize (array) {
  if (!array) return

  const cleaned = array.filter(Boolean)
  return cleaned.length === 0 ? undefined : cleaned
}

function parseValue (value) {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }

  return value
}

const convertKeysToMetrics = (keys, dict) =>
  keys &&
  toArray(keys)
    .filter(Boolean)
    .map(key => convertKeyToMetric(key, dict))

export const reduceStateKeys = (State, Data) =>
  Object.keys(State).reduce((acc, key) => {
    const value = Data[key]
    if (value) {
      acc[key] = parseValue(value)
    }
    return acc
  }, {})

function searchFromSubmetrics (key) {
  for (let list of Object.values(Submetrics)) {
    const found = list.find(({ key: subMetricKey }) => subMetricKey === key)
    if (found) return found
  }
}

export const convertKeyToMetric = (key, dict = Metric) =>
  dict[key] ||
  CompatibleMetric[key] ||
  searchFromSubmetrics(key) ||
  tryMapToTimeboundMetric(key) ||
  HolderDistributionMetric[key]

export function parseComparable (comparable) {
  const [slug, ticker, metricKey] = comparable.split(COMPARE_CONNECTOR)
  const metric = convertKeyToMetric(metricKey, Metric)

  if (!metric) return undefined

  const project = {
    slug,
    ticker
  }

  return {
    key: buildCompareKey(metric, project),
    metric,
    project
  }
}

const parseConnectedWidget = ({ widget, from, to }) =>
  TypeToWidget[widget].new({
    datesRange: from && to ? [new Date(from), new Date(to)] : undefined
  })

function parseSharedComparables (comparables) {
  if (!comparables) return

  const arr = toArray(comparables)

  return arr.map(parseComparable)
}

function parseMetricSetting (MetricSetting = {}, comparingMetrics = []) {
  const MetricSettingMap = new Map()

  const comparingMetricsMap = comparingMetrics.reduce((acc, item) => {
    acc[item.key] = item
    return acc
  }, {})

  Object.keys(MetricSetting).forEach(key => {
    const metric = Metric[key] || comparingMetricsMap[key]
    if (!metric) return

    MetricSettingMap.set(metric, MetricSetting[key])
  })

  return MetricSettingMap
}

function extractMergedMetrics (metrics) {
  const mergedMetrics = []
  const cleanedMetrics = []

  for (let i = 0; i < metrics.length; i++) {
    const metric = metrics[i]
    const mergedMetricKeys = metric.split(MERGED_DIVIDER)
    if (mergedMetricKeys.length < 2) {
      cleanedMetrics.push(metric)
      continue
    }

    mergedMetrics.push(
      buildMergedMetric(
        mergedMetricKeys.map(key => HolderDistributionMetric[key])
      )
    )
  }

  return [mergedMetrics, cleanedMetrics]
}

function parseMetricIndicators (indicators) {
  console.log(indicators)
  const MetricIndicators = {}
  const indicatorMetrics = []

  Object.keys(indicators || {}).forEach(metricKey => {
    MetricIndicators[metricKey] = new Set(
      indicators[metricKey].map(indicatorKey => {
        const indicator = Indicator[indicatorKey]
        const metric = convertKeyToMetric(metricKey)

        if (metric) {
          indicatorMetrics.push(cacheIndicator(metric, indicator))
        }

        return indicator
      })
    )
  })

  return [MetricIndicators, indicatorMetrics]
}

export function parseSharedWidgets (sharedWidgets) {
  return sharedWidgets.map(
    ({
      widget,
      metrics,
      comparables,
      connectedWidgets,
      colors,
      settings,
      indicators
    }) => {
      const [mergedMetrics, cleanedMetrics] = extractMergedMetrics(metrics)

      const parsedComparables = comparables.map(parseComparable)
      const comparedMetrics = parsedComparables.map(buildComparedMetric)
      const parsedSettings = parseMetricSetting(settings, comparedMetrics)
      const [parsedMetricIndicators, indicatorMetrics] = parseMetricIndicators(
        indicators
      )

      return TypeToWidget[widget].new({
        mergedMetrics,
        metrics: cleanedMetrics
          .map(key => convertKeyToMetric(key))
          .filter(Boolean)
          .concat(mergedMetrics)
          .concat(indicatorMetrics),
        comparables: parsedComparables,
        connectedWidgets: connectedWidgets
          ? connectedWidgets.map(parseConnectedWidget)
          : [],
        MetricColor: colors,
        MetricSettingMap: parsedSettings,
        MetricIndicators: parsedMetricIndicators
      })
    }
  )
}

export function parseWidgets (urlWidgets) {
  try {
    return parseSharedWidgets(JSON.parse(urlWidgets))
  } catch (e) {
    console.error(e)
  }
}

function parseSharedSidepanel (sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function translateMultiChartToWidgets (metrics, comparables) {
  if (metrics.length + comparables.length < 2) {
    return [
      ChartWidget.new({
        metrics,
        comparables
      })
    ]
  }

  const noPriceMetrics = metrics.filter(metric => metric !== Metric.price_usd)
  const hasPrice = noPriceMetrics.length < metrics.length

  return noPriceMetrics
    .map(metric =>
      ChartWidget.new({
        metrics: hasPrice ? [Metric.price_usd, metric] : [metric]
      })
    )
    .concat(
      comparables.map(comparable =>
        ChartWidget.new({
          metrics: hasPrice ? [Metric.price_usd] : [],
          comparables: [comparable]
        })
      )
    )
}

function translateV1ToV2 (v1Config) {
  const { metrics = [], comparables = [], settings, options } = v1Config

  let widgets
  if (options.isMultiChartsActive) {
    widgets = translateMultiChartToWidgets(metrics, comparables)
  } else if (metrics.length || comparables.length) {
    widgets = [
      ChartWidget.new({
        comparables,
        metrics
      })
    ]
  }

  return {
    settings,
    widgets
  }
}

export function parseUrl (
  url,
  settings = DEFAULT_SETTINGS,
  options = DEFAULT_OPTIONS
) {
  const data = parse(url, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(settings, data),
    options: reduceStateKeys(options, data),
    metrics: sanitize(convertKeysToMetrics(data.metrics, Metric)),
    events: sanitize(convertKeysToMetrics(data.events, Event)),
    comparables: sanitize(parseSharedComparables(data.comparables))
  }
}

export function parseUrlV2 (url) {
  const { settings, widgets, sidepanel } = parse(url)

  if (!widgets) {
    const parsedV1Config = parseUrl(url)
    return translateV1ToV2(parsedV1Config)
  }

  return {
    settings: settings && JSON.parse(settings),
    widgets: widgets && parseWidgets(widgets),
    sidepanel: sidepanel && parseSharedSidepanel(sidepanel)
  }
}
