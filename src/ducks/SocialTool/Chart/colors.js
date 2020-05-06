import { useState, useEffect } from 'react'
import { Metric } from '../../dataHub/metrics'

const ALPHA_CHANNEL = '40'

export const SOCIAL_VOLUME_COLORS = [
  '#68DBF4', // CYAN
  '#FF5B5B', // RED
  '#5275FF', // BLUE
  '#AC948C', // BROWN-GRAY
  '#D4E763' // YELLOW-GREEN
]

export const SOCIAL_DOMINANCE_COLORS = [
  '#FFCB47', // YELLOW
  '#F47BF7', // PURPLE
  '#FF8450', // SALMON
  '#FFDAC5', // PEACH
  '#37D7BA' // AQUAMARINE
]

const COLORS = {
  [Metric.social_dominance_total.key]: SOCIAL_DOMINANCE_COLORS,
  [Metric.social_volume_total.key]: SOCIAL_VOLUME_COLORS
}

const MetricColor = {
  [Metric.price_usd.key]: '#26C953' // GREEN
}

const INITIAL_STATE = {}
export function useChartColors (metrics, focusedMetric) {
  const [chartColors, setChartColors] = useState(INITIAL_STATE)

  useEffect(
    () => {
      const { length } = metrics
      const newColors = {}
      let freeColorIndex = {}

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]
        const { key, queryKey = key } = metric

        if (!MetricColor[key] && freeColorIndex[queryKey] === undefined) {
          freeColorIndex[queryKey] = 0
        }

        let color =
          MetricColor[key] || COLORS[queryKey][freeColorIndex[queryKey]++]
        if (focusedMetric && metric !== focusedMetric) {
          color += ALPHA_CHANNEL
        }

        newColors[key] = color
      }

      setChartColors(newColors)
    },
    [metrics, focusedMetric]
  )

  return chartColors
}
