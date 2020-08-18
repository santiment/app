import { TypeToWidget } from './types'

const getRawWidget = ({ Widget }) => Widget

export function mergeConnectedWidgetsWithSelected (
  connectedWidgets,
  selectedWidgets
) {
  const connectedSet = new Set(connectedWidgets.map(getRawWidget))
  const appliedWidgets = []
  const { length } = selectedWidgets

  for (let i = 0; i < length; i++) {
    const widget = TypeToWidget[selectedWidgets[i].key]
    if (!connectedSet.has(widget)) {
      appliedWidgets.push(widget.new())
    }
  }

  return connectedWidgets.concat(appliedWidgets)
}
