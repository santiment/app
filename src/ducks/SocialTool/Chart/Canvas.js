import React from 'react'
import Chart from '../../Chart/Responsive'
import Lines from '../../Chart/Lines'
import Bars from '../../Chart/Bars'
import Tooltip from '../../Chart/Tooltip'
import Axes from '../../Chart/Axes'
import CartesianGrid from '../../Chart/CartesianGrid'
import { useAxesMetricsKey } from '../../Chart/hooks'
import Watermark from '../../Chart/Watermark'
import Brush from '../../Chart/Brush'
import Signals from '../../Chart/Signals'

const BASE_PADDING = {
  top: 10,
  right: 45,
  bottom: 23,
  left: 45
}

const PADDING = {
  ...BASE_PADDING,
  bottom: 73
}

export const CanvasBase = ({ metrics, options, children, ...props }) => {
  const axesMetricKeys = useAxesMetricsKey(metrics)
  const { isCartesianGridActive, isWatermarkLighter, showWatermark } = options

  return (
    <Chart {...props}>
      <Watermark light={isWatermarkLighter} show={showWatermark} />
      <Bars />
      <Lines />
      <Axes metrics={axesMetricKeys} />
      {isCartesianGridActive && <CartesianGrid />}
      <Tooltip metric={axesMetricKeys[0]} />
      {children}
    </Chart>
  )
}
CanvasBase.defaultProps = {
  height: 270,
  padding: BASE_PADDING
}

const Canvas = ({ data, brushData, onBrushChangeEnd, ...props }) => {
  const { settings, metrics } = props
  const { from, to } = settings

  return (
    <CanvasBase data={data} {...props}>
      <Brush
        {...props}
        data={brushData}
        from={from}
        to={to}
        onChangeEnd={onBrushChangeEnd}
      />

      <Signals {...settings} metrics={metrics} data={data} selector='text' />
    </CanvasBase>
  )
}
Canvas.defaultProps = {
  height: 420,
  padding: PADDING
}

export default Canvas
