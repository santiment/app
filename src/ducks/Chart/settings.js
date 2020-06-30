export const CHART_HEIGHT = 440
export const BRUSH_HEIGHT = 40

export const CHART_PADDING = {
  top: 10,
  right: 45,
  bottom: 23,
  left: 0
}

export const BRUSH_PADDING = {
  bottom: 23 + BRUSH_HEIGHT + 10
}

export const DOUBLE_AXIS_PADDING = {
  left: 45
}

export const buildPadding = (...modifiers) =>
  Object.assign({}, CHART_PADDING, ...modifiers)
