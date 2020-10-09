import { useEffect } from 'react'
import { plotLines } from '@santiment-network/chart/lines'
import { buildPlotter } from './context'

export default buildPlotter(plotter => {
  useEffect(() => {
    plotter.register('lines', (chart, scale, data, colors, { lines }) => {
      chart.ctx.lineWidth = 1.5
      plotLines(chart, data, lines, scale, colors)
    })
  }, [])
})
