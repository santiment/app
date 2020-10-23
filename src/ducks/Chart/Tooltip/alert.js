import { waterloo } from '@santiment-network/ui/variables.scss'

const ALERT_ADD_SIZE = 13
const ALERT_ADD_HALF_SIZE = 7

export function drawAlertPlus (chart, y, xOffset = 0) {
  if (!chart.isAlertsActive) return

  const { ctx } = chart.tooltip
  const right = chart.right - xOffset

  ctx.save()

  ctx.fillStyle = waterloo
  ctx.fillRect(
    right - ALERT_ADD_HALF_SIZE,
    y - ALERT_ADD_HALF_SIZE,
    ALERT_ADD_SIZE,
    ALERT_ADD_SIZE
  )

  const path = new Path2D(
    'M3.27 7a.33.33 0 01-.23-.08.33.33 0 01-.07-.22V3.97H.3a.33.33 0 01-.22-.08.33.33 0 01-.08-.22v-.42c0-.09.03-.16.08-.2a.3.3 0 01.22-.1h2.67V.3c0-.09.02-.16.07-.2a.3.3 0 01.23-.1h.45c.09 0 .16.03.2.1.07.04.1.11.1.2v2.65H6.7c.09 0 .16.03.2.1.07.04.1.11.1.2v.42a.3.3 0 01-.1.22.28.28 0 01-.2.08H4.02V6.7a.3.3 0 01-.1.22.28.28 0 01-.2.08h-.45z'
  )

  ctx.translate(right - 4, y - 4)
  ctx.fillStyle = 'white'
  ctx.fill(path)
  ctx.restore()
}
