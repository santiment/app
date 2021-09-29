import { newDrawing } from 'studio/Chart/Drawer/utils'

export function shareDrawings (drawings = []) {
  if (drawings.length === 0) return
  return drawings.map(({ type, relCoor, id, size }) => ({
    t: type,
    id,
    rc: relCoor,
    s: size
  }))
}

export function parseDrawings (drawings = []) {
  return drawings.map(
    ({
      t: type = 'line',
      id,
      relCoor: oldCoor,
      rc: relCoor = oldCoor,
      s: size
    }) => {
      const drawing = { type, relCoor }

      if (type === 'emoji') {
        drawing.id = id
        drawing.size = size
      }

      return newDrawing(drawing)
    }
  )
}
