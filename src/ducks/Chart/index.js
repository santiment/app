import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import COLOR from '@santiment-network/ui/variables.scss'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { plotLines } from '@santiment-network/chart/lines'
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
  CHART_WITH_BRUSH_PADDING
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
  lines,
  bars,
  daybars,
  chartHeight = CHART_HEIGHT,
  chartPadding = CHART_PADDING,
  joinedCategories,
  domainGroups,
  events = [],
  scale = linearScale,
  tooltipKey,
  MetricColor,
  syncedTooltipDate,
  hideBrush,
  hideAxes,
  hideWatermark,
  onPlotTooltip,
  useCustomTooltip,
  syncTooltips = () => {},
  onRangeSelect,
  onPointClick = () => {},
  isLoading,
  isMultiChartsActive,
  isNightModeEnabled,
  isCartesianGridActive,
  resizeDependencies,
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
        isShowBrush ? CHART_WITH_BRUSH_PADDING : chartPadding
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
        onBrushChange
      )
      brush.canvas.classList.add(styles.brush)
      setBrush(brush)
    }

    setChart(chart)
    if (chartRef) {
      chartRef.current = canvas
    }

    setupTooltip(chart, marker, syncTooltips, useCustomTooltip, onPlotTooltip)
  }, [])

  if (brush) {
    // NOTE: Because func.component works with closures, captured values might be outdated [@vanguard | Jan 23, 2020]
    brush.plotBrushData = plotBrushData
    brush.onChange = onBrushChange
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
      chart.colors = MetricColor
    },
    [MetricColor]
  )

  useEffect(
    () => {
      if (data.length === 0 || !brush) return

      brush.startIndex = 0
      brush.endIndex = data.length - 1
    },
    [data]
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
      if (brush) {
        clearCtx(brush)
        updateBrushState(brush, chart, data)
      }
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

  useEffect(handleResize, resizeDependencies)

  useResizeEffect(handleResize, [...resizeDependencies, data, brush])

  function handleResize () {
    if (data.length === 0) {
      return
    }

    onResize(
      chart,
      isShowBrush ? CHART_WITH_BRUSH_PADDING : chartPadding,
      brush,
      data,
      chartHeight
    )

    if (!brush) {
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
  }

  function onBrushChange (startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(
      chart,
      newData,
      joinedCategories,
      domainModifier,
      domainGroups
    )

    clearCtx(chart)
    plotChart(newData)
    if (!hideAxes) {
      plotAxes(chart, scale)
    }
  }

  function plotBrushData () {
    plotDayBars(brush, data, daybars, MetricColor, scale)
    plotBars(brush, data, bars, MetricColor, scale)
    plotLines(brush, data, lines, MetricColor, scale)
  }

  function plotChart (data) {
    if (!hideWatermark) {
      drawWatermark(chart, isNightModeEnabled)
    }

    plotDayBars(chart, data, daybars, MetricColor, scale)
    plotBars(chart, data, bars, MetricColor, scale)

    chart.ctx.lineWidth = 1.5
    plotLines(chart, data, lines, MetricColor, scale)

    if (isCartesianGridActive) {
      drawCartesianGrid(chart, chart.axesColor)
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
