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

function getDomainObject (domainGroups) {
  const domain = {}

  for (let i = domainGroups.length - 1; i >= 0; i--) {
    const group = domainGroups[i]
    if (group) {
      domain[group[0]] = group.slice(1)
    }
  }

  return domain
}

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
    domainGroups,
    yAxesTicks = 8
  } = chart
  if (!axesMetricKeys) return

  const domain = getDomainObject(domainGroups)
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

    const domainDependencies = domain[metricKey]
    if (domainDependencies) {
      let domainOffset = 2

      domainDependencies.forEach(domainMetricKey => {
        const resultOffset = offset + domainOffset
        drawAxisLine(
          ctx,
          colors[domainMetricKey],
          resultOffset,
          top,
          resultOffset,
          bottom
        )
        domainOffset += 2
      })
    }

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
