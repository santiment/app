import { useState, useEffect } from 'react'
import { Metrics } from '../metrics/data'

const ALPHA_CHANNEL = '55'

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
export function useChartColors (metrics, FocusedMetric) {
  const [chartColors, setChartColors] = useState(INITIAL_STATE)

  useEffect(
    () => {
      const { length } = metrics
      const newColors = {}
      let freeColorIndex = 0

      for (let i = 0; i < length; i++) {
        const Metric = metrics[i]

        let color = MetricColorMap.get(Metric) || COLORS[freeColorIndex++]
        if (FocusedMetric && Metric !== FocusedMetric) {
          color += ALPHA_CHANNEL
        }

        newColors[Metric.key] = color
      }

      setChartColors(newColors)
    },
    [metrics, FocusedMetric]
  )

  return chartColors
}
