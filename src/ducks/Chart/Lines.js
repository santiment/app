import { useEffect } from 'react'
import {
  plotLines,
  plotFilledLines,
  plotGradientLine
} from '@santiment-network/chart/lines'
import { buildPlotter } from './context'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register('lines', (chart, scale, data, colors, categories) => {
      const { lines, filledLines, gradientLines } = categories
      chart.ctx.lineWidth = 1.5
      plotLines(chart, data, lines, scale, colors)
      plotFilledLines(chart, data, filledLines, scale, colors)
      plotGradientLine(chart, data, gradientLines, scale, colors)
    })
  }, [])
})
