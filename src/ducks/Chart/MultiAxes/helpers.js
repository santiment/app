import {
  drawAxes,
  drawXAxisTicks,
  drawAxisLine,
  drawYAxisTicks
} from '@santiment-network/chart/axes'
import { drawValueBubbleY } from '@santiment-network/chart/tooltip'
import {
  dayTicksPaintConfig,
  dayAxesColor,
  nightBubblesPaintConfig
} from '../paintConfigs'
import {
  isDayInterval,
  getDateDayMonthYear,
  getDateHoursMinutes,
  yBubbleFormatter
} from '../utils'
import { selectYFormatter } from '../Axes/helpers'

function getLastMetricPoint (chart, domain) {
  const { points, axesMetricKeys } = chart
  const LastMetricPoint = {}
  let unfoundMetricKeys = axesMetricKeys.slice()

  for (let i = axesMetricKeys.length - 1; i >= 0; i--) {
    const domainDependencies = domain[axesMetricKeys[i]]
    if (domainDependencies) {
      unfoundMetricKeys = unfoundMetricKeys.concat(domainDependencies)
    }
  }

  for (let i = points.length - 1; i >= 0 && unfoundMetricKeys.length; i--) {
    const point = points[i]

    for (let j = unfoundMetricKeys.length - 1; j >= 0; j--) {
      const metricKey = unfoundMetricKeys[j]
      const metricPoint = point[metricKey]

      if (metricPoint && Number.isFinite(metricPoint.value)) {
        LastMetricPoint[metricKey] = metricPoint
        unfoundMetricKeys.splice(j, 1)
      }
    }
  }

  return LastMetricPoint
}

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

// NOTE: http://stackoverflow.com/a/3943023/112731 [@vanguard | Mar  9, 2021]
function getBubbleFontColorHex (bgColor, isNightMode) {
  const r = parseInt(bgColor.slice(1, 3), 16)
  const g = parseInt(bgColor.slice(3, 5), 16)
  const b = parseInt(bgColor.slice(5, 7), 16)

  const threshold = 175 - (isNightMode ? 37 : 0)

  return r * 0.299 + g * 0.587 + b * 0.114 > threshold ? '#000000' : '#ffffff'
}

function plotMetricLastValueBubble (
  chart,
  LastMetricPoint,
  metricKey,
  offset,
  bgColor
) {
  const metricPoint = LastMetricPoint[metricKey]
  if (!metricPoint) return

  const { y, value } = metricPoint
  const { ctx, bubblesPaintConfig } = chart
  const paintConfig = Object.assign({}, bubblesPaintConfig, {
    bgColor,
    textColor: getBubbleFontColorHex(
      bgColor,
      bubblesPaintConfig === nightBubblesPaintConfig
    )
  })

  drawValueBubbleY(
    chart,
    ctx,
    yBubbleFormatter(value, metricKey),
    y,
    paintConfig,
    offset
  )
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
  let lastValueOffset = 0
  ctx.textAlign = 'left'

  const LastMetricPoint = getLastMetricPoint(chart, domain)

  axesMetricKeys.forEach(metricKey => {
    const color = colors[metricKey]
    drawAxisLine(ctx, color, offset, top, offset, bottom)

    const domainDependencies = domain[metricKey]
    if (domainDependencies) {
      let domainOffset = 2

      domainDependencies.forEach(domainMetricKey => {
        const resultOffset = offset + domainOffset
        const color = colors[domainMetricKey]

        drawAxisLine(ctx, color, resultOffset, top, resultOffset, bottom)
        plotMetricLastValueBubble(
          chart,
          LastMetricPoint,
          domainMetricKey,
          lastValueOffset,
          color
        )

        domainOffset += 2
      })
    }

    drawYAxisTicks(
      chart,
      metricKey,
      selectYFormatter(metricKey),
      scale,
      offset + 6,
      yAxesTicks
    )
    plotMetricLastValueBubble(
      chart,
      LastMetricPoint,
      metricKey,
      lastValueOffset,
      color
    )

    offset += 50
    lastValueOffset += 50
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
