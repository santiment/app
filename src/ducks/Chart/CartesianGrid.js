import { useEffect } from 'react'
import { buildPlotter } from './context'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'

const CartesianGrid = buildPlotter((plotter, { xTicks, yTicks }) => {
  useEffect(
    () => {
      plotter.register('cartesianGrid', (chart, scale) =>
        drawCartesianGrid(chart, chart.axesColor, xTicks, yTicks)
      )
    },
    [xTicks, yTicks]
  )
})

CartesianGrid.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default CartesianGrid
