import {
  drawAxes,
  drawXAxisTicks,
  drawAxisLine,
  drawYAxisTicks
} from '@santiment-network/chart/axes'
import { dayTicksPaintConfig, dayAxesColor } from '../paintConfigs'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes
} from '../utils'
import { selectYFormatter } from '../Axes/helpers'

function plotXAxis (chart, formatter) {
  const { axesColor = dayAxesColor, xAxesTicks = 10, scale } = chart

  drawXAxisTicks(
    chart,
    isDayInterval(chart) ? getDateHoursMinutes : getDateDayMonthYear,
    scale,
    xAxesTicks
  )
  drawAxes(chart, axesColor)
}

function plotYAxes (chart, scale) {
  const {
    ctx,
    top,
    right,
    bottom,
    colors,
    axesMetricKeys,
    yAxesTicks = 8
  } = chart
  if (!axesMetricKeys) return

  let offset = right
  ctx.textAlign = 'left'

  axesMetricKeys.forEach(metricKey => {
    drawYAxisTicks(
      chart,
      metricKey,
      selectYFormatter(metricKey),
      scale,
      offset + 6,
      yAxesTicks
    )
    drawAxisLine(ctx, colors[metricKey], offset, top, offset, bottom)

    offset += 50
  })
}

export function plotAxes (chart, scale) {
  const { ctx, ticksPaintConfig = dayTicksPaintConfig } = chart

  ctx.save()

  const { color, font } = ticksPaintConfig
  ctx.fillStyle = color
  ctx.font = font

  plotXAxis(chart, scale)
  plotYAxes(chart, scale)

  ctx.restore()
}
