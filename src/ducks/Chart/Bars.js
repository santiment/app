import { useEffect } from 'react'
import { plotAutoWidthBars, plotBars } from '@santiment-network/chart/bars'
import { buildPlotter } from './context'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register('bars', (chart, scale, data, colors, categories) => {
      const { bars, autoWidthBars } = categories
      plotAutoWidthBars(chart, data, autoWidthBars, scale, colors)
      plotBars(chart, data, bars, scale, colors)
    })
  }, [])
})
