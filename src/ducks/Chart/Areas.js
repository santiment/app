import { useEffect } from 'react'
import { plotAreas } from '@santiment-network/chart/areas'
import { buildPlotter } from './context'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register('areas', (chart, scale, data, colors, { areas }) => {
      chart.ctx.lineWidth = 1.5
      plotAreas(chart, data, areas, scale, colors, colors)
    })
  }, [])
})
