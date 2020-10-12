import { useEffect } from 'react'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { setupTooltip, plotTooltip } from './helpers'
import { useChart } from '../context'

const noop = () => {}

const Tooltip = ({
  metric,
  syncTooltips,
  onPointClick,
  onRangeSelect,
  onRangeSelectStart
}) => {
  const chart = useChart()

  if (chart) {
    chart.syncTooltips = syncTooltips
    chart.onRangeSelect = onRangeSelect
    chart.onRangeSelectStart = onRangeSelectStart
    chart.onPointClick = onPointClick
  }

  useEffect(
    () => {
      if (!chart) return

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
  onPointClick: noop,
  onRangeSelect: noop,
  onRangeSelectStart: noop
}

export default Tooltip
