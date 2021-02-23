import { useEffect } from 'react'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { setupTooltip, plotTooltip } from './helpers'
import { useChart, noop } from '../context'
import { CursorType } from '../cursor'
import { observePressedModifier } from '../../../hooks/keyboard'

const CursorTypeStyle = {
  [CursorType.FREE]: 'crosshair',
  [CursorType.LOCKED]: ''
}

const FlippedCursorTypeStyle = {
  [CursorType.FREE]: '',
  [CursorType.LOCKED]: 'crosshair'
}

const Tooltip = ({
  metric,
  cursorType,
  syncTooltips,
  onPointMouseDown,
  onPointMouseUp,
  onRangeSelecting,
  onRangeSelected
}) => {
  const chart = useChart()

  chart.tooltipKey = metric
  chart.cursorType = cursorType
  chart.syncTooltips = syncTooltips
  chart.onPointMouseDown = onPointMouseDown
  chart.onPointMouseUp = onPointMouseUp
  chart.onRangeSelecting = onRangeSelecting
  chart.onRangeSelected = onRangeSelected

  useEffect(() => {
    const { tooltip } = initTooltip(chart)
    const { canvas } = tooltip

    return observePressedModifier(({ altKey }) => {
      const cursor = (altKey ? FlippedCursorTypeStyle : CursorTypeStyle)[
        chart.cursorType
      ]

      tooltip.cursor = cursor
      canvas.style.cursor = cursor
    })
  }, [])

  useEffect(
    () => {
      chart.tooltip.cursor = CursorTypeStyle[cursorType]
      chart.tooltip.canvas.style.cursor = CursorTypeStyle[cursorType]
    },
    [cursorType]
  )

  useEffect(
    () => {
      function marker (ctx, key, value, x, y) {
        ctx.fillStyle = chart.colors[key]
        ctx.fillRect(x, y, 8, 2)
      }

      chart.drawTooltip = point => plotTooltip(chart, marker, point)

      setupTooltip(chart, marker)
    },
    [metric]
  )

  return null
}

Tooltip.defaultProps = {
  cursorType: CursorType.LOCKED,
  syncTooltips: noop,
  onPointMouseDown: noop,
  onPointMouseUp: noop
}

export default Tooltip
