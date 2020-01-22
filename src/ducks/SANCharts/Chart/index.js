import React, { useState, useEffect, useRef } from 'react'
import {
  initChart,
  updateChartDimensions,
  updateSize,
  updateChartState
} from '@santiment-network/chart'
import {
  initTooltip,
  drawHoverLineX,
  drawHoverLineY,
  drawTooltip,
  drawValueBubble
} from '@santiment-network/chart/tooltip'
import { plotLines } from '@santiment-network/chart/line'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import { handleMove } from '@santiment-network/chart/events'
import { drawReferenceDot } from '@santiment-network/chart/references'
import {
  initBrush,
  setupBrush,
  updateBrushDimensions,
  updateBrushState
} from '@santiment-network/chart/brush'
import { millify } from '../../../utils/formatting'
import { Metrics } from '../data'

import { plotAxes } from './axes'
import {
  clearCtx,
  axesTickFormatters,
  getDateDayMonthYear,
  yBubbleFormatter
} from './utils'
import { tooltipSettings, BRUSH_HEIGHT, CHART_PADDING } from './settings'
import { drawWatermark } from './watermark'
import { drawPaywall } from './paywall'

import styles from './index.module.scss'

const Chart = ({
  chartRef,
  data,
  scale = linearScale,
  syncedColors,
  lines,
  bars,
  daybars,
  events = [],
  leftBoundaryDate,
  rightBoundaryDate
}) => {
  const [chart, setChart] = useState()
  const [brush, setBrush] = useState()
  const canvasRef = useRef()

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    const chart = initTooltip(initChart(canvas, width, 350, CHART_PADDING))
    const brush = initBrush(chart, width, BRUSH_HEIGHT)
    brush.canvas.classList.add(styles.brush)

    setChart(chart)
    setBrush(brush)
    chartRef.current = canvas

    chart.tooltip.canvas.onmousemove = handleMove(chart, point => {
      if (!point) return
      const {
        tooltip: { ctx }
      } = chart
      clearCtx(chart, ctx)

      const {
        x,
        value: datetime,
        priceUsd: { y, value }
      } = point

      drawHoverLineX(chart, x)
      drawHoverLineY(chart, y)

      drawTooltip(ctx, point, tooltipSettings, marker)
      drawValueBubble(chart, yBubbleFormatter(value), 0, y)
      drawValueBubble(
        chart,
        getDateDayMonthYear(datetime),
        x,
        chart.bottom + 14
      )
    })

    chart.tooltip.canvas.onmouseleave = () => {
      clearCtx(chart, chart.tooltip.ctx)
    }
  }, [])

  useEffect(
    () => {
      if (data.length === 0) {
        return
      }

      const { ctx, canvasWidth, canvasHeight } = chart
      clearCtx(chart)
      clearCtx(brush)
      updateChartState(chart, data, daybars.concat(bars).concat(lines))
      setupBrush(brush, chart, data, plotBrushData, onBrushChange)
      plotChart(data)
      plotAxes(chart)
    },
    [data, scale, events]
  )

  function onBrushChange (startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(chart, newData, daybars.concat(bars).concat(lines))

    clearCtx(chart)
    plotChart(newData)
    plotAxes(chart)
  }

  function plotBrushData () {
    plotDayBars(brush, data, daybars, syncedColors, scale)
    plotBars(brush, data, bars, syncedColors, scale)
    plotLines(brush, data, lines, syncedColors, scale)
  }

  function plotChart (data) {
    drawWatermark(chart)
    plotDayBars(chart, data, daybars, syncedColors, scale)
    plotBars(chart, data, bars, syncedColors, scale)

    chart.ctx.lineWidth = 1.5
    chart.ctx.setLineDash([0])
    plotLines(chart, data, lines, syncedColors, scale)

    events.forEach(({ metric, key, datetime, value, color }) =>
      drawReferenceDot(chart, metric, datetime, color, key, value)
    )

    /* if (!hasPremium) { */
    drawPaywall(chart, leftBoundaryDate, rightBoundaryDate)
    /* } */
  }

  function marker (ctx, key, value, x, y) {
    const RADIUS = 4
    if (key === 'isAnomaly') {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'red'
      ctx.stroke()
    } else if (key === 'trendingPosition') {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = value[1]
      ctx.stroke()
    } else {
      ctx.fillStyle = syncedColors[key]
      ctx.fillRect(x, y, 8, 2)
    }
  }

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} />
    </div>
  )
}
export default Chart
