import { useState, useEffect } from 'react'
import {
  initBrush,
  updateBrushState,
  updateBrushDimensions
} from '@santiment-network/chart/brush'
import { useChart, useRedrawer } from './context'
import { dayBrushPaintConfig, nightBrushPaintConfig } from './paintConfigs'
import { clearCtx } from './utils'
import { useTheme } from '../../stores/ui/theme'
import { brush as brushClassName } from './index.module.scss'

const BRUSH_HEIGHT = 40
const noop = () => {}

function getBrushPlotItems ({ items }) {
  const brushItems = new Map(items)

  brushItems.delete('cartesianGrid')
  brushItems.delete('axes')
  brushItems.delete('watermark')
  brushItems.delete('lastDayPrice')

  return brushItems
}

const Brush = ({
  data,
  categories,
  scale,
  colors,
  domainGroups,
  from,
  to,
  onChangeEnd
}) => {
  const chart = useChart()
  const { isNightMode } = useTheme()
  const [brush, setBrush] = useState()
  const [isAwaitingRedraw, requestRedraw] = useRedrawer()

  if (brush) {
    brush.onChangeEnd = onChangeEnd
  }

  useEffect(() => {
    const width = chart.canvasWidth

    const brush = initBrush(chart, width, BRUSH_HEIGHT, dayBrushPaintConfig)
    brush.canvas.classList.add(brushClassName)

    brush.plotBrushData = noop
    brush.redraw = noop
    brush.updateWidth = width => {
      updateBrushDimensions(brush, width, BRUSH_HEIGHT)
      brush.redraw()
    }

    chart.brush = brush
    setBrush(brush)
  }, [])

  useEffect(
    () => {
      const { length } = data
      if (brush && length) {
        const lastIndex = length - 1
        let { startIndex = 0, endIndex = lastIndex } = brush
        const { datetime: startTimestamp } = data[0]
        const { datetime: endTimestamp } = data[lastIndex]
        const fromTimestamp = +new Date(from)
        const toTimestamp = +new Date(to)

        const scale = length / (endTimestamp - startTimestamp)

        if (!data[startIndex] || fromTimestamp !== data[startIndex].datetime) {
          startIndex = Math.trunc(scale * (fromTimestamp - startTimestamp))
        }

        if (!data[endIndex] || toTimestamp !== data[endIndex].datetime) {
          endIndex = Math.trunc(scale * (toTimestamp - startTimestamp))
        }

        startIndex =
          startIndex > 0 ? (startIndex < length ? startIndex : lastIndex) : 0
        endIndex = endIndex > 0 ? (endIndex < length ? endIndex : lastIndex) : 0

        if (endIndex - startIndex < 2) {
          if (startIndex > 2) {
            startIndex -= 2
          } else {
            endIndex += 2
          }
        }

        brush.startIndex = startIndex
        brush.endIndex = endIndex

        requestRedraw()
      }
    },
    [brush, data, from, to]
  )

  useEffect(
    () => {
      if (!brush) return

      clearCtx(brush)
      brush.paintConfig = isNightMode
        ? nightBrushPaintConfig
        : dayBrushPaintConfig

      if (data.length === 0) return

      brush.plotBrushData = () =>
        getBrushPlotItems(chart.plotter).forEach(plot => {
          plot(brush, scale, data, colors, categories)
        })
      brush.redraw = () =>
        updateBrushState(brush, data, categories.joinedCategories)

      brush.redraw()
    },
    [brush, data, colors, domainGroups, isNightMode, isAwaitingRedraw]
  )

  return null
}

export default Brush
