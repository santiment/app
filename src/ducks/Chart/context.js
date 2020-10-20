import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useReducer
} from 'react'
import { updateChartState } from '@santiment-network/chart'
import { linearScale } from '@santiment-network/chart/scales'
import { Plotter } from './plotter'
import { clearCtx } from './utils'
import { domainModifier } from './domain'

const noop = () => {}
const DEFAULT = []
const REDUCER = () => []
export const useRedrawer = () => useReducer(REDUCER, DEFAULT)

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
    chart.redraw = () => {
      console.log('redraw call')
      redrawChart()
    }
    chart.plotter = Plotter()
    chart.scale = scale
    _setChart(chart)
  }, [])

  useEffect(
    () => {
      if (!chart) return

      clearCtx(chart)

      if (data.length === 0) return

      chart.scale = scale
      chart.colors = colors
      chart.domainGroups = domainGroups

      updateChartState(
        chart,
        data,
        categories.joinedCategories,
        domainModifier,
        domainGroups
      )

      chart.plotter.items.forEach(plot => {
        plot(chart, scale, data, colors, categories)
      })
      console.log('after redraw')
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
  scale: linearScale
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
