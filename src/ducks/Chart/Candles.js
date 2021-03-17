import { useEffect } from 'react'
import {
  plotCandles,
  addCandlesTooltipPrintable
} from '@santiment-network/chart/candles'
import { buildPlotter } from './context'

const ARRAY = []
export default buildPlotter(chart => {
  const { plotter, categories, TooltipSetting } = chart
  const { candles = ARRAY } = categories

  useEffect(
    () => {
      candles.forEach(key => {
        TooltipSetting[key].metricPrintablePusher = addCandlesTooltipPrintable
      })

      plotter.register('candles', (chart, scale, data, colors, categories) =>
        plotCandles(chart, data, categories.candles, scale, colors)
      )

      return () => {
        candles.forEach(key => {
          TooltipSetting[key].metricPrintablePusher = undefined
        })
      }
    },
    [candles]
  )
})
