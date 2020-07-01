import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'
import { initChart } from '@santiment-network/chart'
import { useWidgetMessageEffect } from '../widgetMessage'
import { clearCtx } from '../../Chart/utils'
import styles from './Overview.module.scss'

const ChartPreview = ({ widget, selectedMetrics, currentPhase, onClick }) => {
  let [chart, setChart] = useState()
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef

    chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight)
    setChart(chart)

    drawChart()
  }, [])

  useWidgetMessageEffect(widget, drawChart)

  function drawChart () {
    const { current: widgetChart } = widget.chartRef
    if (!widgetChart || !chart) return

    clearCtx(chart)
    chart.ctx.drawImage(
      widgetChart.canvas,
      0,
      0,
      chart.canvasWidth,
      chart.canvasHeight + 25
    )
  }

  return (
    <div
      className={cx(styles.item, styles[currentPhase])}
      onClick={() => onClick(widget)}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ChartPreview
