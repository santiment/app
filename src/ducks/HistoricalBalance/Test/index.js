import React, { useRef, useState, useEffect } from 'react'
import { initChart, updateChartState } from '@santiment-network/chart'
import { withChartContext, useChartSetter } from './context'
const styles = {}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const Chart = ({ className, width, height, padding, chartRef, children }) => {
  const setChart = useChartSetter()
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef

    const _width = width || canvas.parentNode.offsetWidth
    const _height = height || canvas.parentNode.offsetHeight

    const chart = initChart(canvas, _width, _height, padding)
    setChart(chart)

    if (chartRef) {
      chartRef.current = chart
    }
  }, [])

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      {children}
    </div>
  )
}

export default withChartContext(Chart)
