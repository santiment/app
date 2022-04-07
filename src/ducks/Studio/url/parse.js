import { parse } from 'query-string'
import { COMPARE_CONNECTOR, toArray } from './utils'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS } from '../defaults'
import {
  checkIsProjectMetricKey,
  getProjectMetricByKey,
  getMetricByKey,
  buildProjectMetricKey,
} from '../metrics'
import { buildCompareKey } from '../Compare/utils'
import ChartWidget from '../Widget/ChartWidget'
import { TypeToWidget } from '../Widget/types'
import { buildMergedMetric, MERGED_DIVIDER } from '../Widget/HolderDistributionWidget/utils'
import { Indicator, cacheIndicator } from '../Chart/MetricSettings/IndicatorsSetting'
import { HolderDistributionMetric } from '../Chart/Sidepanel/HolderDistribution/metrics'
import { Metric } from '../../dataHub/metrics'

function sanitize(array) {
  if (!array) return

  const cleaned = array.filter(Boolean)
  return cleaned.length === 0 ? undefined : cleaned
}

function parseValue(value) {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }

  return value
}

const convertKeysToMetrics = (keys, dict) =>
  keys && toArray(keys).filter(Boolean).map(getMetricByKey)

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
    datesRange: from && to ? [new Date(from), new Date(to)] : undefined,
  })

export const parseComparable = (key) => getProjectMetricByKey(key, COMPARE_CONNECTOR)

function parseSharedComparables(keys) {
  const comparedKeys = keys ? toArray(keys) : []
  const comparables = []
  const SharedKeyComparable = {}

  for (let i = 0; i < comparedKeys.length; i++) {
    const metric = parseComparable(comparedKeys[i])
    comparables.push(metric)
    SharedKeyComparable[buildCompareKey(metric.base, metric.project)] = metric
  }

  return [comparables, SharedKeyComparable]
}

function parseColors(
  colors = {},
  project,
  SharedKeyIndicator,
  SharedKeyComparable,
  SharedKeyMergedHolder,
) {
  const Colors = {}

  Object.keys(colors).forEach((key) => {
    let metricKey = checkIsProjectMetricKey(key) ? key : getMetricByKey(key) && key

    if (!metricKey) {
      const sharedMetric =
        SharedKeyIndicator[key] || SharedKeyComparable[key] || SharedKeyMergedHolder[key]
      metricKey = sharedMetric ? sharedMetric.key : buildProjectMetricKey(project, { key })
    }

    Colors[metricKey] = colors[key]
  })

  return Colors
}

function parseMetricSetting(MetricSetting = {}, SharedKeyIndicator, SharedKeyComparable) {
  const MetricSettingMap = new Map()

  Object.keys(MetricSetting).forEach((key) => {
    const metric = parseMetric(key, SharedKeyIndicator, SharedKeyComparable)
    if (!metric) return

    MetricSettingMap.set(metric, MetricSetting[key])
  })

  return MetricSettingMap
}

function extractMergedMetrics(metrics) {
  const mergedMetrics = []
  const cleanedMetricKeys = []
  const SharedKeyMergedHolder = {}
  let isPriceUnhandled = true

  for (let i = 0; i < metrics.length; i++) {
    const metric = metrics[i]
    const mergedMetricKeys = metric.split(MERGED_DIVIDER)

    if (mergedMetricKeys.length < 2) {
      if (isPriceUnhandled && metric === Metric.price_usd.key) {
        isPriceUnhandled = false
        cleanedMetricKeys.unshift(metric)
      } else {
        cleanedMetricKeys.push(metric)
      }
      continue
    }

    const mergedMetric = buildMergedMetric(
      mergedMetricKeys.map((key) => HolderDistributionMetric[key]),
    )
    mergedMetrics.push(mergedMetric)
    SharedKeyMergedHolder[metric] = mergedMetric
  }

  return [mergedMetrics, cleanedMetricKeys, SharedKeyMergedHolder]
}

function parseMetricIndicators(indicators) {
  const MetricIndicators = {}
  const SharedKeyIndicator = {}

  Object.keys(indicators || {}).forEach((metricKey) => {
    const metric = checkIsProjectMetricKey(metricKey)
      ? getProjectMetricByKey(metricKey)
      : getMetricByKey(metricKey)

    MetricIndicators[metric.key] = new Set(
      indicators[metricKey].map((indicatorKey) => {
        const indicator = Indicator[indicatorKey]

        if (metric) {
          const indicatorMetric = cacheIndicator(metric, indicator)
          SharedKeyIndicator[`${indicatorKey}_${metricKey}`] = indicatorMetric
        }

        return indicator
      }),
    )
  })

  return [MetricIndicators, SharedKeyIndicator]
}

function parseMetric(key, ParsedKeyMetric, SharedKeyComparable) {
  const metric = ParsedKeyMetric[key] || SharedKeyComparable[key]
  if (metric) return metric

  if (checkIsProjectMetricKey(key)) {
    return getProjectMetricByKey(key)
  }

  return getMetricByKey(key)
}

