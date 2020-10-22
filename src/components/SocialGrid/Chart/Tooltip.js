import { useEffect } from 'react'
import {
  initTooltip,
  drawHoverLineX,
  drawHoverLineY
} from '@santiment-network/chart/tooltip'
import { handleMove as handlePointEvent } from '@santiment-network/chart/events'
import { clearCtx } from '../../../ducks/Chart/utils'
import { useChart } from '../../../ducks/Chart/context'
import { drawAlertPlus } from '../../../ducks/Chart/Tooltip/alert'

function plotTooltip (chart, point) {
  const { hoverLineColor } = chart
  const metricPoint = point.social_volume_total
  if (!metricPoint) return

  const { x } = point
  const { y } = metricPoint

  drawHoverLineX(chart, x, hoverLineColor, 0)
  drawHoverLineY(chart, y, hoverLineColor, -5)
  drawAlertPlus(chart, y, -4)
}

const Tooltip = () => {
  const chart = useChart()

  useEffect(() => {
    const { tooltip } = initTooltip(chart)
    const { ctx, canvas } = tooltip

    canvas.onmousemove = handlePointEvent(chart, point => {
      if (!point) return

      clearCtx(chart, ctx)
      plotTooltip(chart, point)
    })

    canvas.onmouseleave = () => clearCtx(chart, ctx)
  }, [])

  return null
}

export default Tooltip
