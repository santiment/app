import { useEffect } from 'react'
import { plotAxes } from './helpers'
import { buildPlotter } from '../context'

const MultiAxes = buildPlotter(({ plotter }, { metrics, xTicks, yTicks }) => {
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

MultiAxes.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default MultiAxes
