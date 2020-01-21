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
import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import {
  initBrush,
  setupBrush,
  updateBrushDimensions,
  updateBrushState
} from '@santiment-network/chart/brush'
import { millify } from '../../../utils/formatting'
import { Metrics } from '../data'
import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../../utils/dates'
import { tooltipSettings, clearCtx } from './utils'

import styles from './index.module.scss'

const BRUSH_HEIGHT = 40

const CHART_PADDING = {
  top: 10,
  right: 0,
  bottom: 23 + BRUSH_HEIGHT + 10,
  left: 45
}

const Chart = ({
  data,
  scale = linearScale,
  syncedColors,
  lines,
  bars,
  events = []
}) => {
  const [chart, setChart] = useState()
  const [brush, setBrush] = useState()
  const canvasRef = useRef()

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    const chart = initTooltip(initChart(canvas, width, 300, CHART_PADDING))
    const brush = initBrush(chart, width, BRUSH_HEIGHT)
    brush.canvas.classList.add(styles.brush)

    setChart(chart)
    setBrush(brush)

    chart.tooltip.canvas.onmousemove = handleMove(chart, point => {
      if (!point) return
      const {
        tooltip: { ctx }
      } = chart
      clearCtx(chart, ctx)

      drawHoverLineX(chart, point.x)
      drawHoverLineY(chart, point.priceUsd.y)

      drawTooltip(ctx, point, tooltipSettings, marker)
      drawValueBubble(
        chart,
        yBubbleFormatter(point.priceUsd.value),
        0,
        point.priceUsd.y
      )
      drawValueBubble(
        chart,
        getDateDayMonthYear(point.value),
        point.x,
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
      updateChartState(chart, data, bars.concat(lines))
      setupBrush(brush, chart, data, plotBrushData, onBrushChange)
      plotChart(data)
      plotAxes(chart)
    },
    [data]
  )

  function onBrushChange (startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(chart, newData, bars.concat(lines))

    clearCtx(chart)
    plotChart(newData)
    plotAxes(chart)
  }

  function plotBrushData () {
    /* plotDayBars(brush, data, DAILY_BAR_METRICS, paintConfig, resultScale) */
    plotBars(brush, data, bars, syncedColors, scale)
    plotLines(brush, data, lines, syncedColors, scale)
  }

  function plotChart (data) {
    /* plotDayBars(chart, data, DAILY_BAR_METRICS, paintConfig, resultScale) */
    plotBars(chart, data, bars, syncedColors, scale)

    chart.ctx.lineWidth = 1.5
    chart.ctx.setLineDash([0])
    plotLines(chart, data, lines, syncedColors, scale)

    events.forEach(({ metric, key, datetime, value, color }) =>
      drawReferenceDot(chart, metric, datetime, color, key, value)
    )
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

export function yBubbleFormatter (value) {
  if (!value) {
    return '-'
  }

  if (value < 1) {
    return value.toString().slice(0, 3)
  }

  return millify(value)
}

function getDateDayMonthYear (date) {
  const { DD, MMM, YY } = getDateFormats(new Date(date))
  return `${DD} ${MMM} ${YY}`
}

const axesTickFormatters = {
  datetime: value => {
    const date = new Date(value)
    const { DD, MMM, YY } = getDateFormats(date)
    return `${DD} ${MMM} ${YY}`
  }
}

function plotAxes (chart) {
  const { ctx } = chart
  drawAxes(chart)
  ctx.fillStyle = '#9faac4'
  ctx.font = '12px sans-serif'
  drawAxesTicks(chart, 'priceUsd', axesTickFormatters)
}

export default Chart