function parseAxesMetrics(
  axesMetrics,
  metrics,
  SharedKeyIndicator,
  SharedKeyComparable,
  SharedKeyMergedHolder,
) {
  if (!axesMetrics) return [new Set(), new Set()]

  const axesMetricSet = new Set()
  const disabledAxesMetricSet = new Set(metrics)

  axesMetrics.forEach((key) => {
    const metric =
      parseMetric(key, SharedKeyIndicator, SharedKeyComparable) || SharedKeyMergedHolder[key]

    disabledAxesMetricSet.delete(metric)
    axesMetricSet.add(metric)
  })

  return [axesMetricSet, disabledAxesMetricSet]
}

export function parseSharedWidgets(sharedWidgets, project) {
  return sharedWidgets.map(
    ({
      widget,
      metrics,
      comparables,
      connectedWidgets,
      colors,
      settings,
      indicators,
      drawings,
      axesMetrics,
    }) => {
      const [parsedMetricIndicators, SharedKeyIndicator] = parseMetricIndicators(indicators)
      const [holderMetrics, cleanedMetricKeys, SharedKeyMergedHolder] =
        extractMergedMetrics(metrics)
      const [comparedMetrics, SharedKeyComparable] = parseSharedComparables(comparables)
      const cleanedMetrics = cleanedMetricKeys.map((key) =>
        parseMetric(key, SharedKeyIndicator, SharedKeyComparable),
      )

      const parsedMetrics = cleanedMetrics
        .filter(Boolean)
        .concat(comparedMetrics)
        .concat(holderMetrics)

      const [axesMetricSet, disabledAxesMetricSet] = parseAxesMetrics(
        axesMetrics,
        parsedMetrics,
        SharedKeyIndicator,
        SharedKeyComparable,
        SharedKeyMergedHolder,
      )

      return TypeToWidget[widget].new({
        drawings,
        axesMetricSet,
        disabledAxesMetricSet,
        mergedMetrics: holderMetrics,
        metrics: parsedMetrics,
        connectedWidgets: connectedWidgets ? connectedWidgets.map(parseConnectedWidget) : [],
        MetricColor: parseColors(
          colors,
          project,
          SharedKeyIndicator,
          SharedKeyComparable,
          SharedKeyMergedHolder,
        ),
        MetricSettingMap: parseMetricSetting(settings, SharedKeyIndicator, SharedKeyComparable),
        MetricIndicators: parsedMetricIndicators,
      })
    },
  )
}

export function parseWidgets(urlWidgets, project) {
  try {
    return parseSharedWidgets(JSON.parse(urlWidgets), project)
  } catch (e) {
    console.error(e)
  }
}

export function parseSharedSidepanel(sidepanel) {
  const parsed = JSON.parse(sidepanel)
  return parsed.type
}

export function translateMultiChartToWidgets(metrics, comparables = []) {
  if (metrics.length + comparables.length < 2) {
    return [
      ChartWidget.new({
        metrics,
        comparables,
      }),
    ]
  }

  let priceMetric
  const noPriceMetrics = metrics.filter((metric) => {
    if (metric.queryKey !== Metric.price_usd.key) return true

    priceMetric = metric
    return false
  })

  return noPriceMetrics
    .map((metric) =>
      ChartWidget.new({
        metrics: priceMetric ? [priceMetric, metric] : [metric],
      }),
    )
    .concat(
      comparables.map((comparable) =>
        ChartWidget.new({
          metrics: priceMetric ? [Metric.price_usd] : [],
          comparables: [comparable],
        }),
      ),
    )
}

function translateV1ToV2(v1Config) {
  const { metrics = [], comparables = [], settings, options } = v1Config

  let widgets
  if (options.isMultiChartsActive) {
    widgets = translateMultiChartToWidgets(metrics, comparables)
  } else if (metrics.length || comparables.length) {
    widgets = [
      ChartWidget.new({
        comparables,
        metrics,
      }),
    ]
  }

  return {
    settings,
    widgets,
  }
}

export function parseUrl(url, settings = DEFAULT_SETTINGS, options = DEFAULT_OPTIONS) {
  const data = parse(url, { arrayFormat: 'comma' })

  return {
    settings: reduceStateKeys(settings, data),
    options: reduceStateKeys(options, data),
    metrics: sanitize(convertKeysToMetrics(data.metrics)),
    comparables: sanitize(parseSharedComparables(data.comparables)[0]),
  }
}

export function parseUrlV2(url) {
  const { settings, widgets, sidepanel } = parse(url)

  if (!widgets) {
    const parsedV1Config = parseUrl(url)
    return translateV1ToV2(parsedV1Config)
  }

  const parsedSettings = settings && JSON.parse(settings)

  return {
    settings: parsedSettings,
    widgets: widgets && parseWidgets(widgets, parsedSettings),
    sidepanel: sidepanel && parseSharedSidepanel(sidepanel),
  }
}
