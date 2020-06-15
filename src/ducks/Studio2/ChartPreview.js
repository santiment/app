import React, { useRef, useEffect } from 'react'
import { initChart } from '@santiment-network/chart'
import styles from './index.module.scss'

const ChartPreview = ({ widget, onClick, ...props }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: widgetChart } = widget.chartRef
    const { current: canvas } = canvasRef

    if (!widgetChart) return

    const chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight)

    chart.ctx.drawImage(
      widgetChart.canvas,
      0,
      0,
      canvas.clientWidth,
      canvas.clientHeight + 25
    )
  }, [])

  return (
    <div className={styles.overview__item} onClick={() => onClick(widget)}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ChartPreview
