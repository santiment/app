import COLOR from '@santiment-network/ui/variables.scss'

export function drawPaywall (chart, leftBoundaryDate, rightBoundaryDate) {
  const { ctx, points, left, top, right, width, height } = chart

  const lastIndex = points.length - 1
  const firstDate = points[0].value
  const lastDate = points[lastIndex].value

  ctx.save()
  ctx.beginPath()

  ctx.lineWidth = 1
  ctx.strokeStyle = COLOR['texas-rose']
  ctx.setLineDash([7])

  if (
    (leftBoundaryDate && lastDate <= leftBoundaryDate) ||
    (rightBoundaryDate && firstDate >= rightBoundaryDate)
  ) {
    ctx.strokeRect(left, top, width - 1, height)
    ctx.restore()
    return
  }

  if (lastDate === firstDate) {
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

    const width = right - x - 1
    ctx.strokeRect(x, top, width, height)
  }

  ctx.restore()
}

function getBoundaryX (chart, factor, target, firstDate) {
  const { points } = chart

  const index = Math.round((target - firstDate) * factor)
  return points[index].x
}
