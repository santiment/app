import React, { useRef, useEffect } from 'react'
import {
  initChart,
  updateChartDimensions,
  updateSize
} from '@santiment-network/chart'
import {
  withChartContext,
  useChart,
  useChartSetter,
  useChartRedraw
} from './context'
import { paintConfigs } from './paintConfigs'
import { useTheme } from '../../stores/ui/theme'
import styles from './index.module.scss'

const cx = (...classes) => classes.filter(Boolean).join(' ')

export const Chart = ({
  className,
  width,
  height,
  padding,
  chartRef,
  children
}) => {
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
        redrawChart()
      }
    },
    [chart, isNightMode]
  )

  useEffect(
    () => {
      if (!chart) return

      const { tooltip, brush, canvasWidth, canvasHeight } = chart

      const _width = width || canvasWidth
      const _height = height || canvasHeight

      updateChartDimensions(chart, _width, _height, padding)

      if (tooltip) {
        updateSize(tooltip.canvas, tooltip.ctx, chart.dpr, _width, _height)
      }
      if (brush) {
        brush.updateWidth(_width)
      }

      redrawChart()
    },
    [chart, width, height, padding]
  )

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      {children}
    </div>
  )
}

export default withChartContext(Chart)
