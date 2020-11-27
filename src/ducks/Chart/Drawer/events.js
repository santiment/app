import {
  newLine,
  checkIsOnStrokeArea,
  absoluteToRelativeCoordinates
} from './helpers'

function getEventCoordinates (e) {
  const { offsetX, offsetY, target } = e
  const { offsetLeft, offsetTop } = target
  return [offsetX + offsetLeft, offsetY + offsetTop]
}
const getDprCoordinates = ({ dpr }, [x, y]) => [x * dpr, y * dpr]

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

export function handleLineHover (chart) {
  return e => {
    const { isDrawing, drawer, ctx } = chart
    if (isDrawing) return

    const { drawings } = drawer
    const [moveX, moveY] = getDprCoordinates(chart, getEventCoordinates(e))

    let hoveredLine = null

    for (let i = 0; i < drawings.length; i++) {
      const drawing = drawings[i]
      const { shape, handles } = drawing
      if (!shape || !handles) continue

      if (
        checkIsOnStrokeArea(ctx, shape, moveX, moveY) ||
        ctx.isPointInPath(handles[0], moveX, moveY) ||
        ctx.isPointInPath(handles[1], moveX, moveY)
      ) {
        hoveredLine = drawing
        break
      }
    }

    drawer.mouseover = hoveredLine
    if (hoveredLine) {
      document.body.style.cursor = 'pointer'
    } else {
      document.body.style.cursor = ''
    }

    drawer.redraw()
  }
}
