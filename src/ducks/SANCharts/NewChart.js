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
import { drawAxes, drawAxesTicks } from '@santiment-network/chart/axes'
import {
  initBrush,
  setupBrush,
  updateBrushDimensions,
  updateBrushState
} from '@santiment-network/chart/brush'
import { millify } from './../../utils/formatting'
import { Metrics } from './data'
import {
  getDateFormats,
  getTimeFormats,
  ONE_DAY_IN_MS
} from '../../utils/dates'
import styles from './NewChart.module.scss'

const BRUSH_HEIGHT = 40

const CHART_PADDING = {
  top: 10,
  right: 0,
  bottom: 23 + BRUSH_HEIGHT + 10,
  left: 45
}

const tooltipSettings = {
  datetime: {
    formatter: value => {
      const date = new Date(value)
      const { HH, mm } = getTimeFormats(date)
      const { MMMM, DD, YYYY } = getDateFormats(date)
      return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
    }
  },
  priceUsd: {
    label: 'Price',
    formatter: value => `$${value.toFixed(2)}`
  },
  volume: {
    label: 'Volume',
    formatter: value => `$${value}`
  },
  followersCount: {
    label: 'Twitter',
    formatter: value => millify(value, 2)
  },
  activity: {
    label: 'Development Activity',
    formatter: value => value
  },
  socialVolume: {
    label: 'Social Volume',
    formatter: value => value
  },
  age_destroyed: {
    label: 'Token Age Destroyed',
    formatter: value => (value ? millify(value, 2) : 'No data')
  },
  daily_active_addresses: {
    label: 'Daily Active Addresses',
    formatter: value => value
  },
  isAnomaly: {
    label: 'Anomaly',
    formatter: () => 'Social Volume'
  },
  trendingPosition: {
    label: 'Trending Position',
    formatter: (value: number) => {
      console.log(value)
      return value + 'rd'
    }
  }
}

function metricsToPlotCategories (metrics) {
  const lines = []
  const bars = []

  metrics.forEach(metric => {
    const { key, dataKey = key, type } = metric
    const target = type === 'line' ? lines : bars
    target.push(dataKey)
  })

  return [lines, bars]
}
const colorsConfig: any = {
  priceUsd: '#14c393',
  volume: '#d2d6e6',
  followersCount: '#5275ff',
  activity: '#8358ff',
  socialVolume: '#68dbf4',
  age_destroyed: '#5275ff',
  daily_active_addresses: '#ffad4d'
}

const paintConfig = {
  priceUsd: ctx => {
    ctx.strokeStyle = colorsConfig.priceUsd
  },
  volume: ctx => {
    ctx.fillStyle = colorsConfig.volume
  },
  followersCount: ctx => {
    ctx.strokeStyle = colorsConfig.followersCount
  },
  activity: ctx => {
    ctx.strokeStyle = colorsConfig.activity
  },
  socialVolume: ctx => {
    ctx.fillStyle = colorsConfig.socialVolume
  },
  age_destroyed: ctx => {
    ctx.fillStyle = colorsConfig.age_destroyed
  },
  daily_active_addresses: ctx => {
    ctx.fillStyle = colorsConfig.daily_active_addresses
  }
}

const Chart = ({ metrics, data, scale = linearScale }) => {
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
        canvasWidth,
        canvasHeight,
        tooltip: { ctx }
      } = chart
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

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
      const { canvasWidth, canvasHeight } = chart
      chart.tooltip.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }
  }, [])

  useEffect(
    () => {
      if (data.length === 0) {
        return
      }
      const [lines, bars] = metricsToPlotCategories(metrics)

      updateChartState(chart, data, bars.concat(lines))
      setupBrush(brush, chart, data, plotBrushData, onBrushChange)
      plotChart(data)
      plotAxes(chart)
    },
    [data]
  )

  function onBrushChange (startIndex, endIndex) {
    const [lines, bars] = metricsToPlotCategories(metrics)
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(chart, newData, bars.concat(lines))

    chart.ctx.clearRect(0, 0, chart.canvasWidth, chart.canvasHeight)
    plotChart(newData)
    plotAxes(chart)
  }

  function plotBrushData () {
    const [lines, bars] = metricsToPlotCategories(metrics)
    /* plotDayBars(brush, data, DAILY_BAR_METRICS, paintConfig, resultScale) */
    plotBars(brush, data, bars, paintConfig, scale)
    plotLines(brush, data, lines, paintConfig, scale)
  }

  function plotChart (data) {
    const [lines, bars] = metricsToPlotCategories(metrics)
    /* plotDayBars(chart, data, DAILY_BAR_METRICS, paintConfig, resultScale) */
    plotBars(chart, data, bars, paintConfig, scale)

    chart.ctx.lineWidth = 1.5
    chart.ctx.setLineDash([0])
    plotLines(chart, data, lines, paintConfig, scale)
    /* drawReferenceDot(chart, 'priceUsd', example[80].datetime, 'orange', 'trendingPosition', 3) */
    /* drawReferenceDot(chart, 'socialVolume', example[138].datetime, 'red', 'isAnomaly', true) */
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

function marker (ctx, key, value, x, y) {
  if (key === 'isAnomaly') {
    const RADIUS = 4
    ctx.beginPath()
    ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'red'
    ctx.stroke()
  } else if (key === 'trendingPosition') {
    const RADIUS = 4
    ctx.beginPath()
    ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'orange'
    ctx.stroke()
  } else {
    ctx.fillStyle = colorsConfig[key]
    ctx.fillRect(x, y, 8, 2)
  }
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
