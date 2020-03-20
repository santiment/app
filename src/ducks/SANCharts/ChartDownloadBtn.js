import React from 'react'
import Button from '@santiment-network/ui/Button'
import { setupColorGenerator } from './utils'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import colors from '@santiment-network/ui/variables.scss'

function setStyle (target, styles) {
  target.setAttribute('style', styles)
}

const HIDDEN_STYLES = `
position: absolute;
left: 200vw;`

const LEGEND_RECT_SIZE = 5
const LEGEND_RECT_RIGHT_MARGIN = 5
const LEGEND_RECT_ALIGN_CORRECTION = LEGEND_RECT_SIZE / 5
const TEXT_RIGHT_MARGIN = 20
const TEXT_FONT = '12px Proxima Nova'

function drawAndMeasureText (ctx, text, x, y) {
  ctx.fillText(text, x, y)
  return ctx.measureText(text).width
}

function downloadChart ({ current: canvas }, metrics, title) {
  const div = document.createElement('div')
  setStyle(div, HIDDEN_STYLES)
  const ctx = canvas.getContext('2d')

  ctx.font = TEXT_FONT
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  const generateColor = setupColorGenerator()

  const textWidth =
    metrics.reduce((acc, { label }) => {
      return (
        acc +
        LEGEND_RECT_SIZE +
        LEGEND_RECT_RIGHT_MARGIN +
        ctx.measureText(label).width
      )
    }, 0) +
    TEXT_RIGHT_MARGIN * (metrics.length - 1)

  const textY = height - 20
  let textX = (width - textWidth) / 2

  metrics.forEach(({ color, label }) => {
    ctx.fillStyle = colors[generateColor(color)]
    ctx.fillRect(
      textX,
      textY - LEGEND_RECT_SIZE - LEGEND_RECT_ALIGN_CORRECTION,
      LEGEND_RECT_SIZE,
      LEGEND_RECT_SIZE
    )
    ctx.fillStyle = colors.mirage
    textX += LEGEND_RECT_SIZE + LEGEND_RECT_RIGHT_MARGIN
    textX += drawAndMeasureText(ctx, label, textX, textY) + TEXT_RIGHT_MARGIN
  })

  const date = new Date()
  const { DD, MMM, YYYY } = getDateFormats(date)
  const { HH, mm, ss } = getTimeFormats(date)

  const a = document.createElement('a')
  a.download = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].png`

  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  a.href = canvas.toDataURL('image/png', 1)
  ctx.restore()

  div.appendChild(a)
  a.click()
  div.remove()
}

const ChartDownloadBtn = ({ chartRef, metrics, title, ...props }) => {
  return (
    <Button
      {...props}
      onClick={() => {
        try {
          downloadChart(chartRef, metrics, title)
        } catch (e) {
          alert("Can't download this chart")
        }
      }}
    />
  )
}

export default ChartDownloadBtn
