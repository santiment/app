import { useState, useEffect } from 'react'
import { Metrics } from '../data'

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

const MetricColorMap = new Map()
MetricColorMap.set(Metrics.price_usd, GREEN)
MetricColorMap.set(Metrics.volume_usd, GRAY)
MetricColorMap.set(Metrics.social_volume_total, CYAN)
MetricColorMap.set(Metrics.daily_active_addresses, ORANGE)
MetricColorMap.set(Metrics.dev_activity, VIOLET)

const INITIAL_STATE = {}
export function useChartColors (metrics) {
  const [chartColors, setChartColors] = useState(INITIAL_STATE)

  useEffect(
    () => {
      const { length } = metrics
      const newColors = {}
      let freeColorIndex = 0

      for (let i = 0; i < length; i++) {
        const metric = metrics[i]

        newColors[metric.key] =
          MetricColorMap.get(metric) || COLORS[freeColorIndex++]
      }

      setChartColors(newColors)
    },
    [metrics]
  )

  return chartColors
}
