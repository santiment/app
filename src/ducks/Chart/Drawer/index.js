import { useEffect } from 'react'
import { updateSize } from '@santiment-network/chart'
import {
  getPressedHandleType,
  paintDrawings,
  paintDrawingAxes,
  absoluteToRelativeCoordinates,
  relativeToAbsoluteCoordinates,
} from './helpers'
import { useChart } from '../context'

const DRAWINGS = [
  {
    color: '#8b93b6',
    relCoor: [1604880000000, 18100, 1606118400000, 11400], // x1,y1 , x2,y2
    absCoor: null,
  },
]

const Drawer = ({
  metricKey,
  drawings = DRAWINGS,
  data,
  from,
  to,
  selectedLineState,
  isDrawingLineState,
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
      redraw() {
        paintDrawings(chart)
        paintDrawingAxes(chart)
      },
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
        function onMouseDown(e) {
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const startX = offsetX + offsetLeft
          const startY = offsetY + offsetTop

          const drawing = {
            color: '#8b93b6',
            absCoor: [startX, startY, startX, startY],
          }
          chart.drawer.drawings.push(drawing)
          chart.drawer.selected = drawing
          setSelectedLine(drawing)

          parent.removeEventListener('mousedown', onMouseDown)
          parent.addEventListener('mousemove', onMouseMove)
          parent.addEventListener('mousedown', finishLine)

          function onMouseMove(e) {
            const { offsetX, offsetY } = e
            const { offsetLeft, offsetTop } = e.target

            const moveX = offsetX + offsetLeft
            const moveY = offsetY + offsetTop

            const diffX = moveX - startX
            const diffY = moveY - startY

            drawing.absCoor[2] = startX + diffX
            drawing.absCoor[3] = startY + diffY

            chart.drawer.redraw()
          }

          function finishLine() {
            parent.removeEventListener('mousemove', onMouseMove)
            parent.removeEventListener('mousedown', finishLine)
            chart.isDrawing = false
            setIsDrawing(false)
            drawing.relCoor = absoluteToRelativeCoordinates(chart, drawing)
          }
        }

        parent.addEventListener('mousedown', onMouseDown)
        return () => {
          parent.removeEventListener('mousedown', onMouseDown)
        }
      }

      const { dpr, drawer } = chart
      const { ctx } = drawer

      function onMouseMove(e) {
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

        chart.drawer.redraw()
      }

      function onMouseDown(e) {
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

        const [x1, y1, x2, y2] = drawing.absCoor

        function onDelete(e) {
          const { selected } = drawer
          if (!selected) {
            return window.removeEventListener('keydown', onDelete)
          }

          if (e.key === 'Backspace') {
            drawer.selected = null
            setSelectedLine()
            drawer.drawings = drawer.drawings.filter(
              (drawing) => drawing !== selected,
            )

            chart.drawer.redraw()
          }
        }

        window.addEventListener('keydown', onDelete)
        parent.addEventListener('mousemove', onDrag)
        parent.addEventListener('mouseup', onMouseUp)

        const pressedHandle = getPressedHandleType(
          ctx,
          drawing.handles,
          startDprX,
          startDprY,
        )

        paintDrawingAxes(chart)

        function onDrag(e) {
          // TODO: Disable range selection and alerts [@vanguard | Nov 26, 2020]
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const dragX = offsetX + offsetLeft
          const dragY = offsetY + offsetTop

          const diffX = dragX - startX
          const diffY = dragY - startY

          if (pressedHandle & 1) {
            drawing.absCoor[0] = x1 + diffX
            drawing.absCoor[1] = y1 + diffY
          }
          if (pressedHandle & 2) {
            drawing.absCoor[2] = x2 + diffX
            drawing.absCoor[3] = y2 + diffY
          }

          chart.drawer.redraw()
        }

        function onMouseUp() {
          drawing.relCoor = absoluteToRelativeCoordinates(chart, drawing)
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
    [isDrawing],
  )

  useEffect(
    () => {
      const { drawer, minMaxes } = chart
      if (data.length === 0 || !minMaxes) return
      chart.data = data

      drawer.drawings.forEach((drawing) => {
        drawing.absCoor = relativeToAbsoluteCoordinates(chart, drawing)
      })

      console.log(drawer.drawings)

      paintDrawings(chart)
    },
    [data, chart.minMaxes],
  )

  return null
}

export default Drawer
