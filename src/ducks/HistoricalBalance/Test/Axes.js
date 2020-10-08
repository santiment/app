import { useEffect } from 'react'
import { buildPlotter } from './context'
import { plotAxes } from '../../Chart/axes'

const Axes = buildPlotter((plotter, { metrics, xTicks, yTicks }) => {
  useEffect(
    () => {
      /* const [mainAxisMetric, secondaryAxisMetric] = metrics */

      plotter.register('axes', (chart, scale) => {
        const { ticksPaintConfig, axesColor } = chart

        plotAxes(
          {
            ...chart,
            ticksPaintConfig,
            axesColor,
            axesMetricKeys: metrics,
            xAxesTicks: xTicks,
            yAxesTicks: yTicks
          },
          scale
        )
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
