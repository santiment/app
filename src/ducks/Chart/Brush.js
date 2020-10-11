import { useState, useEffect } from 'react'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import { useChart, useChartSetter, useChartRedraw } from './context'
import { dayBrushPaintConfig, nightBrushPaintConfig } from './paintConfigs'
import { useTheme } from '../../stores/ui/theme'
import { brush as brushClassName } from './index.module.scss'

export const BRUSH_HEIGHT = 40

const Brush = ({ data, categories }) => {
  const chart = useChart()
  const { isNightMode } = useTheme()
  const [brush, setBrush] = useState()

  useEffect(
    () => {
      if (!chart) return

      const width = chart.canvasWidth

      const brush = initBrush(chart, width, BRUSH_HEIGHT, dayBrushPaintConfig)
      brush.canvas.classList.add(brushClassName)

      setBrush(brush)
    },
    [chart]
  )

  useEffect(
    () => {
      if (brush) {
        brush.paintConfig = isNightMode
          ? nightBrushPaintConfig
          : dayBrushPaintConfig
      }
    },
    [brush, isNightMode]
  )

  return null
}

export default Brush
