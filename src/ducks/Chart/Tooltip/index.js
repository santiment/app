import { useEffect } from 'react'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { setupTooltip, plotTooltip } from './utils'
import { useChart } from '../context'

const noop = () => {}

const Tooltip = ({
  metric,
  syncTooltips,
  onPointMouseDown,
  onPointMouseUp,
  onRangeSelecting,
  onRangeSelected
}) => {
  const chart = useChart()

  chart.syncTooltips = syncTooltips
  chart.onPointMouseDown = onPointMouseDown
  chart.onPointMouseUp = onPointMouseUp
  chart.onRangeSelecting = onRangeSelecting
  chart.onRangeSelected = onRangeSelected

  useEffect(
    () => {
      function marker (ctx, key, value, x, y) {
        ctx.fillStyle = chart.colors[key]
        ctx.fillRect(x, y, 8, 2)
      }

      chart.tooltipKey = metric
      chart.drawTooltip = point => plotTooltip(chart, marker, point)

      initTooltip(chart)
      setupTooltip(chart, marker)
    },
    [chart, metric]
  )

  return null
}

Tooltip.defaultProps = {
  syncTooltips: noop,
  onPointMouseDown: noop,
  onPointMouseUp: noop
}

export default Tooltip
