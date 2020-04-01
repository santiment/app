import { useState, useEffect } from 'react'
import { Metric } from '../dataHub/metrics'

const ALPHA_CHANNEL = '40'

// RESERVED COLORS
const GREEN = '#26C953'
const CYAN = '#68DBF4'
const VIOLET = '#8358FF'
const ORANGE = '#FFAD4D'
const GRAY = '#D2D6E7'

export const COLORS = [
  '#AC948C', // BROWN-GRAY
  '#F47BF7', // PURPLE
  '#FF5B5B', // RED
  '#FFCB47', // YELLOW
  '#785549', // BROWN
  '#5275FF', // BLUE
  '#FF8450', // SALMON
  '#D4E763', // YELLOW-GREEN
  '#FFDAC5', // PEACH
  '#37D7BA' // AQUAMARINE
]

const MetricColor = {
  [Metric.price_usd.key]: GREEN,
  [Metric.volume_usd.key]: GRAY,
  [Metric.social_volume_total.key]: CYAN,
  [Metric.daily_active_addresses.key]: ORANGE,
  [Metric.dev_activity.key]: VIOLET
}

const INITIAL_STATE = {}
export function useChartColors (metrics, focusedMetric) {
  const [chartColors, setChartColors] = useState(INITIAL_STATE)

  useEffect(
    () => {
      const { length } = metrics
      const newColors = {}
      let freeColorIndex = 0

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]
        const { key } = metric

        let color = MetricColor[key] || COLORS[freeColorIndex++]
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
