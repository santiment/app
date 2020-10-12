import { useState, useEffect } from 'react'
import {
  initBrush,
  updateBrushState,
  updateBrushDimensions
} from '@santiment-network/chart/brush'
import { useChart, useChartPlotter } from './context'
import { dayBrushPaintConfig, nightBrushPaintConfig } from './paintConfigs'
import { clearCtx } from './utils'
import { useTheme } from '../../stores/ui/theme'
import { brush as brushClassName } from './index.module.scss'

const BRUSH_HEIGHT = 40
const noop = () => {}

function getBrushPlotItems ({ items }) {
  const brushItems = new Map(items)

  brushItems.delete('cartesianGrid')
  brushItems.delete('axes')

  return brushItems
}

const Brush = ({ data, categories, scale, colors, domainGroups }) => {
  const chart = useChart()
  const plotter = useChartPlotter()
  const { isNightMode } = useTheme()
  const [brush, setBrush] = useState()

  useEffect(
    () => {
      if (!chart) return

      const width = chart.canvasWidth

      const brush = initBrush(chart, width, BRUSH_HEIGHT, dayBrushPaintConfig)
      brush.canvas.classList.add(brushClassName)

      brush.plotBrushData = noop
      brush.redraw = noop
      brush.updateWidth = width => {
        updateBrushDimensions(brush, width, BRUSH_HEIGHT)
        brush.redraw()
      }

      chart.brush = brush
      setBrush(brush)
    },
    [chart]
  )

  useEffect(
    () => {
      if (!brush) return

      clearCtx(brush)
      brush.paintConfig = isNightMode
        ? nightBrushPaintConfig
        : dayBrushPaintConfig

      if (data.length === 0) return

      brush.plotBrushData = () =>
        getBrushPlotItems(plotter).forEach(plot => {
          plot(brush, scale, data, colors, categories)
        })
      brush.redraw = () =>
        updateBrushState(brush, data, categories.joinedCategories)

      brush.redraw()
    },
    [brush, data, colors, domainGroups, isNightMode]
  )

  return null
}

export default Brush
