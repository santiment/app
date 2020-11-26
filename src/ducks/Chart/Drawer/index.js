import { useEffect } from 'react'
import { updateSize } from '@santiment-network/chart'
import { useChart, noop } from '../context'
import { clearCtx, linearDatetimeScale } from '../utils'

const DRAWINGS = [
  {
    relCoor: [[1604880000000, 0.5], [1606118400000, 0.2]],
    absCoor: null
  }
]

const Drawer = ({
  metricKey,
  drawings = DRAWINGS,
  data,
  from,
  to,
  isDrawing,
  ...props
}) => {
  const chart = useChart()

  useEffect(() => {
    const parent = chart.canvas.parentNode
    const { canvasWidth, canvasHeight, dpr } = chart

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    updateSize(canvas, ctx, dpr, canvasWidth, canvasHeight)

    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'

    parent.appendChild(canvas)

    chart.drawer = { canvas, ctx }
  }, [])

  useEffect(
    () => {
      if (!isDrawing) return

      const parent = chart.canvas.parentNode
      const { ctx } = chart.drawer

      const getLineFn = (x1, y1, x2, y2) => x =>
        y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)

      const checkIsBetweenLines = (x, y, getLineY1, getLineY2) =>
        (getLineY1(x) > y) ^ (getLineY2(x) > y)

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
          checkIsBetweenLines(
            x,
            y,
            getLineFn(...plane[0]),
            getLineFn(...plane[1])
          ) &&
          checkIsBetweenLines(
            x,
            y,
            getLineFn(...plane[2]),
            getLineFn(...plane[3])
          )
        )
      }

      function onMouseMove (e) {
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target

        const moveX = offsetX + offsetLeft
        const moveY = offsetY + offsetTop

        for (let i = 0; i < drawings.length; i++) {
          const drawing = drawings[i]
          /* const [[x1, y1], [x2, y2]] =  */
          console.log(ctx.isPointInPath(moveX, moveY))

          return
          if (checkIsPointOnPlane(moveX, moveY, drawing.absCoor)) {
            console.log(true)
          }
        }

        /* console.log(absX, absY) */
      }

      parent.addEventListener('mousemove', onMouseMove)

      return () => {
        parent.removeEventListener('mousemove', onMouseMove)
      }
    },
    [isDrawing]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      const { height, drawer } = chart
      const { ctx } = drawer

      const getAbsoluteY = relY => height * relY
      const getRelativeY = absY => absY / height

      drawings.forEach(drawing => {
        const [[date1, relY1], [date2, relY2]] = drawing.relCoor

        const scaler = linearDatetimeScale(chart, data)

        const x1 = scaler(date1)
        const y1 = getAbsoluteY(relY1)
        const x2 = scaler(date2)
        const y2 = getAbsoluteY(relY2)
        drawing.absCoor = [[x1, y1], [x2, y2]]

        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'red'
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()
      })
    },
    [data]
  )

  return null
}

export default Drawer
