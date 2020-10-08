import { useEffect } from 'react'
import { buildPlotter } from './context'
import { plotAxes } from '../../Chart/axes'

const Axes = buildPlotter((plotter, { metrics, xTicks, yTicks }) => {
  useEffect(
    () => {
      plotter.register('axes', (chart, scale) => {
        chart.axesMetricKeys = metrics
        chart.xAxesTicks = xTicks
        chart.yAxesTicks = yTicks

        plotAxes(chart, scale)
      })
    },
    [metrics, xTicks, yTicks]
  )
})

Axes.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default Axes
