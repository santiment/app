import { useEffect } from 'react'
import { buildPlotter, usePlotterRemove } from './context'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'

const ID = 'cartesianGrid'

const CartesianGrid = buildPlotter((plotter, { xTicks, yTicks }) => {
  useEffect(
    () =>
      plotter.register(ID, (chart, scale) =>
        drawCartesianGrid(chart, chart.axesColor, xTicks, yTicks)
      ),
    [xTicks, yTicks]
  )

  usePlotterRemove(ID)
})

CartesianGrid.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default CartesianGrid
