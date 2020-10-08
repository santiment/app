import { useEffect } from 'react'
import { plotLines, plotFilledLines } from '@santiment-network/chart/lines'
import { buildPlotter } from './context'

export default buildPlotter((plotter, props) => {
  useEffect(() => {
    plotter.register('lines', (chart, data, scale, colors, { lines }) =>
      plotLines(chart, data, lines, scale, colors)
    )
  }, [])
})
