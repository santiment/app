import { useEffect } from 'react'
import { updateSize } from '@santiment-network/chart'
import { useChart, noop } from '../context'
import { clearCtx, linearDatetimeScale } from '../utils'
import { getAbsoluteY, getLineHandle } from './helpers'

const DRAWINGS = [
  {
    relCoor: [[1604880000000, 0.5], [1606118400000, 0.2]],
    absCoor: null
  }
]

function paintDrawings (chart) {
  const { ctx, drawings, mouseover, selected } = chart.drawer
  clearCtx(chart, ctx)

  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i]
    drawing.shape = new Path2D()

    const [[x1, y1], [x2, y2]] = drawing.absCoor || [[], []]
    const { shape, color, width = 10 } = drawing

    ctx.save()

    ctx.lineWidth = width
    ctx.strokeStyle = color

    shape.moveTo(x1, y1)
    shape.lineTo(x2, y2)
    ctx.stroke(shape)

    const handle1 = getLineHandle(ctx, x1, y1)
    const handle2 = getLineHandle(ctx, x2, y2)
    drawing.handles = [handle1, handle2]

    if (mouseover || selected) {
      ctx.fill(handle1)
      ctx.stroke(handle1)
      ctx.fill(handle2)
      ctx.stroke(handle2)
    }

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
          const { shape, handles } = drawing
          if (!shape || !handles) continue

          if (
            ctx.isPointInStroke(shape, moveX, moveY) ||
            ctx.isPointInStroke(shape, moveX - 2, moveY - 2) ||
            ctx.isPointInStroke(shape, moveX + 2, moveY + 2) ||
            ctx.isPointInPath(handles[0], moveX, moveY) ||
            ctx.isPointInPath(handles[1], moveX, moveY)
          ) {
            isMouseOver = true
            drawer.mouseover = drawing
            break
          }
        }

        if (!isMouseOver) {
          drawer.mouseover = null
        }

        paintDrawings(chart)
      }

      function onMouseDown (e) {
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target
        const startX = offsetX + offsetLeft
        const startY = offsetY + offsetTop
        const startDprX = startX * dpr
        const startDprY = startY * dpr

        if (
          drawer.selected &&
          !ctx.isPointInStroke(drawer.selected.shape, startX, startY)
        ) {
          drawer.selected = null
          return paintDrawings(chart)
        }

        if (!drawer.mouseover) return

        console.log('click', drawer.selected)

        const drawing = drawer.mouseover
        drawer.selected = drawing
        drawer.mouseover = null

        const [[x1, y1], [x2, y2]] = drawing.absCoor

        parent.addEventListener('mousemove', onDrag)
        parent.addEventListener('mouseup', onMouseUp)

        let pressedHandle = 3
        if (ctx.isPointInPath(drawing.handles[0], startDprX, startDprY)) {
          pressedHandle = 1
        } else if (
          ctx.isPointInPath(drawing.handles[1], startDprX, startDprY)
        ) {
          pressedHandle = 2
        }

        function onDrag (e) {
          // TODO: Disable range selection and alerts [@vanguard | Nov 26, 2020]
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const dragX = offsetX + offsetLeft
          const dragY = offsetY + offsetTop

          const diffX = dragX - startX
          const diffY = dragY - startY

          if (pressedHandle & 1) {
            drawing.absCoor[0][0] = x1 + diffX
            drawing.absCoor[0][1] = y1 + diffY
          }
          if (pressedHandle & 2) {
            drawing.absCoor[1][0] = x2 + diffX
            drawing.absCoor[1][1] = y2 + diffY
          }

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

      const { height } = chart

      drawings.forEach(drawing => {
        const [[date1, relY1], [date2, relY2]] = drawing.relCoor

        const scaler = linearDatetimeScale(chart, data)

        const x1 = scaler(date1)
        const y1 = getAbsoluteY(height, relY1)
        const x2 = scaler(date2)
        const y2 = getAbsoluteY(height, relY2)
        drawing.absCoor = [[x1, y1], [x2, y2]]
      })

      paintDrawings(chart)
    },
    [data]
  )

  return null
}

export default Drawer
