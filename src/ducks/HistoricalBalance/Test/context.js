import React, { useContext, useState, useEffect } from 'react'
import { updateChartState } from '@santiment-network/chart'
import { linearScale } from '@santiment-network/chart/scales'
import { usePlotter } from './plotter'
import { clearCtx } from '../../Chart/utils'
import { domainModifier } from '../../Chart/domain'

const ChartContext = React.createContext()
const ChartSetterContext = React.createContext()
const ChartPlotterContext = React.createContext()

export const ChartProvider = ({
  data,
  scale,
  colors,
  categories,
  children
}) => {
  const [chart, setChart] = useState()
  const plotter = usePlotter()
  /* const plotter = useMemo(() => (chart ? new Map() : undefined), [chart]) */

  useEffect(
    () => {
      if (data.length === 0) return

      clearCtx(chart)

      updateChartState(
        chart,
        data,
        categories.joinedCategories,
        domainModifier,
        /* domainGroups, */
        []
      )

      plotter.items.forEach(clb => {
        clb(chart, data, scale, colors, categories)
      })
    },
    [data]
  )

  return (
    <ChartPlotterContext.Provider value={plotter}>
      <ChartSetterContext.Provider value={setChart}>
        <ChartContext.Provider value={chart}>{children}</ChartContext.Provider>
      </ChartSetterContext.Provider>
    </ChartPlotterContext.Provider>
  )
}

ChartProvider.defaultProps = {
  scale: linearScale
}

export const useChart = () => useContext(ChartContext)
export const useChartSetter = () => useContext(ChartSetterContext)
export const useChartPlotter = () => useContext(ChartPlotterContext)
export const buildPlotter = plotter => props => {
  plotter(useChartPlotter(), props)
  return null
}

export const withChartContext = Component => ({
  data,
  scale,
  colors,
  categories,
  ...props
}) => (
  <ChartProvider
    data={data}
    scale={scale}
    colors={colors}
    categories={categories}
  >
    <Component {...props} />
  </ChartProvider>
)
