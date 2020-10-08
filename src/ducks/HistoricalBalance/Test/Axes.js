import { useEffect } from 'react'
import { buildPlotter } from './context'
import { plotAxes } from '../../Chart/axes'

const Axes = buildPlotter((plotter, { keys, xTicks, yTicks }) => {
  useEffect(
    () => {
      /* const [mainAxisMetric, secondaryAxisMetric] = keys */

      plotter.register('axes', (chart, scale) => {
        const { ticksPaintConfig, axesColor } = chart

        plotAxes(
          {
            ...chart,
            ticksPaintConfig,
            axesColor,
            axesMetricKeys: keys,
            xAxesTicks: xTicks,
            yAxesTicks: yTicks
          },
          scale
        )
      })
    },
    [keys, xTicks, yTicks]
  )
})

Axes.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default Axes
