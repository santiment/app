import React from 'react'
import Button from '@santiment-network/ui/Button'
import { initChart, updateChartState } from '@santiment-network/chart'
import { plotLines, plotFilledLines } from '@santiment-network/chart/lines'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'
import { plotAxes } from '../Chart/axes'
import { drawWatermark } from '../Chart/watermark'
import { paintConfigs } from '../Chart/paintConfigs'
import { metricsToPlotCategories } from '../Chart/Synchronizer'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { useTheme } from '../../stores/ui/theme'
import { mirage } from '@santiment-network/ui/variables.scss'

const CHART_PADDING = {
  top: 10,
  left: 60,
  right: 60,
  bottom: 75
}
const LEGEND_RECT_SIZE = 9
const LEGEND_RECT_RIGHT_MARGIN = 5
const LEGEND_RECT_ALIGN_CORRECTION = LEGEND_RECT_SIZE / 5
const TEXT_RIGHT_MARGIN = 20
const LEGEND_FONT = '15px Proxima Nova'

const PNG_WIDTH = 1920
const PNG_HEIGHT = 650

function drawAndMeasureText (pngCtx, text, x, y) {
  pngCtx.fillText(text, x, y)
  return pngCtx.measureText(text).width
}

function drawLegend (pngChart, metrics, isNightMode) {
  const { canvasWidth: width, canvasHeight: height, colors } = pngChart
  const pngCtx = pngChart.ctx
  pngCtx.font = LEGEND_FONT

  const textWidth =
    metrics.reduce(
      (acc, { label }) =>
        acc +
        LEGEND_RECT_SIZE +
        LEGEND_RECT_RIGHT_MARGIN +
        pngCtx.measureText(label).width,
      0
    ) +
    TEXT_RIGHT_MARGIN * (metrics.length - 1)

  const textY = height - 20
  let textX = (width - textWidth) / 2
  const textColor = isNightMode ? 'white' : mirage

  metrics.forEach(({ key, label }) => {
    pngCtx.fillStyle = colors[key]
    pngCtx.fillRect(
      textX,
      textY - LEGEND_RECT_SIZE - LEGEND_RECT_ALIGN_CORRECTION,
      LEGEND_RECT_SIZE,
      LEGEND_RECT_SIZE
    )
    pngCtx.fillStyle = textColor
    textX += LEGEND_RECT_SIZE + LEGEND_RECT_RIGHT_MARGIN
    textX += drawAndMeasureText(pngCtx, label, textX, textY) + TEXT_RIGHT_MARGIN
  })
}

function downloadChart ({ current: chart }, title, metrics, data, isNightMode) {
  const { scale, colors, domainModifier, domainGroups } = chart
  const { hideWatermark, isWatermarkLighter, isCartesianGridActive } = chart
  const { brushPaintConfig, ...rest } = paintConfigs[+isNightMode]

  const {
    lines,
    daybars,
    bars,
    filledLines,
    joinedCategories
  } = metricsToPlotCategories(metrics)

  const dpr = window.devicePixelRatio || 1
  window.devicePixelRatio = 2
  const pngCanvas = document.createElement('canvas')
  const pngChart = initChart(pngCanvas, PNG_WIDTH, PNG_HEIGHT, CHART_PADDING)
  window.devicePixelRatio = dpr

  Object.assign(pngChart, rest)
  pngChart.axesMetricKeys = chart.axesMetricKeys
  pngChart.colors = chart.colors
  pngChart.ticksPaintConfig = {
    ...pngChart.ticksPaintConfig,
    font: '14px Proxima Nova'
  }

  updateChartState(
    pngChart,
    data,
    joinedCategories,
    domainModifier,
    domainGroups
  )

  plotAxes(pngChart, scale)

  if (!hideWatermark) {
    drawWatermark(pngChart, isNightMode, isWatermarkLighter)
  }
  if (isCartesianGridActive) {
    drawCartesianGrid(pngChart, pngChart.axesColor, 10, 8)
  }

  plotDayBars(pngChart, data, daybars, scale, colors)
  plotBars(pngChart, data, bars, scale, colors)
  pngChart.ctx.lineWidth = 1.5
  plotLines(pngChart, data, lines, scale, colors)
  plotFilledLines(pngChart, data, filledLines, scale, colors)
  drawLegend(pngChart, metrics, isNightMode)

  pngChart.ctx.globalCompositeOperation = 'destination-over'
  pngChart.ctx.fillStyle = isNightMode ? mirage : 'white'
  pngChart.ctx.fillRect(0, 0, PNG_WIDTH, PNG_HEIGHT)

  const a = document.createElement('a')
  const date = new Date()
  const { DD, MMM, YYYY } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)
  a.download = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].png`
  a.href = pngCanvas.toDataURL('image/png', 1)
  a.click()

  a.remove()
  pngCanvas.remove()
}

const ChartDownloadBtn = ({ chartRef, metrics, title, data, ...props }) => {
  const { isNightMode } = useTheme()

  return (
    <Button
      {...props}
      onClick={() => {
        try {
          downloadChart(chartRef, title, metrics, data, isNightMode)
        } catch (e) {
          alert("Can't download this chart")
        }
      }}
    />
  )
}

export default ChartDownloadBtn
