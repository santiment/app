import { useEffect } from 'react'
import { updateChartDimensions, updateSize } from '@santiment-network/chart'
import {
  updateBrushDimensions,
  updateBrushState
} from '@santiment-network/chart/brush'
import { BRUSH_HEIGHT } from './settings'

export function onResize (
  chart,
  chartPadding,
  brush,
  brushData,
  chartHeight,
  joinedCategories
) {
  const parentWidth = chart.canvas.parentNode.offsetWidth

  updateChartDimensions(chart, parentWidth, chartHeight, chartPadding)

  updateSize(
    chart.tooltip.canvas,
    chart.tooltip.ctx,
    chart.dpr,
    parentWidth,
    chartHeight
  )

  if (brush) {
    updateBrushDimensions(brush, parentWidth, BRUSH_HEIGHT)
    if (brushData.length) {
      updateBrushState(brush, brushData, joinedCategories)
    }
  }
}

export const useResizeEffect = (clb, deps) =>
  useEffect(() => {
    window.addEventListener('resize', clb)

    return () => {
      window.removeEventListener('resize', clb)
    }
  }, deps)
