import { useEffect } from 'react'
import { plotLines, plotFilledLines } from '@santiment-network/chart/lines'
import { buildPlotter } from './context'

export default buildPlotter(plotter => {
  useEffect(() => {
    plotter.register('lines', (chart, scale, data, colors, { lines }) =>
      plotLines(chart, data, lines, scale, colors)
    )
  }, [])
})
