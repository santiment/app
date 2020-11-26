import { useEffect } from 'react'
import { updateSize } from '@santiment-network/chart'
import {
  getPressedHandleType,
  paintDrawings,
  getAbsoluteY,
  paintDrawingAxes
} from './helpers'
import { useChart } from '../context'
import { clearCtx, linearDatetimeScale } from '../utils'

const DRAWINGS = [
  {
    color: '#8b93b6',
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
  selectedLineState,
  isDrawingLineState
}) => {
  const chart = useChart()
  const [isDrawing, setIsDrawing] = isDrawingLineState
  const setSelectedLine = selectedLineState[1]

  useEffect(() => {
    const parent = chart.canvas.parentNode
    const { canvasWidth, canvasHeight, dpr } = chart

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    updateSize(canvas, ctx, dpr, canvasWidth, canvasHeight)

    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'

    parent.insertBefore(canvas, chart.canvas.nextElementSibling || chart.canvas)

    chart.drawer = {
      canvas,
      ctx,
      drawings,
      redraw () {
        paintDrawings(chart)
        paintDrawingAxes(chart)
      }
    }

    return () => {
      canvas.remove()
      delete chart.drawer
    }
  }, [])

  useEffect(
    () => {
      const parent = chart.canvas.parentNode

      if (isDrawing) {
        function onMouseDown (e) {
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const startX = offsetX + offsetLeft
          const startY = offsetY + offsetTop

          const drawing = {
            color: '#8b93b6',
            absCoor: [[startX, startY], [startX, startY]]
          }
          chart.drawer.drawings.push(drawing)
          chart.drawer.selected = drawing
          setSelectedLine(drawing)

          parent.removeEventListener('mousedown', onMouseDown)
          parent.addEventListener('mousemove', onMouseMove)
          parent.addEventListener('mousedown', finishLine)

          function onMouseMove (e) {
            const { offsetX, offsetY } = e
            const { offsetLeft, offsetTop } = e.target

            const moveX = offsetX + offsetLeft
            const moveY = offsetY + offsetTop

            const diffX = moveX - startX
            const diffY = moveY - startY

            drawing.absCoor[1][0] = startX + diffX
            drawing.absCoor[1][1] = startY + diffY

            paintDrawings(chart)
            paintDrawingAxes(chart)
          }

          function finishLine () {
            parent.removeEventListener('mousemove', onMouseMove)
            parent.removeEventListener('mousedown', finishLine)
            chart.isDrawing = false
            setIsDrawing(false)
          }
        }

        parent.addEventListener('mousedown', onMouseDown)
        return () => {
          parent.removeEventListener('mousedown', onMouseDown)
        }
      }

      const { dpr, drawer } = chart
      const { ctx } = drawer

      function onMouseMove (e) {
        const { drawings } = drawer

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
        paintDrawingAxes(chart)
      }

      function onMouseDown (e) {
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target
        const startX = offsetX + offsetLeft
        const startY = offsetY + offsetTop
        const startDprX = startX * dpr
        const startDprY = startY * dpr

        if (drawer.selected) {
          const { shape, handles } = drawer.selected

          if (
            !ctx.isPointInStroke(shape, startDprX, startDprY) &&
            !ctx.isPointInPath(handles[0], startDprX, startDprY) &&
            !ctx.isPointInPath(handles[1], startDprX, startDprY)
          ) {
            drawer.selected = null
            setSelectedLine()
            return paintDrawings(chart)
          }
        }

        if (!drawer.mouseover) return

        const drawing = drawer.mouseover
        drawer.selected = drawing
        setSelectedLine(drawing)
        drawer.mouseover = null

        const [[x1, y1], [x2, y2]] = drawing.absCoor

        function onDelete (e) {
          const { selected } = drawer
          if (!selected) {
            return window.removeEventListener('keydown', onDelete)
          }

          if (e.key === 'Backspace') {
            drawer.selected = null
            setSelectedLine()
            drawer.drawings = drawer.drawings.filter(
              drawing => drawing !== selected
            )
            paintDrawings(chart)
            paintDrawingAxes(chart)
          }
        }

        window.addEventListener('keydown', onDelete)
        parent.addEventListener('mousemove', onDrag)
        parent.addEventListener('mouseup', onMouseUp)

        const pressedHandle = getPressedHandleType(
          ctx,
          drawing.handles,
          startDprX,
          startDprY
        )

        paintDrawingAxes(chart)

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
          paintDrawingAxes(chart)
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

      chart.data = data

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
