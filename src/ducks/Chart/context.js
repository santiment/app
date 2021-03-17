import React, { useCallback, useContext, useState, useEffect } from 'react'
import { updateChartState } from '@santiment-network/chart'
import { linearScale } from '@santiment-network/chart/scales'
import { Plotter, Observer } from './managers'
import { domainModifier } from './domain'
import { clearCtx } from './utils'
import { TooltipSetting } from '../dataHub/tooltipSettings'
import { useRedrawer } from '../../hooks'

export const noop = () => {}

const ChartContext = React.createContext()
const ChartSetterContext = React.createContext()

export const ChartProvider = ({
  data,
  scale,
  colors,
  categories,
  domainGroups,
  children
}) => {
  const [chart, _setChart] = useState()
  const [isAwaitingRedraw, redrawChart] = useRedrawer()
  const setChart = useCallback(chart => {
    chart.data = data
    chart.categories = {}
    chart.scale = scale
    chart.redraw = redrawChart
    chart.observer = Observer()
    chart.plotter = Plotter()

    const chartTooltipSetting = Object.assign({}, TooltipSetting)
    chart.TooltipSetting = chartTooltipSetting

    Object.keys(chartTooltipSetting).forEach(key => {
      chartTooltipSetting[key] = Object.assign({}, chartTooltipSetting[key])
    })

    _setChart(chart)
  }, [])

  useEffect(
    () => {
      if (!chart) return

      clearCtx(chart)

      chart.data = data
      chart.scale = scale
      chart.colors = colors
      chart.domainGroups = domainGroups
      chart.categories = categories

      if (data.length === 0) {
        chart.points = []
        return
      }

      updateChartState(
        chart,
        data,
        categories.joinedCategories,
        domainModifier,
        domainGroups,
        new Set(categories.candles)
      )

      chart.plotter.items.forEach(plot => {
        plot(chart, scale, data, colors, categories)
      })
      chart.observer.emit()
    },
    [data, scale, colors, domainGroups, isAwaitingRedraw]
  )

  return (
    <ChartSetterContext.Provider value={setChart}>
      <ChartContext.Provider value={chart}>{children}</ChartContext.Provider>
    </ChartSetterContext.Provider>
  )
}

ChartProvider.defaultProps = {
  scale: linearScale,
  data: []
}

export const useChart = () => useContext(ChartContext)
export const useChartSetter = () => useContext(ChartSetterContext)
export const buildPlotter = plotter => props => {
  plotter(useChart(), props)
  return null
}
export function usePlotterRemove (chart, id) {
  useEffect(() => {
    chart.redraw()
    return () => {
      chart.plotter.register(id, noop)
      chart.redraw()
    }
  }, [])
}

export const withChartContext = Component => ({
  data,
  scale,
  colors,
  categories,
  domainGroups,
  ...props
}) => (
  <ChartProvider
    data={data}
    scale={scale}
    colors={colors}
    categories={categories}
    domainGroups={domainGroups}
  >
    <Component {...props} />
  </ChartProvider>
)
