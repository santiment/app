import React from 'react'
import Button from '@santiment-network/ui/Button'
import colors from '@santiment-network/ui/variables.scss'
import { Metrics, setupColorGenerator } from './utils'
import { getDateFormats, getTimeFormats } from '../../utils/dates'

function setStyle (target, styles) {
  target.setAttribute('style', styles)
}

const HIDDEN_STYLES = `
position: absolute;
left: 200vw;`

const SVG_STYLES = `
    --porcelain: #e7eaf3;
    --malibu: #68dbf4;
    --heliotrope: #8358ff;
    --persimmon: #ff5b5b;
    --texas-rose: #ffad4d;
    --jungle-green: #14c393;
    background: white;
  `

const TEXT_STYLES = `
fill: #9faac4;
font-family: Rubik, sans-serif;
font-weight: 400;
font-size: 12px;
line-height: 18px;
`

const AXIS_STYLES = `
stroke: var(--porcelain);
stroke-dasharray: 7;
`

const TICK_STYLES = 'display: none'

const LEGEND_RECT_SIZE = 5
const LEGEND_RECT_RIGHT_MARGIN = 5
const LEGEND_RECT_ALIGN_CORRECTION = LEGEND_RECT_SIZE / 5
const TEXT_RIGHT_MARGIN = 20
const TEXT_FONT = '12px Rubik'

function drawAndMeasureText (ctx, text, x, y) {
  ctx.fillText(text, x, y)
  return ctx.measureText(text).width
}

function downloadChart (metrics, title) {
  const div = document.createElement('div')
  setStyle(div, HIDDEN_STYLES)
  const svg = document.querySelector('.recharts-surface').cloneNode(true)

  div.appendChild(svg)
  document.body.appendChild(div)
  setStyle(svg, SVG_STYLES)

  const texts = svg.querySelectorAll('text')
  texts.forEach(text => setStyle(text, TEXT_STYLES))

  const axes = svg.querySelectorAll('.recharts-cartesian-axis-line')
  axes.forEach(axis => setStyle(axis, AXIS_STYLES))

  const axisTicks = svg.querySelectorAll('.recharts-cartesian-axis-tick-line')
  axisTicks.forEach(tick => setStyle(tick, TICK_STYLES))

  const brush = svg.querySelector('.recharts-brush')
  brush.style.display = 'none'

  const canvas = document.createElement('canvas')
  div.appendChild(canvas)

  const svgSize = svg.getBoundingClientRect()
  canvas.width = svgSize.width * 2
  canvas.height = svgSize.height * 2
  canvas.style.width = svgSize.width
  canvas.style.height = svgSize.height

  const ctx = canvas.getContext('2d')
  ctx.scale(2, 2)

  const svgData = new XMLSerializer().serializeToString(svg)
  const img = document.createElement('img')

  img.onload = function () {
    const data = metrics.map(metric => Metrics[metric])
    const generateColor = setupColorGenerator()
    ctx.drawImage(img, 0, 0)

    ctx.font = TEXT_FONT

    const textWidth =
      data.reduce((acc, { label }) => {
        return (
          acc +
          LEGEND_RECT_SIZE +
          LEGEND_RECT_RIGHT_MARGIN +
          ctx.measureText(label).width
        )
      }, 0) +
      TEXT_RIGHT_MARGIN * (data.length - 1)

    const textY = svgSize.height - 20
    let textX = (svgSize.width - textWidth) / 2

    data.forEach(({ color, label }) => {
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
    const { HH, mm } = getTimeFormats(date)
    const a = document.createElement('a')
    a.download = `${title} [${HH}-${mm}, ${DD} ${MMM}, ${YYYY}].png`
    a.href = canvas.toDataURL('image/png', 1)

    div.appendChild(a)
    a.click()

    div.remove()
  }

  img.setAttribute(
    'src',
    'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  )
}

const ChartDownloadBtn = ({ metrics, title, ...props }) => {
  return <Button {...props} onClick={() => downloadChart(metrics, title)} />
}

export default ChartDownloadBtn
