import { useEffect } from 'react'
import { drawWatermark } from './helpers'
import { buildPlotter, usePlotterRemove } from '../context'
import { useTheme } from '../../../stores/ui/theme'

const ID = 'watermark'

export default buildPlotter((chart, { light }) => {
  const { isNightMode } = useTheme()

  useEffect(
    () => {
      chart.plotter.register(ID, () => drawWatermark(chart, isNightMode, light))
      chart.redraw()
    },
    [isNightMode, light]
  )

  usePlotterRemove(chart, ID)
})
