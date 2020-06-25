import React, { useEffect, useRef } from 'react'
import { updateChartDimensions, updateSize } from '@santiment-network/chart'
import {
  updateBrushDimensions,
  updateBrushState,
} from '@santiment-network/chart/brush'
import { BRUSH_HEIGHT } from './settings'

const iframeStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: -1,
}

export const ResizeListener = ({ onResize }) => {
  const iframeRef = useRef(null)
  const iframe = iframeRef.current

  useEffect(onResize, [])

  if (iframe) {
    iframe.contentWindow.onresize = onResize
  }

  return (
    <iframe
      title='resizer'
      ref={iframeRef}
      frameBorder='0'
      style={iframeStyles}
    />
  )
}

export function onResize(
  chart,
  chartPadding,
  brush,
  brushData,
  joinedCategories,
) {
  const parentWidth = chart.canvas.parentNode.offsetWidth
  const chartHeight = chart.canvas.parentNode.offsetHeight

  updateChartDimensions(chart, parentWidth, chartHeight, chartPadding)

  updateSize(
    chart.tooltip.canvas,
    chart.tooltip.ctx,
    chart.dpr,
    parentWidth,
    chartHeight,
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
