import React from 'react'
import Button from '@santiment-network/ui/Button'
import colors from '@santiment-network/ui/variables.scss'
import { Metrics, setupColorGenerator } from './utils'

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

function downloadChart (metrics = ['historyPrice', 'mvrvRatio']) {
  const div = document.createElement('div')
  /* setStyle(div, HIDDEN_STYLES) */
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

  function drawText (ctx, text, x) {
    ctx.fillText(text, x, svgSize.height - 20)
    return ctx.measureText(text).width
  }

  img.onload = function () {
    const data = metrics.map(metric => Metrics[metric])
    ctx.drawImage(img, 0, 0)

    const COLOR_SIZE = 5
    const cor = COLOR_SIZE / 5
    ctx.font = '12px Rubik'

    const y = svgSize.height - 20

    const textWidth =
      data.reduce((acc, { label }) => {
        return COLOR_SIZE + 5 + ctx.measureText(label).width
      }, 0) +
      20 * (data.length - 1)

    let startX = (svgSize.width - textWidth) / 2

    const generateColor = setupColorGenerator()
    data.forEach(({ color, label }) => {
      ctx.fillStyle = colors[generateColor(color)]
      ctx.fillRect(startX, y - COLOR_SIZE - cor, COLOR_SIZE, COLOR_SIZE)
      ctx.fillStyle = colors.mirage
      startX += COLOR_SIZE + 5
      startX += drawText(ctx, label, startX) + 20
    })

    const canvasdata = canvas.toDataURL('image/png', 1)

    const a = document.createElement('a')
    a.download = 'chart.png'
    a.href = canvasdata
    div.appendChild(a)
    a.click()

    div.remove()
  }

  img.setAttribute(
    'src',
    'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  )
}

const ChartDownloadBtn = props => {
  return <Button {...props} onClick={() => downloadChart()} />
}

export default ChartDownloadBtn
