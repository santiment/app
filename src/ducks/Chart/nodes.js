const LineNode = {
  LINE: 'line',
  FILLED_LINE: 'filledLine',
  GRADIENT_LINE: 'gradientLine'
}

const BarNode = {
  BAR: 'bar',
  AUTO_WIDTH_BAR: 'autoWidthBar',
  GREEN_RED_BAR: 'greenRedBar'
}

export const Node = Object.assign({}, LineNode, BarNode)
export const LINES = new Set(Object.values(LineNode))
export const BARS = new Set(Object.values(BarNode))
