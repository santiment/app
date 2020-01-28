import { useEffect } from 'react'
import { updateChartDimensions, updateSize } from '@santiment-network/chart'
import {
  updateBrushDimensions,
  updateBrushState
} from '@santiment-network/chart/brush'
import { CHART_HEIGHT, BRUSH_HEIGHT } from './settings'

export function onResize (chart, chartPadding, brush, data) {
  const parentWidth = chart.canvas.parentNode.offsetWidth
  if (parentWidth === chart.canvasWidth) {
    return
  }

  updateChartDimensions(chart, parentWidth, CHART_HEIGHT, chartPadding)

  updateSize(
    chart.tooltip.canvas,
    chart.tooltip.ctx,
    chart.dpr,
    parentWidth,
    CHART_HEIGHT
  )

  if (brush) {
    updateBrushDimensions(brush, parentWidth, BRUSH_HEIGHT)
    if (data.length) {
      const { onChange, startIndex, endIndex } = brush
      updateBrushState(brush, chart, data)
      onChange(startIndex, endIndex)
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
