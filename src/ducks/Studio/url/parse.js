import { parse } from 'query-string'
import { COMPARE_CONNECTOR, toArray } from './utils'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from '../defaults'
import {
  checkIsProjectMetricKey,
  newProjectMetric,
  getProjectMetricByKey,
  getMetricByKey
} from '../metrics'
import ChartWidget from '../Widget/ChartWidget'
import {
  buildMergedMetric,
  MERGED_DIVIDER
} from '../Widget/HolderDistributionWidget/utils'
import { TypeToWidget } from '../Widget/types'
import {
  Indicator,
  cacheIndicator
} from '../Chart/MetricSettings/IndicatorsSetting'
import { HolderDistributionMetric } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { Metric } from '../../dataHub/metrics'

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
    .map(getMetricByKey)

export const reduceStateKeys = (State, Data) =>
  Object.keys(State).reduce((acc, key) => {
    const value = Data[key]
    if (value) {
      acc[key] = parseValue(value)
    }
    return acc
  }, {})

const parseConnectedWidget = ({ widget, from, to }) =>
  TypeToWidget[widget].new({
    datesRange: from && to ? [new Date(from), new Date(to)] : undefined
  })

export const parseComparable = key =>
  getProjectMetricByKey(key, COMPARE_CONNECTOR)
const parseSharedComparables = keys =>
  keys ? toArray(keys).map(parseComparable) : []

function parseMetricSetting (MetricSetting = {}, metrics = []) {
  const MetricSettingMap = new Map()

  const KeyMetric = metrics.reduce((acc, item) => {
    acc[item.key] = item
    return acc
  }, {})

  Object.keys(MetricSetting).forEach(key => {
    const metric = KeyMetric[key]
    if (!metric) return

    MetricSettingMap.set(metric, MetricSetting[key])
  })

  return MetricSettingMap
}

function extractMergedMetrics (metrics) {
  const mergedMetrics = []
  const cleanedMetricKeys = []

  for (let i = 0; i < metrics.length; i++) {
    const metric = metrics[i]
    const mergedMetricKeys = metric.split(MERGED_DIVIDER)
    if (mergedMetricKeys.length < 2) {
      cleanedMetricKeys.push(metric)
      continue
    }

    mergedMetrics.push(
      buildMergedMetric(
        mergedMetricKeys.map(key => HolderDistributionMetric[key])
      )
    )
  }

  return [mergedMetrics, cleanedMetricKeys]
}

function parseMetricIndicators (indicators, project) {
  const MetricIndicators = {}
  const indicatorMetrics = []

  Object.keys(indicators || {}).forEach(metricKey => {
    MetricIndicators[metricKey] = new Set(
      indicators[metricKey].map(indicatorKey => {
        const indicator = Indicator[indicatorKey]
        const metric = checkIsProjectMetricKey(metricKey)
          ? getProjectMetricByKey(metricKey)
          : newProjectMetric(project, getMetricByKey(metricKey))

        if (metric) {
          indicatorMetrics.push(cacheIndicator(metric, indicator))
        }

        return indicator
      })
    )
  })

  return [MetricIndicators, indicatorMetrics]
}

function parseMetric (key, project) {
  if (checkIsProjectMetricKey(key)) {
    return getProjectMetricByKey(key)
  }

  const holderMetric = HolderDistributionMetric[key]
  if (holderMetric) return holderMetric

  return newProjectMetric(project, getMetricByKey(key))
}

export function parseSharedWidgets (sharedWidgets, project) {
  const parseProjectMetric = key => parseMetric(key, project)

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
      const [holderMetrics, cleanedMetricKeys] = extractMergedMetrics(metrics)
      const cleanedMetrics = cleanedMetricKeys.map(parseProjectMetric)
      const comparedMetrics = parseSharedComparables(comparables)
      const [parsedMetricIndicators, indicatorMetrics] = parseMetricIndicators(
        indicators,
        project
      )

      const parsedMetrics = cleanedMetrics
        .filter(Boolean)
        .concat(comparedMetrics)
        .concat(holderMetrics)
        .concat(indicatorMetrics)

      const parsedSettings = parseMetricSetting(settings, parsedMetrics)

      return TypeToWidget[widget].new({
        mergedMetrics: holderMetrics,
        metrics: parsedMetrics,
        // comparables: parsedComparables,
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

export function parseWidgets (urlWidgets, project) {
  try {
    return parseSharedWidgets(JSON.parse(urlWidgets), project)
  } catch (e) {
    console.error(e)
  }
}

function parseSharedSidepanel (sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function translateMultiChartToWidgets (metrics, comparables = []) {
  if (metrics.length + comparables.length < 2) {
    return [
      ChartWidget.new({
        metrics,
        comparables
      })
    ]
  }

  let priceMetric
  const noPriceMetrics = metrics.filter(metric => {
    if (metric.queryKey !== Metric.price_usd.key) return true

    priceMetric = metric
    return false
  })

  return noPriceMetrics
    .map(metric =>
      ChartWidget.new({
        metrics: priceMetric ? [priceMetric, metric] : [metric]
      })
    )
    .concat(
      comparables.map(comparable =>
        ChartWidget.new({
          metrics: priceMetric ? [Metric.price_usd] : [],
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
    metrics: sanitize(convertKeysToMetrics(data.metrics)),
    comparables: sanitize(parseSharedComparables(data.comparables))
  }
}

export function parseUrlV2 (url) {
  const { settings, widgets, sidepanel } = parse(url)

  if (!widgets) {
    const parsedV1Config = parseUrl(url)
    return translateV1ToV2(parsedV1Config)
  }

  const parsedSettings = settings && JSON.parse(settings)

  return {
    settings: parsedSettings,
    widgets: widgets && parseWidgets(widgets, parsedSettings),
    sidepanel: sidepanel && parseSharedSidepanel(sidepanel)
  }
}
