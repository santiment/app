import { useEffect } from 'react'
import { buildPlotter, usePlotterRemove } from './context'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'

const ID = 'cartesianGrid'

const CartesianGrid = buildPlotter((chart, { xTicks, yTicks }) => {
  useEffect(
    () =>
      chart.plotter.register(ID, (_, scale) =>
        drawCartesianGrid(chart, chart.axesColor, xTicks, yTicks)
      ),
    [xTicks, yTicks]
  )

  usePlotterRemove(chart, ID)
})

CartesianGrid.defaultProps = {
  xTicks: 10,
  yTicks: 8
}

export default CartesianGrid
