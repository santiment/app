import {
  HandleType,
  newLine,
  checkIsLineHovered,
  getPressedHandleType,
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
    const { isDrawing, drawer } = chart
    if (isDrawing) return

    const { drawings, ctx } = drawer
    const [moveX, moveY] = getDprCoordinates(chart, getEventCoordinates(e))

    let hoveredLine = null

    for (let i = 0; i < drawings.length; i++) {
      const drawing = drawings[i]
      const { shape, handles } = drawing
      if (!shape || !handles) continue

      if (checkIsLineHovered(ctx, drawing, moveX, moveY)) {
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

function handleClickaway (drawer) {
  drawer.mouseover = null
  drawer.selected = null
  window.removeEventListener('keydown', drawer.onLineDelete)
  drawer.redraw()
}

function handleLineDelete (drawer, setSelectedLine, setIsDrawing) {
  return ({ key }) => {
    if (key !== 'Backspace') return

    const { selected, drawings, onLineDelete } = drawer

    drawer.selected = null
    drawer.drawings = drawings.filter(drawing => drawing !== selected)
    drawer.redraw()

    setSelectedLine()
    setIsDrawing(false)
    window.removeEventListener('keydown', onLineDelete)
  }
}

function handleLineDrag (chart, drawing, coordinates) {
  const { drawer } = chart
  const { ctx } = drawer
  const { handles, absCoor } = drawing

  const [startX, startY] = coordinates
  const [startDprX, startDprY] = getDprCoordinates(chart, coordinates)
  const [x1, y1, x2, y2] = absCoor
  const pressedHandle = getPressedHandleType(ctx, handles, startDprX, startDprY)

  return e => {
    const [moveX, moveY] = getEventCoordinates(e)
    const diffX = moveX - startX
    const diffY = moveY - startY

    if (pressedHandle & HandleType.LEFT) {
      drawing.absCoor[0] = x1 + diffX
      drawing.absCoor[1] = y1 + diffY
    }
    if (pressedHandle & HandleType.RIGHT) {
      drawing.absCoor[2] = x2 + diffX
      drawing.absCoor[3] = y2 + diffY
    }

    drawer.redraw()
  }
}

export function handleLineMouseDown (chart, setSelectedLine, setIsDrawing) {
  return e => {
    const { drawer } = chart
    const drawing = drawer.mouseover

    if (!drawing) {
      setSelectedLine()
      return handleClickaway(drawer)
    }

    drawer.selected = drawing
    drawer.redraw()
    setSelectedLine(drawing)
    setIsDrawing(true)

    const parent = chart.canvas.parentNode
    const startCoordinates = getEventCoordinates(e)

    drawer.onLineDelete = handleLineDelete(
      drawer,
      setSelectedLine,
      setIsDrawing
    )
    const onDrag = handleLineDrag(chart, drawing, startCoordinates)

    window.addEventListener('keydown', drawer.onLineDelete)
    parent.addEventListener('mousemove', onDrag)
    parent.addEventListener('mouseup', onMouseUp)

    function onMouseUp () {
      drawing.relCoor = absoluteToRelativeCoordinates(chart, drawing)
      parent.removeEventListener('mousemove', onDrag)
      setIsDrawing(false)
    }
  }
}
