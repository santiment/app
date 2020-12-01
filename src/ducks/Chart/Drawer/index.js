import { useEffect } from 'react'
import { newCanvas } from '@santiment-network/chart'
import {
  paintDrawings,
  paintDrawingAxes,
  relativeToAbsoluteCoordinates
} from './helpers'
import {
  handleLineCreation,
  handleLineHover,
  handleLineMouseDown
} from './events'
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
    const { canvas, plotter } = chart
    const { parentNode, nextElementSibling } = canvas
    const drawer = newCanvas(chart)

    parentNode.insertBefore(drawer.canvas, nextElementSibling || canvas)
    drawer.drawings = drawings || []
    drawer.onLineHover = handleLineHover(chart)
    drawer.onLineMouseDown = handleLineMouseDown(
      chart,
      setSelectedLine,
      setIsDrawing
    )
    drawer.redraw = () => {
      paintDrawings(chart)
      paintDrawingAxes(chart)
    }
    drawer.recalcAbsCoor = () => {
      if (!chart.minMaxes) return

      const { drawings } = drawer
      for (let i = 0; i < drawings.length; i++) {
        const drawing = drawings[i]
        if (drawing.relCoor) {
          drawing.absCoor = relativeToAbsoluteCoordinates(chart, drawing)
        }
      }

      drawer.redraw()
    }

    chart.drawer = drawer
    plotter.register('Drawer', drawer.recalcAbsCoor)

    return () => {
      plotter.register('Drawer', noop)
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

      const { onLineHover, onLineMouseDown } = chart.drawer

      parent.addEventListener('mousemove', onLineHover)
      parent.addEventListener('mousedown', onLineMouseDown)

      return () => {
        parent.removeEventListener('mousemove', onLineHover)
        parent.removeEventListener('mousedown', onLineMouseDown)
      }
    },
    [isNewDrawing]
  )

  return null
}

export default Drawer
