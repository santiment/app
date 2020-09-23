import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import COLOR from '@santiment-network/ui/variables.scss'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import {
  plotLines,
  plotFilledLines,
  plotGradientLine
} from '@santiment-network/chart/lines'
import { plotAutoWidthBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import { drawReferenceDot } from '@santiment-network/chart/references'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import Loader from './Loader/Loader'
import { plotAxes } from './axes'
import { setupTooltip, plotTooltip } from './tooltip'
import {
  BRUSH_HEIGHT,
  CHART_PADDING,
  BRUSH_PADDING,
  DOUBLE_AXIS_PADDING,
  buildPadding
} from './settings'
import { drawWatermark } from './watermark'
import { ResizeListener, onResize } from './resize'
import { clearCtx } from './utils'
import { domainModifier } from './domain'
import { paintConfigs, dayBrushPaintConfig } from './paintConfigs'
import { useTheme } from '../../stores/ui/theme'
import styles from './index.module.scss'

const Chart = ({
  className,
  chartRef,
  data,
  brushData = data,
  lines,
  filledLines,
  gradientLines,
  bars,
  autoWidthBars,
  chartHeight,
  chartPadding = CHART_PADDING,
  joinedCategories,
  domainGroups,
  events,
  scale = linearScale,
  tooltipKey,
  axesMetricKeys,
  MetricColor,
  from,
  to,
  hideBrush,
  hideAxes,
  hideWatermark,
  onPlotTooltip,
  useCustomTooltip,
  isLoading,
  isCartesianGridActive,
  isWatermarkLighter,
  syncTooltips,
  syncDate,
  onRangeSelect,
  onRangeSelectStart,
  onPointClick,
  resizeDependencies,
  onBrushChangeEnd,
  children,
  xAxesTicks,
  yAxesTicks
}) => {
  const { isNightMode } = useTheme()
  let [chart, setChart] = useState()
  let [brush, setBrush] = useState()
  const canvasRef = useRef()

  const isShowBrush = !hideBrush

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth
    const height = chartHeight || canvas.parentNode.offsetHeight

    chart = initTooltip(
      initChart(
        canvas,
        width,
        height,
        buildPadding(
          chartPadding,
          isShowBrush && BRUSH_PADDING,
          axesMetricKeys[1] && DOUBLE_AXIS_PADDING
        )
      )
    )
    chart.tooltipKey = tooltipKey

    if (isShowBrush) {
      brush = initBrush(
        chart,
        width,
        BRUSH_HEIGHT,
        dayBrushPaintConfig,
        plotBrushData,
        undefined,
        onBrushChangeEnd
      )
      brush.canvas.classList.add(styles.brush)
      setBrush(brush)
    }

    setChart(chart)
    if (chartRef) {
      chartRef.current = chart
    }

    setupTooltip(chart, marker, useCustomTooltip, onPlotTooltip)
  }, [])

  if (brush) {
    // NOTE: Because func.component works with closures, captured values might be outdated [@vanguard | Jan 23, 2020]
    brush.plotBrushData = plotBrushData
    brush.onChangeEnd = onBrushChangeEnd
  }

  useEffect(
    () => {
      const { brushPaintConfig, ...rest } = paintConfigs[+isNightMode]

      Object.assign(chart, rest)

      if (brush) {
        brush.paintConfig = brushPaintConfig
      }
    },
    [isNightMode]
  )

  if (chart) {
    chart.onRangeSelect = onRangeSelect
    chart.onRangeSelectStart = onRangeSelectStart
    chart.onPointClick = onPointClick
    chart.tooltipKey = tooltipKey
    chart.axesMetricKeys = axesMetricKeys
    chart.colors = MetricColor
    chart.scale = scale
    chart.domainModifier = domainModifier
    chart.domainGroups = domainGroups
    chart.isCartesianGridActive = isCartesianGridActive
    chart.isWatermarkLighter = isWatermarkLighter
    chart.hideWatermark = hideWatermark
    chart.syncTooltips = syncTooltips
    chart.drawTooltip = point => plotTooltip(chart, marker, point)
    chart.xAxesTicks = xAxesTicks
    chart.yAxesTicks = yAxesTicks
  }

  useEffect(
    () => {
      const { length } = brushData
      if (brush && length) {
        let { startIndex = 0, endIndex = length - 1 } = brush
        const [{ datetime: startTimestamp }] = brushData
        const { datetime: endTimestamp } = brushData[length - 1]
        const fromTimestamp = +new Date(from)
        const toTimestamp = +new Date(to)

        const scale = length / (endTimestamp - startTimestamp)

        if (
          !brushData[startIndex] ||
          fromTimestamp !== brushData[startIndex].datetime
        ) {
          startIndex = Math.trunc(scale * (fromTimestamp - startTimestamp))
        }

        if (
          !brushData[endIndex] ||
          toTimestamp !== brushData[endIndex].datetime
        ) {
          endIndex = Math.trunc(scale * (toTimestamp - startTimestamp))
        }

        startIndex =
          startIndex > 0 ? (startIndex < length ? startIndex : length - 1) : 0
        endIndex =
          endIndex > 0 ? (endIndex < length ? endIndex : length - 1) : 0

        if (endIndex - startIndex < 2) {
          if (startIndex > 2) {
            startIndex -= 2
          } else {
            endIndex += 2
          }
        }

        brush.startIndex = startIndex
        brush.endIndex = endIndex

        clearCtx(brush)
        updateBrushState(brush, brushData, joinedCategories)
      }
    },
    [brushData, from, to]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      clearCtx(chart)
      updateChartState(
        chart,
        data,
        joinedCategories,
        domainModifier,
        domainGroups
      )
      plotChart(data)

      if (!hideAxes) {
        plotAxes(chart, scale)
      }
    },
    [
      data,
      scale,
      events,
      domainGroups,
      MetricColor,
      isNightMode,
      isCartesianGridActive,
      isWatermarkLighter
    ]
  )

  useEffect(
    () => {
      if (brush && brushData.length) {
        clearCtx(brush)
        updateBrushState(brush, brushData, joinedCategories)
      }
    },
    [brushData, scale, domainGroups, isNightMode]
  )

  useEffect(handleResize, [...resizeDependencies, data])

  function handleResize () {
    if (data.length === 0 || !chart) {
      return
    }

    const padding = buildPadding(
      chartPadding,
      isShowBrush && BRUSH_PADDING,
      axesMetricKeys[1] && DOUBLE_AXIS_PADDING
    )

    onResize(chart, padding, brush, brushData, joinedCategories)

    updateChartState(
      chart,
      data,
      joinedCategories,
      domainModifier,
      domainGroups
    )
    plotChart(data)

    if (!hideAxes) {
      plotAxes(chart, scale)
    }
  }

  function plotBrushData () {
    plotAutoWidthBars(brush, brushData, autoWidthBars, scale, MetricColor)
    plotBars(brush, brushData, bars, scale, MetricColor)
    plotLines(brush, brushData, lines, scale, MetricColor)
    plotFilledLines(brush, brushData, filledLines, scale, MetricColor)
    plotGradientLine(brush, brushData, gradientLines, scale, MetricColor)
  }

  function plotChart (data) {
    if (!hideWatermark) {
      drawWatermark(chart, isNightMode, isWatermarkLighter)
    }

    plotAutoWidthBars(chart, data, autoWidthBars, scale, MetricColor)
    plotBars(chart, data, bars, scale, MetricColor)

    chart.ctx.lineWidth = 1.5
    plotLines(chart, data, lines, scale, MetricColor)
    plotFilledLines(chart, data, filledLines, scale, MetricColor)
    plotGradientLine(chart, data, gradientLines, scale, MetricColor)

    if (isCartesianGridActive) {
      drawCartesianGrid(
        chart,
        chart.axesColor,
        xAxesTicks || 10,
        yAxesTicks || 8
      )
    }

    events.forEach(({ metric, key, datetime, value, color }) =>
      drawReferenceDot(chart, metric, datetime, color, key, value)
    )
  }

  function marker (ctx, key, value, x, y) {
    const { colors } = chart
    const RADIUS = 4

    if (key === 'isAnomaly' || key.includes('_anomaly')) {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = COLOR.persimmon
      ctx.stroke()
    } else {
      ctx.fillStyle = colors[key]
      ctx.fillRect(x, y, 8, 2)
    }
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <ResizeListener onResize={handleResize} />
      <canvas ref={canvasRef} />
      {isLoading && <Loader />}
      {chart &&
        React.Children.map(
          children,
          child =>
            child &&
            React.cloneElement(child, {
              chart,
              scale,
              data
            })
        )}
    </div>
  )
}

Chart.defaultProps = {
  events: [],
  axesMetricKeys: [],
  syncTooltips: () => {},
  onPointClick: () => {}
}

export default Chart
