import React, { useRef, useState, useEffect } from 'react'
import { initChart, updateChartDimensions } from '@santiment-network/chart'
import {
  withChartContext,
  useChart,
  useChartSetter,
  useChartRedraw
} from './context'
import { useTheme } from '../../../stores/ui/theme'
import { paintConfigs } from '../../Chart/paintConfigs'
const styles = {}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const Chart = ({ className, width, height, padding, chartRef, children }) => {
  const chart = useChart()
  const canvasRef = useRef(null)
  const { isNightMode } = useTheme()
  const setChart = useChartSetter()
  const redrawChart = useChartRedraw()

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

  useEffect(
    () => {
      if (chart) {
        Object.assign(chart, paintConfigs[+isNightMode])

        const _width = width || chart.canvasWidth
        const _height = width || chart.canvasHeight

        updateChartDimensions(chart, _width, _height, padding)
        redrawChart()
      }
    },
    [chart, isNightMode, width, height, padding]
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      {children}
    </div>
  )
}

export default withChartContext(Chart)
