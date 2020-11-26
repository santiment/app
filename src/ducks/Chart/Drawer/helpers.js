const getLineFn = (x1, y1, x2, y2) => x =>
  y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)

const checkIsBetweenLines = (x, y, getLineY1, getLineY2) =>
  (getLineY1(x) > y) ^ (getLineY2(x) > y)

const ctx = {}

function lineToPlane ([[x1, y1], [x2, y2]]) {
  const width = 2

  const planeX1 = x1 + width
  const planeY1 = y1 + width
  const planeX2 = x1 - width
  const planeY2 = y1 - width

  const planeX3 = x2 + width
  const planeY3 = y2 + width
  const planeX4 = x2 - width
  const planeY4 = y2 - width

  return [
    [planeX1, planeY1, planeX2, planeY2],
    [planeX3, planeY3, planeX4, planeY4],
    [planeX1, planeY1, planeX3, planeY3],
    [planeX2, planeY2, planeX4, planeY4]
  ]
}

function checkIsPointOnPlane (x, y, line) {
  const plane = lineToPlane(line)

  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.moveTo(plane[0][0], plane[0][1])
  ctx.lineTo(plane[0][2], plane[0][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#c00'
  ctx.lineTo(plane[1][0], plane[1][1])
  ctx.lineTo(plane[1][2], plane[1][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#0c0'
  ctx.lineTo(plane[2][0], plane[2][1])
  ctx.lineTo(plane[2][2], plane[2][3])
  ctx.stroke()
  ctx.beginPath()

  ctx.strokeStyle = '#00c'
  ctx.lineTo(plane[3][0], plane[3][1])
  ctx.lineTo(plane[3][2], plane[3][3])
  ctx.stroke()

  return (
    checkIsBetweenLines(x, y, getLineFn(...plane[0]), getLineFn(...plane[1])) &&
    checkIsBetweenLines(x, y, getLineFn(...plane[2]), getLineFn(...plane[3]))
  )
}

export function getLineHandle (ctx, x, y) {
  const handle = new Path2D()

  ctx.strokeStyle = '#00c'
  ctx.lineWidth = 2
  ctx.fillStyle = '#fff'
  handle.arc(x, y, 6, 0, 2 * Math.PI)

  return handle
}

function movePoints (drawing, diffX, diffY) {
  const [[x1, y1], [x2, y2]] = drawing.absCoor

  drawing.absCoor[0][0] = x1 + diffX
  drawing.absCoor[0][1] = y1 + diffY
  drawing.absCoor[1][0] = x2 + diffX
  drawing.absCoor[1][1] = y2 + diffY
}

export const getAbsoluteY = (height, relY) => height * relY
export const getRelativeY = (height, absY) => absY / height
