import { useEffect } from 'react'
import { drawWatermark } from './helpers'
import { buildPlotter } from '../context'
import { useTheme } from '../../../stores/ui/theme'

export default buildPlotter((chart, { light }) => {
  const { isNightMode } = useTheme()

  useEffect(
    () => {
      chart.plotter.register('watermark', () =>
        drawWatermark(chart, isNightMode, light)
      )
      chart.redraw()
    },
    [isNightMode, light]
  )
})
