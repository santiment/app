import React, { useRef, useEffect, useState } from 'react'
import { initChart } from '@santiment-network/chart'
import { clearCtx } from '../Chart/utils'
import styles from './Overview.module.scss'

const ChartPreview = ({ widget, onClick, useWidgetMessage, ...props }) => {
  let [chart, setChart] = useState()
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef

    chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight)
    setChart(chart)

    drawChart()
  }, [])

  useWidgetMessage(widget, drawChart)

  function drawChart() {
    const { current: widgetChart } = widget.chartRef
    if (!widgetChart) return

    const { canvasWidth, canvasHeight } = chart

    clearCtx(chart)
    chart.ctx.drawImage(
      widgetChart.canvas,
      0,
      0,
      chart.canvasWidth,
      chart.canvasHeight + 25,
    )
  }

  return (
    <div className={styles.item} onClick={() => onClick(widget)}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ChartPreview
