import { newLine, absoluteToRelativeCoordinates } from './helpers'

function getEventCoordinates (e) {
  const { offsetX, offsetY, target } = e
  const { offsetLeft, offsetTop } = target
  return [offsetX + offsetLeft, offsetY + offsetTop]
}

export function handleLineCreation (
  chart,
  setSelectedLine,
  setIsDrawing,
  setIsNewDrawing
) {
  const parent = chart.canvas.parentNode
  parent.addEventListener('mousedown', onMouseDown)

  function onMouseDown (e) {
    const { drawer } = chart
    const [startX, startY] = getEventCoordinates(e)
    const drawing = newLine(startX, startY)

    drawer.drawings.push(drawing)
    drawer.selected = drawing
    setSelectedLine(drawing)
    setIsDrawing(true)

    parent.removeEventListener('mousedown', onMouseDown)
    parent.addEventListener('mousemove', onMouseMove)
    parent.addEventListener('mousedown', finishLine)

    function onMouseMove (e) {
      const [moveX, moveY] = getEventCoordinates(e)
      drawing.absCoor[2] = moveX
      drawing.absCoor[3] = moveY
      drawer.redraw()
    }

    function finishLine () {
      parent.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mousedown', finishLine)
      drawing.relCoor = absoluteToRelativeCoordinates(chart, drawing)
      setIsDrawing(false)
      setIsNewDrawing(false)
    }
  }

  return () => {
    parent.removeEventListener('mousedown', onMouseDown)
  }
}
