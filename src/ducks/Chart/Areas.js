import { useEffect } from 'react'
import { plotAreas } from '@santiment-network/chart/areas'
import { buildPlotter } from './context'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register('areas', (chart, scale, data, colors, { areas }) => {
      plotAreas(chart, data, areas, scale, colors, colors)
    })
  }, [])
})
