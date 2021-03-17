import { useEffect } from 'react'
import {
  plotCandles,
  addCandlesTooltipPrintable
} from '@santiment-network/chart/candles'
import { buildPlotter } from './context'
import { TooltipSetting } from '../dataHub/tooltipSettings'

export default buildPlotter(({ plotter }) => {
  useEffect(() => {
    plotter.register('candless', (chart, scale, data, colors, categories) => {
      const { candless } = categories

      candless.forEach(key => {
        TooltipSetting[key].metricPrintablePusher = addCandlesTooltipPrintable
      })

      plotCandles(chart, data, candless, scale, colors)

      return () => {
        candless.forEach(key => {
          TooltipSetting[key].metricPrintablePusher = undefined
        })
      }
    })
  }, [])
})
