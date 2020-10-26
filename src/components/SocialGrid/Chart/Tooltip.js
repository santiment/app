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

function plotTooltip (chart, point, setCurrentPoint) {
  const { hoverLineColor } = chart
  const { x, value: datetime } = point
  const { y, value } = point.social_volume_total

  drawHoverLineX(chart, x, hoverLineColor, 0)
  drawHoverLineY(chart, y, hoverLineColor, -5)
  drawAlertPlus(chart, y, -4)

  setCurrentPoint({
    datetime,
    point: value
  })
}

const Tooltip = ({ setCurrentPoint }) => {
  const chart = useChart()

  useEffect(() => {
    const { tooltip } = initTooltip(chart)
    const { ctx, canvas } = tooltip

    canvas.onmousemove = handlePointEvent(chart, point => {
      if (!point) return

      clearCtx(chart, ctx)
      plotTooltip(chart, point, setCurrentPoint)
    })

    canvas.onmouseleave = () => {
      clearCtx(chart, ctx)
      setCurrentPoint(null)
    }
  }, [])

  return null
}

export default Tooltip
