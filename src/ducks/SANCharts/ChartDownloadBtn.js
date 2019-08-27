import React from 'react'
import Button from '@santiment-network/ui/Button'
import { CHART_ACTIVE_METRICS_ID } from './ChartActiveMetrics'

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

function downloadChart () {
  const div = document.createElement('div')
  setStyle(div, HIDDEN_STYLES)
  const svg = document.querySelector('.recharts-surface').cloneNode(true)
  console.log(document.querySelector(`[data-id="${CHART_ACTIVE_METRICS_ID}"]`))

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

  const svgData = new XMLSerializer().serializeToString(svg)

  const canvas = document.createElement('canvas')
  div.appendChild(canvas)

  const img = document.createElement('img')

  const svgSize = svg.getBoundingClientRect()
  canvas.width = svgSize.width * 2
  canvas.height = svgSize.height * 2
  canvas.style.width = svgSize.width
  canvas.style.height = svgSize.height

  const ctx = canvas.getContext('2d')
  ctx.scale(2, 2)

  img.setAttribute(
    'src',
    'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  )

  img.onload = function () {
    ctx.drawImage(img, 0, 0)
    const canvasdata = canvas.toDataURL('image/png', 1)

    const pngimg = document.createElement('img')
    pngimg.src = canvasdata
    div.appendChild(pngimg)

    const a = document.createElement('a')
    a.download = 'chart.png'
    a.href = canvasdata
    div.appendChild(a)
    a.click()

    div.remove()
  }
}

const ChartDownloadBtn = props => {
  return <Button {...props} onClick={downloadChart} />
}

export default ChartDownloadBtn
