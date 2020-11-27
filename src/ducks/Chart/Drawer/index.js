import { useEffect } from 'react'
import { newCanvas } from '@santiment-network/chart'
import {
  HandleType,
  checkIsOnStrokeArea,
  paintDrawings,
  paintDrawingAxes,
  getPressedHandleType,
  absoluteToRelativeCoordinates,
  relativeToAbsoluteCoordinates
} from './helpers'
import { handleLineCreation } from './events'
import { useChart, noop } from '../context'

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
    const { canvas } = chart
    const { parentNode, nextElementSibling } = canvas
    const drawer = newCanvas(chart)

    parentNode.insertBefore(drawer.canvas, nextElementSibling || canvas)
    drawer.drawings = drawings
    drawer.redraw = () => {
      paintDrawings(chart)
      paintDrawingAxes(chart)
    }

    chart.drawer = drawer

    chart.plotter.register('Drawer', () => {
      if (!chart.minMaxes) return

      const { drawings } = drawer
      for (let i = 0; i < drawings.length; i++) {
        const drawing = drawings[i]
        drawing.absCoor = relativeToAbsoluteCoordinates(chart, drawing)
      }

      drawer.redraw()
    })

    return () => {
      chart.plotter.register('Drawer', noop)
      drawer.canvas.remove()
      delete chart.drawer
    }
  }, [])

  useEffect(
    () => {
      const parent = chart.canvas.parentNode

      if (isNewDrawing) {
        return handleLineCreation(
          chart,
          setSelectedLine,
          setIsDrawing,
          setIsNewDrawing
        )
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
            document.body.style.cursor = 'pointer'
            break
          }
        }

        if (!isMouseOver) {
          drawer.mouseover = null
          document.body.style.cursor = ''
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

  return null
}

Drawer.defaultProps = {
  drawings: []
}

export default Drawer
