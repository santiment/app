import { useEffect } from 'react'
import { plotGreenRedBars } from '@santiment-network/chart/bars/greenRedBars'
import { buildPlotter } from './context'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register(
      'greenRedBars',
      (chart, scale, data, _, { greenRedBars }) => {
        plotGreenRedBars(chart, data, greenRedBars[0], scale)
      }
    )
  }, [])
})
