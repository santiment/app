import { useEffect } from 'react'
import { drawWatermark } from './helpers'
import { buildPlotter } from '../context'
import { useTheme } from '../../../stores/ui/theme'

export default buildPlotter((chart, { light, show }) => {
  const { isNightMode } = useTheme()

  useEffect(
    () => {
      chart.plotter.register('watermark', () =>
        drawWatermark(chart, isNightMode, light, show)
      )
      chart.redraw()
    },
    [isNightMode, light, show]
  )
})
