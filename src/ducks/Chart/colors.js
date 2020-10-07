import { useState, useEffect, useMemo } from 'react'
import { Metric } from '../dataHub/metrics'

const ALPHA_CHANNEL = '29'

// RESERVED COLORS
export const GREEN = '#26C953'
export const RED = '#FF5B5B'
const CYAN = '#68DBF4'
const VIOLET = '#8358FF'
const ORANGE = '#FFAD4D'
const GRAY = '#D2D6E7'

export const COLORS = [
  '#AC948C', // BROWN-GRAY
  '#F47BF7', // PURPLE
  RED, // RED
  '#FFCB47', // YELLOW
  '#785549', // BROWN
  '#5275FF', // BLUE
  '#FF8450', // SALMON
  '#D4E763', // YELLOW-GREEN
  '#FFDAC5', // PEACH
  '#37D7BA', // AQUAMARINE
  '#777777', // GREY
  '#222222', // BLACK

  '#14c393', // jungle-green,
  '#7a859e', // waterloo
  '#174d4a', // jungle-green-dark-3
  '#ffe7ca', // texas-rose-light-2
  '#efa7a7', // persimmon-light-2
  '#dcf6ef', // jungle-green-light-2,
  '#3b3130', // texas-rose-dark,
  '#c9c2ff' // heliotrope-light-2
]

export const COLORS_SET = new Set(COLORS)

const MetricColor = {
  [Metric.price_usd.key]: GREEN,
  [Metric.volume_usd.key]: GRAY,
  [Metric.social_volume_total.key]: CYAN,
  [Metric.daily_active_addresses.key]: ORANGE,
  [Metric.dev_activity.key]: VIOLET,
  [Metric.mvrv_usd.key]: ORANGE
}

function getUnusedColors (usedColorsSet) {
  const unusedColorsSet = new Set(COLORS_SET)

  usedColorsSet.forEach(color => unusedColorsSet.delete(color))

  return [...unusedColorsSet]
}

function preserveExistingMetricColor (metrics, PreviousColor) {
  const PreservedColor = {}
  const uncoloredMetrics = []
  const { length } = metrics

  for (let i = 0; i < length; i++) {
    const { key } = metrics[i]
    const color = PreviousColor[key]

    if (color) {
      PreservedColor[key] = color
    } else {
      uncoloredMetrics.push(key)
    }
  }

  return [uncoloredMetrics, PreservedColor]
}

export function getChartColors (metrics, PreviousColor = {}) {
  const [uncoloredMetrics, Color] = preserveExistingMetricColor(
    metrics,
    PreviousColor
  )
  const unusedColors = getUnusedColors(Object.values(Color))

  let freeColorIndex = 0
  const { length } = uncoloredMetrics

  for (let i = 0; i < length; i++) {
    const metricKey = uncoloredMetrics[i]
    Color[metricKey] = MetricColor[metricKey] || unusedColors[freeColorIndex++]
  }

  return Color
}

export function highlightMetricColor (MetricColor, focusedMetricKey) {
  if (!focusedMetricKey) {
    return MetricColor
  }

  const NewColor = {}

  Object.keys(MetricColor).forEach(metricKey => {
    let color = MetricColor[metricKey]

    if (metricKey !== focusedMetricKey) {
      color += ALPHA_CHANNEL
    }

    NewColor[metricKey] = color
  })

  return NewColor
}

const INITIAL_STATE = {}
export function useChartColors (metrics, initialState = INITIAL_STATE) {
  const [ChartColor, setChartColors] = useState(initialState)

  useEffect(
    () => {
      setChartColors(getChartColors(metrics, ChartColor))
    },
    [metrics]
  )

  return ChartColor
}

export function useHighlightMetricColor (MetricColor, focusedMetricKey) {
  return useMemo(() => highlightMetricColor(MetricColor, focusedMetricKey), [
    MetricColor,
    focusedMetricKey
  ])
}

export function useChartColorsWithHighlight (metrics, focusedMetricKey) {
  return useHighlightMetricColor(useChartColors(metrics), focusedMetricKey)
}
