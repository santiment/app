import { useState } from 'react'

export const CursorType = {
  LOCKED: 0,
  FREE: 1
}

export function useChartCursorType (defaultCursor = CursorType.LOCKED) {
  const [cursorType, setCursorType] = useState(defaultCursor)

  return {
    cursorType,
    toggleCursorType: () => setCursorType(+!cursorType)
  }
}
