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

function movePoints (drawing, diffX, diffY) {
  const [[x1, y1], [x2, y2]] = drawing.absCoor

  drawing.absCoor[0][0] = x1 + diffX
  drawing.absCoor[0][1] = y1 + diffY
  drawing.absCoor[1][0] = x2 + diffX
  drawing.absCoor[1][1] = y2 + diffY
}

function paintDrawings (chart) {
  const { ctx, drawings } = chart.drawer
  clearCtx(chart, ctx)

  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i]
    drawing.shape = new Path2D()

    const [[x1, y1], [x2, y2]] = drawing.absCoor
    const { shape, color, width = 10 } = drawing

    ctx.save()

    ctx.lineWidth = width
    ctx.strokeStyle = color

    shape.moveTo(x1, y1)
    shape.lineTo(x2, y2)

    /* drawing.shape.arc(x1, y1, 50, 0, 2 * Math.PI) */
    ctx.stroke(drawing.shape)

    ctx.restore()
  }
}

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

    chart.drawer = { canvas, ctx, drawings }
  }, [])

  useEffect(
    () => {
      if (!isDrawing) return

      const parent = chart.canvas.parentNode
      const { dpr, drawer } = chart
      const { ctx } = drawer

      function onMouseMove (e) {
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target

        const moveX = (offsetX + offsetLeft) * dpr
        const moveY = (offsetY + offsetTop) * dpr

        let isMouseOver = false

        for (let i = 0; i < drawings.length; i++) {
          const drawing = drawings[i]
          if (!drawing.shape) continue

          if (
            ctx.isPointInStroke(drawing.shape, moveX, moveY) ||
            ctx.isPointInStroke(drawing.shape, moveX - 2, moveY - 2) ||
            ctx.isPointInStroke(drawing.shape, moveX + 2, moveY + 2)
          ) {
            isMouseOver = true
            drawer.mouseover = drawing
            break
          }
        }

        /* console.log(drawer.mouseover) */
        if (!isMouseOver) {
          drawer.mouseover = null
        }
      }

      function onMouseDown (e) {
        if (!drawer.mouseover) return

        console.log('click', drawer.selected)

        const drawing = drawer.mouseover
        drawer.selected = drawing
        drawer.mouseover = null

        const [[x1, y1], [x2, y2]] = drawing.absCoor
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target
        const startX = offsetX + offsetLeft
        const startY = offsetY + offsetTop

        parent.addEventListener('mousemove', onDrag)
        parent.addEventListener('mouseup', onMouseUp)

        function onDrag (e) {
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const dragX = offsetX + offsetLeft
          const dragY = offsetY + offsetTop

          const diffX = dragX - startX
          const diffY = dragY - startY

          drawing.absCoor[0][0] = x1 + diffX
          drawing.absCoor[0][1] = y1 + diffY
          drawing.absCoor[1][0] = x2 + diffX
          drawing.absCoor[1][1] = y2 + diffY

          paintDrawings(chart)
        }

        function onMouseUp () {
          parent.removeEventListener('mousemove', onDrag)
        }
      }

      parent.addEventListener('mousemove', onMouseMove)
      parent.addEventListener('mousedown', onMouseDown)

      return () => {
        parent.removeEventListener('mousemove', onMouseMove)
        parent.removeEventListener('mousedown', onMouseDown)
      }
    },
    [isDrawing]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      const { height, drawer } = chart

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
      })

      paintDrawings(chart)
    },
    [data]
  )

  return null
}

export default Drawer
