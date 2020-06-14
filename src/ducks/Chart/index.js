import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import COLOR from '@santiment-network/ui/variables.scss'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { plotLines, plotFilledLines } from '@santiment-network/chart/lines'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import { drawReferenceDot } from '@santiment-network/chart/references'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import Loader from './Loader/Loader'
import { plotAxes } from './axes'
import { setupTooltip, plotTooltip } from './tooltip'
import {
  CHART_HEIGHT,
  BRUSH_HEIGHT,
  CHART_PADDING,
  BRUSH_PADDING,
  DOUBLE_AXIS_PADDING,
  buildPadding
} from './settings'
import { drawWatermark } from './watermark'
import { onResize, useResizeEffect } from './resize'
import { clearCtx, findPointIndexByDate } from './utils'
import { domainModifier } from './domain'
import { paintConfigs, dayBrushPaintConfig } from './paintConfigs'
import styles from './index.module.scss'

const Chart = ({
  className,
  chartRef,
  data,
  brushData = data,
  lines,
  filledLines,
  bars,
  daybars,
  chartHeight = CHART_HEIGHT,
  chartPadding = CHART_PADDING,
  joinedCategories,
  domainGroups,
  events = [],
  scale = linearScale,
  tooltipKey,
  axesMetricKeys = [],
  MetricColor,
  syncedTooltipDate,
  from,
  to,
  hideBrush,
  hideAxes,
  hideWatermark,
  onPlotTooltip,
  useCustomTooltip,
  syncTooltips = () => {},
  onRangeSelect,
  onRangeSelectStart,
  onPointClick = () => {},
  isLoading,
  isMultiChartsActive,
  isNightModeEnabled,
  isCartesianGridActive,
  resizeDependencies,
  onBrushChangeEnd,
  children
}) => {
  let [chart, setChart] = useState()
  let [brush, setBrush] = useState()
  const canvasRef = useRef()

  const isShowBrush = !hideBrush && !isMultiChartsActive

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    chart = initTooltip(
      initChart(
        canvas,
        width,
        chartHeight,
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

    setupTooltip(chart, marker, syncTooltips, useCustomTooltip, onPlotTooltip)
  }, [])

  if (brush) {
    // NOTE: Because func.component works with closures, captured values might be outdated [@vanguard | Jan 23, 2020]
    brush.plotBrushData = plotBrushData
    brush.onChangeEnd = onBrushChangeEnd
  }

  useEffect(
    () => {
      const { brushPaintConfig, ...rest } = paintConfigs[+isNightModeEnabled]

      Object.assign(chart, rest)

      if (brush) {
        brush.paintConfig = brushPaintConfig
      }
    },
    [isNightModeEnabled]
  )

  useEffect(
    () => {
      chart.onRangeSelect = onRangeSelect
    },
    [onRangeSelect]
  )

  useEffect(
    () => {
      chart.onRangeSelectStart = onRangeSelectStart
    },
    [onRangeSelectStart]
  )

  useEffect(
    () => {
      chart.onPointClick = onPointClick
    },
    [onPointClick]
  )

  useEffect(
    () => {
      chart.tooltipKey = tooltipKey
    },
    [tooltipKey]
  )

  useEffect(
    () => {
      chart.axesMetricKeys = axesMetricKeys
    },
    [axesMetricKeys]
  )

  useEffect(
    () => {
      chart.colors = MetricColor
    },
    [MetricColor]
  )

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

        if (fromTimestamp !== brushData[startIndex].datetime) {
          startIndex = Math.trunc(scale * (fromTimestamp - startTimestamp))
        }

        if (toTimestamp !== brushData[endIndex].datetime) {
          endIndex = Math.trunc(scale * (toTimestamp - startTimestamp))
        }

        startIndex = startIndex > 0 ? startIndex : 0
        endIndex = endIndex < length ? endIndex : length - 1

        if (endIndex - startIndex < 2) {
          if (startIndex > 2) {
            startIndex -= 2
          } else {
            endIndex += 2
          }
        }

        brush.startIndex = startIndex
        brush.endIndex = endIndex
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
      isNightModeEnabled,
      isCartesianGridActive
    ]
  )

  useEffect(
    () => {
      if (brush && brushData.length) {
        clearCtx(brush)
        updateBrushState(brush, brushData, joinedCategories)
      }
    },
    [brushData, scale, domainGroups, isNightModeEnabled]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      if (syncedTooltipDate) {
        const point =
          chart.points[findPointIndexByDate(chart.points, syncedTooltipDate)]
        if (point) {
          if (useCustomTooltip) {
            onPlotTooltip(point)
          } else {
            plotTooltip(chart, marker, point)
          }
        }
      } else {
        clearCtx(chart, chart.tooltip.ctx)
      }
    },
    [syncedTooltipDate]
  )

  useEffect(handleResize, [...resizeDependencies, data])

  useResizeEffect(handleResize, [...resizeDependencies, data, brush])

  function handleResize () {
    if (data.length === 0) {
      return
    }

    const padding = buildPadding(
      chartPadding,
      isShowBrush && BRUSH_PADDING,
      axesMetricKeys[1] && DOUBLE_AXIS_PADDING
    )

    onResize(chart, padding, brush, brushData, chartHeight, joinedCategories)

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
    plotDayBars(brush, brushData, daybars, scale, MetricColor)
    plotBars(brush, brushData, bars, scale, MetricColor)
    plotLines(brush, brushData, lines, scale, MetricColor)
    plotFilledLines(brush, brushData, filledLines, scale, MetricColor)
  }

  function plotChart (data) {
    if (!hideWatermark) {
      drawWatermark(chart, isNightModeEnabled)
    }

    plotDayBars(chart, data, daybars, scale, MetricColor)
    plotBars(chart, data, bars, scale, MetricColor)

    chart.ctx.lineWidth = 1.5
    plotLines(chart, data, lines, scale, MetricColor)
    plotFilledLines(chart, data, filledLines, scale, MetricColor)

    if (isCartesianGridActive) {
      drawCartesianGrid(chart, chart.axesColor, 10, 8)
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

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled
})

export default connect(mapStateToProps)(Chart)
