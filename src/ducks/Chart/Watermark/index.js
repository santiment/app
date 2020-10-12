import { useEffect } from 'react'
import { drawWatermark } from './helpers'
import { buildPlotter, useChartRedraw } from '../context'
import { useTheme } from '../../../stores/ui/theme'

export default buildPlotter((plotter, { light }) => {
  const { isNightMode } = useTheme()
  const redrawChart = useChartRedraw()

  useEffect(
    () => {
      plotter.register('watermark', chart =>
        drawWatermark(chart, isNightMode, light)
      )
      redrawChart()
    },
    [isNightMode, light]
  )
})
