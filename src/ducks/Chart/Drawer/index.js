import { useEffect } from 'react'
import { updateSize } from '@santiment-network/chart'
import {
  HandleType,
  newLine,
  checkIsOnStrokeArea,
  paintDrawings,
  paintDrawingAxes,
  getPressedHandleType,
  absoluteToRelativeCoordinates,
  relativeToAbsoluteCoordinates
} from './helpers'
import { useChart } from '../context'

// TODO: refactor this and helpers module [@vanguard | Nov 26, 2020]
const Drawer = ({
  metricKey,
  drawings,
  data,
  selectedLineState,
  isDrawingState,
  isNewDrawingState
}) => {
  const chart = useChart()
  const [isNewDrawing, setIsNewDrawing] = isNewDrawingState
  const setSelectedLine = selectedLineState[1]

  function setIsDrawing (state) {
    chart.isDrawing = state
    isDrawingState[1](state)
  }

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

      if (isNewDrawing) {
        function onMouseDown (e) {
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const startX = offsetX + offsetLeft
          const startY = offsetY + offsetTop

          const drawing = newLine(startX, startY)

          chart.drawer.drawings.push(drawing)
          chart.drawer.selected = drawing
          setSelectedLine(drawing)
          setIsDrawing(true)

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

            drawing.absCoor[2] = startX + diffX
            drawing.absCoor[3] = startY + diffY

            chart.drawer.redraw()
          }

          function finishLine () {
            parent.removeEventListener('mousemove', onMouseMove)
            parent.removeEventListener('mousedown', finishLine)
            setIsDrawing(false)
            setIsNewDrawing(false)
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

      function onMouseMove (e) {
        // TODO: refactor [@vanguard | Nov 26, 2020]
        if (chart.isDrawing) return

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
            checkIsOnStrokeArea(ctx, shape, moveX, moveY) ||
            ctx.isPointInPath(handles[0], moveX, moveY) ||
            ctx.isPointInPath(handles[1], moveX, moveY)
          ) {
            isMouseOver = true
            drawer.mouseover = drawing
            document.body.style = 'cursor: pointer'
            break
          }
        }

        if (!isMouseOver) {
          drawer.mouseover = null
          document.body.style = ''
        }

        drawer.redraw()
      }

      function onMouseDown (e) {
        const { offsetX, offsetY } = e
        const { offsetLeft, offsetTop } = e.target
        const startX = offsetX + offsetLeft
        const startY = offsetY + offsetTop
        const startDprX = startX * dpr
        const startDprY = startY * dpr

        const hasNoMouseover = !drawer.mouseover

        if (drawer.selected && hasNoMouseover) {
          const { shape, handles } = drawer.selected

          if (
            !checkIsOnStrokeArea(ctx, shape, startDprX, startDprY) &&
            !ctx.isPointInPath(handles[0], startDprX, startDprY) &&
            !ctx.isPointInPath(handles[1], startDprX, startDprY)
          ) {
            drawer.mouseover = null
            drawer.selected = null
            setSelectedLine()
            return paintDrawings(chart)
          }
        }

        if (hasNoMouseover) return

        const drawing = drawer.mouseover
        drawer.selected = drawing
        drawer.mouseover = drawing
        setSelectedLine(drawing)
        setIsDrawing(true)
        chart.drawer.redraw()

        const [x1, y1, x2, y2] = drawing.absCoor
        const pressedHandle = getPressedHandleType(
          ctx,
          drawing.handles,
          startDprX,
          startDprY
        )

        window.addEventListener('keydown', onDelete)
        parent.addEventListener('mousemove', onDrag)
        parent.addEventListener('mouseup', onMouseUp)

        function onDelete (e) {
          const { selected } = drawer
          if (!selected) {
            return window.removeEventListener('keydown', onDelete)
          }

          if (e.key === 'Backspace') {
            drawer.selected = null
            setSelectedLine()
            setIsDrawing(false)
            drawer.drawings = drawer.drawings.filter(
              drawing => drawing !== selected
            )

            chart.drawer.redraw()
          }
        }

        function onDrag (e) {
          // TODO: Disable range selection and alerts [@vanguard | Nov 26, 2020]
          const { offsetX, offsetY } = e
          const { offsetLeft, offsetTop } = e.target

          const dragX = offsetX + offsetLeft
          const dragY = offsetY + offsetTop

          const diffX = dragX - startX
          const diffY = dragY - startY

          if (pressedHandle & HandleType.LEFT) {
            drawing.absCoor[0] = x1 + diffX
            drawing.absCoor[1] = y1 + diffY
          }
          if (pressedHandle & HandleType.RIGHT) {
            drawing.absCoor[2] = x2 + diffX
            drawing.absCoor[3] = y2 + diffY
          }

          chart.drawer.redraw()
        }

        function onMouseUp () {
          setIsDrawing(false)
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
    [isNewDrawing]
  )

  useEffect(
    () => {
      const { drawer, minMaxes } = chart
      if (data.length === 0 || !minMaxes) return
      chart.data = data

      drawer.drawings.forEach(drawing => {
        drawing.absCoor = relativeToAbsoluteCoordinates(chart, drawing)
      })

      paintDrawings(chart)
    },
    [data, chart.minMaxes]
  )

  return null
}

Drawer.defaultProps = {
  drawings: []
}

export default Drawer
