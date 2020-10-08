import { useEffect } from 'react'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { setupTooltip } from './helpers'
import { useChart } from '../context'

const Tooltip = ({ metric }) => {
  const chart = useChart()

  useEffect(
    () => {
      if (!chart) return

      function marker (ctx, key, value, x, y) {
        ctx.fillStyle = chart.colors[key]
        ctx.fillRect(x, y, 8, 2)
      }

      chart.tooltipKey = metric
      chart.syncTooltips = () => {}
      chart.onPointClick = () => {}

      initTooltip(chart)
      setupTooltip(chart, marker)
    },
    [chart, metric]
  )

  return null
}

export default Tooltip
