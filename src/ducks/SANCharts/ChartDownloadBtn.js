import React from 'react'
import Button from '@santiment-network/ui/Button'
import { getChartColors } from '../Chart/colors'
import { dayTicksPaintConfig } from '../Chart/paintConfigs'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import { mirage } from '@santiment-network/ui/variables.scss'

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

function drawAndMeasureText (pngCtx, text, x, y) {
  pngCtx.fillText(text, x, y)
  return pngCtx.measureText(text).width
}

function downloadChart ({ current: chart }, metrics, title) {
  const {
    canvas,
    ticksPaintConfig,
    dpr,
    canvasWidth: width,
    canvasHeight: height
  } = chart

  const div = document.createElement('div')
  setStyle(div, HIDDEN_STYLES)

  const drawings = canvas.toDataURL()
  const pngCanvas = canvas.cloneNode()
  const pngCtx = pngCanvas.getContext('2d')

  pngCtx.font = TEXT_FONT

  const MetricColor = getChartColors(metrics)
  const isDayMode = ticksPaintConfig === dayTicksPaintConfig

  const savedCtx = new Image()
  savedCtx.src = drawings
  savedCtx.onload = () => {
    pngCtx.drawImage(savedCtx, 0, 0)
    pngCtx.scale(dpr, dpr)

    const textWidth =
      metrics.reduce(
        (acc, { label }) =>
          acc +
          LEGEND_RECT_SIZE +
          LEGEND_RECT_RIGHT_MARGIN +
          pngCtx.measureText(label).width,
        0
      ) +
      TEXT_RIGHT_MARGIN * (metrics.length - 1)

    const textY = height - 20
    let textX = (width - textWidth) / 2

    metrics.forEach(({ key, label }) => {
      pngCtx.fillStyle = MetricColor[key]
      pngCtx.fillRect(
        textX,
        textY - LEGEND_RECT_SIZE - LEGEND_RECT_ALIGN_CORRECTION,
        LEGEND_RECT_SIZE,
        LEGEND_RECT_SIZE
      )
      pngCtx.fillStyle = isDayMode ? mirage : 'white'
      textX += LEGEND_RECT_SIZE + LEGEND_RECT_RIGHT_MARGIN
      textX +=
        drawAndMeasureText(pngCtx, label, textX, textY) + TEXT_RIGHT_MARGIN
    })

    const date = new Date()
    const { DD, MMM, YYYY } = getDateFormats(date)
    const { HH, mm, ss } = getTimeFormats(date)

    const a = document.createElement('a')
    a.download = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].png`

    pngCtx.globalCompositeOperation = 'destination-over'
    pngCtx.fillStyle = isDayMode ? 'white' : mirage
    pngCtx.fillRect(0, 0, width, height)
    a.href = pngCanvas.toDataURL('image/png', 1)

    div.appendChild(a)
    a.click()

    a.remove()
    pngCanvas.remove()
    div.remove()
  }
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
