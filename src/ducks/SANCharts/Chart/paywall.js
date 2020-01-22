import { getTimeIntervalFromToday, DAY, MONTH } from '../../../utils/dates'
import { createOptions } from '../../../pages/Chart/paywallBoundaries'

export function drawPaywall (chart, leftBoundaryDate, rightBoundaryDate) {
  const { ctx, points, left, top, width, height } = chart

  const lastIndex = points.length - 1
  const firstDate = points[0].value
  const lastDate = points[lastIndex].value

  ctx.save()
  ctx.lineWidth = 1
  ctx.strokeStyle = '#FFAD4D'
  ctx.setLineDash([7])

  if (lastDate <= leftBoundaryDate || firstDate >= rightBoundaryDate) {
    ctx.strokeStyle = 'red'
    ctx.strokeRect(left, top, width, height)
    ctx.restore()
    return
  }

  const factor = lastIndex / (lastDate - firstDate)

  if (leftBoundaryDate && leftBoundaryDate > firstDate) {
    const x = getBoundaryX(chart, factor, leftBoundaryDate, firstDate)
    ctx.strokeRect(left, top, x - left, height)
  }

  if (rightBoundaryDate && rightBoundaryDate < lastDate) {
    const x = getBoundaryX(chart, factor, rightBoundaryDate, firstDate)

    const width = points[lastIndex].x - x
    ctx.strokeRect(x, top, width, height)
  }

  ctx.restore()
}

function getBoundaryX (chart, factor, target, firstDate) {
  const { ctx, points } = chart

  const index = Math.round((target - firstDate) * factor)
  return points[index].x
}
