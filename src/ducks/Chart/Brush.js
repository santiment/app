import { useState, useEffect } from 'react'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import { useChart, useChartRedraw, useChartPlotter } from './context'
import { dayBrushPaintConfig, nightBrushPaintConfig } from './paintConfigs'
import { clearCtx } from './utils'
import { useTheme } from '../../stores/ui/theme'
import { brush as brushClassName } from './index.module.scss'

export const BRUSH_HEIGHT = 40

function getBrushPlotItems ({ items }) {
  const brushItems = new Map(items)

  brushItems.delete('cartesianGrid')
  brushItems.delete('axes')

  return brushItems
}

const Brush = ({ data, categories }) => {
  const chart = useChart()
  const plotter = useChartPlotter()
  const { isNightMode } = useTheme()
  const [brush, setBrush] = useState()

  useEffect(
    () => {
      if (!chart) return

      const width = chart.canvasWidth

      const brush = initBrush(
        chart,
        width,
        BRUSH_HEIGHT,
        dayBrushPaintConfig,
        () => {}
      )
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

  useEffect(
    () => {
      if (!brush) return

      clearCtx(brush)
      const { scale, colors } = chart

      if (!scale || data.length === 0) return

      updateBrushState(brush, data, categories.joinedCategories)

      getBrushPlotItems(plotter).forEach(plot => {
        plot(brush, scale, data, colors, categories)
      })
    },
    [brush, data]
  )

  return null
}

export default Brush
